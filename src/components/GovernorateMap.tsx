import React, { useState, useMemo } from 'react';
import { Governorate, TunisianRegion, VigilanceLevel } from '../types';
import { 
  MapPin, 
  AlertTriangle, 
  PhoneCall, 
  Shield, 
  Search, 
  Flame, 
  Droplets, 
  Waves, 
  CheckCircle2, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  ShieldAlert, 
  AlertCircle,
  X
} from 'lucide-react';

interface GovernorateMapProps {
  governorates: Governorate[];
  selectedGovId: string;
  onSelectGov: (gov: Governorate) => void;
  lang: 'fr' | 'ar';
}

export const GovernorateMap: React.FC<GovernorateMapProps> = ({
  governorates,
  selectedGovId,
  onSelectGov,
  lang,
}) => {
  const isAr = lang === 'ar';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('Tous');
  const [vigilanceFilter, setVigilanceFilter] = useState<string>('all');
  const [showVigilanceGuide, setShowVigilanceGuide] = useState<boolean>(true);

  const regions: TunisianRegion[] = [
    'Nord-Est',
    'Nord-Ouest',
    'Centre-Est',
    'Centre-Ouest',
    'Sud-Est',
    'Sud-Ouest'
  ];

  const selectedGov = useMemo(() => {
    return governorates.find(g => g.id === selectedGovId) || governorates[0];
  }, [governorates, selectedGovId]);

  // Dynamic breakdown of governorates per vigilance level (normalized casing)
  const stats = useMemo(() => {
    return {
      rouge: governorates.filter(g => (g.overallVigilance || '').toLowerCase() === 'rouge'),
      orange: governorates.filter(g => (g.overallVigilance || '').toLowerCase() === 'orange'),
      jaune: governorates.filter(g => (g.overallVigilance || '').toLowerCase() === 'jaune'),
      vert: governorates.filter(g => (g.overallVigilance || '').toLowerCase() === 'vert')
    };
  }, [governorates]);

  const filteredGovernorates = useMemo(() => {
    return governorates.filter(gov => {
      const matchesSearch =
        gov.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        gov.nameAr.includes(searchQuery) ||
        gov.keyVulnerabilities.some(v => v.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion = selectedRegion === 'Tous' || gov.region === selectedRegion;

      const matchesVigilance =
        vigilanceFilter === 'all' ||
        (gov.overallVigilance || '').toLowerCase() === vigilanceFilter.toLowerCase();

      return matchesSearch && matchesRegion && matchesVigilance;
    });
  }, [governorates, searchQuery, selectedRegion, vigilanceFilter]);

  const handlePillFilterClick = (level: string) => {
    if (vigilanceFilter === level) {
      setVigilanceFilter('all');
    } else {
      setVigilanceFilter(level);
      setShowVigilanceGuide(true);
    }
  };

  const getVigilanceBadge = (level: VigilanceLevel) => {
    switch ((level || '').toLowerCase()) {
      case 'rouge':
        return {
          bg: 'bg-red-600 text-white border-red-700',
          dot: 'bg-red-400',
          label: isAr ? 'يقظة قصوى (أحمر)' : 'Vigilance Absolue (Rouge)',
          textClass: 'text-red-700 bg-red-50 border-red-200'
        };
      case 'orange':
        return {
          bg: 'bg-orange-500 text-white border-orange-600',
          dot: 'bg-orange-300',
          label: isAr ? 'يقظة عالية (برتقالي)' : 'Grande Vigilance (Orange)',
          textClass: 'text-orange-800 bg-orange-50 border-orange-200'
        };
      case 'jaune':
        return {
          bg: 'bg-amber-400 text-amber-950 border-amber-500',
          dot: 'bg-amber-600',
          label: isAr ? 'انتباه (أصفر)' : 'Soyez Attentifs (Jaune)',
          textClass: 'text-amber-800 bg-amber-50 border-amber-200'
        };
      default:
        return {
          bg: 'bg-emerald-600 text-white border-emerald-700',
          dot: 'bg-emerald-300',
          label: isAr ? 'وضع عادي (أخضر)' : 'Vigilance Normale (Vert)',
          textClass: 'text-emerald-800 bg-emerald-50 border-emerald-200'
        };
    }
  };

  const getRiskPill = (level: string) => {
    switch (level) {
      case 'Critique':
        return 'bg-red-100 text-red-800 border-red-300 font-bold';
      case 'Élevé':
        return 'bg-orange-100 text-orange-800 border-orange-300 font-semibold';
      case 'Modéré':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      default:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    }
  };

  return (
    <section id="governorates-section" className="py-10 bg-slate-50 border-b border-slate-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Vigilance Level Pills */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold mb-2">
              <MapPin className="w-3.5 h-3.5 text-red-600" />
              <span>{isAr ? 'خريطة المخاطر التونسية' : 'Observatoire Territorial'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isAr ? 'مستوى اليقظة بالولايات التونسية الـ 24' : 'Vigilance & Risques dans les 24 Gouvernorats'}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {isAr
                ? 'توزيع ولايات الجمهورية التونسية حسب درجات اليقظة الرسمية الصادرة عن الحماية المدنية والرصد الجوي.'
                : 'Répartition des 24 gouvernorats tunisiens selon la carte officielle de vigilance et de secours de la Protection Civile.'}
            </p>
          </div>

          {/* Interactive Vigilance Pills & Guide Toggle */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold shrink-0">
            
            {/* 🔴 Rouge Pill */}
            <button
              onClick={() => handlePillFilterClick('rouge')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                vigilanceFilter === 'rouge'
                  ? 'bg-red-600 text-white border-red-700 shadow-md ring-2 ring-red-400 font-bold scale-105'
                  : 'bg-red-100/90 hover:bg-red-200 text-red-800 border-red-200'
              }`}
              title={isAr ? 'اضغط لعرض ولايات اليقظة القصوى' : 'Filtrer par vigilance rouge'}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vigilanceFilter === 'rouge' ? 'bg-white' : 'bg-red-600 animate-pulse'}`}></span>
              <span>{stats.rouge.length} {isAr ? 'أحمر' : 'Rouge'}</span>
            </button>

            {/* 🟠 Orange Pill */}
            <button
              onClick={() => handlePillFilterClick('orange')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                vigilanceFilter === 'orange'
                  ? 'bg-orange-600 text-white border-orange-700 shadow-md ring-2 ring-orange-400 font-bold scale-105'
                  : 'bg-orange-100/90 hover:bg-orange-200 text-orange-800 border-orange-200'
              }`}
              title={isAr ? 'اضغط لعرض ولايات اليقظة العالية' : 'Filtrer par vigilance orange'}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vigilanceFilter === 'orange' ? 'bg-white' : 'bg-orange-500'}`}></span>
              <span>{stats.orange.length} {isAr ? 'برتقالي' : 'Orange'}</span>
            </button>

            {/* 🟡 Jaune Pill */}
            <button
              onClick={() => handlePillFilterClick('jaune')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                vigilanceFilter === 'jaune'
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-300 font-bold scale-105'
                  : 'bg-amber-100/90 hover:bg-amber-200 text-amber-900 border-amber-200'
              }`}
              title={isAr ? 'اضغط لعرض ولايات الانتباه' : 'Filtrer par vigilance jaune'}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vigilanceFilter === 'jaune' ? 'bg-slate-900' : 'bg-amber-400'}`}></span>
              <span>{stats.jaune.length} {isAr ? 'أصفر' : 'Jaune'}</span>
            </button>

            {/* 🟢 Vert Pill */}
            <button
              onClick={() => handlePillFilterClick('vert')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                vigilanceFilter === 'vert'
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400 font-bold scale-105'
                  : 'bg-emerald-100/90 hover:bg-emerald-200 text-emerald-800 border-emerald-200'
              }`}
              title={isAr ? 'اضغط لعرض الولايات المستقرة' : 'Filtrer par vigilance verte'}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${vigilanceFilter === 'vert' ? 'bg-white' : 'bg-emerald-500'}`}></span>
              <span>{stats.vert.length} {isAr ? 'أخضر' : 'Vert'}</span>
            </button>

            {/* Guide Explanations Toggle Button */}
            <button
              onClick={() => setShowVigilanceGuide(!showVigilanceGuide)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-all cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>{isAr ? 'شرح معاني الألوان' : 'Comprendre les couleurs'}</span>
              {showVigilanceGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 📚 EXPANDED VIGILANCE EXPLANATIONS GUIDE (شروحات مستويات اليقظة الرسمية للمستخدم) */}
        {showVigilanceGuide && (
          <div className="mb-8 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm relative animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  {isAr 
                    ? 'دليل درجات اليقظة الرسمية للحماية المدنية والرصد الجوي (لماذا وُضعت هذه الألوان؟)' 
                    : 'Guide Officiel des Niveaux de Vigilance Météorologique & Risques en Tunisie'}
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                {isAr ? 'اضغط على أي بطاقة لتصفية الولايات' : 'Cliquez sur une carte pour filtrer'}
              </span>
            </div>

            {/* 4 Cards Grid Explaining Each Color in Plain Language */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              {/* 🔴 RED CARD */}
              <div 
                onClick={() => handlePillFilterClick('rouge')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  vigilanceFilter === 'rouge' 
                    ? 'bg-red-50 border-red-500 ring-2 ring-red-400 shadow-sm' 
                    : 'bg-red-50/50 hover:bg-red-50 border-red-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-red-600 text-white">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                      {isAr ? 'أحمر : يقظة قصوى' : 'Rouge : Alerte Maximale'}
                    </span>
                    <span className="text-xs font-bold text-red-700">
                      {stats.rouge.length} {isAr ? 'ولايات' : 'gouvernorats'}
                    </span>
                  </div>

                  <h4 className="font-bold text-red-950 text-sm mb-1.5">
                    {isAr ? 'خطر داهم واستثنائي جداً' : 'Danger exceptionnel et immédiat'}
                  </h4>

                  <p className="text-xs text-red-900/90 leading-relaxed mb-3">
                    {isAr 
                      ? 'ظواهر بالغة الخطورة (فيضان أودية كبرى مثل مجردة أو سيول جارفة) تهدد الأرواح والمنازل بشكل مباشر.'
                      : 'Phénomènes d\'intensité exceptionnelle (crues majeures d\'oueds, torrents dévastateurs) menaçant directement les vies.'}
                  </p>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-red-200 text-xs text-red-950 mb-2">
                    <strong className="text-red-700 block mb-1">
                      {isAr ? '🛡️ السلوك الإلزامي الفوري:' : '🛡️ Consignes vitales :'}
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>{isAr ? 'البقاء في أمان وعدم مغادرة المسكن نهائياً' : 'Restez chez vous en zone haute'}</li>
                      <li>{isAr ? 'منع عبور الأودية بالسيارات أو راجلين' : 'Ne franchissez jamais un oued'}</li>
                      <li>{isAr ? 'قطع الكهرباء والاتصال فوراً بـ 198' : 'Coupez le courant, appelez le 198'}</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-red-200/60 text-[11px] font-semibold text-red-800">
                  {isAr ? 'الولايات المعنية: ' : 'Concernés : '}
                  <span className="font-bold">
                    {stats.rouge.map(g => (isAr ? g.nameAr : g.name)).join('، ')}
                  </span>
                </div>
              </div>

              {/* 🟠 ORANGE CARD */}
              <div 
                onClick={() => handlePillFilterClick('orange')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  vigilanceFilter === 'orange' 
                    ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-400 shadow-sm' 
                    : 'bg-orange-50/50 hover:bg-orange-50 border-orange-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-orange-600 text-white">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      {isAr ? 'برتقالي : يقظة عالية' : 'Orange : Grande Vigilance'}
                    </span>
                    <span className="text-xs font-bold text-orange-700">
                      {stats.orange.length} {isAr ? 'ولايات' : 'gouvernorats'}
                    </span>
                  </div>

                  <h4 className="font-bold text-orange-950 text-sm mb-1.5">
                    {isAr ? 'ظواهر خطيرة متوقعة' : 'Phénomènes dangereux prévus'}
                  </h4>

                  <p className="text-xs text-orange-900/90 leading-relaxed mb-3">
                    {isAr 
                      ? 'أمطار رعدية طوفانية غزيرة (تفوق 50-80 مم)، رياح عاتية، وارتفاع سريع في منسوب مياه الأودية المحلية.'
                      : 'Pluies orageuses très intenses (>50 mm), vents violents et montée rapide des cours d\'eau secondaires.'}
                  </p>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-orange-200 text-xs text-orange-950 mb-2">
                    <strong className="text-orange-700 block mb-1">
                      {isAr ? '🛡️ السلوك الوقائي المطلوب:' : '🛡️ Précautions :'}
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>{isAr ? 'تجنب أي تنقلات غير ضرورية' : 'Évitez les déplacements inutiles'}</li>
                      <li>{isAr ? 'الابتعاد عن الأشجار والأسلاك الكهربائية' : 'Éloignez-vous des arbres et câbles'}</li>
                      <li>{isAr ? 'متابعة النشرات الجوية الحية بانتظام' : 'Suivez les bulletins de l\'INM'}</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-orange-200/60 text-[11px] font-semibold text-orange-800 line-clamp-2">
                  {isAr ? 'الولايات المعنية: ' : 'Concernés : '}
                  <span className="font-bold">
                    {stats.orange.map(g => (isAr ? g.nameAr : g.name)).join('، ')}
                  </span>
                </div>
              </div>

              {/* 🟡 YELLOW CARD */}
              <div 
                onClick={() => handlePillFilterClick('jaune')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  vigilanceFilter === 'jaune' 
                    ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400 shadow-sm' 
                    : 'bg-amber-50/50 hover:bg-amber-50 border-amber-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-amber-400 text-amber-950">
                      <span className="w-2 h-2 rounded-full bg-amber-950"></span>
                      {isAr ? 'أصفر : انتباه ومتابعة' : 'Jaune : Soyez Attentif'}
                    </span>
                    <span className="text-xs font-bold text-amber-800">
                      {stats.jaune.length} {isAr ? 'ولايات' : 'gouvernorats'}
                    </span>
                  </div>

                  <h4 className="font-bold text-amber-950 text-sm mb-1.5">
                    {isAr ? 'تقلبات جوية تستوجب الحيطة' : 'Conditions perturbées à surveiller'}
                  </h4>

                  <p className="text-xs text-amber-900/90 leading-relaxed mb-3">
                    {isAr 
                      ? 'طقس متقلب أو رياح نشطة لا تشكل خطراً داهماً، ولكنها تتطلب الحذر لممارسي الأنشطة الخارجية والبحرية.'
                      : 'Temps instable sans danger critique, mais nécessitant de la prudence pour la circulation et les activités extérieures.'}
                  </p>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-amber-200 text-xs text-amber-950 mb-2">
                    <strong className="text-amber-800 block mb-1">
                      {isAr ? '🛡️ السلوك الوقائي المطلوب:' : '🛡️ Précautions :'}
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>{isAr ? 'تخفيف السرعة والانتباه على الطرقات' : 'Réduisez votre vitesse sur route'}</li>
                      <li>{isAr ? 'الحذر للصيادين ورواد السواحل' : 'Vigilance pour les marins et pêcheurs'}</li>
                      <li>{isAr ? 'متابعة تطورات الطقس المحلية' : 'Consultez les mises à jour'}</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/60 text-[11px] font-semibold text-amber-900 line-clamp-2">
                  {isAr ? 'الولايات المعنية: ' : 'Concernés : '}
                  <span className="font-bold">
                    {stats.jaune.map(g => (isAr ? g.nameAr : g.name)).join('، ')}
                  </span>
                </div>
              </div>

              {/* 🟢 GREEN CARD */}
              <div 
                onClick={() => handlePillFilterClick('vert')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  vigilanceFilter === 'vert' 
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-400 shadow-sm' 
                    : 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white">
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      {isAr ? 'أخضر : وضع عادي' : 'Vert : Situation Normale'}
                    </span>
                    <span className="text-xs font-bold text-emerald-800">
                      {stats.vert.length} {isAr ? 'ولايات' : 'gouvernorats'}
                    </span>
                  </div>

                  <h4 className="font-bold text-emerald-950 text-sm mb-1.5">
                    {isAr ? 'استقرار جوي وطبيعي تام' : 'Aucune menace particulière'}
                  </h4>

                  <p className="text-xs text-emerald-900/90 leading-relaxed mb-3">
                    {isAr 
                      ? 'لا توجد أي مخاطر بيئية أو مناخية غير عادية في هذه المناطق، والطقس مستقر ومناسب لكافة الأنشطة.'
                      : 'Conditions stables sans vigilance particulière. Aucun risque majeur identifié pour la journée.'}
                  </p>

                  <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-200 text-xs text-emerald-950 mb-2">
                    <strong className="text-emerald-800 block mb-1">
                      {isAr ? '🛡️ السلوك اليومي المطلوب:' : '🛡️ Recommandations :'}
                    </strong>
                    <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                      <li>{isAr ? 'سير الأنشطة والعمل بصورة طبيعية' : 'Activités courantes sans restriction'}</li>
                      <li>{isAr ? 'احترام قواعد السلامة العامة المعتادة' : 'Respect des règles de sécurité standard'}</li>
                      <li>{isAr ? 'لا حاجة لأي تدابير استثنائية' : 'Aucune mesure d\'urgence requise'}</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-2 border-t border-emerald-200/60 text-[11px] font-semibold text-emerald-800">
                  {isAr ? 'الولايات المعنية: ' : 'Concernés : '}
                  <span className="font-bold">
                    {stats.vert.map(g => (isAr ? g.nameAr : g.name)).join('، ')}
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Filter Indicator Bar (when a filter is active) */}
        {vigilanceFilter !== 'all' && (
          <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-slate-900 text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></span>
              <span>
                {isAr
                  ? `تصفية مفعّلة: عرض ولايات اليقظة [${vigilanceFilter === 'rouge' ? 'الحمراء' : vigilanceFilter === 'orange' ? 'البرتقالية' : vigilanceFilter === 'jaune' ? 'الصفراء' : 'الخضراء'}] فقط (${filteredGovernorates.length} ولاية)`
                  : `Filtre actif : affichage des gouvernorats en vigilance [${vigilanceFilter.toUpperCase()}] (${filteredGovernorates.length})`}
              </span>
            </div>
            <button
              onClick={() => setVigilanceFilter('all')}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white underline text-xs font-bold cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isAr ? 'إلغاء التصفية وعرض الكل' : 'Réinitialiser'}</span>
            </button>
          </div>
        )}

        {/* Controls: Search, Region filter, Vigilance filter */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs mb-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className={`w-4 h-4 text-slate-400 absolute top-3 ${isAr ? 'right-3' : 'left-3'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث عن ولاية أو منطقة (مثال: نابل، بوسالم)...' : 'Rechercher un gouvernorat, oued ou zone...'}
              className={`w-full py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white ${
                isAr ? 'pr-9 pl-3' : 'pl-9 pr-3'
              }`}
            />
          </div>

          {/* Region selector */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
            >
              <option value="Tous">{isAr ? 'كل أقاليم الجمهورية (الكل)' : 'Toutes les Régions de Tunisie'}</option>
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* Vigilance filter */}
          <div>
            <select
              value={vigilanceFilter}
              onChange={(e) => setVigilanceFilter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white"
            >
              <option value="all">{isAr ? 'جميع درجات اليقظة (الكل)' : 'Tous les Niveaux de Vigilance'}</option>
              <option value="rouge">{isAr ? 'أحمر (يقظة قصوى - 2 ولايات)' : 'Rouge (Vigilance Absolue - 2)'}</option>
              <option value="orange">{isAr ? 'برتقالي (يقظة عالية - 9 ولايات)' : 'Orange (Grande Vigilance - 9)'}</option>
              <option value="jaune">{isAr ? 'أصفر (انتباه - 11 ولاية)' : 'Jaune (Attentifs - 11)'}</option>
              <option value="vert">{isAr ? 'أخضر (عادي - 2 ولايات)' : 'Vert (Normal - 2)'}</option>
            </select>
          </div>
        </div>

        {/* Main Grid: Left is Interactive List / Map Cards, Right is Focused Governorate Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Governorate Grid (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[580px] overflow-y-auto p-1 pr-2">
              {filteredGovernorates.map((gov) => {
                const isSelected = gov.id === selectedGov.id;
                const badge = getVigilanceBadge(gov.overallVigilance);

                return (
                  <button
                    key={gov.id}
                    onClick={() => onSelectGov(gov)}
                    id={`gov-card-${gov.id}`}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-red-50/80 border-red-500 ring-2 ring-red-500/20 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1 mb-2">
                      <div>
                        <div className="font-bold text-slate-900 text-sm sm:text-base">
                          {isAr ? gov.nameAr : gov.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {isAr ? gov.name : gov.nameAr}
                        </div>
                      </div>
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${
                          (gov.overallVigilance || '').toLowerCase() === 'rouge'
                            ? 'bg-red-600 animate-ping'
                            : (gov.overallVigilance || '').toLowerCase() === 'orange'
                            ? 'bg-orange-500'
                            : (gov.overallVigilance || '').toLowerCase() === 'jaune'
                            ? 'bg-amber-400'
                            : 'bg-emerald-500'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span className="text-slate-500">{gov.region}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${badge.textClass}`}>
                          {gov.overallVigilance.toUpperCase()}
                        </span>
                      </div>

                      {/* Small hazard icons indicator */}
                      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100 text-[10px]">
                        <span className="flex items-center gap-0.5 text-blue-600" title="Inondation">
                          <Waves className="w-3 h-3" />
                          <span>{gov.riskLevels.flood === 'Critique' ? 'Crit.' : gov.riskLevels.flood === 'Élevé' ? 'Élevé' : ''}</span>
                        </span>
                        <span className="flex items-center gap-0.5 text-amber-600" title="Feux">
                          <Flame className="w-3 h-3" />
                          <span>{gov.riskLevels.fire === 'Critique' ? 'Crit.' : gov.riskLevels.fire === 'Élevé' ? 'Élevé' : ''}</span>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredGovernorates.length === 0 && (
              <div className="p-8 text-center bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
                {isAr ? 'لم يتم العثور على ولاية مطابقة لخيارات البحث.' : 'Aucun gouvernorat ne correspond aux critères de recherche.'}
              </div>
            )}
          </div>

          {/* Focused Governorate Deep-Dive Dossier (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {selectedGov.region}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                        getVigilanceBadge(selectedGov.overallVigilance).textClass
                      }`}
                    >
                      {getVigilanceBadge(selectedGov.overallVigilance).label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">
                    {isAr ? selectedGov.nameAr : selectedGov.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isAr ? selectedGov.name : selectedGov.nameAr}
                  </p>
                </div>
              </div>

              {/* Specific Vulnerability Badges */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-center gap-1 text-xs text-blue-700 font-semibold mb-1">
                    <Waves className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الفيضانات' : 'Inondation'}</span>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getRiskPill(selectedGov.riskLevels.flood)}`}>
                    {selectedGov.riskLevels.flood}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-center gap-1 text-xs text-amber-700 font-semibold mb-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الحرائق' : 'Feux'}</span>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getRiskPill(selectedGov.riskLevels.fire)}`}>
                    {selectedGov.riskLevels.fire}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-center gap-1 text-xs text-sky-700 font-semibold mb-1">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الأمطار' : 'Pluies'}</span>
                  </div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] border ${getRiskPill(selectedGov.riskLevels.rain)}`}>
                    {selectedGov.riskLevels.rain}
                  </span>
                </div>
              </div>

              {/* Reason for Vigilance Level */}
              <div className="mb-4 text-xs">
                <span className="font-bold text-slate-800 block mb-1">
                  {isAr ? 'سبب وموجبات مستوى اليقظة بالولاية :' : 'Motif de vigilance & contexte local :'}
                </span>
                <p className="text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200 leading-relaxed">
                  {isAr ? selectedGov.vigilanceReasonAr : selectedGov.vigilanceReason}
                </p>
              </div>

              {/* Local Key Vulnerabilities */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isAr ? 'بؤر الخطر ومجاري السيول الرئيسية بالولاية' : 'Points critiques & cours d\'eau'}</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(isAr ? selectedGov.keyVulnerabilitiesAr : selectedGov.keyVulnerabilities).map((vuln, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-red-50 text-red-800 border border-red-200 text-xs font-medium"
                    >
                      {vuln}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Emergency Call Button for this Region */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs text-slate-500 block mb-2">
                  {isAr ? 'قاعة العمليات الجهوية للحماية المدنية :' : 'Poste de commandement local de secours :'}
                </span>
                <a
                  href={`tel:${selectedGov.protectionCivileNum.split(' / ')[0]}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-sm"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{selectedGov.protectionCivileNum}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
