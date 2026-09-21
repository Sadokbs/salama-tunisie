import { Governorate, EmergencyContact, HazardGuide, EmergencyKitItem, CitizenAlert } from '../types';

export const TUNISIA_GOVERNORATES: Governorate[] = [
  // Nord-Est
  {
    id: 'tunis',
    name: 'Tunis',
    nameAr: 'تونس',
    region: 'Nord-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Risque de saturation des réseaux d\'évacuation pluviale (Bab Alioua, Bab Saadoun, Séjoumi, Charguia).',
    vigilanceReasonAr: 'خطر انسداد قنوات تصريف مياه الأمطار في المناطق المنخفضة (باب عليوة، باب سعدون، السيجومي، الشرقية).',
    keyVulnerabilities: ['Lac Sud / Sebkhet Séjoumi', 'Quartiers bas et passages souterrains', 'Avenue Habib Bourguiba & Bab El Khadra'],
    keyVulnerabilitiesAr: ['سبخة السيجومي والبحيرة', 'الأحياء المنخفضة والممرات تحت الأرضية', 'وسط العاصمة وباب الخضراء'],
    protectionCivileNum: '198 / 71 385 000',
    centerCoord: { x: 58, y: 15 }
  },
  {
    id: 'ariana',
    name: 'Ariana',
    nameAr: 'أريانة',
    region: 'Nord-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Accumulation d\'eau récurrente dans les cités basses (Ennasr, Soukra, Raoued, Kalaat El Andalous).',
    vigilanceReasonAr: 'تراكم سريع لمياه الأمطار في المناطق العمرانية وسكرة ورواد وقلعة الأندلس.',
    keyVulnerabilities: ['Plaine de la Soukra', 'Oued Medjerda aval (Kalaat El Andalous)', 'Raoued plage'],
    keyVulnerabilitiesAr: ['سهل سكرة', 'مصب وادي مجردة (قلعة الأندلس)', 'شاطئ رواد'],
    protectionCivileNum: '198 / 71 712 000',
    centerCoord: { x: 56, y: 13 }
  },
  {
    id: 'ben_arous',
    name: 'Ben Arous',
    nameAr: 'بن عروس',
    region: 'Nord-Est',
    riskLevels: { rain: 'Élevé', fire: 'Modéré', flood: 'Critique' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Surveillance rapprochée du bassin de l\'Oued Meliane et de l\'Oued El Hamma (Mohamedia, Fouchana, Radès).',
    vigilanceReasonAr: 'مراقبة لصيقة لحوض وادي مليان ووادي الحامة (المحمدية، فوشانة، رادس).',
    keyVulnerabilities: ['Bassin versant Oued Meliane (Mohamedia & Fouchana)', 'Zones industrielles de Ben Arous & Radès', 'Montagnes de Boukornine (risque feu été)'],
    keyVulnerabilitiesAr: ['حوض وادي مليان (المحمدية وفوشانة)', 'المناطق الصناعية برادس وبن عروس', 'جبل بوقرنين (حرائق صيفية)'],
    protectionCivileNum: '198 / 71 381 000',
    centerCoord: { x: 59, y: 17 }
  },
  {
    id: 'manouba',
    name: 'Manouba',
    nameAr: 'منوبة',
    region: 'Nord-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Critique' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Débordement potentiel de l\'Oued Chafrou et de l\'Oued Medjerda (Tebourba, Djedeida, Denden).',
    vigilanceReasonAr: 'خطر فيضان وادي الشافرو ووادي مجردة (طبربة، الجديدة، الدندان).',
    keyVulnerabilities: ['Oued Chafrou (Manouba & Oued Ellil)', 'Plaine alluviale de Djedeida & Tebourba', 'Oued Medjerda transversal'],
    keyVulnerabilitiesAr: ['وادي الشافرو (منوبة ووادي الليل)', 'سهول طبربة والجديدة المحاذية لمجردة', 'المناطق السكنية المنخفضة بالدندان'],
    protectionCivileNum: '198 / 71 600 000',
    centerCoord: { x: 54, y: 16 }
  },
  {
    id: 'bizerte',
    name: 'Bizerte',
    nameAr: 'بنزرت',
    region: 'Nord-Est',
    riskLevels: { rain: 'Critique', fire: 'Élevé', flood: 'Élevé' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Fortes précipitations côtières et risques de feux de forêts denses (Sejnane, Joumine, Rimel, Ichkeul).',
    vigilanceReasonAr: 'أمطار غزيرة جداً بالسواحل وحرائق غابات متكررة بغابات سجنان وجومين والرميل.',
    keyVulnerabilities: ['Forêts de Sejnane & Rimel (Incendies estivaux)', 'Bassin lac Ichkeul / Oued Tinja', 'Ville basse de Menzel Bourguiba & Bizerte nord'],
    keyVulnerabilitiesAr: ['غابات سجنان والرميل', 'حوض بحيرة إشكيل ووادي تينجة', 'الأحياء الساحلية والمنخفضة ببنزرت ومنزل بورقيبة'],
    protectionCivileNum: '198 / 72 431 000',
    centerCoord: { x: 50, y: 8 }
  },
  {
    id: 'nabeul',
    name: 'Nabeul',
    nameAr: 'نابل',
    region: 'Nord-Est',
    riskLevels: { rain: 'Critique', fire: 'Modéré', flood: 'Critique' },
    overallVigilance: 'Rouge',
    vigilanceReason: 'Vulnérabilité extrême aux crues éclairs des oueds côtiers (Oued Soummar, Oued El Kebir, Soliman, Korba, Grombalia).',
    vigilanceReasonAr: 'حساسية قصوى لفيضانات الوديان المباغتة (وادي السمار، تاكلسة، سليمان، قربة، قرمبالية).',
    keyVulnerabilities: ['Oued Soummar et Oued El Kebir (Nabeul ville)', 'Oued El Bey (Grombalia / Soliman)', 'Reliefs côtiers de Korbous et Haouaria'],
    keyVulnerabilitiesAr: ['وادي السمار ووادي الكبير بمدينة نابل', 'وادي الباي بقرمبالية وسليمان', 'منحدرات تاكلسة والهوارية'],
    protectionCivileNum: '198 / 72 285 000',
    centerCoord: { x: 67, y: 20 }
  },
  {
    id: 'zaghouan',
    name: 'Zaghouan',
    nameAr: 'زغوان',
    region: 'Nord-Est',
    riskLevels: { rain: 'Modéré', fire: 'Élevé', flood: 'Modéré' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Massif montagneux exposé aux feux de pinède (Djebel Zaghouan) et ruissellement rapide vers l\'Oued Miliane.',
    vigilanceReasonAr: 'جبل زغوان معرض لحرائق الغابات وانحدار سيول المياه السريعة نحو حوض مليان.',
    keyVulnerabilities: ['Parc National du Djebel Zaghouan (Feux)', 'Oued Rmel et affluents', 'El Fahs & Nadhour (radiers vulnérables)'],
    keyVulnerabilitiesAr: ['الحظيرة الوطنية بجبل زغوان', 'وادي الرمل وروافده', 'المنخفضات بالفحص والناظور'],
    protectionCivileNum: '198 / 72 675 000',
    centerCoord: { x: 56, y: 24 }
  },

  // Nord-Ouest
  {
    id: 'jendouba',
    name: 'Jendouba',
    nameAr: 'جندوبة',
    region: 'Nord-Ouest',
    riskLevels: { rain: 'Critique', fire: 'Critique', flood: 'Critique' },
    overallVigilance: 'Rouge',
    vigilanceReason: 'Épicentre historique des crues de la Medjerda (Boussalem) et des incendies de forêts massifs (Aïn Draham, Tabarka, Fernana).',
    vigilanceReasonAr: 'المنطقة الأكثر عرضة لفيضانات وادي مجردة (بوسالم) ولحرائق غابات الفلين والصنوبر (طبرقة، عين دراهم، فرنانة).',
    keyVulnerabilities: ['Plaine d\'inondation de Boussalem (Oued Medjerda & Oued Bouheurtma)', 'Forêts de chêne-liège de Kroumirie (Aïn Draham & Tabarka)', 'Reliefs de Fernana et Ghardimaou'],
    keyVulnerabilitiesAr: ['سهول بوسالم المهددة بفيضان وادي مجردة ووادي بوهرتمة', 'غابات خمير بعين دراهم وطبرقة (خطر الحرائق الكبرى)', 'أودية غار الدماء وفرنانة'],
    protectionCivileNum: '198 / 78 600 000',
    centerCoord: { x: 38, y: 18 }
  },
  {
    id: 'beja',
    name: 'Béja',
    nameAr: 'باجة',
    region: 'Nord-Ouest',
    riskLevels: { rain: 'Critique', fire: 'Élevé', flood: 'Critique' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Bassin central de la Medjerda à Medjez El Bab et Testour, feux de maquis à Nefza et Amdoun.',
    vigilanceReasonAr: 'مجرى وادي مجردة بمجاز الباب وتستور وحرائق غابات نفزة وعمدون الصيفية.',
    keyVulnerabilities: ['Oued Medjerda à Medjez El Bab & Testour', 'Forêts de Nefza et Cap Négro', 'Glissements de terrain sur versants agricoles'],
    keyVulnerabilitiesAr: ['وادي مجردة بمجاز الباب وتستور', 'غابات نفزة ورأس النيغرو', 'انزلاقات التربة على المنحدرات'],
    protectionCivileNum: '198 / 78 451 000',
    centerCoord: { x: 46, y: 19 }
  },
  {
    id: 'le_kef',
    name: 'Le Kef',
    nameAr: 'الكاف',
    region: 'Nord-Ouest',
    riskLevels: { rain: 'Modéré', fire: 'Élevé', flood: 'Modéré' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Incendies estivaux sur Djebel Ouergha et Sakiet Sidi Youssef ; crues orageuses de l\'Oued Mellègue.',
    vigilanceReasonAr: 'حرائق صيفية بجبل ورغة وساقية سيدي يوسف وفيضان وادي ملاق الموسمي.',
    keyVulnerabilities: ['Bassin de l\'Oued Mellègue & Barrage Nebeur', 'Massifs forestiers de Sakiet Sidi Youssef & Touiref', 'Radiers routiers ruraux'],
    keyVulnerabilitiesAr: ['حوض وادي ملاق وسد نبر', 'غابات ساقية سيدي يوسف والطويرف', 'المعابر المنخفضة للطرقات الريفية'],
    protectionCivileNum: '198 / 78 220 000',
    centerCoord: { x: 39, y: 29 }
  },
  {
    id: 'siliana',
    name: 'Siliana',
    nameAr: 'سليانة',
    region: 'Nord-Ouest',
    riskLevels: { rain: 'Modéré', fire: 'Élevé', flood: 'Modéré' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Risque de feux de forêts à Djebel Bargou et Djebel Serj ; orages de grêle et ruissellement rapide.',
    vigilanceReasonAr: 'خطر حرائق بجبل برقو وجبل السرج وعواصف البرد والسيول الجبلية الفجئية.',
    keyVulnerabilities: ['Massifs de Bargou, Serj et Kesra', 'Oued Siliana et radiers ruraux', 'Plaines céréalières lors des moissons'],
    keyVulnerabilitiesAr: ['مرتفعات برقو والسرج وكسرى', 'وادي سليانة والمعابر الريفية', 'حقول الحبوب أثناء موسم الحصاد'],
    protectionCivileNum: '198 / 78 871 000',
    centerCoord: { x: 48, y: 30 }
  },

  // Centre-Est
  {
    id: 'sousse',
    name: 'Sousse',
    nameAr: 'سوسة',
    region: 'Centre-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Crues éclairs des oueds Hamdoun et Blibene, inondation rapide des zones basses et littorales (Hammam Sousse, Kalaa Kebira, Msaken).',
    vigilanceReasonAr: 'فيضان سريع لوادي حمدون وبليبين وغرق الشوارع والمناطق المنخفضة (حمام سوسة، القلعة الكبرى، مساكن).',
    keyVulnerabilities: ['Oued Hamdoun (Sousse sud / Zaouiet Sousse)', 'Centre-ville et corniche de Boujaafar', 'Passages sous voies ferrées'],
    keyVulnerabilitiesAr: ['وادي حمدون بزاوية سوسة', 'وسط المدينة وكورنيش بوجعفر', 'الممرات تحت السكة الحديدية'],
    protectionCivileNum: '198 / 73 227 000',
    centerCoord: { x: 67, y: 34 }
  },
  {
    id: 'monastir',
    name: 'Monastir',
    nameAr: 'المنستير',
    region: 'Centre-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Stagnation d\'eaux pluviales dans les zones des salines et sebkhas (Moknine, Teboulba, Ksar Hellal, Sahline).',
    vigilanceReasonAr: 'ركود مياه الأمطار في محيط السباخ والمناطق المنخفضة (المكنين، طبلبة، قصر هلال، الساحلين).',
    keyVulnerabilities: ['Sebkha de Moknine & Sahline', 'Routes côtières basses', 'Quartiers industriels textiles'],
    keyVulnerabilitiesAr: ['سبخة المكنين والساحلين', 'الطرقات الساحلية المنخفضة', 'المناطق الصناعية الحضرية'],
    protectionCivileNum: '198 / 73 461 000',
    centerCoord: { x: 70, y: 37 }
  },
  {
    id: 'mahdia',
    name: 'Mahdia',
    nameAr: 'المهدية',
    region: 'Centre-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Fort ruissellement lors d\'orages stationnaires méditerranéens (Ksour Essef, El Jem, Rejiche, Chebba).',
    vigilanceReasonAr: 'سيول قوية إثر العواصف المتوسطية الاستثنائية (قصور الساف، الجم، رجيش، الشابة).',
    keyVulnerabilities: ['Oueds côtiers à débit intermittent', 'Centre ancien de Mahdia (péninsule)', 'Radiers ruraux d\'El Jem & Souassi'],
    keyVulnerabilitiesAr: ['الأودية الساحلية المؤقتة', 'شبه جزيرة المهدية القديمة', 'معابر الجم والسواسي'],
    protectionCivileNum: '198 / 73 680 000',
    centerCoord: { x: 71, y: 44 }
  },
  {
    id: 'sfax',
    name: 'Sfax',
    nameAr: 'صفاقس',
    region: 'Centre-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Inondations subites par ruissellement des oueds Chaffar, Sidi Salem, El Maou ; routes coupées vers Agareb et Thyna.',
    vigilanceReasonAr: 'فيضانات فجئية للأودية (وادي الشفار، سيدي سالم، المعو) وانقطاع الطرقات نحو عقارب وطينة.',
    keyVulnerabilities: ['Oued Chaffar & Oued El Maou', 'Zone basse de Thyna et route de Gabès', 'Cité Habib et zones périphériques de Sfax'],
    keyVulnerabilitiesAr: ['وادي الشفار ووادي المعو', 'طينة وطريق قابس المنخفض', 'حي الحبيب والأحياء المنخفضة المحيطة'],
    protectionCivileNum: '198 / 74 240 000',
    centerCoord: { x: 67, y: 55 }
  },

  // Centre-Ouest
  {
    id: 'kairouan',
    name: 'Kairouan',
    nameAr: 'القيروان',
    region: 'Centre-Ouest',
    riskLevels: { rain: 'Modéré', fire: 'Modéré', flood: 'Critique' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Bassin hydrologique majeur et redouté : Oued Zeroud et Oued Merguellil (barrages Sidi Saad et El Haouareb).',
    vigilanceReasonAr: 'حوض مائي خطير: وادي زرود ووادي مرق الليل (سد سيدي سعد وسد الهوارب) وسرعة جريان المياه.',
    keyVulnerabilities: ['Oued Zeroud (Sidi Saad & Bouhajla)', 'Oued Merguellil (Haffouz & El Haouareb)', 'Oued Nebhana et plaines de Sbikha'],
    keyVulnerabilitiesAr: ['وادي زرود (سيدي سعد وبوحجلة)', 'وادي مرق الليل (حفوز وسد الهوارب)', 'وادي نبهانة وسهول السبيخة'],
    protectionCivileNum: '198 / 77 230 000',
    centerCoord: { x: 55, y: 38 }
  },
  {
    id: 'kasserine',
    name: 'Kasserine',
    nameAr: 'القصرين',
    region: 'Centre-Ouest',
    riskLevels: { rain: 'Modéré', fire: 'Critique', flood: 'Élevé' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Incendies majeurs sur les massifs de pins d\'Alep (Mont Chaambi, Semmama, Salloum) et crues d\'oueds torrentiels (Oued Eddarb).',
    vigilanceReasonAr: 'حرائق صنوبر حلب بجبال الشعانبي وسمامة وسلوم، وسيول جبلية جارفة بوادي الدرب وحاسي الفريد.',
    keyVulnerabilities: ['Parc National du Mont Chaambi (Incendies)', 'Montagnes de Semmama et Salloum', 'Oued Eddarb traversant la ville de Kasserine'],
    keyVulnerabilitiesAr: ['الحديقة الوطنية بالشعانبي (الحرائق)', 'جبال سمامة وسلوم', 'وادي الدرب القاطع لمدينة القصرين'],
    protectionCivileNum: '198 / 77 474 000',
    centerCoord: { x: 41, y: 46 }
  },
  {
    id: 'sidi_bouzid',
    name: 'Sidi Bouzid',
    nameAr: 'سيدي بوزيد',
    region: 'Centre-Ouest',
    riskLevels: { rain: 'Modéré', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Crues éclair des oueds de piémont (Oued Fekka, Oued El Hfay) submergeant les pistes agricoles et passages à gué.',
    vigilanceReasonAr: 'سيول فجئية بوادي الفكة ووادي الهيشرية والحفي، وانعزال التجمعات الريفية في المعابر المنخفضة.',
    keyVulnerabilities: ['Oued Fekka et radiers de Sidi Bouzid Est', 'Routes rurales reliant Bir El Hfay & Regueb', 'Oued Labayedh'],
    keyVulnerabilitiesAr: ['وادي الفكة ومعابر سيدي بوزيد الشرقية', 'المسالك الفلاحية بين بئر الحفي والرقاب', 'وادي الأبيض'],
    protectionCivileNum: '198 / 76 630 000',
    centerCoord: { x: 51, y: 49 }
  },

  // Sud-Est
  {
    id: 'gabes',
    name: 'Gabès',
    nameAr: 'قابس',
    region: 'Sud-Est',
    riskLevels: { rain: 'Élevé', fire: 'Faible', flood: 'Critique' },
    overallVigilance: 'Orange',
    vigilanceReason: 'Débordement soudain des oueds côtiers et montagnards (Oued Gabès, Oued Jir, Mareth, Matmata).',
    vigilanceReasonAr: 'فيضان مباغت لوادي قابس ووادي الجير ومارث ومطماطة مع قوة السيول القادمة من المرتفعات.',
    keyVulnerabilities: ['Oued Gabès traversant l\'oasis maritime', 'Zones basses de Ghannouch et Teboulbou', 'Gorges et routes de Matmata & Mareth'],
    keyVulnerabilitiesAr: ['وادي قابس وشريان الواحة الساحلية', 'الأحياء المنخفضة بغنوش وتبلبو', 'منحدرات ومسالك مطماطة ومارث'],
    protectionCivileNum: '198 / 75 270 000',
    centerCoord: { x: 62, y: 70 }
  },
  {
    id: 'medenine',
    name: 'Médenine',
    nameAr: 'مدنين',
    region: 'Sud-Est',
    riskLevels: { rain: 'Modéré', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Crues rapides des chaâbas désertiques et des oueds descendant des monts de Dahar (Béni Khedache, Zarzis, Djerba).',
    vigilanceReasonAr: 'جريان جارف للشعاب الجبلية النازلة من الظاهر نحو بني خداش وسواحل جرجيس وجزيرة جربة.',
    keyVulnerabilities: ['Oued Smar et radiers de Béni Khedache', 'Points bas de l\'île de Djerba (Houmt Souk & Ajim)', 'Péninsule de Zarzis'],
    keyVulnerabilitiesAr: ['وادي سمار ومعابر بني خداش الجبلية', 'المناطق المنخفضة بجربة (حومة السوق وأجيم)', 'معابر شبه جزيرة جرجيس'],
    protectionCivileNum: '198 / 75 683 000',
    centerCoord: { x: 72, y: 78 }
  },
  {
    id: 'tataouine',
    name: 'Tataouine',
    nameAr: 'تطاوين',
    region: 'Sud-Est',
    riskLevels: { rain: 'Faible', fire: 'Faible', flood: 'Modéré' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Inondations éclairs ("Saylan") très puissantes dans les lits d\'oueds asséchés du désert (Ghomrassen, Remada, Dhehiba).',
    vigilanceReasonAr: 'سيول صحراوية جارفة ومفاجئة بالأودية الجافة (سيلان غمراسن، رمادة، والذهيبة).',
    keyVulnerabilities: ['Gorges de Ghomrassen', 'Oued Tataouine et Oued Tlalet', 'Routes du grand sud et pistes sahariennes'],
    keyVulnerabilitiesAr: ['مضيق وادي غمراسن', 'وادي تطاوين ووادي تلالت', 'المحاور الصحراوية والطرقات الجنوبية'],
    protectionCivileNum: '198 / 75 860 000',
    centerCoord: { x: 67, y: 88 }
  },

  // Sud-Ouest
  {
    id: 'gafsa',
    name: 'Gafsa',
    nameAr: 'قفصة',
    region: 'Sud-Ouest',
    riskLevels: { rain: 'Modéré', fire: 'Faible', flood: 'Élevé' },
    overallVigilance: 'Jaune',
    vigilanceReason: 'Crues torrentielles de l\'Oued Bayech traversant la ville de Gafsa et bassins miniers (Metlaoui, Redeyef).',
    vigilanceReasonAr: 'فيضان وادي باياش الشديد العابر لمدينة قفصة وسيول الحوض المنجمي (المتلوي، الرديف، أم العرائس).',
    keyVulnerabilities: ['Oued Bayech (Gafsa ville & El Ksar)', 'Gorges de Selja et Oued Thelja', 'Quartiers miniers en contrebas des collines (Redeyef)'],
    keyVulnerabilitiesAr: ['وادي باياش (قفصة والكسر)', 'مضايق سيلجة ووادي الثلجة', 'أحياء الرديف والمتلوي المنخفضة'],
    protectionCivileNum: '198 / 76 220 000',
    centerCoord: { x: 44, y: 60 }
  },
  {
    id: 'tozeur',
    name: 'Tozeur',
    nameAr: 'توزر',
    region: 'Sud-Ouest',
    riskLevels: { rain: 'Faible', fire: 'Modéré', flood: 'Modéré' },
    overallVigilance: 'Vert',
    vigilanceReason: 'Feux de palmeraies en été (palmiers et résidus secs) ; ruissellement exceptionnel des crêtes de montagne (Chébika, Tamerza).',
    vigilanceReasonAr: 'حرائق الواحات في الصيف (جريد النخيل) والسيول الجبلية الفجئية بواحات تمغزة وشبيكة.',
    keyVulnerabilities: ['Palmeraies anciennes de Tozeur & Nefta (incendies)', 'Oasis de montagne (Tamerza, Chébika, Midès - Crues)', 'Chott El Jerid'],
    keyVulnerabilitiesAr: ['واحات النخيل بتوزر ونفطة (حرائق الجريد)', 'واحات الجبال الشبيكة وتمغزة وميداس (سيول)', 'محيط شط الجريد'],
    protectionCivileNum: '198 / 76 450 000',
    centerCoord: { x: 35, y: 68 }
  },
  {
    id: 'kebili',
    name: 'Kébili',
    nameAr: 'قبلي',
    region: 'Sud-Ouest',
    riskLevels: { rain: 'Faible', fire: 'Modéré', flood: 'Faible' },
    overallVigilance: 'Vert',
    vigilanceReason: 'Protection des palmeraies contre les incendies de sous-bois et fortes chaleurs ; tempêtes de sable réduisant la visibilité.',
    vigilanceReasonAr: 'حماية واحات النفيضة ودوز من حرائق المخلفات الجافة، وزوابع الرمال الحارقة.',
    keyVulnerabilities: ['Palmeraies du Nefzaoua & Douz (Feux)', 'Routes désertiques coupées par les sables ou orages isolés', 'Bordure du Chott El Jerid'],
    keyVulnerabilitiesAr: ['واحات نفزاوة ودوز (خطر اشتعال الجريد)', 'المحاور الصحراوية المعزولة', 'حافة شط الجريد'],
    protectionCivileNum: '198 / 75 490 000',
    centerCoord: { x: 48, y: 73 }
  }
];

export const TUNISIA_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'protection_civile',
    title: 'Protection Civile Tunisienne (ONPC)',
    titleAr: 'الحماية المدنية التونسية',
    number: '198',
    altNumber: '71 385 000',
    category: 'vital',
    description: 'Secours d\'urgence absolue, sauvetage inondations, lutte contre les incendies, pompiers.',
    descriptionAr: 'النجدة الفورية، الإنقاذ من الغرق والفيضانات، وإطفاء الحرائق والإنقاذ الطبي.',
    available: '24h/24 - 7j/7 (Gratuit)'
  },
  {
    id: 'garde_nationale',
    title: 'Garde Nationale (Secours Routiers & Oueds)',
    titleAr: 'الحرس الوطني - شرطة المرور والنجدة بالمسالك',
    number: '193',
    altNumber: '71 960 448',
    category: 'vital',
    description: 'Secours sur autoroutes et routes nationales, état des routes coupées par les crues d\'oueds.',
    descriptionAr: 'حالة الطرقات المغلقة بالسيول، نجدة المسافرين، ومراقبة مسالك الأودية.',
    available: '24h/24 - 7j/7 (Gratuit)'
  },
  {
    id: 'police_secours',
    title: 'Police de Secours',
    titleAr: 'شرطة النجدة',
    number: '197',
    category: 'vital',
    description: 'Intervention d\'urgence en milieu urbain, sécurisation des zones sinistrées.',
    descriptionAr: 'التدخل الأمني الاستعجالي بالمناطق الحضرية وتأمين الأحياء المنكوبة.',
    available: '24h/24 - 7j/7 (Gratuit)'
  },
  {
    id: 'samu',
    title: 'SAMU Tunisie (Urgences Médicales)',
    titleAr: 'الإسعاف الطبي الاستعجالي (SAMU)',
    number: '190',
    category: 'vital',
    description: 'Urgences médicales graves, réanimation, blessures et intoxications par fumées.',
    descriptionAr: 'الحالات الصحية الحرجة، الإنعاش الطبي، الاختناق بالدخان أو الإصابات الخطيرة.',
    available: '24h/24 - 7j/7 (Gratuit)'
  },
  {
    id: 'dgf_forets',
    title: 'Direction Générale des Forêts (DGF)',
    titleAr: 'الإدارة العامة للغابات - الإشعار عن حرائق الغابات',
    number: '80 10 12 12',
    altNumber: '71 891 141',
    category: 'vital',
    description: 'Numéro vert pour signaler tout départ de feu de forêt ou de récolte céréalière en Tunisie.',
    descriptionAr: 'الرقم الأخضر للإبلاغ الفوري عن أي بداية دخان أو حريق بغابات تونس ومحاصيلها.',
    available: 'Numéro Vert Gratuit'
  },
  {
    id: 'steg',
    title: 'STEG - Urgence Électricité & Câbles tombés',
    titleAr: 'الشركة التونسية للكهرباء والغاز (STEG)',
    number: '71 341 400',
    altNumber: '80 10 03 33',
    category: 'utilites',
    description: 'Signalement urgent de câbles électriques immergés ou tombés à terre, fuites de gaz.',
    descriptionAr: 'الإبلاغ العاجل عن سقوط الأسلاك الكهربائية في المياه أو الأعمدة وتفادي الصعق.',
    available: 'Service dépannage permanent'
  },
  {
    id: 'sonede',
    title: 'SONEDE - Urgence Réseaux d\'Eau',
    titleAr: 'الشركة الوطنية لاستغلال وتوزيع المياه (SONEDE)',
    number: '1888',
    altNumber: '71 887 000',
    category: 'utilites',
    description: 'Numéro vert pour ruptures de canalisations principales, pollutions ou coupures d\'eau.',
    descriptionAr: 'الرقم الأخضر لأعطاب شبكات المياه والكسور الكبرى لقنوات الشرب.',
    available: 'Centre d\'appel 24/7'
  },
  {
    id: 'inm',
    title: 'Institut National de la Météorologie (INM)',
    titleAr: 'المعهد الوطني للرصد الجوي',
    number: '71 773 400',
    category: 'meteo',
    description: 'Bulletins officiels de vigilance météo, alertes pluies exceptionnelles et canicules.',
    descriptionAr: 'النشرات الجوية التحذيرية الرسمية لمتابعة الأمطار الطوفانية والرياح العاتية.',
    available: 'www.meteo.tn'
  }
];

export const HAZARD_GUIDES: HazardGuide[] = [
  {
    id: 'flood',
    title: 'Inondations & Crues d\'Oueds',
    titleAr: 'الفيضانات وفيضان الأودية',
    headline: 'Les crues d\'oueds en Tunisie peuvent être soudaines et dévastatrices. Connaître les gestes vitaux sauve des vies.',
    headlineAr: 'فيضان الأودية في تونس مباغت وعنيف جداً. معرفة التصرفات الصحيحة تنقذ حياتك وحياة عائلتك.',
    color: 'blue',
    accentBg: 'bg-blue-50 text-blue-900',
    borderColor: 'border-blue-500',
    tunisiaContext: 'En Tunisie, les inondations frappent souvent les bassins de l\'Oued Medjerda (Boussalem, Medjez El Bab), Oued Meliane (Mohamedia), Nabeul (crues de 2018), et les passages à gué ruraux du Centre et du Sud.',
    tunisiaContextAr: 'في تونس، تتركز المخاطر الكبرى في حوض وادي مجردة (بوسالم، مجاز الباب)، حوض وادي مليان (المحمدية)، نابل (فيضانات 2018 التاريخية)، ومعابر الأودية الريفية بالوسط والجنوب.',
    goldenRules: [
      {
        rule: 'Ne JAMAIS s\'engager sur une route ou un radier submergé par l\'eau d\'un oued — ni en voiture, ni en 4x4, ni à pied.',
        ruleAr: 'إياك ثم إياك المغامرة بعبور طريق أو وادٍ مغمور بالمياه، سواء بالسيارة أو شاحنة أو سيراً على الأقدام.',
        warning: 'Moins de 30 cm d\'eau en mouvement suffisent pour emporter un véhicule, et le fond de la route peut avoir disparu.',
        warningAr: '30 صم فقط من المياه الجارية كافية لجرف سيارة رباعية الدفع، والمسلك تحته قد يكون منهاراً تماماً.'
      },
      {
        rule: 'Couper immédiatement le disjoncteur général STEG avant que l\'eau n\'atteigne les prises électriques.',
        ruleAr: 'اقطع القاطع العام للكهرباء فوراً قبل وصول منسوب المياه إلى المآخذ الكهربائية.',
        warning: 'L\'électrocution dans une eau inondée est une cause majeure et invisible de décès.',
        warningAr: 'الصعق الكهربائي في المياه الراكدة أو المتدفقة سبب قاتل وصامت أثناء الفيضانات.'
      },
      {
        rule: 'Montez vers les étages supérieurs ou les points hauts. Ne descendez JAMAIS dans les sous-sols ou garages.',
        ruleAr: 'اصعد إلى الطوابق العليا أو الأماكن المرتفعة. لا تنزل أبداً إلى المستودعات أو الطوابق السفلية.',
        warning: 'Les garages et sous-sols se transforment en pièges mortels en quelques dizaines de secondes.',
        warningAr: 'المستودعات الأرضية تتحول إلى فخاخ مميتة تغمرها المياه في ثوانٍ معدودة.'
      }
    ],
    before: [
      {
        title: 'Nettoyer rigoureusement bouches d\'égout et rigoles',
        titleAr: 'تنظيف بالوعات المنازل ومجاري تصريف الأسطح',
        details: 'Retirez feuilles, débris et sable obstruant les évacuations d\'eau autour de votre logement avant la saison automnale.',
        detailsAr: 'تأكد من إزالة الأتربة والأوساخ وأوراق الأشجار من قنوات صرف مياه الأمطار والبالوعات المنزلية قبل الخريف.',
        iconName: 'Droplets'
      },
      {
        title: 'Surélever les meubles et biens précieux',
        titleAr: 'رفع الأثاث والأجهزة الثمينة عن الأرض',
        details: 'Placez documents administratifs (CIN, actes de propriété), médicaments vitaux et appareils électriques à l\'étage ou en hauteur.',
        detailsAr: 'ضع الوثائق الرسمية، الأدوية الأساسية، والأجهزة الكهربائية في رفوف عالية أو بالطابق العلوي.',
        iconName: 'Layers'
      },
      {
        title: 'Préparer des sacs de sable ou batardeaux',
        titleAr: 'تجهيز أكياس الرمل أو الحواجز المنزلية',
        details: 'Si vous êtes en rez-de-chaussée ou proche d\'un oued (zone inondable), ayez des sacs prêts pour sceller les bas de portes.',
        detailsAr: 'إذا كان مسكنك منخفضاً أو قريباً من مجرى مائي، جهز حواجز صادة أو أكياس رمل لسد أبواب المداخل.',
        iconName: 'ShieldAlert',
        isCrucial: true
      },
      {
        title: 'Préparer votre sac d\'urgence 72h',
        titleAr: 'تجهيز حقيبة الطوارئ لـ 72 ساعة',
        details: 'Eau potable, lampes torches à piles, radio portable pour suivre les bulletins de la radio nationale, trousse de secours.',
        detailsAr: 'مياه معبأة، مصباح يدوي ببطاريات إضافية، راديو لمتابعة النشرات، وحقيبة إسعاف أولي.',
        iconName: 'Briefcase',
        isCrucial: true
      }
    ],
    during: [
      {
        title: 'Appeler le 198 (Protection Civile) en cas de détresse',
        titleAr: 'الاتصال فوراً بالحماية المدنية (198) عند الخطر',
        details: 'Donnez calmement votre localisation exacte (gouvernorat, délégation, repère visible) et le nombre de personnes.',
        detailsAr: 'أعطِ بهدوء عنوانك الدقيق (الولاية، المعتمدية، معلم بارز) وعدد الأشخاص المحاصرين معك.',
        iconName: 'PhoneCall',
        isCrucial: true
      },
      {
        title: 'Ne sortez pas à pied dans le courant',
        titleAr: 'لا تغامر بالخروج مشياً وسط التيارات المائية',
        details: 'L\'eau boueuse cache des trous d\'égout ouverts, des débris tranchants et des fils électriques sous tension tombés.',
        detailsAr: 'مياه الفيضان الموحلة تخفي بالوعات مفتوحة، حطاماً حاداً، وأسلاك كهربائية مقطوعة ذات شحنة قاتلة.',
        iconName: 'AlertTriangle'
      },
      {
        title: 'Si votre véhicule cale dans l\'eau : Évacuez immédiatement',
        titleAr: 'إذا تعطلت سيارتك في تجمع مائي: غادرها فوراً',
        details: 'Abandonnez le véhicule sans hésiter et rejoignez immédiatement la berge haute la plus proche.',
        detailsAr: 'اترك السيارة فوراً دون تردد واصعد إلى مكان آمن مرتفع قبل أن يجرفها التيار.',
        iconName: 'Car',
        isCrucial: true
      },
      {
        title: 'Écoutez Radio Nationale (102.7 FM) ou radios régionales',
        titleAr: 'متابعة الإذاعة الوطنية والإذاعات الجهوية',
        details: 'Les réseaux mobiles peuvent être saturés. La radio reste le moyen le plus sûr de recevoir les ordres d\'évacuation des autorités.',
        detailsAr: 'شبكات الهاتف قد تنقطع؛ الراديو بالبطاريات هو وسيلتك الأضمن لمعرفة تعليمات لجان مجابهة الكوارث.',
        iconName: 'Radio'
      }
    ],
    after: [
      {
        title: 'Ne pas rebrancher le courant avant vérification',
        titleAr: 'عدم إعادة التيار الكهربائي إلا بعد جفاف تام',
        details: 'Faites vérifier vos installations par un électricien qualifié ou attendez le feu vert des équipes de la STEG.',
        detailsAr: 'تأكد من جفاف القواطع والأسلاك بالكامل واستشر فنياً أو فرق الستاغ قبل تشغيل العداد.',
        iconName: 'ZapOff'
      },
      {
        title: 'Attention à la contamination de l\'eau',
        titleAr: 'تجنب شرب مياه الحنفيات غير المعقمة بعد الفيضان',
        details: 'Les puits de surface (Majel) et canalisations peuvent être pollués. Consommez de l\'eau embouteillée ou bouillie.',
        detailsAr: 'مياه الماجل أو الآبار قد تختلط بمياه الصرف؛ اعتمد على المياه المعلبة أو قم بغليها جيداً.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Aérer, désinfecter et photographier les dégâts',
        titleAr: 'تهوية المسكن، التعقيم بالجافيل، وتوثيق الأضرار',
        details: 'Prenez des photos de chaque pièce pour le constat de la commission locale de catastrophe naturelle et désinfectez à l\'eau de javel.',
        detailsAr: 'التقط صوراً واضحة للأضرار لمعاينتها من اللجان الجهوية لمجابهة الكوارث، وعقم الأرضيات جيداً.',
        iconName: 'Camera'
      }
    ]
  },

  {
    id: 'fire',
    title: 'Incendies de Forêts & Récoltes',
    titleAr: 'حرائق الغابات والمحاصيل الزراعية',
    headline: 'Les étés caniculaires et le vent de Sirocco (Chhili) transforment nos forêts et champs de blé en brasier en quelques minutes.',
    headlineAr: 'موجات الحرارة الشديدة ورياح الشهيلي تجعل غابات الصنوبر ومزارع الحبوب سريعة الاشتعال في دقائق معدودة.',
    color: 'amber',
    accentBg: 'bg-amber-50 text-amber-950',
    borderColor: 'border-amber-500',
    tunisiaContext: 'Chaque été, les massifs forestiers de Jendouba (Aïn Draham, Tabarka), Béja (Nefza), Bizerte (Sejnane), Kasserine (Chaambi) et Siliana paient un lourd tribut aux incendies de pins et de chêne-liège.',
    tunisiaContextAr: 'في كل صيف، تعاني غابات جندوبة (عين دراهم، طبرقة)، باجة (نفزة)، بنزرت (سجنان)، القصرين (الشعانبي)، وسليانة من ألسنة اللهب التي تهدد القرى والتجمعات السكانية.',
    goldenRules: [
      {
        rule: 'Ne JAMAIS fuir vers le haut d\'une colline ou dans le sens du vent.',
        ruleAr: 'إياك والهروب صعوداً نحو قمة التل أو في نفس اتجاه هبوب الرياح.',
        warning: 'Le feu se propage vers le haut des pentes 4 fois plus vite que sur le plat.',
        warningAr: 'النيران تصعد المنحدرات الجبلية بسرعة تفوق 4 أضعاف سرعتها في الأراضي المنبسطة.'
      },
      {
        rule: 'Ne jamais faire de barbecue, brûler de chaume ou jeter de mégot en bordure de forêt ou de champ sec.',
        ruleAr: 'يمنع منعاً باتاً إشعال النار أو حرق بقايا الحصاد (الحصيدة) أو رمي السجائر قرب الغابات والمزارع.',
        warning: 'Plus de 85% des feux de forêts en Tunisie sont d\'origine humaine ou par négligence coupable.',
        warningAr: 'أكثر من 85% من حرائق الغابات في تونس سببها الإهمال أو الأنشطة البشرية غير المسؤولة.'
      },
      {
        rule: 'En cas de fumée dense : respirez à travers un linge humide et marchez courbé près du sol.',
        ruleAr: 'عند اشتداد الدخان: تنفس عبر قماش مبلل بالماء واحنِ قامتك قرب سطح الأرض.',
        warning: 'L\'asphyxie par inhalation de monoxyde de carbone précède souvent les brûlures.',
        warningAr: 'الاختناق بالغازات السامة هو الخطر الأول المسبب للوفاة قبل ملامسة النيران.'
      }
    ],
    before: [
      {
        title: 'Débroussailler dans un rayon de 50 mètres',
        titleAr: 'تنظيف محيط المنازل من الأعشاب الجافة على مسافة 50 متراً',
        details: 'Éliminez les herbes sèches, branches mortes et résidus inflammables autour des habitations rurales.',
        detailsAr: 'قم بإزالة الشجيرات اليابسة والأعشاب الصفراء الملاصقة للمنزل لمنع وصول ألسنة اللهب إلى البناء.',
        iconName: 'Flame',
        isCrucial: true
      },
      {
        title: 'Créer des pare-feux autour des champs de céréales',
        titleAr: 'حرث خطوط واقية (أحزمة أمان) حول حقول القمح والشعير',
        details: 'Tracez une bande de terre nue labourée d\'au moins 6 mètres de large autour des parcelles prêtes à récolter.',
        detailsAr: 'احرث شريطاً فاصلاً بعرض 6 أمتار على الأقل من الأرض العارية لمنع انتقال النيران من الطرقات.',
        iconName: 'ShieldAlert',
        isCrucial: true
      },
      {
        title: 'Avoir des réserves d\'eau sous pression et tuyaux prêts',
        titleAr: 'تجهيز خزانات المياه والمضخات وخراطيم الرش',
        details: 'Gardez des citernes pleines, des seaux et des pelles facilement accessibles pour éteindre un départ de feu immédiatement.',
        detailsAr: 'تأكد من امتلاء صهاريج المياه ووجود خراطيم سريعة الربط ومجارف لإخماد الشرارات الأولى.',
        iconName: 'Droplets'
      },
      {
        title: 'Repérer deux itinéraires d\'évacuation sûrs',
        titleAr: 'تحديد مسلكين آمنين للإخلاء السريع',
        details: 'En zone montagneuse forestière, connaissez toujours une route secondaire si la piste principale venait à être coupée par les flammes.',
        detailsAr: 'في المناطق الغابية الجبلية، حدد طريقاً بديلاً مسبقاً في حال أغلقت النيران المسلك الرئيسي.',
        iconName: 'MapPin'
      }
    ],
    during: [
      {
        title: 'Alerter le 198 (Protection Civile) et le 80 10 12 12 (Forêts)',
        titleAr: 'الاتصال فوراً بـ 198 (الحماية) و 80101212 (إدارة الغابات)',
        details: 'Indiquez la couleur de la fumée, la direction du vent et la présence d\'habitations menacées.',
        detailsAr: 'حدد بدقة موقع الدخان، سرعة واتجاه الرياح، ومدى قرب ألسنة اللهب من التجمعات السكانية.',
        iconName: 'PhoneCall',
        isCrucial: true
      },
      {
        title: 'Fermer portes, fenêtres et volets hermétiquement',
        titleAr: 'إغلاق الأبواب والنوافذ والمنافذ بإحكام',
        details: 'Empêchez l\'entrée des braises volantes et des courants d\'air chauds à l\'intérieur de votre logement.',
        detailsAr: 'امنع دخول الشرر المتطاير وتيارات الهواء الساخن، واسحب الستائر القابلة للاشتعال بعيداً.',
        iconName: 'ShieldCheck'
      },
      {
        title: 'Arroser abondamment les façades et toitures',
        titleAr: 'رش واجهات المنازل والأسقف بالمياه باستمرار',
        details: 'Si l\'incendie approche mais que l\'évacuation n\'est pas encore ordonnée, mouillez abondamment le pourtour de la maison.',
        detailsAr: 'قم بتبليل الجدران، النوافذ، ومحيط المسكن بالماء لخفض درجة الحرارة ومنع اشتعال الخشب.',
        iconName: 'Droplet'
      },
      {
        title: 'Évacuez dès l\'ordre des autorités de la Garde Nationale',
        titleAr: 'الإخلاء الفوري عند تلقي أوامر الحرس الوطني أو الحماية',
        details: 'Ne perdez pas de temps pour sauver des biens matériels. Prenez uniquement votre sac d\'urgence et vos proches.',
        detailsAr: 'لا تتردد ولا تضيع الوقت في جمع الأغراض. خذ حقيبة الطوارئ وعائلتك وغادر فوراً نحو الأمان.',
        iconName: 'Footprints',
        isCrucial: true
      }
    ],
    after: [
      {
        title: 'Ne pas retourner dans une zone brûlée sans autorisation',
        titleAr: 'عدم العودة للمنطقة المحترقة إلا بعد الإذن الرسمي',
        details: 'Des souches d\'arbres peuvent couver sous terre pendant des jours et des arbres fragilisés risquent de s\'écrouler.',
        detailsAr: 'جذور الأشجار قد تظل مشتعلة تحت الرماد لأيام، والأشجار المتفحمة معرضة للسقوط المفاجئ.',
        iconName: 'AlertTriangle'
      },
      {
        title: 'Inspecter toits et combles pour déceler des braises résiduelles',
        titleAr: 'فحص الأسطح والمزاريب للتأكد من خلوها من الجمر',
        details: 'Arrosez tous les points chauds et vérifiez les gouttières où des tisons ont pu s\'accumuler.',
        detailsAr: 'اسكب الماء على أي بقعة ينبعث منها دخان خفيف في حديقة منزلك أو سطح المبنى.',
        iconName: 'Search'
      },
      {
        title: 'Attention aux coulées de boue lors des premières pluies',
        titleAr: 'الحذر من انجراف التربة والسيول مع أولى أمطار الخريف',
        details: 'Les sols brûlés perdent toute capacité d\'absorption et favorisent des coulées torrentielles dévastatrices.',
        detailsAr: 'الأراضي المحترقة تفقد غطاءها النباتي وتصبح شديدة الانجراف مع أول هطول للأمطار.',
        iconName: 'Waves'
      }
    ]
  },

  {
    id: 'rain',
    title: 'Pluies Torrentielles & Orages Violents',
    titleAr: 'الأمطار الغزيرة والعواصف الرعدية',
    headline: 'Les épisodes méditerranéens d\'automne en Tunisie peuvent déverser l\'équivalent de plusieurs mois de pluie en quelques heures.',
    headlineAr: 'التقلبات الجوية الخريفية في تونس قد تنزل كميات أمطار تعادل شهوراً بأكملها في بضع ساعات فقط.',
    color: 'sky',
    accentBg: 'bg-sky-50 text-sky-950',
    borderColor: 'border-sky-500',
    tunisiaContext: 'Le phénomène de gouttes froides automnales touche régulièrement le Grand Tunis, le Cap Bon, le Sahel et Sfax avec des intensités dépassant 100 mm en moins de 3 heures.',
    tunisiaContextAr: 'تتكرر العواصف الرعدية العنيفة في الخريف على تونس الكبرى والوطن القبلي والساحل وصفاقس، متجاوزة أحياناً 100 مم في ظرف ساعات معدودة.',
    goldenRules: [
      {
        rule: 'Limitez strictement vos déplacements et ne prenez la voiture qu\'en cas d\'urgence absolue.',
        ruleAr: 'الزم بيتك وتجنب التنقل بالسيارة إلا في حالات الضرورة القصوى والقصوى فقط.',
        warning: 'La majorité des victimes de fortes pluies en Tunisie sont des automobilistes piégés sur les routes ou emportés. Moins de 20 cm d\'eau suffisent pour bloquer le moteur et déséquilibrer un piéton.',
        warningAr: 'أغلب ضحايا الأمطار الغزيرة في تونس هم سائقون علقت سياراتهم في المنخفضات أو جرفتهم السيول.'
      },
      {
        rule: 'Ne vous abritez JAMAIS sous un arbre isolé, un poteau électrique ou une structure métallique.',
        ruleAr: 'إياك والاحتماء تحت الأشجار العالية المعزولة أو الأعمدة الكهربائية أثناء العواصف.',
        warning: 'La foudre frappe en priorité les points hauts isolés et les structures conductrices.',
        warningAr: 'الصواعق تضرب دوماً النقاط الأكثر ارتفاعاً وتتسبب في صعق فوري مميت.'
      },
      {
        rule: 'Éloignez-vous des berges d\'oueds, des collines rocheuses et des caniveaux d\'évacuation à ciel ouvert.',
        ruleAr: 'ابتعد فوراً عن حواف الأودية والمنحدرات الصخرية ومجاري مياه الأمطار المفتوحة.',
        warning: 'Le débit d\'un oued asséché peut exploser en quelques secondes sans signe annonciateur en amont.',
        warningAr: 'منسوب الوادي قد يرتفع فجأة دون سابق إنذار بفعل أمطار غزيرة هطلت على المرتفعات البعيدة.'
      }
    ],
    before: [
      {
        title: 'Consulter les bulletins de vigilance de l\'INM (Météo Tunisie)',
        titleAr: 'متابعة نشرات المعهد الوطني للرصد الجوي والإنذار المبكر',
        details: 'Soyez attentifs aux cartes de vigilance orange et rouge émises par l\'Institut National de la Météorologie.',
        detailsAr: 'انتبه للنشرات التحذيرية الخاصة وخرائط اليقظة البرتقالية والحمراء التي يصدرها الرصد الجوي.',
        iconName: 'CloudRain',
        isCrucial: true
      },
      {
        title: 'Sécuriser objets extérieurs, paraboles et tôles',
        titleAr: 'تثبيت الأجسام القابلة للتطاير بالأسطح والشرفات',
        details: 'Les rafales de vent associées aux orages peuvent arracher paraboles, panneaux et pots de fleurs.',
        detailsAr: 'اربط هوائيات البارابول، الألواح المعدنية، وأواني النباتات لتفادي سقوطها على المارة بفعل الرياح.',
        iconName: 'Wind'
      },
      {
        title: 'Garer les véhicules sur des points hauts dégagés',
        titleAr: 'ركن السيارات في أماكن مرتفعة وبعيدة عن مجاري السيول',
        details: 'Évitez les parkings souterrains, les berges d\'oueds et les rues réputées pour leurs accumulations d\'eau.',
        detailsAr: 'تجنب ركن السيارة في المستودعات تحت الأرضية أو الشوارع المعروفة بتراكم المياه أو محاذاة الأودية.',
        iconName: 'Car'
      },
      {
        title: 'Vérifier l\'étanchéité des fenêtres et portes d\'entrée',
        titleAr: 'تفقد عزل النوافذ ومداخل البناية ومصارف الأسطح',
        details: 'Assurez-vous que l\'eau ne peut pas s\'infiltrer sous les seuils de porte par refoulement.',
        detailsAr: 'تأكد من سلامة مجاري أسطح المنازل وعدم تسرب المياه تحت الأبواب الرئيسية.',
        iconName: 'CheckCircle'
      }
    ],
    during: [
      {
        title: 'Débrancher les appareils électroniques sensibles',
        titleAr: 'فصل الأجهزة الإلكترونية الحساسة عن الكهرباء',
        details: 'Protégez téléviseurs, ordinateurs et modems contre les surtensions brutales causées par la foudre.',
        detailsAr: 'افصل التلفاز والمودم وشواحن الهواتف لحمايتها من التلف بفعل الصواعق الكهربائية.',
        iconName: 'Zap'
      },
      {
        title: 'Ne jamais traverser les passages sous rails ou tunnels inondés',
        titleAr: 'تجنب المرور تحت الأنفاق والجسور المنخفضة المغمورة',
        details: 'La profondeur d\'eau dans les tunnels urbains est souvent trompeuse et peut dépasser 1,5 mètre.',
        detailsAr: 'عمق المياه في الممرات تحت الأرضية مخادع جداً وقد يتجاوز المتر ونصف في دقائق.',
        iconName: 'AlertOctagon',
        isCrucial: true
      },
      {
        title: 'Si la foudre gronde : restez à l\'intérieur du véhicule',
        titleAr: 'عند اشتداد الصواعق وأنت في الطريق: ابقَ داخل السيارة',
        details: 'La carrosserie métallique d\'une voiture fermée agit comme une cage de Faraday protectrice.',
        detailsAr: 'هيكل السيارة المعدني المغلق يشكل قفص حماية (فاراداي) آمن ضد الصواعق؛ لا تترجل منها.',
        iconName: 'Shield'
      },
      {
        title: 'Signalez les fils électriques tombés à la STEG (80 10 03 33)',
        titleAr: 'الإبلاغ فوراً عن الأسلاك المتدلية لشركة الكهرباء (STEG)',
        details: 'Ne vous approchez à aucun prix d\'un câble à terre, gardez un périmètre de sécurité d\'au moins 20 mètres.',
        detailsAr: 'لا تقترب أبداً من أي سلك مقطوع على الأرض أو ملامس للماء وحذر المارة من حوله.',
        iconName: 'ZapOff',
        isCrucial: true
      }
    ],
    after: [
      {
        title: 'Vérifier la stabilité des faux-plafonds et murs fissurés',
        titleAr: 'معاينة الأسقف والجدران بعد تسرب مياه الأمطار',
        details: 'L\'eau accumulée sur une toiture-terrasse peut alourdir le béton et causer des effondrements partiels.',
        detailsAr: 'تأكد من عدم تجمع كميات ضخمة من المياه فوق السطح، والتي قد تثقل الهيكل الإنشائي للمنزل.',
        iconName: 'Home'
      },
      {
        title: 'Nettoyer sans délai boues et débris stagnants',
        titleAr: 'تنظيف الأوحال والركام لتجنب انتشار الأوبئة والروائح',
        details: 'Évacuez les eaux sales avant qu\'elles ne sèchent et ne durcissent, portez des bottes et des gants en caoutchouc.',
        detailsAr: 'أزل الأوحال قبل جفافها وارتدِ أحذية وقفازات مطاطية لحماية يديك من التلوث.',
        iconName: 'Trash2'
      },
      {
        title: 'Renseignez-vous sur la réouverture des axes routiers (193)',
        titleAr: 'الاستفسار عن فتح الطرقات عبر الحرس الوطني (193)',
        details: 'Avant de reprendre la route entre gouvernorats, confirmez auprès de la Garde Nationale que les oueds sont redevenus franchissables.',
        detailsAr: 'اتصل برقم الحرس الوطني (193) للتأكد من انخفاض منسوب مياه الأودية وعودة حركة المرور بين الولايات.',
        iconName: 'Navigation'
      }
    ]
  }
];

export const EMERGENCY_KIT_ITEMS: EmergencyKitItem[] = [
  {
    id: 'eau',
    category: 'survie',
    label: 'Eau potable en bouteilles scellées',
    labelAr: 'مياه شرب معلبة (6 إلى 9 لترات للعائلة)',
    quantityNote: 'Au moins 3 litres par personne par jour (pour 72 heures)',
    whyCrucial: 'Les réseaux de la SONEDE sont fréquemment coupés ou contaminés lors d\'inondations majeures.',
    isCrucial: true
  },
  {
    id: 'nourriture',
    category: 'survie',
    label: 'Aliments non périssables prêts à consommer',
    labelAr: 'أغذية غير قابلة للتلف (تمور، تونة، بسكويت، بقول جافة)',
    quantityNote: 'Dattes tunisiennes, conserves de thon/sardines, barres de céréales',
    whyCrucial: 'Consommable sans cuisson ni électricité si la STEG ou le gaz sont coupés.',
    isCrucial: true
  },
  {
    id: 'lampe',
    category: 'communication',
    label: 'Lampe torche LED étanche + Piles de rechange',
    labelAr: 'مصباح يدوي قوي مقاوم للمياه مع بطاريات إضافية',
    quantityNote: '2 lampes + 2 jeux de piles neuves',
    whyCrucial: 'Les coupures d\'électricité sont quasi systématiques lors de violents orages et d\'inondations.',
    isCrucial: true
  },
  {
    id: 'radio',
    category: 'communication',
    label: 'Radio transistor à piles (FM/AM)',
    labelAr: 'راديو صغير يعمل بالبطاريات لمتابعة الإذاعة الوطنية',
    quantityNote: '1 poste réglé sur Radio Nationale (102.7 FM) / RTCI',
    whyCrucial: 'Le seul moyen garanti de recevoir les ordres d\'évacuation quand la 4G/5G et le réseau mobile saturent.',
    isCrucial: true
  },
  {
    id: 'powerbank',
    category: 'communication',
    label: 'Batterie externe (Powerbank 20000 mAh) chargée',
    labelAr: 'شاحن هاتف متنقل (باوربانك) مشحون بالكامل',
    quantityNote: '1 à 2 batteries avec câbles adaptés',
    whyCrucial: 'Indispensable pour joindre les secours de la Protection Civile (198) en cas d\'urgence vitale.',
    isCrucial: true
  },
  {
    id: 'pharmacie',
    category: 'sante',
    label: 'Trousse de premiers secours et médicaments chroniques',
    labelAr: 'حقيبة إسعافات أولية وأدوية الأمراض المزمنة (سكر، ضغط)',
    quantityNote: 'Pansements, désinfectant, compresses, traitement habituel pour 10 jours',
    whyCrucial: 'L\'accès aux pharmacies et dispensaires peut être totalement bloqué pendant 48 à 72 heures.',
    isCrucial: true
  },
  {
    id: 'documents',
    category: 'documents',
    label: 'Copies plastifiées étanches des documents officiels',
    labelAr: 'نسخ محمية في أكياس بلاستيكية من الوثائق الرسمية (بطاقة تعريف، دفاتر علاج)',
    quantityNote: 'CIN, passeports, livrets de famille, actes de propriété, ordonnances',
    whyCrucial: 'Évite la perte définitive en cas d\'inondation brutale du logement.',
    isCrucial: true
  },
  {
    id: 'sifflet',
    category: 'survie',
    label: 'Sifflet de détresse sans bille',
    labelAr: 'صفارة إنقاذ لإصدار صوت قوي للمنقذين',
    quantityNote: '1 sifflet par membre de la famille',
    whyCrucial: 'La voix s\'épuise en quelques minutes sous les bruits d\'eau et de tempête ; le sifflet s\'entend à plus de 500 mètres.',
    isCrucial: true
  },
  {
    id: 'argent',
    category: 'survie',
    label: 'Argent liquide en petites coupures',
    labelAr: 'مبلغ نقدي بأوراق نقدية صغيرة',
    quantityNote: '100 à 200 dinars en coupures de 10 et 20 DT',
    whyCrucial: 'Les distributeurs bancaires (DAB) et terminaux de paiement ne fonctionnent plus sans électricité.',
    isCrucial: false
  },
  {
    id: 'couverture',
    category: 'survie',
    label: 'Couvertures de survie isothermiques',
    labelAr: 'أغطية حرارية لعلاج انخفاض حرارة الجسم',
    quantityNote: '1 couverture pliante par personne',
    whyCrucial: 'Protège contre l\'hypothermie sévère chez les enfants et personnes âgées trempés par l\'eau d\'inondation.',
    isCrucial: true
  },
  {
    id: 'masques',
    category: 'sante',
    label: 'Masques de protection FFP2 contre les fumées',
    labelAr: 'كمامات واقية ضد استنشاق رماد ودخان الحرائق',
    quantityNote: '4 à 6 masques hermétiques',
    whyCrucial: 'Vital pour évacuer en cas de feux de forêt avec fumées toxiques et particules fines.',
    isCrucial: true
  }
];

export const RECENT_CITIZEN_ALERTS: CitizenAlert[] = [];
