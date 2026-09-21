import React from 'react';
import { EmergencyContact } from '../types';
import { TUNISIA_EMERGENCY_CONTACTS } from '../data/tunisiaData';
import { PhoneCall, Radio, Shield, AlertTriangle, ExternalLink } from 'lucide-react';

interface EmergencyDirectoryProps {
  lang: 'fr' | 'ar';
}

export const EmergencyDirectory: React.FC<EmergencyDirectoryProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  const radioStations = [
    {
      name: 'Radio Nationale Tunisienne (الإذاعة الوطنية)',
      freq: '102.7 FM (Grand Tunis) & réseau national',
      descFr: 'Station officielle de diffusion des communiqués des commissions régionales de lutte contre les catastrophes.',
      descAr: 'المحطة الرسمية المعتمدة لبث بيانات وتوجيهات لجان مجابهة الكوارث وتنظيم النجدة.',
    },
    {
      name: 'RTCI (Chaîne Internationale)',
      freq: '98.2 FM (Tunis) / 92.0 FM (Bizerte)',
      descFr: 'Informations en français, anglais, italien et allemand pour les résidents et touristes.',
      descAr: 'النشرات الإخبارية باللغة الفرنسية واللغات الأجنبية للمقيمين والسياح.',
    },
    {
      name: 'Réseau des Radios Régionales Publiques',
      freq: 'Le Kef (90.2), Gafsa (93.5), Sfax (93.0), Tataouine (92.2), Monastir (104.7)',
      descFr: 'Informations ultra-locales sur l\'état des pistes rurales et cours d\'eau régionaux.',
      descAr: 'متابعة ميدانية دقيقة للمسالك الريفية والأودية المحلية في كل جهة.',
    },
  ];

  return (
    <section id="directory-section" className="py-12 bg-white border-b border-slate-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold mb-2 border border-red-200">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{isAr ? 'دليل الاتصال المباشر والنجدة' : 'Annuaire Officiel des Secours'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {isAr ? 'أرقام النجدة الخضراء والمجانية في تونس' : 'Numéros d\'Urgence et Réseaux de Crise en Tunisie'}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            {isAr
              ? 'جميع الأرقام الرسمية تعمل على مدار الساعة (24/24) ومجانية من أي هاتف قار أو جوال.'
              : 'Tous les numéros d\'urgence officiels sont gratuits et joignables 24h/24 depuis n\'importe quel téléphone fixe ou mobile.'}
          </p>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {TUNISIA_EMERGENCY_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-red-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      contact.category === 'vital'
                        ? 'bg-red-100 text-red-800'
                        : contact.category === 'utilites'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {contact.available}
                  </span>
                </div>

                <div className="text-2xl sm:text-3xl font-black text-slate-900 mb-1">
                  {contact.number}
                </div>

                <h4 className="font-bold text-sm text-slate-900 mb-1">
                  {isAr ? contact.titleAr : contact.title}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {isAr ? contact.descriptionAr : contact.description}
                </p>
              </div>

              <a
                href={`tel:${contact.number.replace(/\s+/g, '')}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{isAr ? 'اتصال فوري' : 'Appeler maintenant'}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Emergency Broadcast Radio Frequencies Box */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white">
                {isAr ? 'ترددات البث الإذاعي للطوارئ في تونس' : 'Fréquences Radio d\'Urgence et d\'Évacuation'}
              </h4>
              <p className="text-xs text-slate-400">
                {isAr
                  ? 'عند انقطاع شبكة الإنترنت والهاتف الجوال، اضبط جهاز الراديو الصغير على الترددات التالية :'
                  : 'En cas de panne d\'électricité et de coupure 4G/5G, suivez les ordres d\'évacuation sur ces ondes :'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {radioStations.map((station, i) => (
              <div
                key={i}
                className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 flex flex-col justify-between"
              >
                <div>
                  <div className="font-extrabold text-sm text-amber-400 mb-1">
                    {station.name}
                  </div>
                  <div className="text-xs font-bold text-white bg-slate-700/80 px-2.5 py-1 rounded-lg inline-block mb-2">
                    {station.freq}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {isAr ? station.descAr : station.descFr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
