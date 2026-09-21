import React, { useState } from 'react';
import { HazardType, HazardGuide } from '../types';
import { HAZARD_GUIDES } from '../data/tunisiaData';
import { 
  Waves, 
  Flame, 
  CloudRain, 
  AlertOctagon, 
  CheckCircle2, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  ChevronLeft,
  Bot,
  Info
} from 'lucide-react';

interface HazardTabsProps {
  selectedHazard: HazardType;
  onSelectHazard: (hazard: HazardType) => void;
  lang: 'fr' | 'ar';
  onAskAdvisor: (question: string) => void;
}

export const HazardTabs: React.FC<HazardTabsProps> = ({
  selectedHazard,
  onSelectHazard,
  lang,
  onAskAdvisor,
}) => {
  const isAr = lang === 'ar';
  const [activePhase, setActivePhase] = useState<'during' | 'before' | 'after'>('during');

  const currentGuide: HazardGuide =
    HAZARD_GUIDES.find((g) => g.id === selectedHazard) || HAZARD_GUIDES[0];

  const getHazardIcon = (id: HazardType, className = 'w-5 h-5') => {
    switch (id) {
      case 'flood':
        return <Waves className={className} />;
      case 'fire':
        return <Flame className={className} />;
      case 'rain':
        return <CloudRain className={className} />;
    }
  };

  const getSteps = () => {
    switch (activePhase) {
      case 'before':
        return currentGuide.before;
      case 'during':
        return currentGuide.during;
      case 'after':
        return currentGuide.after;
    }
  };

  return (
    <section id="hazard-guides" className="py-12 bg-white border-b border-slate-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-2 border border-red-200">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isAr ? 'أدلة التصرف والحماية الحيوية' : 'Guides Pratiques de Sauvegarde'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isAr ? 'كيف تتصرف قبل، أثناء وبعد الكارثة ؟' : 'Que faire : Avant, Pendant et Après l\'événement'}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {isAr
              ? 'تعليمات دقيقة ومفصلة تم إعدادها بالاعتماد على بروتوكولات الحماية المدنية التونسية لإنقاذ الأرواح وحماية الممتلكات.'
              : 'Protocoles opérationnels calqués sur les recommandations de la Protection Civile Tunisienne pour éviter les drames humains.'}
          </p>
        </div>

        {/* Hazard Selector Switcher */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8">
          {HAZARD_GUIDES.map((guide) => {
            const isSelected = guide.id === selectedHazard;
            return (
              <button
                key={guide.id}
                onClick={() => onSelectHazard(guide.id)}
                id={`tab-hazard-${guide.id}`}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border ${
                  isSelected
                    ? guide.id === 'flood'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20'
                      : guide.id === 'fire'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20'
                      : 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {getHazardIcon(guide.id, 'w-4 h-4')}
                <span>{isAr ? guide.titleAr : guide.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Hazard Hero Banner */}
        <div className={`p-6 rounded-2xl border mb-8 ${currentGuide.accentBg} ${currentGuide.borderColor} border-l-4 sm:border-l-8`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider opacity-80 mb-1">
                {getHazardIcon(currentGuide.id, 'w-4 h-4')}
                <span>{isAr ? 'التهديد المختار' : 'Danger Spécifique en Tunisie'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                {isAr ? currentGuide.titleAr : currentGuide.title}
              </h3>
              <p className="text-sm text-slate-800 leading-relaxed max-w-3xl">
                {isAr ? currentGuide.headlineAr : currentGuide.headline}
              </p>
            </div>

            {/* AI Prompt Button for this threat */}
            <button
              onClick={() => {
                const q = isAr
                  ? `ما هي أهم الإجراءات لحماية عائلتي من ${currentGuide.titleAr} في تونس؟`
                  : `Quelles sont les consignes vitales pour se protéger contre ${currentGuide.title} en Tunisie ?`;
                onAskAdvisor(q);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-slate-900 border border-slate-300 hover:border-slate-400 font-bold text-xs shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>{isAr ? 'استشر المساعد الذكي حول هذا الخطر' : 'Interroger l\'assistant IA'}</span>
            </button>
          </div>

          {/* Tunisian context callout */}
          <div className="mt-4 pt-4 border-t border-slate-200/60 flex items-start gap-2.5 text-xs text-slate-700">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <span>
              <strong>{isAr ? 'الخصوصية التونسية : ' : 'Spécificité tunisienne : '}</strong>
              {isAr ? currentGuide.tunisiaContextAr : currentGuide.tunisiaContext}
            </span>
          </div>
        </div>

        {/* Golden Rules: "Règles d'or vitales" */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <AlertOctagon className="w-5 h-5 text-red-600" />
            <h4 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
              {isAr ? 'القواعد الذهبية الحيوية (عدم احترامها يسبب الوفاة) :' : 'Règles d\'or vitales (À respecter impérativement) :'}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentGuide.goldenRules.map((gr, idx) => (
              <div
                key={idx}
                className="bg-red-50/70 border border-red-200 rounded-xl p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-red-700 font-extrabold text-xs mb-2">
                    <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{isAr ? 'قاعدة مصيرية' : 'RÈGLE ABSOLUE'}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                    {isAr ? gr.ruleAr : gr.rule}
                  </p>
                </div>
                <div className="mt-2 text-xs text-red-800 bg-red-100/70 p-2 rounded-lg border border-red-200/80">
                  <strong>{isAr ? 'لماذا ؟ ' : 'Pourquoi : '}</strong>
                  {isAr ? gr.warningAr : gr.warning}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phase Timeline Tabs: Avant - Pendant - Après */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
          {/* Phase Switch Buttons */}
          <div className="flex border-b border-slate-200 pb-4 mb-6 gap-2 sm:gap-4">
            <button
              onClick={() => setActivePhase('during')}
              id="phase-btn-during"
              className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activePhase === 'during'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{isAr ? '2. أثناء وقوع الخطر (طوارئ)' : '2. PENDANT (Urgence Active)'}</span>
            </button>

            <button
              onClick={() => setActivePhase('before')}
              id="phase-btn-before"
              className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activePhase === 'before'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{isAr ? '1. قبل الكارثة (الوقاية)' : '1. AVANT (Prévention)'}</span>
            </button>

            <button
              onClick={() => setActivePhase('after')}
              id="phase-btn-after"
              className={`flex-1 py-2.5 sm:py-3 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activePhase === 'after'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? '3. بعد الكارثة (التعافي)' : '3. APRÈS (Sécurisation)'}</span>
            </button>
          </div>

          {/* Phase Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getSteps().map((step, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border bg-white transition-all ${
                  step.isCrucial
                    ? 'border-red-300 ring-1 ring-red-100 shadow-xs'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      step.isCrucial
                        ? 'bg-red-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <span className="font-extrabold text-sm">{idx + 1}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-bold text-sm sm:text-base text-slate-900">
                        {isAr ? step.titleAr : step.title}
                      </h5>
                      {step.isCrucial && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 bg-red-100 text-red-800 rounded border border-red-200">
                          {isAr ? 'حيوي' : 'VITAL'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {isAr ? step.detailsAr : step.details}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
