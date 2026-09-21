import { GovernorateWeather } from '../types';

export interface TvWeatherBulletin {
  dateAr: string;
  dateFr: string;
  headlineAr: string;
  headlineFr: string;
  marineWarningAr: string;
  marineWarningFr: string;
  generalWindAr: string;
  generalWindFr: string;
  governoratesWeather: GovernorateWeather[];
  tomorrowPreview: {
    generalAr: string;
    generalFr: string;
    tempTrendAr: string;
    tempTrendFr: string;
  };
}

export const TUNISIA_TV_WEATHER_DATA: TvWeatherBulletin = {
  dateAr: 'نشرة اليوم - الأرصاد الجوية الوطنية',
  dateFr: 'Bulletin du Jour - Météo Nationale INM',
  headlineAr: 'أمطار رعدية غزيرة بالشمال والمناطق الساحلية الشرقية مع تساقط محلي للبرد ورياح قوية',
  headlineFr: 'Pluies orageuses abondantes sur le Nord et les zones côtières avec risque de grêle et vents violents',
  marineWarningAr: 'البحر شديد الاضطراب إلى هائج بالشمال وخليج الحمامات، ومضطرب بخليج قابس. تحذير للبحارة وأنشطة الملاحة.',
  marineWarningFr: 'Mer très agitée à forte sur les côtes Nord et le Golfe d\'Hammamet. Avis de prudence pour la navigation côtière.',
  generalWindAr: 'الرياح من القطاع الشمالي الغربي، قوية سرعتها من 50 إلى 70 كم/س وتصل مؤقتاً إلى 85 كم/س أثناء ظهور السحب الرعدية.',
  generalWindFr: 'Vent de secteur Nord-Ouest fort de 50 à 70 km/h, dépassant 85 km/h sous orages.',
  tomorrowPreview: {
    generalAr: 'تواصل التقلبات الجوية بالشمال والوسط مع انخفاض نسبي في درجات الحرارة واستمرار نزول الأمطار الرعدية.',
    generalFr: 'Poursuite des perturbations pluvio-orageuses sur le Nord et le Centre avec baisse des températures.',
    tempTrendAr: 'تتراوح القصوى بين 16 و22 درجة بالشمال، وبين 25 و32 درجة بالجنوب التونسي.',
    tempTrendFr: 'Maximales entre 16°C et 22°C sur le Nord, et de 25°C à 32°C sur le Sud.',
  },
  governoratesWeather: [
    // Nord-Est
    {
      govId: 'tunis',
      tempMax: 22,
      tempMin: 15,
      condition: 'orage',
      conditionAr: 'سحب رعدية مع أمطار غزيرة',
      conditionFr: 'Orages avec pluies soutenues',
      rainfallMm: 45,
      windSpeedKmH: 60,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 88,
      seaStateAr: 'شديد الاضطراب',
      seaStateFr: 'Très agitée',
      inmAlertAr: 'يقظة برتقالية: خطر تجمع المياه بباب عليوة والبحيرة',
      inmAlertFr: 'Vigilance Orange : crues urbaines rapides'
    },
    {
      govId: 'ariana',
      tempMax: 22,
      tempMin: 15,
      condition: 'orage',
      conditionAr: 'أمطار طوفانية ورعد',
      conditionFr: 'Pluies diluviennes & orages',
      rainfallMm: 48,
      windSpeedKmH: 55,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 87,
      inmAlertAr: 'خطر سيلان بسكرة ورواد وقلعة الأندلس',
      inmAlertFr: 'Risque de stagnation plaine de la Soukra'
    },
    {
      govId: 'ben_arous',
      tempMax: 21,
      tempMin: 14,
      condition: 'orage',
      conditionAr: 'أمطار غزيرة وارتفاع منسوب وادي مليان',
      conditionFr: 'Orages violents, crue Oued Meliane',
      rainfallMm: 52,
      windSpeedKmH: 58,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 90,
      seaStateAr: 'شديد الاضطراب بخليج تونس',
      seaStateFr: 'Très agitée',
      inmAlertAr: 'مراقبة لصيقة لمنسوب وادي مليان بالمحمدية ورادس',
      inmAlertFr: 'Surveillance crue radier Oued Meliane'
    },
    {
      govId: 'manouba',
      tempMax: 21,
      tempMin: 14,
      condition: 'orage',
      conditionAr: 'أمطار رعدية متواصلة',
      conditionFr: 'Orages fréquents et continus',
      rainfallMm: 42,
      windSpeedKmH: 50,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 86,
      inmAlertAr: 'فيضان وادي الشافرو بطبربة والجديدة',
      inmAlertFr: 'Débordement Oued Chafrou'
    },
    {
      govId: 'bizerte',
      tempMax: 20,
      tempMin: 13,
      condition: 'orage',
      conditionAr: 'أمطار طوفانية ورياح شديدة بالبحر',
      conditionFr: 'Tempête côtière & pluies intenses',
      rainfallMm: 60,
      windSpeedKmH: 75,
      windDirAr: 'شمالية غربية قوية جداً',
      windDirFr: 'Nord-Ouest violent',
      humidityPct: 92,
      seaStateAr: 'هائج إلى شديد الهيجان (موج 4 أمتار)',
      seaStateFr: 'Forte à grosse (vagues 4m)',
      inmAlertAr: 'تحذير شديد للبحارة والملاحة الساحلية برأس أنجلة وسجنان',
      inmAlertFr: 'Alerte maximale navigation & falaises côtières'
    },
    {
      govId: 'nabeul',
      tempMax: 21,
      tempMin: 15,
      condition: 'orage',
      conditionAr: 'أمطار غزيرة جداً وسيول بالأودية',
      conditionFr: 'Orages stationnaires & crues d\'oueds',
      rainfallMm: 70,
      windSpeedKmH: 65,
      windDirAr: 'شمالية شرقية إلى شمالية',
      windDirFr: 'Nord-Est',
      humidityPct: 93,
      seaStateAr: 'شديد الاضطراب بخليج الحمامات',
      seaStateFr: 'Très agitée',
      inmAlertAr: 'يقظة قصوى (أحمر): وادي السمار ووادي الكبير بتاكلسة وقربة',
      inmAlertFr: 'Vigilance ROUGE : crues éclairs des oueds côtiers'
    },
    {
      govId: 'zaghouan',
      tempMax: 19,
      tempMin: 11,
      condition: 'pluie',
      conditionAr: 'أمطار متفرقة وسحب كثيفة على الجبل',
      conditionFr: 'Pluies soutenues sur les reliefs',
      rainfallMm: 35,
      windSpeedKmH: 45,
      windDirAr: 'شمالية',
      windDirFr: 'Nord',
      humidityPct: 82,
      inmAlertAr: 'انحدار مياه سريع من منحدرات جبل زغوان',
      inmAlertFr: 'Ruissellement rapide vers l\'Oued Rmel'
    },

    // Nord-Ouest
    {
      govId: 'jendouba',
      tempMax: 18,
      tempMin: 10,
      condition: 'orage',
      conditionAr: 'أمطار غزيرة جداً وبرد (حوض مجردة)',
      conditionFr: 'Pluies diluviennes & crues majeures',
      rainfallMm: 75,
      windSpeedKmH: 60,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 94,
      inmAlertAr: 'يقظة حمراء: فيضان وادي مجردة ببوسالم ووادي بوهرتمة',
      inmAlertFr: 'Vigilance ROUGE Medjerda Boussalem'
    },
    {
      govId: 'beja',
      tempMax: 19,
      tempMin: 11,
      condition: 'orage',
      conditionAr: 'أمطار رعدية مع تساقط محلي للبرد',
      conditionFr: 'Orages avec chutes de grêle',
      rainfallMm: 55,
      windSpeedKmH: 55,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 90,
      inmAlertAr: 'ارتفاع منسوب مياه مجردة بمجاز الباب وتستور',
      inmAlertFr: 'Alerte inondation Medjez El Bab'
    },
    {
      govId: 'le_kef',
      tempMax: 17,
      tempMin: 9,
      condition: 'pluie',
      conditionAr: 'أمطار مؤقتاً رعدية وطقس بارد',
      conditionFr: 'Pluies orageuses & temps frais',
      rainfallMm: 32,
      windSpeedKmH: 45,
      windDirAr: 'شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 83,
      inmAlertAr: 'مراقبة وادي ملاق وساقية سيدي يوسف',
      inmAlertFr: 'Surveillance bassin Oued Mellègue'
    },
    {
      govId: 'siliana',
      tempMax: 18,
      tempMin: 10,
      condition: 'orage',
      conditionAr: 'سحب رعدية بعد الظهر مع أمطار',
      conditionFr: 'Orages d\'après-midi & pluie',
      rainfallMm: 36,
      windSpeedKmH: 48,
      windDirAr: 'شمالية',
      windDirFr: 'Nord',
      humidityPct: 84,
      inmAlertAr: 'جريان أودية جبل برقو وسليانة',
      inmAlertFr: 'Radiers vulnérables Bargou'
    },

    // Centre-Est
    {
      govId: 'sousse',
      tempMax: 23,
      tempMin: 16,
      condition: 'orage',
      conditionAr: 'أمطار رعدية غزيرة بالساحل',
      conditionFr: 'Averses orageuses côtières',
      rainfallMm: 38,
      windSpeedKmH: 55,
      windDirAr: 'شمالية شرقية',
      windDirFr: 'Nord-Est',
      humidityPct: 86,
      seaStateAr: 'شديد الاضطراب (أمواج عالية)',
      seaStateFr: 'Très agitée',
      inmAlertAr: 'تجمع مياه بحمام سوسة وبوجعفر وزاوية سوسة',
      inmAlertFr: 'Inondations urbaines côtières Sousse'
    },
    {
      govId: 'monastir',
      tempMax: 23,
      tempMin: 16,
      condition: 'pluie',
      conditionAr: 'أمطار متفرقة ورياح نشطة بالبحر',
      conditionFr: 'Pluies intermittentes et vent',
      rainfallMm: 28,
      windSpeedKmH: 50,
      windDirAr: 'شمالية شرقية',
      windDirFr: 'Nord-Est',
      humidityPct: 84,
      seaStateAr: 'مضطرب إلى شديد الاضطراب',
      seaStateFr: 'Agitée à très agitée'
    },
    {
      govId: 'mahdia',
      tempMax: 24,
      tempMin: 17,
      condition: 'pluie',
      conditionAr: 'أمطار متفرقة تكون رعدية أحياناً',
      conditionFr: 'Pluies localement orageuses',
      rainfallMm: 26,
      windSpeedKmH: 48,
      windDirAr: 'شمالية شرقية',
      windDirFr: 'Nord-Est',
      humidityPct: 82,
      seaStateAr: 'مضطرب',
      seaStateFr: 'Agitée'
    },
    {
      govId: 'sfax',
      tempMax: 25,
      tempMin: 17,
      condition: 'nuageux',
      conditionAr: 'سحب عابرة مع خلايا رعدية ممطرة',
      conditionFr: 'Passages nuageux & orages locaux',
      rainfallMm: 20,
      windSpeedKmH: 45,
      windDirAr: 'شمالية شرقية',
      windDirFr: 'Nord-Est',
      humidityPct: 78,
      seaStateAr: 'مضطرب بخليج قابس',
      seaStateFr: 'Agitée',
      inmAlertAr: 'الحذر بالأودية الجنوبية (طريق قابس ووادي الشفار)',
      inmAlertFr: 'Vigilance Oued Chaffar'
    },

    // Centre-Ouest
    {
      govId: 'kairouan',
      tempMax: 25,
      tempMin: 15,
      condition: 'orage',
      conditionAr: 'خلايا رعدية مصحوبة بأمطار',
      conditionFr: 'Cellules orageuses pluvieuses',
      rainfallMm: 34,
      windSpeedKmH: 42,
      windDirAr: 'متغيرة الاتجاه',
      windDirFr: 'Variable',
      humidityPct: 76,
      inmAlertAr: 'مراقبة تصريف سدي سيدي سعد والهوارب بوادي زرود',
      inmAlertFr: 'Surveillance crues Oued Zeroud'
    },
    {
      govId: 'kasserine',
      tempMax: 21,
      tempMin: 11,
      condition: 'orage',
      conditionAr: 'عواصف رعدية بالمرتفعات (الشعانبي)',
      conditionFr: 'Orages sur les hauts reliefs',
      rainfallMm: 25,
      windSpeedKmH: 50,
      windDirAr: 'غربية إلى شمالية غربية',
      windDirFr: 'Ouest / Nord-Ouest',
      humidityPct: 74,
      inmAlertAr: 'سيلان وادي الدرب بالقصرين وسفوح الشعانبي',
      inmAlertFr: 'Crues éclairs Oued Eddarb'
    },
    {
      govId: 'sidi_bouzid',
      tempMax: 24,
      tempMin: 14,
      condition: 'nuageux',
      conditionAr: 'سحب كثيفة مع أمطار محلية',
      conditionFr: 'Nuages denses & pluies éparses',
      rainfallMm: 18,
      windSpeedKmH: 40,
      windDirAr: 'شمالية شرقية',
      windDirFr: 'Nord-Est',
      humidityPct: 70
    },

    // Sud-Est
    {
      govId: 'gabes',
      tempMax: 26,
      tempMin: 17,
      condition: 'nuageux',
      conditionAr: 'سحب أحياناً كثيفة بالساحل والواحة',
      conditionFr: 'Ciel voilé avec averses isolées',
      rainfallMm: 12,
      windSpeedKmH: 38,
      windDirAr: 'شمالية شرقية',
      windDirFr: 'Nord-Est',
      humidityPct: 68,
      seaStateAr: 'مضطرب محلياً',
      seaStateFr: 'Agitée'
    },
    {
      govId: 'medenine',
      tempMax: 28,
      tempMin: 18,
      condition: 'ensoleille',
      conditionAr: 'طقس مستقر إلى قليل السحب',
      conditionFr: 'Ensoleillé à peu nuageux',
      rainfallMm: 4,
      windSpeedKmH: 32,
      windDirAr: 'شرقية',
      windDirFr: 'Est',
      humidityPct: 60,
      seaStateAr: 'قليل الاضطراب بجربة وجرجيس',
      seaStateFr: 'Peu agitée'
    },
    {
      govId: 'tataouine',
      tempMax: 30,
      tempMin: 19,
      condition: 'vent_fort',
      conditionAr: 'صحو مع رياح رملية خفيفة',
      conditionFr: 'Beau temps chaud & vent de sable',
      rainfallMm: 0,
      windSpeedKmH: 45,
      windDirAr: 'جنوبية شرقية',
      windDirFr: 'Sud-Est',
      humidityPct: 45,
      inmAlertAr: 'انخفاض مدى الرؤية الأفقية بسبب الرمال بالمسالك الصحراوية',
      inmAlertFr: 'Visi réduite par vent de sable au Sahara'
    },

    // Sud-Ouest
    {
      govId: 'gafsa',
      tempMax: 26,
      tempMin: 15,
      condition: 'nuageux',
      conditionAr: 'سحب عابرة مع فترات مشمسة',
      conditionFr: 'Passages nuageux & éclaircies',
      rainfallMm: 10,
      windSpeedKmH: 35,
      windDirAr: 'غربية إلى شمالية غربية',
      windDirFr: 'Nord-Ouest',
      humidityPct: 62
    },
    {
      govId: 'tozeur',
      tempMax: 32,
      tempMin: 20,
      condition: 'ensoleille',
      conditionAr: 'طقس حار وصحو، شمس ساطعة',
      conditionFr: 'Ensoleillé, chaud & sec',
      rainfallMm: 0,
      windSpeedKmH: 30,
      windDirAr: 'شرقية',
      windDirFr: 'Est',
      humidityPct: 38
    },
    {
      govId: 'kebili',
      tempMax: 31,
      tempMin: 19,
      condition: 'ensoleille',
      conditionAr: 'طقس صافٍ ومستقر بنفزاوة ودوز',
      conditionFr: 'Beau temps chaud sur Nefzaoua',
      rainfallMm: 0,
      windSpeedKmH: 28,
      windDirAr: 'شرقية',
      windDirFr: 'Est',
      humidityPct: 40
    },
  ]
};
