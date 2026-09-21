import React, { useState, useRef, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  Send, 
  X, 
  PhoneCall, 
  ShieldAlert, 
  User, 
  Bot, 
  Loader2, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { Governorate, HazardType } from '../types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isEmergencyAlert?: boolean;
}

interface GeminiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fr' | 'ar';
  selectedGov?: Governorate;
  initialQuestion?: string;
}

export const GeminiAdvisorModal: React.FC<GeminiAdvisorModalProps> = ({
  isOpen,
  onClose,
  lang,
  selectedGov,
  initialQuestion,
}) => {
  const isAr = lang === 'ar';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcome: Message = {
        role: 'assistant',
        content: isAr
          ? `مرحباً بك. أنا **مستشار سلامة تونس الذكي**. 
أنا هنا لمساعدتك في أي استفسار يتعلق بالوقاية والتصرف السليم أثناء **الأمطار الغزيرة**، **حرائق الغابات** و**فيضان الأودية** في كامل الولايات التونسية.

⚠️ **تذكير استعجالي**: في حال وجود خطر فوري يهدد حياتك الآن، اتصل مباشرة بالحماية المدنية على **198** أو الحرس الوطني على **193**.`
          : `Bonjour. Je suis **Salama IA**, votre conseiller d'urgence et de prévention en Tunisie.
Je peux vous guider pour vous protéger face aux **pluies torrentielles**, **incendies de forêts** et **crues d'oueds** dans n'importe quelle délégation ou gouvernorat tunisien.

⚠️ **Rappel vital** : En cas de danger immédiat pour des vies humaines, composez immédiatement le **198** (Protection Civile) ou le **193** (Garde Nationale).`,
      };
      setMessages([welcome]);
    }
  }, [isOpen, isAr, messages.length]);

  // If initialQuestion provided, submit it
  useEffect(() => {
    if (isOpen && initialQuestion && initialQuestion.trim().length > 0) {
      sendMessage(initialQuestion);
    }
  }, [isOpen, initialQuestion]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  const quickPrompts = isAr
    ? [
        'منسوب الوادي يرتفع قرب منزلي في بوسالم، ما هي الخطوات؟',
        'شاهدت دخاناً كثيفاً بغابات طبرقة، كيف أتصرف؟',
        'تعطلت سيارتي في تجمع مائي، هل أبقى داخلها؟',
        'كيف أحمي محصول الحبوب من الحرائق في سليانة؟',
      ]
    : [
        'L\'oued monte près de chez moi à Boussalem, que faire ?',
        'Feu de forêt aperçu à Tabarka / Aïn Draham, quels réflexes ?',
        'Ma voiture cale dans une mare d\'eau, que faire ?',
        'Comment protéger mon champ de blé contre le feu ?',
      ];

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text,
          governorate: selectedGov ? selectedGov.name : 'Tunisie',
          lang: lang,
        }),
      });

      const data = await res.json();
      const assistantText =
        data.answer ||
        (isAr
          ? `### 🚨 إجراءات حماية العائلة من مخاطر الفيضانات وفيضان الأودية في تونس:

* **أرقام النجدة الفورية:** الحماية المدنية **198** | الحرس الوطني **193** | طوارئ الستاغ **80 10 03 33**

1. **قطع التيار الكهربائي والغاز فوراً:** افصل القاطع العام من العداد الرئيسي عند بداية دخول المياه للمنزل لتفادي الصعق الكهربائي.
2. **الاحتماء في الأماكن المرتفعة:** اصعد مع عائلتك إلى الطابق العلوي أو السطح، وتجنب البقاء في الأقبية (Sous-sol) أو الطوابق المنخفضة.
3. **ممنوع عبور الأودية إطلاقاً:** لا تحاول أبداً عبور أي مجرى وادٍ سواء بالسيارة أو راجلاً حتى لو بدا المنسوب قليلاً.
4. **تجهيز حقيبة الطوارئ:** احتفظ بوثائق الهوية، الأدوية المزمنة، مصباح يدوي، وشاحن متنقل في مكان آمن ومرتفع.
5. **الاتصال بالرقم 198:** حدد موقعك بدقة وانتظر فرق الإنقاذ وتجنب لمس أي أسلاك مغمورة.`
          : `### 🚨 Mesures indispensables pour protéger votre famille des inondations en Tunisie :

* **Numéros d'urgence vitale :** Protection Civile **198** | Garde Nationale **193** | Dépannage STEG **80 10 03 33**

1. **Coupez immédiatement l'électricité et le gaz** au disjoncteur général dès que l'eau entre pour éviter toute électrocution.
2. **Réfugiez-vous dans les étages supérieurs** avec votre famille ; évitez absolument les sous-sols et garages.
3. **Ne franchissez jamais un oued en crue**, ni à pied ni en voiture.
4. **Préparez un kit d'urgence :** papiers d'identité, pharmacie essentielle, lampe torche et téléphone chargé.
5. **Appelez le 198** et signalez votre position exacte.`);

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: assistantText },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: isAr
            ? `### 🚨 إجراءات الحماية الفورية (حماية مدنية - 198):

1. **الأولوية القصوى:** اتصل فوراً بالحماية المدنية على **198** أو الحرس الوطني على **193**.
2. **اقطع الكهرباء والغاز** من القاطع الرئيسي فوراً.
3. **اصعد إلى الطوابق العلوية** وتجنب الطوابق الأرضية ومجاري السيول.
4. **ممنوع عبور الأودية** بالسيارة أو على الأقدام.`
            : `### 🚨 Consignes vitales immédiates (Protection Civile - 198) :

1. **Appelez d'urgence le 198** (Protection Civile) ou le **193** (Garde Nationale).
2. **Coupez le disjoncteur électrique général STEG.**
3. **Montez aux étages supérieurs** et ne descendez jamais au sous-sol.
4. **Ne tentez jamais de franchir un oued en crue.**`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full h-[85vh] max-h-[700px] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Modal Top Bar with Emergency Hotlines */}
        <div className="bg-slate-900 text-white p-4 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white">
                  {isAr ? 'مستشار سلامة تونس الذكي' : 'Assistant Salama IA'}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Gemini 3.8
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {selectedGov
                  ? `${isAr ? 'السياق الحالي :' : 'Contexte :'} ${isAr ? selectedGov.nameAr : selectedGov.name}`
                  : isAr
                  ? 'وقاية وتصرف استعجالي في تونس'
                  : 'Conseils opérationnels pour la Tunisie'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="tel:198"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition-colors"
              title="Appeler 198"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>198</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Warning Banner */}
        <div className="bg-amber-50 px-4 py-2 text-[11px] text-amber-900 border-b border-amber-200 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              {isAr
                ? 'هذا المساعد للإرشاد والوقاية. في الخطر المباشر، الأولوية دائماً للاتصال بالحماية المدنية (198).'
                : 'Outil d\'assistance préventive. En situation de péril immédiat, appelez d\'abord le 198.'}
            </span>
          </div>
          <button
            onClick={clearChat}
            className="text-amber-800 hover:text-amber-950 font-bold shrink-0 inline-flex items-center gap-1 cursor-pointer"
            title="Effacer l'historique"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">{isAr ? 'مسح' : 'Effacer'}</span>
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? (isAr ? 'flex-row' : 'flex-row-reverse') : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-600 text-white shadow-xs'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
                }`}
              >
                {msg.role === 'user' ? (
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                ) : (
                  <div className="markdown-body text-xs sm:text-sm leading-relaxed space-y-2 prose prose-sm max-w-none">
                    <Markdown>{msg.content}</Markdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                <span>{isAr ? 'جارٍ تحليل الوضع وتجهيز التعليمات...' : 'Analyse des consignes d\'urgence...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto shrink-0">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => sendMessage(prompt)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs whitespace-nowrap transition-colors shrink-0 cursor-pointer border border-slate-200"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3.5 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isAr
                  ? 'اكتب سؤالك هنا (مثال: ماذا أفعل إذا حاصرتني المياه بالسيارة؟)...'
                  : 'Posez votre question d\'urgence (ex: l\'eau monte, feux de pinède...)...'
              }
              className="flex-1 py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all disabled:opacity-50 cursor-pointer shrink-0 shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
