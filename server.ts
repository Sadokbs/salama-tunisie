import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { RECENT_CITIZEN_ALERTS, TUNISIA_GOVERNORATES } from './src/data/tunisiaData';
import { CitizenAlert } from './src/types';
import { getLiveTunisiaWeather } from './src/server/weatherService';
import { getExpertSafetyResponse } from './src/server/emergencyKnowledge';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());


let citizenReports: CitizenAlert[] = [];

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Salama Tunisie - Emergency Platform' });
});

app.get('/api/weather/live', async (req, res) => {
  try {
    const liveData = await getLiveTunisiaWeather();
    res.json(liveData);
  } catch (error) {
    console.error('Weather route error:', error);
    res.status(500).json({ error: 'Impossible de récupérer la météo en direct' });
  }
});

app.get('/api/governorates', (req, res) => {
  res.json(TUNISIA_GOVERNORATES);
});

app.get('/api/reports', (req, res) => {
  res.json(citizenReports);
});

app.post('/api/reports', (req, res) => {
  const { governorateId, delegation, type, severity, title, description } = req.body;

  if (!governorateId || !delegation || !title || !description) {
    return res.status(400).json({ error: 'Champs obligatoires manquants pour le signalement.' });
  }

  const governorate = TUNISIA_GOVERNORATES.find(g => g.id === governorateId);
  const newReport: CitizenAlert = {
    id: 'rep-' + Date.now(),
    governorateId,
    governorateName: governorate ? governorate.name : governorateId,
    delegation: delegation.trim(),
    type: type || 'inondation',
    severity: severity || 'danger',
    title: title.trim(),
    description: description.trim(),
    reportedAt: "À l'instant",
    verified: false,
    upvotes: 0,
  };

  citizenReports = [newReport, ...citizenReports];
  res.status(201).json(newReport);
});

app.post('/api/reports/:id/upvote', (req, res) => {
  const { id } = req.params;
  const { action } = req.body || {};
  const report = citizenReports.find(r => r.id === id);
  if (report) {
    if (action === 'down') {
      report.upvotes = Math.max(0, report.upvotes - 1);
    } else {
      report.upvotes += 1;
    }
    return res.json({ success: true, upvotes: report.upvotes });
  }
  res.status(404).json({ error: 'Signalement introuvable.' });
});

app.post('/api/gemini/advisor', async (req, res) => {
  const { question, governorate, hazardContext, lang = 'ar' } = req.body;

  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'Veuillez poser une question précise.' });
  }

  const ai = getGeminiClient();

  if (!ai) {
    const expertAdvice = getExpertSafetyResponse(question, lang as 'fr' | 'ar', governorate);
    return res.json({
      answer: expertAdvice,
      fallback: true
    });
  }

  const systemPrompt = `Tu es "Salama TN" (سلامة تونس), l'assistant officiel expert d'urgence et de prévention des catastrophes naturelles en Tunisie (Protection contre les pluies torrentielles, inondations, crues d'oueds et incendies de forêts/récoltes).
Tu as une connaissance experte et précise de la géographie et des risques des 24 gouvernorats de la Tunisie (ex: Oued Medjerda à Boussalem et Béja, Oued Meliane à Ben Arous, Nabeul et le Cap Bon, forêts de Kroumirie à Aïn Draham et Tabarka, Mont Chaambi à Kasserine, Sfax, Gabès, etc.).
Tu connais par cœur les numéros d'urgence tunisiens :
- 198 : Protection Civile (الحماية المدنية)
- 193 : Garde Nationale (الحرس الوطني)
- 197 : Police de Secours (الشرطة)
- 190 : SAMU (الإسعاف)
- 80 10 12 12 : Direction Générale des Forêts (DGF - الإشعار عن حرائق الغابات)
- 80 10 03 33 / 71 341 400 : STEG (Urgences électriques)
- 1888 : SONEDE (Urgences eau)

Directives de réponse :
1. Donne des réponses TRÈS DÉTAILLÉES, COMPLÈTES, structurées et pratiques (pas de réponses sommaires d'une seule ligne).
2. Explique étape par étape les gestes vitaux avant, pendant et après l'événement.
3. Si la question est en arabe (ou si lang === 'ar'), réponds en arabe fluide, clair et soigné avec les termes usuels en Tunisie (الحماية المدنية، مجرى الوادي، بالوعات، ستاغ، حقيبة طوارئ). Si c'est en français, réponds en français clair et professionnel.
4. Contexte actuel : Gouvernorat: ${governorate || 'Tunisie globale'}, Risque concerné: ${hazardContext || 'Général'}.
5. Formate ta réponse avec des titres clairs (###), des puces ordonnées et des mots-clés en gras.`;


  try {
    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Question du citoyen tunisien : "${question}"`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        },
      });
    } catch (primaryErr) {
      console.warn('Primary model error, attempting fallback gemini-2.5-flash:', primaryErr);
      response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Question du citoyen tunisien : "${question}"`,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.3,
        },
      });
    }

    if (response && response.text && response.text.trim().length > 20) {
      return res.json({ answer: response.text, fallback: false });
    } else {
      const expertFallback = getExpertSafetyResponse(question, lang as 'fr' | 'ar', governorate);
      return res.json({ answer: expertFallback, fallback: true });
    }
  } catch (error) {
    console.error('Error generating Gemini response, using expert knowledge base:', error);
    const expertSafetyAdvice = getExpertSafetyResponse(question, lang as 'fr' | 'ar', governorate);
    return res.json({ 
      answer: expertSafetyAdvice,
      fallback: true
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Salama Tunisie server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
