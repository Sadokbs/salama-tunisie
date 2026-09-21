import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Bell, 
  BellRing, 
  Volume2, 
  VolumeX, 
  AlertOctagon, 
  ShieldAlert, 
  PhoneCall, 
  Share2, 
  Check, 
  Navigation, 
  X, 
  ChevronDown, 
  Sparkles,
  ExternalLink,
  Radio
} from 'lucide-react';
import { Governorate } from '../types';

interface LocationEmergencyAlertProps {
  governorates: Governorate[];
  selectedGovId: string;
  onSelectGov: (gov: Governorate) => void;
  lang: 'fr' | 'ar';
}

const GOV_COORDS: Record<string, { lat: number; lng: number }> = {
  tunis: { lat: 36.8065, lng: 10.1815 },
  ariana: { lat: 36.8663, lng: 10.1956 },
  ben_arous: { lat: 36.7533, lng: 10.2222 },
  manouba: { lat: 36.8081, lng: 10.0972 },
  nabeul: { lat: 36.4513, lng: 10.7357 },
  zaghouan: { lat: 36.4029, lng: 10.1429 },
  bizerte: { lat: 37.2746, lng: 9.8739 },
  beja: { lat: 36.7256, lng: 9.1817 },
  jendouba: { lat: 36.5011, lng: 8.7802 },
  kef: { lat: 36.1742, lng: 8.7049 },
  siliana: { lat: 36.0849, lng: 9.3708 },
  kasserine: { lat: 35.1676, lng: 8.8365 },
  sidi_bouzid: { lat: 35.0382, lng: 9.4849 },
  gafsa: { lat: 34.4250, lng: 8.7842 },
  tozeur: { lat: 33.9197, lng: 8.1335 },
  kebili: { lat: 33.7050, lng: 8.9690 },
  tataouine: { lat: 32.9297, lng: 10.4518 },
  medenine: { lat: 33.3549, lng: 10.5055 },
  gabes: { lat: 33.8815, lng: 10.0982 },
  sfax: { lat: 34.7406, lng: 10.7603 },
  mahdia: { lat: 35.5047, lng: 11.0622 },
  monastir: { lat: 35.7780, lng: 10.8262 },
  sousse: { lat: 35.8256, lng: 10.6084 },
  kairouan: { lat: 35.6781, lng: 10.0963 }
};

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export const LocationEmergencyAlert: React.FC<LocationEmergencyAlertProps> = ({
  governorates,
  selectedGovId,
  onSelectGov,
  lang
}) => {
  const isAr = lang === 'ar';

  // State
  const [userGovId, setUserGovId] = useState<string>(() => {
    return localStorage.getItem('salama_user_gov') || selectedGovId || 'jendouba';
  });
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [gpsDetected, setGpsDetected] = useState(false);
  const [gpsDistance, setGpsDistance] = useState<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [browserNotificationStatus, setBrowserNotificationStatus] = useState<NotificationPermission>('default');
  const [isUrgentModalOpen, setIsUrgentModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [isSimulatingAlert, setIsSimulatingAlert] = useState(false);
  const [activeAudioStop, setActiveAudioStop] = useState<(() => void) | null>(null);

  // Sync with system notification permission on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setBrowserNotificationStatus(Notification.permission);
    }
  }, []);

  // Update selected governorate object
  const currentGov = governorates.find(g => g.id === userGovId) || governorates[0];
  const vigilanceNormalized = (currentGov?.overallVigilance || '').toLowerCase();
  const isSevereDanger = vigilanceNormalized === 'rouge' || vigilanceNormalized === 'orange';

  // Persist user selected/detected governorate
  useEffect(() => {
    localStorage.setItem('salama_user_gov', userGovId);
  }, [userGovId]);

  // Audio Siren Player using Web Audio API
  const playSiren = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(750, now);

      // Two-tone European/Tunisian emergency siren sweep
      for (let i = 0; i < 8; i++) {
        osc.frequency.linearRampToValueAtTime(1150, now + i * 0.35 + 0.17);
        osc.frequency.linearRampToValueAtTime(750, now + i * 0.35 + 0.35);
      }

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 3.0);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 3.0);

      const stopFn = () => {
        try {
          osc.stop();
          ctx.close();
        } catch (_) {}
      };
      setActiveAudioStop(() => stopFn);

      setTimeout(() => {
        setActiveAudioStop(null);
      }, 3100);
    } catch (e) {
      console.warn('Audio siren error:', e);
    }
  };

  const stopActiveSiren = () => {
    if (activeAudioStop) {
      activeAudioStop();
      setActiveAudioStop(null);
    }
  };

  // Dispatch Native Browser Notification
  const sendNativeNotification = (gov: Governorate, customReason?: string) => {
    if (typeof window === 'undefined' || !('Notification' in window)) return;

    const title = isAr
      ? `🚨 إنذار عاجل لمنطقتك: ولاية ${gov.nameAr}`
      : `🚨 Alerte d'Urgence pour votre zone : ${gov.name}`;

    const body = isAr
      ? `${customReason || gov.vigilanceReasonAr}\nاتصل بالحماية المدنية 198 عند أي طارئ.`
      : `${customReason || gov.vigilanceReason}\nAppelez la Protection Civile au 198 en cas d'urgence.`;

    if (Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          tag: 'salama-emergency-' + gov.id,
          requireInteraction: true
        });
      } catch (err) {
        console.warn('Error displaying Notification:', err);
      }
    }
  };

  // Request browser permission for notifications
  const handleRequestNotificationPermission = async () => {
    if (typeof window === 'undefined' || !('Notification' in window)) {
      alert(isAr ? 'المتصفح الحالي لا يدعم إشعارات النظام.' : 'Votre navigateur ne supporte pas les notifications.');
      return;
    }
    try {
      const permission = await Notification.requestPermission();
      setBrowserNotificationStatus(permission);
      if (permission === 'granted' && currentGov) {
        sendNativeNotification(
          currentGov,
          isAr
            ? `تم تفعيل نظام الإنذار المبكر لموقعك في ولاية ${currentGov.nameAr} بنجاح.`
            : `Système d'alerte précoce activé avec succès pour le gouvernorat de ${currentGov.name}.`
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Detect GPS Position & find closest Tunisian Governorate
  const handleDetectGps = () => {
    if (!navigator.geolocation) {
      alert(isAr ? 'خدمة تحديد الموقع الجغرافي غير متوفرة في جهازك.' : 'La géolocalisation n\'est pas supportée.');
      return;
    }

    setIsDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let minDistance = Infinity;
        let closestGovId = 'tunis';

        for (const [id, coords] of Object.entries(GOV_COORDS)) {
          const dist = getDistanceKm(latitude, longitude, coords.lat, coords.lng);
          if (dist < minDistance) {
            minDistance = dist;
            closestGovId = id;
          }
        }

        setUserGovId(closestGovId);
        const matched = governorates.find(g => g.id === closestGovId);
        if (matched) {
          onSelectGov(matched);
        }
        setGpsDetected(true);
        setGpsDistance(Math.round(minDistance));
        setIsDetectingGps(false);

        // If high risk in this detected location, prompt alert
        if (matched && (matched.overallVigilance.toLowerCase() === 'rouge' || matched.overallVigilance.toLowerCase() === 'orange')) {
          playSiren();
          sendNativeNotification(matched);
          setIsUrgentModalOpen(true);
        }
      },
      (error) => {
        console.warn('Geolocation error:', error);
        setIsDetectingGps(false);
        alert(
          isAr
            ? 'تعذر الوصول للموقع الجغرافي. يرجى تفعيل إذن الموقع في المتصفح أو اختيار ولايتك يدوياً من القائمة.'
            : 'Impossible d\'obtenir votre position GPS. Veuillez autoriser la localisation ou sélectionner manuellement votre gouvernorat.'
        );
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  // Trigger Immediate Test / Simulation of Danger
  const handleTestAlert = () => {
    setIsSimulatingAlert(true);
    playSiren();
    sendNativeNotification(
      currentGov,
      isAr
        ? `[تجربة إنذار]: خطر فيضان وسيول قادمة في ولاية ${currentGov.nameAr}! اقطع الكهرباء واصعد للأماكن المرتفعة فوراً.`
        : `[Test d'alerte] : Crue imminente dans le gouvernorat de ${currentGov.name} ! Coupez le courant et montez aux étages.`
    );
    setIsUrgentModalOpen(true);
    setTimeout(() => {
      setIsSimulatingAlert(false);
    }, 4000);
  };

  // WhatsApp Alert Share Message
  const getWhatsAppShareUrl = () => {
    const text = isAr
      ? `🚨 *تحذير عاجل من منظومة سلامة تونس (Salama.TN)*:\nتشهد ولاية *${currentGov.nameAr}* حالياً مستوى إنذار [${currentGov.overallVigilance === 'Rouge' ? '🔴 أحمر (يقظة قصوى)' : '🟠 برتقالي'}]!\n⚠️ *طبيعة الخطر:* ${currentGov.vigilanceReasonAr}\n\n*التعليمات الفورية لإنقاذ الأرواح:*\n1. قطع الكهرباء والغاز من القاطع العام فوراً.\n2. الصعود للأماكن المرتفعة وتجنب الأقبية.\n3. منع عبور الأودية بالسيارة أو راجلاً.\n4. للنجدة الفورية: الحماية المدنية 198 | الحرس الوطني 193.`
      : `🚨 *ALERTE D'URGENCE SALAMA.TN* :\nLe gouvernorat de *${currentGov.name}* est placé en vigilance [${currentGov.overallVigilance === 'Rouge' ? '🔴 ROUGE' : '🟠 ORANGE'}] !\n⚠️ *Motif :* ${currentGov.vigilanceReason}\n\n*Consignes vitales :*\n1. Coupez le disjoncteur général STEG immédiatement.\n2. Réfugiez-vous dans les étages supérieurs.\n3. Ne traversez jamais un oued en crue.\n4. Secours : Protection Civile 198 | Garde Nationale 193.`;

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  const handleCopyAlertText = () => {
    const text = isAr
      ? `تحذير عاجل: إنذار ${currentGov.overallVigilance} في ولاية ${currentGov.nameAr}! خطر: ${currentGov.vigilanceReasonAr}. الحماية المدنية: 198`
      : `Alerte urgente : Vigilance ${currentGov.overallVigilance} pour ${currentGov.name} ! Protection Civile : 198`;
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  return (
    <>
      {/* Main Smart Location Banner Component */}
      <div 
        id="location-early-warning"
        className={`rounded-2xl border transition-all duration-300 shadow-md overflow-hidden mb-6 ${
          vigilanceNormalized === 'rouge'
            ? 'bg-gradient-to-r from-red-900 via-red-800 to-rose-950 text-white border-red-500 shadow-red-900/30 ring-2 ring-red-500/50'
            : vigilanceNormalized === 'orange'
            ? 'bg-gradient-to-r from-amber-950 via-orange-900 to-amber-900 text-white border-orange-500 shadow-orange-950/30'
            : 'bg-white text-slate-900 border-slate-200'
        }`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            
            {/* Left: Location & Danger Status */}
            <div className="flex items-start sm:items-center gap-3.5 flex-1">
              <div 
                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  vigilanceNormalized === 'rouge'
                    ? 'bg-red-600 text-white animate-pulse'
                    : vigilanceNormalized === 'orange'
                    ? 'bg-orange-500 text-white'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {vigilanceNormalized === 'rouge' ? (
                  <AlertOctagon className="w-7 h-7 animate-bounce" />
                ) : (
                  <Radio className="w-6 h-6" />
                )}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5 bg-black/25 backdrop-blur border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    {isAr ? 'نظام الإنذار المبكر الجغرافي' : 'Système d\'Alerte Précoce de Proximité'}
                  </span>

                  {/* Vigilance Badge */}
                  <span 
                    className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${
                      vigilanceNormalized === 'rouge'
                        ? 'bg-red-600 text-white border-red-400 animate-pulse'
                        : vigilanceNormalized === 'orange'
                        ? 'bg-amber-500 text-slate-950 border-amber-300'
                        : vigilanceNormalized === 'jaune'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {vigilanceNormalized === 'rouge' && '🔴'}
                    {vigilanceNormalized === 'orange' && '🟠'}
                    {vigilanceNormalized === 'jaune' && '🟡'}
                    {vigilanceNormalized === 'vert' && '🟢'}
                    <span>
                      {isAr
                        ? `يقظة ${currentGov.overallVigilance}`
                        : `Vigilance ${currentGov.overallVigilance}`}
                    </span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold flex flex-wrap items-center gap-2">
                  <span>
                    {isAr ? 'موقعك المسجل أو المكتشف:' : 'Votre position de surveillance :'}
                  </span>
                  <span className="underline decoration-2 underline-offset-4 font-black">
                    {isAr ? currentGov.nameAr : currentGov.name}
                  </span>
                  {gpsDetected && (
                    <span className="text-[11px] font-normal px-2 py-0.5 bg-white/20 rounded-full flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-sky-300" />
                      {isAr ? `تحديد عبر GPS (${gpsDistance} كم)` : `Détecté par GPS (${gpsDistance} km)`}
                    </span>
                  )}
                </h3>

                <p className={`text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed ${
                  isSevereDanger ? 'text-white/90' : 'text-slate-600'
                }`}>
                  {isSevereDanger ? (
                    <span className="font-semibold">
                      ⚠️ {isAr ? currentGov.vigilanceReasonAr : currentGov.vigilanceReason}
                    </span>
                  ) : (
                    <span>
                      {isAr 
                        ? 'الوضع الجوي مستقر في منطقتك حالياً. سيقوم النظام بتنبيهك فور رصد أي خطر قادم.'
                        : 'Situation stable dans votre région. Vous recevrez une alerte prioritaire en cas de risque imminent.'}
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* Right: Controls & Actions */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full lg:w-auto justify-start lg:justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
              
              {/* Change Governorate Selector */}
              <div className="relative">
                <select
                  value={userGovId}
                  onChange={(e) => {
                    const newId = e.target.value;
                    setUserGovId(newId);
                    const matched = governorates.find(g => g.id === newId);
                    if (matched) {
                      onSelectGov(matched);
                      if (matched.overallVigilance.toLowerCase() === 'rouge') {
                        playSiren();
                        setIsUrgentModalOpen(true);
                      }
                    }
                  }}
                  className={`text-xs font-semibold py-2 px-3 rounded-xl border appearance-none pr-8 cursor-pointer transition-colors ${
                    isSevereDanger
                      ? 'bg-black/40 text-white border-white/30 hover:bg-black/60'
                      : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                  }`}
                  aria-label="Sélectionner le gouvernorat"
                >
                  {governorates.map((g) => (
                    <option key={g.id} value={g.id} className="text-slate-900 bg-white">
                      {isAr ? g.nameAr : g.name} ({g.overallVigilance})
                    </option>
                  ))}
                </select>
                <ChevronDown className={`w-4 h-4 absolute top-2.5 pointer-events-none ${isAr ? 'left-2' : 'right-2'} ${isSevereDanger ? 'text-white' : 'text-slate-500'}`} />
              </div>

              {/* GPS Auto-Detect Button */}
              <button
                onClick={handleDetectGps}
                disabled={isDetectingGps}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                  isDetectingGps ? 'opacity-60 cursor-not-allowed' : ''
                } ${
                  isSevereDanger
                    ? 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
                title={isAr ? 'تحديد ولايتي تلقائياً عبر GPS' : 'Détecter automatiquement ma position GPS'}
              >
                <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
                <span>
                  {isDetectingGps 
                    ? (isAr ? 'جاري التحديد...' : 'Recherche GPS...') 
                    : (isAr ? 'موقعي GPS' : 'Ma position GPS')}
                </span>
              </button>

              {/* Browser Push Notification Permission Button */}
              {browserNotificationStatus !== 'granted' && (
                <button
                  onClick={handleRequestNotificationPermission}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs cursor-pointer"
                  title={isAr ? 'تفعيل الإشعارات الهاتفية للنظام' : 'Activer les notifications du navigateur'}
                >
                  <Bell className="w-3.5 h-3.5 animate-bounce" />
                  <span>{isAr ? 'تفعيل الإشعارات' : 'Activer Alertes'}</span>
                </button>
              )}

              {/* Sound Siren Toggle Button */}
              <button
                onClick={() => {
                  if (activeAudioStop) {
                    stopActiveSiren();
                  }
                  setSoundEnabled(!soundEnabled);
                }}
                className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                  soundEnabled
                    ? 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                    : 'bg-black/30 text-slate-300 border-white/10 hover:bg-black/50'
                }`}
                title={soundEnabled ? (isAr ? 'كتم صفارة الإنذار' : 'Couper la sirène') : (isAr ? 'تشغيل صوت الإنذار' : 'Activer le son')}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Live Danger Alert Trigger / Test Alert Button */}
              <button
                onClick={isSevereDanger ? () => setIsUrgentModalOpen(true) : handleTestAlert}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black shadow-md cursor-pointer transition-all ${
                  isSevereDanger
                    ? 'bg-red-600 hover:bg-red-500 text-white animate-pulse border border-red-400'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                {isSevereDanger ? (
                  <>
                    <ShieldAlert className="w-4 h-4 text-white" />
                    <span>{isAr ? 'فتح إنذار الطوارئ' : 'Afficher l\'Alerte'}</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isAr ? 'تجربة إشعار الخطر' : 'Tester l\'Alerte'}</span>
                  </>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Severe Hazard Urgent Strip (If Rouge/Orange) */}
        {isSevereDanger && (
          <div className="bg-black/30 backdrop-blur px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span className="font-semibold text-red-200">
                {isAr
                  ? `أنت متواجد في منطقة خاضعة لمستوى يقظة استثنائي (${currentGov.overallVigilance}). لا تجازف بعبور الأودية أو المجاري المائية.`
                  : `Zone sous vigilance renforcée (${currentGov.overallVigilance}). Ne traversez jamais les oueds en crue.`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a 
                href="tel:198" 
                className="font-bold underline text-white hover:text-red-300 inline-flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>198 {isAr ? 'الحماية المدنية' : 'Protection Civile'}</span>
              </a>
              <a 
                href="tel:193" 
                className="font-bold underline text-white hover:text-red-300 inline-flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>193 {isAr ? 'الحرس الوطني' : 'Garde Nationale'}</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* FULL-SCREEN IMMINENT DANGER ALERT MODAL */}
      {isUrgentModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          dir={isAr ? 'rtl' : 'ltr'}
        >
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-red-600 animate-in zoom-in-95 duration-200"
            role="alertdialog"
            aria-modal="true"
          >
            {/* Header with Blinking Beacon */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-700 text-white p-5 sm:p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center shadow-md animate-pulse">
                    <AlertOctagon className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase tracking-wider bg-black/30 px-2.5 py-0.5 rounded-full inline-block mb-1 border border-white/20">
                      {isAr ? '🚨 إنذار أحمر طارئ - تحذير لمنطقتك' : '🚨 ALERTE ROUGE IMMINENTE DE ZONE'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black">
                      {isAr 
                        ? `خطر داهم قادم في ولاية ${currentGov.nameAr}`
                        : `Danger imminent : Gouvernorat de ${currentGov.name}`}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={() => {
                    stopActiveSiren();
                    setIsUrgentModalOpen(false);
                  }}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Fermer l'alerte"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Siren Audio Controls inside Modal */}
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping" />
                  <span>
                    {isAr 
                      ? 'تم إرسال هذا الإنذار للمتواجدين في هذا النطاق الجغرافي'
                      : 'Alerte transmise aux citoyens localisés dans ce périmètre'}
                  </span>
                </div>
                {activeAudioStop && (
                  <button
                    onClick={stopActiveSiren}
                    className="inline-flex items-center gap-1 bg-white text-red-700 font-bold px-2.5 py-1 rounded-lg hover:bg-red-50"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إيقاف الصفارة' : 'Arrêter sirène'}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto space-y-5 text-slate-900">
              
              {/* Hazard Cause Box */}
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
                <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-600" />
                  <span>{isAr ? 'طبيعة الخطر المرصود في منطقتك:' : 'Nature du danger détecté :'}</span>
                </h4>
                <p className="text-sm font-bold text-red-950 leading-relaxed">
                  {isAr ? currentGov.vigilanceReasonAr : currentGov.vigilanceReason}
                </p>
                {currentGov.keyVulnerabilitiesAr && currentGov.keyVulnerabilitiesAr.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-red-200/60 text-xs text-red-900 flex flex-wrap items-center gap-1.5">
                    <span className="font-bold">{isAr ? 'المناطق الأكثر تهديداً:' : 'Points critiques :'}</span>
                    {(isAr ? currentGov.keyVulnerabilitiesAr : currentGov.keyVulnerabilities).map((v, i) => (
                      <span key={i} className="px-2 py-0.5 bg-white rounded border border-red-200 font-medium">
                        {v}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 4 Crucial Life-saving Directives */}
              <div>
                <h4 className="font-black text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  <span>{isAr ? 'الإجراءات الفورية لإنقاذ الأرواح وحماية العائلة:' : 'Consignes vitales immédiates :'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">1</span>
                    <div>
                      <strong className="block font-bold text-slate-900 mb-0.5">
                        {isAr ? 'اقطع الكهرباء والغاز فوراً' : 'Coupez électricité et gaz'}
                      </strong>
                      <span className="text-slate-600 text-xs">
                        {isAr ? 'افصل القاطع الرئيسي لتفادي الصعق الكهربائي القاتل.' : 'Coupez le disjoncteur général STEG pour éviter tout court-circuit mortel.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">2</span>
                    <div>
                      <strong className="block font-bold text-slate-900 mb-0.5">
                        {isAr ? 'اصعد فوراً للأماكن المرتفعة' : 'Montez aux étages supérieurs'}
                      </strong>
                      <span className="text-slate-600 text-xs">
                        {isAr ? 'لا تبقوا في الأقبية أو الطوابق السفلية إطلاقاً.' : 'Évitez formellement les sous-sols, caves et rez-de-chaussée inondables.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">3</span>
                    <div>
                      <strong className="block font-bold text-slate-900 mb-0.5">
                        {isAr ? 'ممنوع عبور الأودية إطلاقاً' : 'Ne traversez JAMAIS les oueds'}
                      </strong>
                      <span className="text-slate-600 text-xs">
                        {isAr ? 'لا تخاطر بالسيارة أو على الأقدام؛ قوة التيار تجرف العربات.' : 'Moins de 30 cm d\'eau suffisent à emporter un véhicule tout-terrain.'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-lg bg-red-600 text-white font-black flex items-center justify-center shrink-0 text-xs">4</span>
                    <div>
                      <strong className="block font-bold text-slate-900 mb-0.5">
                        {isAr ? 'طلب النجدة وتحديد الموقع' : 'Alertez les secours'}
                      </strong>
                      <span className="text-slate-600 text-xs">
                        {isAr ? 'اتصل بـ 198 أو 193 وحدد عنوانك ورقم من معك بدقة.' : 'Précisez votre adresse exacte, nombre de personnes et présence d\'enfants.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct 1-Tap Emergency Call Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <a
                  href="tel:198"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md transition-all text-center cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>{isAr ? 'اتصال فوري بالحماية المدنية: 198' : 'Appel Protection Civile (198)'}</span>
                </a>

                <a
                  href="tel:193"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-all text-center cursor-pointer"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>{isAr ? 'اتصال بالحرس الوطني: 193' : 'Appel Garde Nationale (193)'}</span>
                </a>
              </div>

              {/* Share Alert with Neighbours & Family (WhatsApp / SMS) */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h5 className="font-bold text-emerald-950 text-xs sm:text-sm">
                      {isAr 
                        ? 'حذّر عائلتك وجيرانك في نفس المنطقة فوراً:' 
                        : 'Alertez vos proches et voisins dans ce secteur :'}
                    </h5>
                    <p className="text-xs text-emerald-800 mt-0.5">
                      {isAr 
                        ? 'أرسل لهم بلاغ الإنذار عبر واتساب أو انسخ نص الرسالة بنقرة واحدة.'
                        : 'Partagez le texte officiel de vigilance pour sauver des vies.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <a
                      href={getWhatsAppShareUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{isAr ? 'إرسال عبر واتساب' : 'Partager WhatsApp'}</span>
                    </a>

                    <button
                      onClick={handleCopyAlertText}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white text-emerald-900 border border-emerald-300 hover:bg-emerald-100 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
                      <span>{copiedShare ? (isAr ? 'تم النسخ!' : 'Copié !') : (isAr ? 'نسخ النص' : 'Copier SMS')}</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Salama.TN - المنظومة الوطنية للإنذار المبكر</span>
              </span>
              <button
                onClick={() => {
                  stopActiveSiren();
                  setIsUrgentModalOpen(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-50 cursor-pointer"
              >
                {isAr ? 'فهمت، إغلاق' : 'Compris, fermer'}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
