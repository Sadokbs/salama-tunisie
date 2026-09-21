import React from 'react';
import { PhoneCall, ShieldAlert, Flame, CloudRain, Waves, ArrowRight, ArrowLeft, Tv, Radio } from 'lucide-react';
import { HazardType } from '../types';

interface EmergencyBannerProps {
  lang: 'fr' | 'ar';
  selectedHazard: HazardType;
  onSelectHazard: (hazard: HazardType) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({
  lang,
  selectedHazard,
  onSelectHazard,
  onScrollToSection,
}) => {
  const isAr = lang === 'ar';
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <section className="bg-slate-900 text-white py-8 sm:py-12 border-b border-slate-800 relative overflow-hidden" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs sm:text-sm font-semibold mb-3 border border-red-500/30">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>
              {isAr
                ? 'الدليل الوطني الاستعجالي لحماية المواطنين في تونس'
                : 'Guide National d\'Urgence et de Protection Citoyenne en Tunisie'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            {isAr ? (
              <>
                احمِ نفسك وعائلتك من <span className="text-sky-400">الأمطار الغزيرة</span>،{' '}
                <span className="text-amber-400">حرائق الغابات</span> و
                <span className="text-blue-400">فيضان الأودية</span>
              </>
            ) : (
              <>
                Protégez-vous contre les <span className="text-sky-400">pluies torrentielles</span>,{' '}
                <span className="text-amber-400">incendies de forêts</span> et{' '}
                <span className="text-blue-400">crues d'oueds</span> en Tunisie
              </>
            )}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {isAr
              ? 'معلومات حصرية ومفصلة لجميع الولايات التونسية الـ 24: نشرات اليقظة، التصرف السليم أثناء الكوارث، حقيبة النجاة 72 ساعة، وأرقام النجدة العاجلة.'
              : 'Informations exclusives et adaptées aux 24 gouvernorats tunisiens : carte de vigilance, consignes de survie, kit d\'urgence 72h et secours directs.'}
          </p>
        </div>

        {/* The 3 Core Threat Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8">
          {/* Flood Button */}
          <button
            onClick={() => {
              onSelectHazard('flood');
              onScrollToSection('hazard-guides');
            }}
            id="btn-select-flood"
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
              selectedHazard === 'flood'
                ? 'bg-blue-900/60 border-blue-400 ring-2 ring-blue-500/30 shadow-lg'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Waves className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-base text-white flex items-center justify-between">
                <span>{isAr ? 'فيضانات وأودية' : 'Inondations & Oueds'}</span>
                <Arrow className="w-4 h-4 text-blue-400 opacity-80" />
              </div>
              <p className="text-xs text-slate-300 truncate">
                {isAr ? 'مجردة، مليان، نابل، مسالك منخفضة' : 'Medjerda, Meliane, Nabeul, radiers'}
              </p>
            </div>
          </button>

          {/* Fire Button */}
          <button
            onClick={() => {
              onSelectHazard('fire');
              onScrollToSection('hazard-guides');
            }}
            id="btn-select-fire"
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
              selectedHazard === 'fire'
                ? 'bg-amber-950/60 border-amber-400 ring-2 ring-amber-500/30 shadow-lg'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-base text-white flex items-center justify-between">
                <span>{isAr ? 'حرائق الغابات والمحاصيل' : 'Incendies de Forêts'}</span>
                <Arrow className="w-4 h-4 text-amber-400 opacity-80" />
              </div>
              <p className="text-xs text-slate-300 truncate">
                {isAr ? 'طبرقة، عين دراهم، سجنان، الشعانبي' : 'Tabarka, Aïn Draham, Chaambi'}
              </p>
            </div>
          </button>

          {/* Rain Button */}
          <button
            onClick={() => {
              onSelectHazard('rain');
              onScrollToSection('hazard-guides');
            }}
            id="btn-select-rain"
            className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
              selectedHazard === 'rain'
                ? 'bg-sky-950/60 border-sky-400 ring-2 ring-sky-500/30 shadow-lg'
                : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
            }`}
          >
            <div className="w-12 h-12 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <CloudRain className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-base text-white flex items-center justify-between">
                <span>{isAr ? 'أمطار طوفانية ورعد' : 'Pluies Torrentielles'}</span>
                <Arrow className="w-4 h-4 text-sky-400 opacity-80" />
              </div>
              <p className="text-xs text-slate-300 truncate">
                {isAr ? 'عواصف الخريف، صواعق، مدن كبرى' : 'Orages méditerranéens, foudre'}
              </p>
            </div>
          </button>
        </div>

        {/* Feature Highlights: Early Warning Location Radar & TV Weather Broadcast */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-w-5xl mx-auto mb-6">
          {/* Location-Based Early Warning Card */}
          <button
            onClick={() => onScrollToSection('location-early-warning')}
            id="banner-location-radar-btn"
            className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-red-950/90 via-rose-950/80 to-slate-900 border border-red-500/40 hover:border-red-400 text-left transition-all shadow-lg flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shrink-0 ring-2 ring-red-400/30">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base text-white">
                    {isAr ? 'نظام الإنذار المبكر حسب موقعك' : 'Système d\'Alerte selon Votre Position'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 uppercase">
                    GPS
                  </span>
                </div>
                <p className="text-xs text-rose-200 line-clamp-1">
                  {isAr 
                    ? 'إشعار وصفارة تحذير فورية عند اقتراب خطر داهم من منطقتك' 
                    : 'Alerte immédiate avec sirène lors de l\'approche d\'un danger dans votre zone'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-rose-300 group-hover:text-white shrink-0">
              <span>{isAr ? 'تفعيل' : 'Activer'}</span>
              <Arrow className="w-4 h-4" />
            </div>
          </button>

          {/* Direct TV Weather Map CTA */}
          <button
            onClick={() => onScrollToSection('weather-tv-broadcast')}
            id="banner-weather-tv-btn"
            className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-900/90 via-indigo-900/80 to-slate-900 border border-blue-500/40 hover:border-blue-400 text-left transition-all shadow-lg flex items-center justify-between gap-3 cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shrink-0">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm sm:text-base text-white">
                    {isAr ? 'خريطة النشرة الجوية التلفزية' : 'Carte Bulletin Météo TV'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-red-600 text-white animate-pulse uppercase">
                    {isAr ? 'مباشر' : 'Live'}
                  </span>
                </div>
                <p className="text-xs text-blue-200 line-clamp-1">
                  {isAr 
                    ? 'شاهد الأحوال الجوية في الـ 24 ولاية مثل النشرة الإخبارية التلفزية' 
                    : 'Visualisez les prévisions météo des 24 gouvernorats'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-blue-300 group-hover:text-white shrink-0">
              <span>{isAr ? 'عرض' : 'Voir'}</span>
              <Arrow className="w-4 h-4" />
            </div>
          </button>
        </div>

        {/* Quick Dial Emergency Ticker */}
        <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700 max-w-5xl mx-auto shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-full bg-red-600/30 text-red-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-red-400">
                  {isAr ? 'أرقام النجدة العاجلة في تونس' : 'Numéros d\'urgence officiels (Gratuits)'}
                </span>
                <p className="text-xs text-slate-300">
                  {isAr
                    ? 'اضغط على أي رقم للاتصال الفوري المباشر بفرق الإنقاذ'
                    : 'Cliquez sur un numéro pour appeler directement sans délai'}
                </p>
              </div>
            </div>

            {/* Quick dialing pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full md:w-auto">
              <a
                href="tel:198"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-sm transition-all shadow-xs"
              >
                <span>198</span>
                <span className="text-xs font-normal opacity-90">{isAr ? 'الحماية' : 'Prot. Civile'}</span>
              </a>
              <a
                href="tel:193"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-all shadow-xs"
              >
                <span>193</span>
                <span className="text-xs font-normal opacity-90">{isAr ? 'الحرس' : 'Garde Nat.'}</span>
              </a>
              <a
                href="tel:197"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm transition-all shadow-xs"
              >
                <span>197</span>
                <span className="text-xs font-normal opacity-90">{isAr ? 'الشرطة' : 'Police'}</span>
              </a>
              <a
                href="tel:80101212"
                className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs transition-all shadow-xs"
                title="Direction Générale des Forêts"
              >
                <span>80 10 12 12</span>
                <span className="text-[11px] font-normal opacity-90">{isAr ? 'الغابات' : 'Forêts'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
