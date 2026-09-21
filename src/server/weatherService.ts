export interface LiveGovWeather {
  govId: string;
  lat: number;
  lng: number;
  tempCurrent: number;
  tempMax: number;
  tempMin: number;
  condition: 'orage' | 'pluie' | 'nuageux' | 'ensoleille' | 'vent_fort';
  conditionAr: string;
  conditionFr: string;
  rainfallMm: number;
  windSpeedKmH: number;
  windDirAr: string;
  windDirFr: string;
  humidityPct: number;
  seaStateAr?: string;
  seaStateFr?: string;
  inmAlertAr?: string;
  inmAlertFr?: string;
}

export interface LiveBulletinResponse {
  isLive: boolean;
  updatedAt: string;
  updatedAtFormattedAr: string;
  updatedAtFormattedFr: string;
  headlineAr: string;
  headlineFr: string;
  governoratesWeather: LiveGovWeather[];
}

export const GOVERNORATE_LOCATIONS: { id: string; name: string; nameAr: string; lat: number; lng: number }[] = [
  { id: 'tunis', name: 'Tunis', nameAr: 'تونس', lat: 36.8065, lng: 10.1815 },
  { id: 'ariana', name: 'Ariana', nameAr: 'أريانة', lat: 36.8665, lng: 10.1647 },
  { id: 'ben_arous', name: 'Ben Arous', nameAr: 'بن عروس', lat: 36.7533, lng: 10.2222 },
  { id: 'manouba', name: 'Manouba', nameAr: 'منوبة', lat: 36.8080, lng: 10.0972 },
  { id: 'bizerte', name: 'Bizerte', nameAr: 'بنزرت', lat: 37.2744, lng: 9.8739 },
  { id: 'nabeul', name: 'Nabeul', nameAr: 'نابل', lat: 36.4561, lng: 10.7376 },
  { id: 'zaghouan', name: 'Zaghouan', nameAr: 'زغوان', lat: 36.4029, lng: 10.1429 },
  { id: 'jendouba', name: 'Jendouba', nameAr: 'جندوبة', lat: 36.5011, lng: 8.7802 },
  { id: 'beja', name: 'Béja', nameAr: 'باجة', lat: 36.7256, lng: 9.1817 },
  { id: 'le_kef', name: 'Le Kef', nameAr: 'الكاف', lat: 36.1826, lng: 8.7149 },
  { id: 'siliana', name: 'Siliana', nameAr: 'سليانة', lat: 36.0847, lng: 9.3708 },
  { id: 'sousse', name: 'Sousse', nameAr: 'سوسة', lat: 35.8256, lng: 10.6084 },
  { id: 'monastir', name: 'Monastir', nameAr: 'المنستير', lat: 35.7780, lng: 10.8262 },
  { id: 'mahdia', name: 'Mahdia', nameAr: 'المهدية', lat: 35.5047, lng: 11.0622 },
  { id: 'sfax', name: 'Sfax', nameAr: 'صفاقس', lat: 34.7406, lng: 10.7603 },
  { id: 'kairouan', name: 'Kairouan', nameAr: 'القيروان', lat: 35.6781, lng: 10.0963 },
  { id: 'kasserine', name: 'Kasserine', nameAr: 'القصرين', lat: 35.1676, lng: 8.8365 },
  { id: 'sidi_bouzid', name: 'Sidi Bouzid', nameAr: 'سيدي بوزيد', lat: 35.0382, lng: 9.4849 },
  { id: 'gabes', name: 'Gabès', nameAr: 'قابس', lat: 33.8815, lng: 10.0982 },
  { id: 'medenine', name: 'Médenine', nameAr: 'مدنين', lat: 33.3549, lng: 10.5055 },
  { id: 'tataouine', name: 'Tataouine', nameAr: 'تطاوين', lat: 32.9297, lng: 10.4518 },
  { id: 'gafsa', name: 'Gafsa', nameAr: 'قفصة', lat: 34.4250, lng: 8.7842 },
  { id: 'tozeur', name: 'Tozeur', nameAr: 'توزر', lat: 33.9197, lng: 8.1336 },
  { id: 'kebili', name: 'Kébili', nameAr: 'قبلي', lat: 33.7050, lng: 8.9690 },
];

const COASTAL_GOVS = new Set([
  'bizerte', 'tunis', 'ariana', 'ben_arous', 'nabeul',
  'sousse', 'monastir', 'mahdia', 'sfax', 'gabes', 'medenine'
]);

function parseWeatherCode(code: number): {
  condition: 'orage' | 'pluie' | 'nuageux' | 'ensoleille' | 'vent_fort';
  conditionAr: string;
  conditionFr: string;
} {
  if ([95, 96, 99].includes(code)) {
    return {
      condition: 'orage',
      conditionAr: 'عواصف رعدية وأمطار غزيرة',
      conditionFr: 'Orages avec pluies soutenues',
    };
  }
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return {
      condition: 'pluie',
      conditionAr: 'أمطار وزخات متفرقة',
      conditionFr: 'Pluies et averses',
    };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      condition: 'pluie',
      conditionAr: 'تساقط ثلوج بالمناطق الجبلية',
      conditionFr: 'Chutes de neige sur les hauteurs',
    };
  }
  if ([1, 2, 3, 45, 48].includes(code)) {
    return {
      condition: 'nuageux',
      conditionAr: 'سحب عابرة ومغيم جزئياً',
      conditionFr: 'Passages nuageux',
    };
  }
  return {
    condition: 'ensoleille',
    conditionAr: 'طقس صحو ومستقر',
    conditionFr: 'Ciel dégagé et ensoleillé',
  };
}

function parseWindDirection(degrees: number): { ar: string; fr: string } {
  const directions = [
    { max: 22.5, ar: 'شمالية', fr: 'Nord' },
    { max: 67.5, ar: 'شمالية شرقية', fr: 'Nord-Est' },
    { max: 112.5, ar: 'شرقية', fr: 'Est' },
    { max: 157.5, ar: 'جنوبية شرقية', fr: 'Sud-Est' },
    { max: 202.5, ar: 'جنوبية', fr: 'Sud' },
    { max: 247.5, ar: 'جنوبية غربية', fr: 'Sud-Ouest' },
    { max: 292.5, ar: 'غربية', fr: 'Ouest' },
    { max: 337.5, ar: 'شمالية غربية', fr: 'Nord-Ouest' },
    { max: 360, ar: 'شمالية', fr: 'Nord' },
  ];
  const match = directions.find(d => degrees <= d.max) || directions[0];
  return { ar: match.ar, fr: match.fr };
}

// In-memory cache for live weather (10 minutes)
let cachedWeather: LiveBulletinResponse | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 10 * 60 * 1000;

export async function getLiveTunisiaWeather(): Promise<LiveBulletinResponse> {
  const now = Date.now();
  if (cachedWeather && now - lastCacheTime < CACHE_TTL_MS) {
    return cachedWeather;
  }

  try {
    const lats = GOVERNORATE_LOCATIONS.map(g => g.lat).join(',');
    const lngs = GOVERNORATE_LOCATIONS.map(g => g.lng).join(',');
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Africa%2FTunis`;

    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) {
      throw new Error(`Open-Meteo returned status ${res.status}`);
    }

    const data = await res.json();
    const results = Array.isArray(data) ? data : [data];

    let maxWindSpeed = 0;
    let maxRainfall = 0;
    let dominantCondition: string = 'ensoleille';

    const governoratesWeather: LiveGovWeather[] = GOVERNORATE_LOCATIONS.map((loc, index) => {
      const item = results[index];
      const cur = item?.current || {};
      const daily = item?.daily || {};

      const tempCurrent = Math.round(cur.temperature_2m ?? 24);
      const tempMax = Math.round(daily.temperature_2m_max?.[0] ?? tempCurrent + 3);
      const tempMin = Math.round(daily.temperature_2m_min?.[0] ?? Math.max(tempCurrent - 5, 10));
      const rainfallMm = Number((daily.precipitation_sum?.[0] ?? 0).toFixed(1));
      const windSpeedKmH = Math.round(cur.wind_speed_10m ?? 15);
      const humidityPct = Math.round(cur.relative_humidity_2m ?? 60);
      const windDirDeg = Math.round(cur.wind_direction_10m ?? 0);

      const parsedCondition = parseWeatherCode(cur.weather_code ?? 0);
      const windDir = parseWindDirection(windDirDeg);

      if (windSpeedKmH > maxWindSpeed) maxWindSpeed = windSpeedKmH;
      if (rainfallMm > maxRainfall) maxRainfall = rainfallMm;
      if (parsedCondition.condition === 'orage') dominantCondition = 'orage';
      else if (parsedCondition.condition === 'pluie' && dominantCondition !== 'orage') dominantCondition = 'pluie';

      // Sea state for coastal governorates
      let seaStateAr: string | undefined;
      let seaStateFr: string | undefined;
      if (COASTAL_GOVS.has(loc.id)) {
        if (windSpeedKmH >= 45) {
          seaStateAr = 'شديد الاضطراب إلى هائج مع أمواج عاتية';
          seaStateFr = 'Très agitée à forte avec forte houle';
        } else if (windSpeedKmH >= 25) {
          seaStateAr = 'مضطرب إلى شديد الاضطراب';
          seaStateFr = 'Agitée à localement très agitée';
        } else {
          seaStateAr = 'قليل الاضطراب إلى متموج محلياً';
          seaStateFr = 'Peu agitée à belle';
        }
      }

      // Contextual Alert logic
      let inmAlertAr: string | undefined;
      let inmAlertFr: string | undefined;
      if (parsedCondition.condition === 'orage' || rainfallMm >= 30) {
        inmAlertAr = `يقظة برتقالية: تساقط أمطار رعدية مع خطر سيلان الأودية بـ ${loc.nameAr}`;
        inmAlertFr = `Vigilance Orange : pluies orageuses et risque de crues à ${loc.name}`;
      } else if (windSpeedKmH >= 50) {
        inmAlertAr = `يقظة صفراء: هبوب رياح قوية تصل إلى ${windSpeedKmH} كم/س`;
        inmAlertFr = `Vigilance Jaune : fortes rafales jusqu'à ${windSpeedKmH} km/h`;
      }

      return {
        govId: loc.id,
        lat: loc.lat,
        lng: loc.lng,
        tempCurrent,
        tempMax,
        tempMin,
        condition: windSpeedKmH >= 55 && parsedCondition.condition === 'ensoleille' ? 'vent_fort' : parsedCondition.condition,
        conditionAr: parsedCondition.conditionAr,
        conditionFr: parsedCondition.conditionFr,
        rainfallMm,
        windSpeedKmH,
        windDirAr: windDir.ar,
        windDirFr: windDir.fr,
        humidityPct,
        seaStateAr,
        seaStateFr,
        inmAlertAr,
        inmAlertFr,
      };
    });

    const dateObj = new Date();
    const timeFormatted = dateObj.toLocaleTimeString('fr-TN', { hour: '2-digit', minute: '2-digit', timeZone: 'Africa/Tunis' });
    const dateFormattedFr = dateObj.toLocaleDateString('fr-TN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Tunis' });
    const dateFormattedAr = dateObj.toLocaleDateString('ar-TN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Tunis' });

    let headlineAr = `طقس اليوم: درجات حرارة لحظية معتدلة إلى دافئة في معظم الولايات التونسية مع رياح ${maxWindSpeed} كم/س.`;
    let headlineFr = `Météo en direct : températures modérées à douces sur l'ensemble de la Tunisie avec vents atteignant ${maxWindSpeed} km/h.`;

    if (dominantCondition === 'orage') {
      headlineAr = `تنبيه رعدي مباشر: سحب رعدية ممطرة تم رصدها الآن ببعض المناطق مع رياح قوية.`;
      headlineFr = `Alerte orages en direct : cellules orageuses actives détectées sur le territoire tunisien.`;
    } else if (dominantCondition === 'pluie') {
      headlineAr = `طقس ممطر مباشر: نزول أمطار متفرقة مع سماء مغيمة بالجهات الشمالية والوسطى.`;
      headlineFr = `Météo pluvieuse en direct : averses éparses observées sur le Nord et le Centre.`;
    }

    cachedWeather = {
      isLive: true,
      updatedAt: dateObj.toISOString(),
      updatedAtFormattedAr: `${dateFormattedAr} - الساعة ${timeFormatted} بتوقيت تونس`,
      updatedAtFormattedFr: `${dateFormattedFr} à ${timeFormatted} (Heure de Tunis)`,
      headlineAr,
      headlineFr,
      governoratesWeather,
    };
    lastCacheTime = now;

    return cachedWeather;
  } catch (err) {
    console.error('Failed to fetch live weather from Open-Meteo:', err);
    if (cachedWeather) return cachedWeather;
    throw err;
  }
}
