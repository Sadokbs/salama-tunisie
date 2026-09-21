import React, { useState, useEffect } from 'react';
import { EmergencyKitItem } from '../types';
import { EMERGENCY_KIT_ITEMS } from '../data/tunisiaData';
import { Briefcase, CheckCircle2, Circle, AlertCircle, RefreshCw, Printer, ShieldCheck } from 'lucide-react';

interface EmergencyKitCheckerProps {
  lang: 'fr' | 'ar';
}

const STORAGE_KEY = 'salama_tn_kit_state';

export const EmergencyKitChecker: React.FC<EmergencyKitCheckerProps> = ({ lang }) => {
  const isAr = lang === 'ar';
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setCheckedIds(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleItem = (id: string) => {
    const next = checkedIds.includes(id)
      ? checkedIds.filter((item) => item !== id)
      : [...checkedIds, id];
    setCheckedIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const resetAll = () => {
    setCheckedIds([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const categories = [
    { id: 'all', label: isAr ? 'جميع المحتويات' : 'Tous les éléments' },
    { id: 'survie', label: isAr ? 'البقاء والماء والغذاء' : 'Survie & Eau' },
    { id: 'communication', label: isAr ? 'الاتصال والإنارة' : 'Communication & Éclairage' },
    { id: 'sante', label: isAr ? 'الصحة والإسعاف' : 'Santé & Soins' },
    { id: 'documents', label: isAr ? 'الوثائق الرسمية' : 'Documents' },
  ];

  const filteredItems = EMERGENCY_KIT_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const totalCount = EMERGENCY_KIT_ITEMS.length;
  const completedCount = checkedIds.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="kit-section" className="py-12 bg-slate-50 border-b border-slate-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2 border border-emerald-200">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isAr ? 'حقيبة النجاة العائلية 72 ساعة' : 'Trousse Familiale d\'Urgence 72h'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {isAr ? 'قائمة تفقد حقيبة الطوارئ في تونس' : 'Le Sac d\'Urgence 72 Heures : Êtes-vous Prêts ?'}
              </h3>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                {isAr
                  ? 'في حال انقطاع الماء الصالح للشرب، الكهرباء أو محاصرة السيول لمنزلك، تضمن هذه الحقيبة صمود عائلتك لمدة 3 أيام كاملة دون مساعدة خارجية.'
                  : 'En cas de coupure prolongée d\'électricité (STEG), de réseau d\'eau (SONEDE) ou de routes submergées, ce sac assure votre autonomie vitale pendant 3 jours.'}
              </p>
            </div>

            {/* Progress Card */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0 min-w-[240px]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                <span>{isAr ? 'نسبة الجاهزية العائلية :' : 'Niveau de préparation :'}</span>
                <span className="text-base text-emerald-700">{progressPct}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    progressPct < 35
                      ? 'bg-amber-500'
                      : progressPct < 75
                      ? 'bg-sky-500'
                      : 'bg-emerald-600'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-2 flex items-center justify-between">
                <span>
                  {completedCount} / {totalCount} {isAr ? 'عنصر جاهز' : 'éléments prêts'}
                </span>
                {progressPct === 100 && (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {isAr ? 'جاهز 100%' : 'Complet !'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action toolbar & filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 my-6">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Utility buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                title="Imprimer la liste pour la coller sur le réfrigérateur"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{isAr ? 'طباعة القائمة' : 'Imprimer'}</span>
              </button>

              <button
                onClick={resetAll}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
                title="Réinitialiser la liste"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{isAr ? 'إعادة ضبط' : 'Réinitialiser'}</span>
              </button>
            </div>
          </div>

          {/* Items Checklist Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredItems.map((item) => {
              const isChecked = checkedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-200'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-sm font-bold ${
                          isChecked ? 'line-through text-slate-500' : 'text-slate-900'
                        }`}
                      >
                        {isAr ? item.labelAr : item.label}
                      </span>
                      {item.isCrucial && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-red-100 text-red-800 rounded border border-red-200">
                          {isAr ? 'ضروري' : 'Indispensable'}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 font-medium mb-1">
                      {item.quantityNote}
                    </p>

                    <div className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <strong>{isAr ? 'الأهمية في تونس : ' : 'Pourquoi en Tunisie : '}</strong>
                      {item.whyCrucial}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advice Footer */}
          <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>{isAr ? 'نصيحة ذهبية للحماية المدنية : ' : 'Conseil opérationnel : '}</strong>
              {isAr
                ? 'ضع الحقيبة دائماً في مكان يسهل الوصول إليه بالقرب من باب الخروج الرئيسي، وتفقد تواريخ صلوحية الأدوية والمياه كل 6 أشهر.'
                : 'Placez ce sac toujours à un endroit accessible proche de la sortie principale (jamais dans un garage ou sous-sol) et renouvelez les bouteilles d\'eau et piles tous les 6 mois.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
