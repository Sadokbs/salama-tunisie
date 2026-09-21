import React from 'react';
import { Shield, PhoneCall, AlertTriangle, Languages, Bot, Tv, Radio } from 'lucide-react';

interface NavbarProps {
  lang: 'fr' | 'ar';
  onToggleLang: () => void;
  onOpenAdvisor: () => void;
  onOpenReportModal: () => void;
  onScrollToMeteo?: () => void;
  onScrollToLocationAlert?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onOpenAdvisor,
  onOpenReportModal,
  onScrollToMeteo,
  onScrollToLocationAlert,
}) => {
  const isAr = lang === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Top Emergency Red Alert Bar */}
      <div className="bg-red-700 text-white px-4 py-1.5 text-xs sm:text-sm font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
            </span>
            <span>
              {isAr
                ? 'النجدة الفورية في كامل تراب الجمهورية التونسية: الحماية المدنية 198 | الحرس الوطني 193'
                : 'Urgences vitales sur tout le territoire tunisien : Protection Civile 198 | Garde Nationale 193'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:198"
              className="inline-flex items-center gap-1.5 bg-white text-red-700 font-bold px-2.5 py-0.5 rounded hover:bg-red-50 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>198 {isAr ? 'اتصال مباشر' : 'Appel Direct'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Emblem */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20 ring-2 ring-red-100">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
                  Salama<span className="text-red-600">.TN</span>
                </span>
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full">
                  تونس
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                {isAr
                  ? 'المنظومة التونسية للوقاية من الأمطار، الحرائق والفيضانات'
                  : 'Plateforme Tunisienne de Prévention des Pluies, Incendies & Inondations'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Tools */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Location Early Warning Direct Button */}
            {onScrollToLocationAlert && (
              <button
                onClick={onScrollToLocationAlert}
                id="navbar-location-alert-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-rose-900 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors cursor-pointer"
                title={isAr ? 'نظام الإنذار المبكر لموقعي' : 'Alerte Danger Proximité'}
              >
                <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
                <span className="hidden lg:inline">
                  {isAr ? 'إنذار منطقتي' : 'Alerte Ma Zone'}
                </span>
                <span className="lg:hidden">
                  {isAr ? 'إنذار' : 'Alerte'}
                </span>
              </button>
            )}

            {/* TV Weather Map Direct Button */}
            {onScrollToMeteo && (
              <button
                onClick={onScrollToMeteo}
                id="navbar-meteo-btn"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                title={isAr ? 'خريطة النشرة الجوية' : 'Bulletin Météo TV'}
              >
                <Tv className="w-4 h-4 text-blue-600" />
                <span className="hidden lg:inline">
                  {isAr ? 'النشرة الجوية التلفزية' : 'Météo TV'}
                </span>
                <span className="lg:hidden">
                  {isAr ? 'الطقس' : 'Météo'}
                </span>
              </button>
            )}

            {/* AI Advisor Button */}
            <button
              onClick={onOpenAdvisor}
              id="navbar-advisor-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition-colors shadow-2xs cursor-pointer"
              title={isAr ? 'المستشار الذكي للطوارئ' : 'Assistant IA de Secours'}
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span className="hidden md:inline">
                {isAr ? 'مستشار سلامة الذكي' : 'Assistant Salama IA'}
              </span>
              <span className="md:hidden">IA</span>
            </button>

            {/* Signal incident button */}
            <button
              onClick={onOpenReportModal}
              id="navbar-report-btn"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">
                {isAr ? 'إشعار عن خطر' : 'Signaler un danger'}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              id="navbar-lang-toggle"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4 text-slate-600" />
              <span className="font-bold">{isAr ? 'Français' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

