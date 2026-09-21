import React from 'react';
import { Shield, PhoneCall, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: 'fr' | 'ar';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isAr = lang === 'ar';

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Salama<span className="text-red-500">.TN</span> - {isAr ? 'سلامة تونس' : 'Tunisie'}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md mb-4">
              {isAr
                ? 'منصة وطنية للمواطنين والمسافرين في تونس للوقاية الشاملة من أخطار الأمطار الغزيرة، حرائق الغابات وفيضانات الأودية عبر كافة الولايات الـ 24.'
                : 'Plateforme citoyenne d\'intérêt général dédiée exclusivement à la République Tunisienne pour la prévention opérationnelle contre les pluies torrentielles, feux de forêts et crues d\'oueds.'}
            </p>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-950 text-red-300 border border-red-800 font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>198 {isAr ? 'الحماية المدنية' : 'Protection Civile'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                <span>193 {isAr ? 'الحرس الوطني' : 'Garde Nationale'}</span>
              </span>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-3">
              {isAr ? 'أقسام المنظومة' : 'Navigation Rapide'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#governorates-section" className="hover:text-white transition-colors">
                  {isAr ? 'خريطة ولايات تونس (24 ولاية)' : 'Observatoire des 24 Gouvernorats'}
                </a>
              </li>
              <li>
                <a href="#hazard-guides" className="hover:text-white transition-colors">
                  {isAr ? 'أدلة التصرف (أمطار / حرائق / فيضانات)' : 'Guides Inondations, Incendies & Pluies'}
                </a>
              </li>
              <li>
                <a href="#kit-section" className="hover:text-white transition-colors">
                  {isAr ? 'حقيبة النجاة 72 ساعة' : 'Trousse de Survie 72h'}
                </a>
              </li>
              <li>
                <a href="#simulator-section" className="hover:text-white transition-colors">
                  {isAr ? 'تشخيص درجة خطورة المسكن' : 'Diagnostic de Vulnérabilité'}
                </a>
              </li>
              <li>
                <a href="#directory-section" className="hover:text-white transition-colors">
                  {isAr ? 'أرقام النجدة وترددات الراديو' : 'Annuaire & Fréquences Radio'}
                </a>
              </li>
            </ul>
          </div>

          {/* Public Services Info */}
          <div>
            <h5 className="font-bold text-sm text-white uppercase tracking-wider mb-3">
              {isAr ? 'الهياكل الرسمية المتدخلة' : 'Institutions de Secours'}
            </h5>
            <ul className="space-y-2 text-xs">
              <li>ONPC - Office National de la Protection Civile</li>
              <li>Direction Générale de la Garde Nationale</li>
              <li>Direction Générale des Forêts (DGF)</li>
              <li>Institut National de la Météorologie (INM)</li>
              <li>STEG &bull; SONEDE &bull; Ministère de l'Équipement</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Salama.TN &bull; {isAr ? 'مخصص حصرياً للجمهورية التونسية' : 'Exclusif République Tunisienne'}.
          </div>
          <div className="flex items-center gap-1">
            <span>{isAr ? 'من أجل تونس آمنة ومحمية' : 'Dédié à la sécurité de tous les citoyens en Tunisie'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
