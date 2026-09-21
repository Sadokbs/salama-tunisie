import React, { useState } from 'react';
import { CitizenAlert, Governorate } from '../types';
import { 
  AlertTriangle, 
  ThumbsUp, 
  MapPin, 
  Clock, 
  PlusCircle, 
  CheckCircle, 
  Waves, 
  Flame, 
  CloudRain, 
  ShieldAlert,
  X
} from 'lucide-react';

interface CitizenAlertsFeedProps {
  alerts: CitizenAlert[];
  governorates: Governorate[];
  lang: 'fr' | 'ar';
  confirmedAlertIds?: string[];
  onUpvote: (id: string) => void;
  onSubmitReport: (report: {
    governorateId: string;
    delegation: string;
    type: string;
    severity: string;
    title: string;
    description: string;
  }) => Promise<void>;
  isReportModalOpen: boolean;
  onCloseReportModal: () => void;
  onOpenReportModal: () => void;
}

export const CitizenAlertsFeed: React.FC<CitizenAlertsFeedProps> = ({
  alerts,
  governorates,
  lang,
  confirmedAlertIds = [],
  onUpvote,
  onSubmitReport,
  isReportModalOpen,
  onCloseReportModal,
  onOpenReportModal,
}) => {
  const isAr = lang === 'ar';

  const [formGovId, setFormGovId] = useState(governorates[0]?.id || 'tunis');
  const [formDelegation, setFormDelegation] = useState('');
  const [formType, setFormType] = useState('oued_crue');
  const [formSeverity, setFormSeverity] = useState('danger');
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formDelegation || !formTitle || !formDescription) return;

    setSubmitting(true);
    try {
      await onSubmitReport({
        governorateId: formGovId,
        delegation: formDelegation,
        type: formType,
        severity: formSeverity,
        title: formTitle,
        description: formDescription,
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        onCloseReportModal();
        setFormDelegation('');
        setFormTitle('');
        setFormDescription('');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'fire':
        return <Flame className="w-4 h-4 text-amber-600" />;
      case 'inondation':
      case 'oued_crue':
        return <Waves className="w-4 h-4 text-blue-600" />;
      default:
        return <CloudRain className="w-4 h-4 text-sky-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'urgence_absolue':
        return 'bg-red-600 text-white font-extrabold';
      case 'danger':
        return 'bg-orange-500 text-white font-bold';
      default:
        return 'bg-amber-100 text-amber-900 border border-amber-300 font-semibold';
    }
  };

  return (
    <section id="alerts-feed-section" className="py-12 bg-slate-50 border-b border-slate-200" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-semibold mb-2 border border-amber-200">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>{isAr ? 'شبكة اليقظة الميدانية للمواطنين' : 'Veille Citoyenne & Terrain'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isAr ? 'بلاغات الخطر الميدانية في تونس' : 'Alertes Directes sur les Routes et Oueds'}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {isAr
                ? 'متابعة حية للطرقات المقطوعة، منسوب الأودية وبدايات الدخان بالاعتماد على إشعارات المواطنين والتحقق منها.'
                : 'Suivi collaboratif des radiers submergés, montées des eaux et départs de feu signalés en Tunisie.'}
            </p>
          </div>

          <button
            onClick={onOpenReportModal}
            id="btn-open-report-modal"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isAr ? 'إرسال إشعار عن خطر' : 'Signaler une situation'}</span>
          </button>
        </div>

        {/* Alerts Grid or Empty State */}
        {alerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              {isAr ? 'لا توجد بلاغات ميدانية عن مخاطر حالياً' : 'Aucun incident signalé sur le terrain'}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto mb-6">
              {isAr
                ? 'الوضع مستقر وحركة المرور عادية على الطرقات والأودية. إذا شاهدت تجمّع مياه، وادياً في فيضان أو طريقاً مقطوعة، أرسل بلاغك فوراً لمساعدة بقية المواطنين.'
                : 'Situation stable sur les axes routiers et bassins versants. Si vous constatez un oued en crue ou une route inondée, publiez un signalement pour informer les autres usagers.'}
            </p>
            <button
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4" />
              <span>{isAr ? 'إبلاغ عن حالة خطر أو طريق مغمور' : 'Signaler un danger sur le terrain'}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="p-1.5 rounded-lg bg-slate-100 flex items-center justify-center">
                        {getAlertIcon(alert.type)}
                      </span>
                      <span className="font-bold text-sm text-slate-900">
                        {alert.governorateName} &bull; {alert.delegation}
                      </span>
                      {alert.verified && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-200">
                          <CheckCircle className="w-3 h-3" />
                          {isAr ? 'مؤكد' : 'Vérifié'}
                        </span>
                      )}
                    </div>

                    <span
                      className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${getSeverityBadge(
                        alert.severity
                      )}`}
                    >
                      {alert.severity === 'urgence_absolue'
                        ? isAr
                          ? 'طوارئ قصوى'
                          : 'Urgence'
                        : alert.severity === 'danger'
                        ? isAr
                          ? 'خطر'
                          : 'Danger'
                        : isAr
                        ? 'انتباه'
                        : 'Attention'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-slate-900 mb-2">
                    {alert.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {alert.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{alert.reportedAt}</span>
                  </span>

                  {(() => {
                    const isConfirmed = confirmedAlertIds.includes(alert.id);
                    return (
                      <button
                        onClick={() => onUpvote(alert.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          isConfirmed
                            ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400/30'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                        title={
                          isConfirmed
                            ? (isAr ? 'قمت بتأكيد هذا البلاغ (اضغط لإلغاء التأكيد)' : 'Vous avez confirmé cette alerte (cliquez pour retirer)')
                            : (isAr ? 'تأكيد صحة هذه المعلومة الميدانية' : 'Confirmer cette information sur le terrain')
                        }
                      >
                        <ThumbsUp className={`w-3.5 h-3.5 ${isConfirmed ? 'fill-white text-white' : 'text-slate-500'}`} />
                        <span>
                          {alert.upvotes} {isConfirmed ? (isAr ? 'مؤكّد من طرفك ✓' : 'Confirmé ✓') : (isAr ? 'تأكيد' : 'confirmations')}
                        </span>
                      </button>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for reporting an incident */}
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200"
              dir={isAr ? 'rtl' : 'ltr'}
            >
              <button
                onClick={onCloseReportModal}
                className={`absolute top-4 ${isAr ? 'left-4' : 'right-4'} p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <ShieldAlert className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isAr ? 'إشعار مسؤول' : 'Signalement Responsable'}
                </span>
              </div>

              <h4 className="text-xl font-extrabold text-slate-900 mb-1">
                {isAr ? 'الإبلاغ عن حالة خطر أو طريق مغمور' : 'Signaler un danger sur le terrain'}
              </h4>
              <p className="text-xs text-slate-500 mb-6">
                {isAr
                  ? 'يرجى تحري الدقة والمصداقية لمساعدة المواطنين والمسافرين على تجنب المسالك الخطرة.'
                  : 'Aidez les citoyens et automobilistes à anticiper les points de blocage et débordements.'}
              </p>

              {submitSuccess ? (
                <div className="py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-slate-900 text-base">
                    {isAr ? 'تم تسجيل بلاغك بنجاح' : 'Signalement publié avec succès'}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1">
                    {isAr ? 'شكراً لمساهمتك في حماية المواطنين.' : 'Merci pour votre vigilance citoyenne.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'الولاية :' : 'Gouvernorat :'}
                      </label>
                      <select
                        value={formGovId}
                        onChange={(e) => setFormGovId(e.target.value)}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                      >
                        {governorates.map((gov) => (
                          <option key={gov.id} value={gov.id}>
                            {isAr ? gov.nameAr : gov.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'المعتمدية / المنطقة :' : 'Délégation / Lieu :'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formDelegation}
                        onChange={(e) => setFormDelegation(e.target.value)}
                        placeholder={isAr ? 'مثال: مجاز الباب، طبرقة...' : 'Ex: Boussalem, Radès...'}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'نوع الخطر :' : 'Nature du risque :'}
                      </label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value)}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                      >
                        <option value="oued_crue">{isAr ? 'فيضان وادٍ / جسر' : 'Oued en crue / Radier'}</option>
                        <option value="route_coupee">{isAr ? 'طريق مقطوع بمياه الأمطار' : 'Route coupée'}</option>
                        <option value="fire">{isAr ? 'حريق غابة أو محصول' : 'Incendie / Fumée'}</option>
                        <option value="inondation">{isAr ? 'غرق حي أو منازل' : 'Inondation urbaine'}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isAr ? 'درجة الخطورة :' : 'Gravité :'}
                      </label>
                      <select
                        value={formSeverity}
                        onChange={(e) => setFormSeverity(e.target.value)}
                        className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                      >
                        <option value="danger">{isAr ? 'خطر مرتفع' : 'Danger avéré'}</option>
                        <option value="urgence_absolue">{isAr ? 'طوارئ قصوى (خطر على الأرواح)' : 'Urgence absolue'}</option>
                        <option value="attention">{isAr ? 'انتباه وحذر' : 'Attention / Ralentissement'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'عنوان البلاغ المباشر :' : 'Titre concis de l\'alerte :'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder={isAr ? 'مثال: انقطاع حركة المرور بالطريق الوطنية...' : 'Ex: Radier submergé au PK 14...'}
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAr ? 'تفاصيل ونصيحة للمواطنين :' : 'Description et conseils :'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      placeholder={isAr ? 'صف حالة الطريق، عمق المياه، أو مسالك تفادي الخطر...' : 'Précisez l\'état du courant, la hauteur d\'eau ou la trajectoire du feu...'}
                      className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onCloseReportModal}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      {isAr ? 'إلغاء' : 'Annuler'}
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      {submitting ? (isAr ? 'جارٍ النشر...' : 'Publication...') : isAr ? 'نشر البلاغ' : 'Publier l\'alerte'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
