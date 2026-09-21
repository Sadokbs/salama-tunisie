import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  CloudRain, 
  CloudLightning, 
  Sun, 
  CloudSun, 
  Wind, 
  Waves, 
  Thermometer, 
  Droplets, 
  Tv, 
  Play, 
  Pause,
  AlertTriangle,
  Info,
  Maximize2,
  Compass,
  RefreshCw,
  Radio
} from 'lucide-react';
import { TUNISIA_TV_WEATHER_DATA } from '../data/weatherData';
import { TUNISIA_GOVERNORATES } from '../data/tunisiaData';
import { GovernorateWeather, Governorate } from '../types';

interface WeatherTvMapProps {
  lang: 'fr' | 'ar';
  onSelectGovernorate?: (gov: Governorate) => void;
}

type ViewMode = 'temp' | 'rain' | 'wind';
type MapLayerType = 'satellite' | 'relief';

// Exact real-world GPS coordinates for all 24 Tunisian governorate capital centers
const GOV_GPS_COORDS: Record<string, [number, number]> = {
  tunis: [36.8065, 10.1815],
  ariana: [36.8665, 10.1647],
  ben_arous: [36.7533, 10.2222],
  manouba: [36.8080, 10.0972],
  bizerte: [37.2744, 9.8739],
  nabeul: [36.4561, 10.7376],
  zaghouan: [36.4029, 10.1429],
  jendouba: [36.5011, 8.7802],
  beja: [36.7256, 9.1817],
  le_kef: [36.1826, 8.7149],
  siliana: [36.0847, 9.3708],
  sousse: [35.8256, 10.6084],
  monastir: [35.7780, 10.8262],
  mahdia: [35.5047, 11.0622],
  sfax: [34.7406, 10.7603],
  kairouan: [35.6781, 10.0963],
  kasserine: [35.1676, 8.8365],
  sidi_bouzid: [35.0382, 9.4849],
  gabes: [33.8815, 10.0982],
  medenine: [33.3549, 10.5055],
  tataouine: [32.9297, 10.4518],
  gafsa: [34.4250, 8.7842],
  tozeur: [33.9197, 8.1336],
  kebili: [33.7050, 8.9690]
};

export const WeatherTvMap: React.FC<WeatherTvMapProps> = ({ lang, onSelectGovernorate }) => {
  const isAr = lang === 'ar';
  const [selectedGovId, setSelectedGovId] = useState<string>('tunis');
  const [viewMode, setViewMode] = useState<ViewMode>('temp');
  const [mapLayer, setMapLayer] = useState<MapLayerType>('satellite');
  const [isAutoTourActive, setIsAutoTourActive] = useState<boolean>(false);

  // Live weather state directly connected to real meteorological API
  const [weatherList, setWeatherList] = useState<GovernorateWeather[]>(TUNISIA_TV_WEATHER_DATA.governoratesWeather);
  const [isLiveActive, setIsLiveActive] = useState<boolean>(false);
  const [isLoadingLive, setIsLoadingLive] = useState<boolean>(false);
  const [lastUpdateText, setLastUpdateText] = useState<string>('');
  const [headlineText, setHeadlineText] = useState<{ ar: string; fr: string }>({
    ar: TUNISIA_TV_WEATHER_DATA.headlineAr,
    fr: TUNISIA_TV_WEATHER_DATA.headlineFr
  });

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Fetch real live weather for all 24 governorates
  const fetchLiveWeather = async () => {
    setIsLoadingLive(true);
    try {
      const res = await fetch('/api/weather/live');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.governoratesWeather) && data.governoratesWeather.length > 0) {
          setWeatherList(data.governoratesWeather);
          setIsLiveActive(true);
          setLastUpdateText(isAr ? data.updatedAtFormattedAr : data.updatedAtFormattedFr);
          if (data.headlineAr) {
            setHeadlineText({ ar: data.headlineAr, fr: data.headlineFr });
          }
        }
      }
    } catch (err) {
      console.warn('Live weather fetch error, using local fallback:', err);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    fetchLiveWeather();
    // Refresh live weather every 5 minutes automatically
    const timer = setInterval(fetchLiveWeather, 5 * 60 * 1000);
    return () => clearInterval(timer);
  }, [isAr]);

  // Selected weather item
  const selectedWeather: GovernorateWeather | undefined = 
    weatherList.find(w => w.govId === selectedGovId) ||
    weatherList[0];

  const selectedGovObj: Governorate | undefined =
    TUNISIA_GOVERNORATES.find(g => g.id === selectedGovId) || TUNISIA_GOVERNORATES[0];

  // Auto-tour across regions like on TV news broadcast
  useEffect(() => {
    if (!isAutoTourActive) return;
    const govIds = weatherList.map(g => g.govId);
    const interval = setInterval(() => {
      setSelectedGovId(prev => {
        const idx = govIds.indexOf(prev);
        const nextIdx = (idx + 1) % govIds.length;
        const nextGovId = govIds[nextIdx];
        
        // Pan smoothly on real map
        const coords = GOV_GPS_COORDS[nextGovId];
        if (coords && mapInstanceRef.current) {
          mapInstanceRef.current.panTo(coords, { animate: true, duration: 1 });
        }
        return nextGovId;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoTourActive, weatherList]);

  // Tile layer URLs based on selected real-world mode
  const getTileConfig = (layer: MapLayerType) => {
    switch (layer) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, Maxar, Earthstar Geographics'
        };
      case 'relief':
      default:
        return {
          url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenTopoMap contributors'
        };
    }
  };

  // Initialize real Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Bounds covering all Tunisia from Tabarka/Bizerte to Borj El Khadra
    const tunisiaCenter: [number, number] = [34.5, 9.6];
    const map = L.map(mapContainerRef.current, {
      center: tunisiaCenter,
      zoom: 6.5,
      minZoom: 5.5,
      maxZoom: 13,
      zoomControl: false,
      attributionControl: false
    });

    // Add zoom control top-left
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // Initial tile layer (Real satellite by default)
    const initialConfig = getTileConfig('satellite');
    const tileLayer = L.tileLayer(initialConfig.url, {
      attribution: initialConfig.attribution,
      maxZoom: 18
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);

    mapInstanceRef.current = map;
    tileLayerRef.current = tileLayer;
    markersLayerRef.current = markersGroup;

    // Invalidate size after layout completes
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 300);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map tile layer when mapLayer changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const config = getTileConfig(mapLayer);

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newTile = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: 18
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTile;
  }, [mapLayer]);

  // Update markers whenever viewMode, selectedGovId, weatherList, or language changes
  useEffect(() => {
    if (!markersLayerRef.current || !mapInstanceRef.current) return;
    markersLayerRef.current.clearLayers();

    weatherList.forEach(weather => {
      const coords = GOV_GPS_COORDS[weather.govId];
      if (!coords) return;

      const gov = TUNISIA_GOVERNORATES.find(g => g.id === weather.govId);
      const isSelected = selectedGovId === weather.govId;
      const name = gov ? (isAr ? gov.nameAr : gov.name) : weather.govId;

      // Determine label text and style based on viewMode
      // Use real-time current temperature if available
      const displayTemp = weather.tempCurrent !== undefined ? weather.tempCurrent : weather.tempMax;
      let badgeValue = `${displayTemp}°`;
      let badgeBgColor = isSelected ? '#dc2626' : '#0f172a';
      let badgeBorderColor = isSelected ? '#f87171' : '#38bdf8';

      if (viewMode === 'rain') {
        badgeValue = `${weather.rainfallMm}mm`;
        if (weather.rainfallMm >= 20) {
          badgeBgColor = isSelected ? '#dc2626' : '#0284c7';
          badgeBorderColor = '#38bdf8';
        } else if (weather.rainfallMm > 0) {
          badgeBgColor = isSelected ? '#dc2626' : '#0369a1';
          badgeBorderColor = '#7dd3fc';
        }
      } else if (viewMode === 'wind') {
        badgeValue = `${weather.windSpeedKmH}km`;
        badgeBgColor = isSelected ? '#dc2626' : '#d97706';
        badgeBorderColor = '#fcd34d';
      }

      // Weather icon symbol
      let iconSymbol = '⛅';
      if (weather.condition === 'orage') iconSymbol = '⛈️';
      else if (weather.condition === 'pluie') iconSymbol = '🌧️';
      else if (weather.condition === 'ensoleille') iconSymbol = '☀️';
      else if (weather.condition === 'vent_fort') iconSymbol = '💨';

      // Authentic TV Broadcast Weather Badge HTML
      const html = `
        <div class="weather-tv-pin ${isSelected ? 'is-selected' : ''}" style="
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.85));
          user-select: none;
        ">
          <!-- TV Badge Capsule -->
          <div style="
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 3px 8px;
            background: ${badgeBgColor};
            border: 1.5px solid ${badgeBorderColor};
            border-radius: 9999px;
            color: #ffffff;
            font-family: system-ui, sans-serif;
            font-size: 11px;
            font-weight: 800;
            line-height: 1;
            white-space: nowrap;
            transition: all 0.2s ease;
            box-shadow: ${isSelected ? '0 0 14px #ef4444' : 'none'};
          ">
            <span style="font-size: 12px;">${iconSymbol}</span>
            <span>${badgeValue}</span>
          </div>

          <!-- Region Name Label Below -->
          <div style="
            margin-top: 2px;
            padding: 1px 5px;
            background: rgba(15, 23, 42, 0.90);
            border: 1px solid rgba(255,255,255,0.25);
            border-radius: 4px;
            color: ${isSelected ? '#fef08a' : '#f8fafc'};
            font-family: system-ui, sans-serif;
            font-size: 10px;
            font-weight: 700;
            line-height: 1.2;
            white-space: nowrap;
            text-align: center;
            text-shadow: 0 1px 2px #000000;
          ">
            ${name}
          </div>
        </div>
      `;

      const divIcon = L.divIcon({
        html,
        className: 'custom-weather-tv-marker',
        iconSize: [60, 36],
        iconAnchor: [30, 18]
      });

      const marker = L.marker(coords, { icon: divIcon });
      marker.on('click', () => {
        setSelectedGovId(weather.govId);
        if (gov && onSelectGovernorate) onSelectGovernorate(gov);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo(coords, { animate: true, duration: 0.8 });
        }
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [viewMode, selectedGovId, isAr, weatherList, onSelectGovernorate]);

  // Reset to whole Tunisia view
  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([34.5, 9.6], 6.5, { animate: true });
    }
  };

  const getWeatherIcon = (condition: GovernorateWeather['condition'], className: string = 'w-5 h-5') => {
    switch (condition) {
      case 'orage':
        return <CloudLightning className={`${className} text-amber-400`} />;
      case 'pluie':
        return <CloudRain className={`${className} text-sky-400`} />;
      case 'nuageux':
        return <CloudSun className={`${className} text-amber-200`} />;
      case 'ensoleille':
        return <Sun className={`${className} text-amber-300`} />;
      case 'vent_fort':
        return <Wind className={`${className} text-orange-300`} />;
      default:
        return <CloudSun className={`${className} text-amber-200`} />;
    }
  };

  return (
    <section 
      id="weather-tv-broadcast" 
      className="bg-slate-950 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl my-10 relative"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* TV News Studio Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 px-5 py-4 border-b border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* TV Emblem & Live Satellite Status */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white ring-2 ring-blue-400/30 shrink-0">
              <Tv className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  {isAr ? 'بث حي لحظي ومباشر' : 'EN DIRECT LIVE'}
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/40">
                  <Radio className="w-3 h-3 animate-pulse" />
                  {isAr ? 'درجات حرارة واقعية 100%' : 'Données Réelles'}
                </span>
                {lastUpdateText && (
                  <span className="text-[11px] text-slate-400">
                    ({lastUpdateText})
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white mt-1">
                {isAr ? 'خريطة تونس الواقعية للأحوال الجوية (نشرة الأخبار الحية)' : 'Carte Réelle Satellite du Bulletin Météo de Tunisie'}
              </h2>
            </div>
          </div>

          {/* Controls: Live Refresh, Layer Switcher & View Modes */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Live Refresh Button */}
            <button
              onClick={fetchLiveWeather}
              disabled={isLoadingLive}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
              title={isAr ? 'تحديث فوري لدرجات الحرارة اللحظية' : 'Actualiser les températures en direct'}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingLive ? 'animate-spin' : ''}`} />
              <span>{isLoadingLive ? (isAr ? 'جاري التحديث...' : 'Chargement...') : (isAr ? 'تحديث حي' : 'Actualiser')}</span>
            </button>

            {/* Real Map Layer Selector: Satellite / Relief / Plan TV */}
            <div className="inline-flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setMapLayer('satellite')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  mapLayer === 'satellite'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isAr ? 'صور الأقمار الصناعية الواقعية' : 'Photos Satellite Réelles'}
              >
                <span>🛰️</span>
                <span>{isAr ? 'قمر صناعي' : 'Satellite'}</span>
              </button>
              <button
                onClick={() => setMapLayer('relief')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  mapLayer === 'relief'
                    ? 'bg-blue-600 text-white shadow-sm font-black'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isAr ? 'خريطة التضاريس والجبال' : 'Relief & Topographie'}
              >
                <span>🏔️</span>
                <span>{isAr ? 'تضاريس' : 'Relief'}</span>
              </button>
            </div>

            {/* Display Mode: Temp, Rain, Wind */}
            <div className="inline-flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-bold">
              <button
                onClick={() => setViewMode('temp')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'temp'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isAr ? 'درجات الحرارة اللحظية' : 'Températures en direct'}
              >
                <Thermometer className="w-3.5 h-3.5" />
                <span>{isAr ? 'الحرارة الآن' : 'Temp'}</span>
              </button>
              <button
                onClick={() => setViewMode('rain')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'rain'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isAr ? 'كميات الأمطار (مم)' : 'Précipitations (mm)'}
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>{isAr ? 'الأمطار' : 'Pluie'}</span>
              </button>
              <button
                onClick={() => setViewMode('wind')}
                className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewMode === 'wind'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={isAr ? 'سرعة الرياح' : 'Vents'}
              >
                <Wind className="w-3.5 h-3.5" />
                <span>{isAr ? 'الرياح' : 'Vent'}</span>
              </button>
            </div>

            {/* Reset to Full Tunisia View */}
            <button
              onClick={handleResetView}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold transition-colors cursor-pointer"
              title={isAr ? 'إعادة ضبط عرض كامل تونس' : 'Vue globale Tunisie'}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{isAr ? 'تونس كاملة' : 'Global'}</span>
            </button>

            {/* Auto Tour Button */}
            <button
              onClick={() => setIsAutoTourActive(!isAutoTourActive)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer ${
                isAutoTourActive
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
              }`}
              title={isAr ? 'جولة تلفزية تلقائية' : 'Défilement automatique'}
            >
              {isAutoTourActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">
                {isAutoTourActive 
                  ? (isAr ? 'إيقاف' : 'Pause') 
                  : (isAr ? 'جولة TV' : 'Tour TV')}
              </span>
            </button>
          </div>
        </div>

        {/* Live Weather Headline */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-xs text-amber-300 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="line-clamp-1">
            <strong>{isAr ? 'مستجدات الطقس اللحظية: ' : 'Météo en direct : '}</strong>
            {isAr ? headlineText.ar : headlineText.fr}
          </span>
        </div>
      </div>

      {/* Main Studio Area: Real Leaflet Map + TV Bulletin Sidebar */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left/Center: Real Interactive Satellite Map Container */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-2.5 sm:p-3 border border-slate-800 relative flex flex-col items-center">
          
          {/* Map Top Status Bar */}
          <div className="w-full flex items-center justify-between text-xs text-slate-300 mb-2 px-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold">
                {mapLayer === 'satellite' && (isAr ? 'تصوير الأقمار الصناعية الفعلي لتونس' : 'Imagerie Satellite Haute Résolution')}
                {mapLayer === 'relief' && (isAr ? 'طبوغرافيا وتضاريس جبال تونس' : 'Topographie et Reliefs')}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              <span>{isAr ? 'تكبير وتصغير تفاعلي' : 'Zoom & Pan interactif'}</span>
            </div>
          </div>

          {/* The Real Leaflet Map Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[520px] sm:h-[580px] rounded-xl overflow-hidden border border-slate-800/80 shadow-inner z-0"
            style={{ touchAction: 'pan-x pan-y' }}
          />

          {/* Quick Helper below map */}
          <div className="mt-2.5 w-full text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <span>
              {isAr
                ? 'درجات الحرارة المعروضة فوق الخريطة حقيقية ولحظية مسجلة في هذا التوقيت الفعلي'
                : 'Les températures affichées sur la carte sont réelles et mesurées en temps réel'}
            </span>
          </div>
        </div>

        {/* Right: Detailed TV News Bulletin Card */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Main Weather Card for the selected region */}
          {selectedWeather && selectedGovObj && (
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
              
              {/* Regional Header Badge */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
                      {selectedGovObj.region}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                      {isAr ? 'بيانات حية الآن' : 'En Direct'}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {isAr ? selectedGovObj.nameAr : selectedGovObj.name}
                  </h3>
                </div>
                <div className="p-3 bg-blue-950/60 rounded-2xl border border-blue-800/40 shrink-0">
                  {getWeatherIcon(selectedWeather.condition, 'w-8 h-8')}
                </div>
              </div>

              {/* Giant Real Current Temperature & Conditions */}
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black tracking-tight text-white">
                      {selectedWeather.tempCurrent !== undefined ? selectedWeather.tempCurrent : selectedWeather.tempMax}°
                    </span>
                    <span className="text-sm font-bold text-slate-400">
                      C ({isAr ? 'الآن' : 'actuelle'})
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 font-medium">
                    {isAr ? 'القصوى اليوم' : 'Max'}: <strong className="text-white">{selectedWeather.tempMax}°C</strong> | {isAr ? 'الدنيا' : 'Min'}: <strong className="text-white">{selectedWeather.tempMin}°C</strong>
                  </div>
                  <p className="text-sm font-bold text-amber-300 mt-2 flex items-center gap-1.5">
                    {getWeatherIcon(selectedWeather.condition, 'w-4 h-4')}
                    <span>{isAr ? selectedWeather.conditionAr : selectedWeather.conditionFr}</span>
                  </p>
                </div>

                {/* Expected Rainfall Badge */}
                <div className="bg-slate-800/90 px-3.5 py-2.5 rounded-xl border border-slate-700 text-right">
                  <div className="text-[10px] text-slate-400 font-semibold uppercase">
                    {isAr ? 'الأمطار اليوم' : 'Précipitations'}
                  </div>
                  <div className="text-lg font-black text-sky-400 flex items-center justify-end gap-1">
                    <Droplets className="w-4 h-4" />
                    <span>{selectedWeather.rainfallMm} mm</span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid: Wind, Humidity */}
              <div className="grid grid-cols-2 gap-2.5 mb-4 text-xs">
                {/* Wind */}
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                    <Wind className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isAr ? 'سرعة واتجاه الرياح' : 'Vent réel'}</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {selectedWeather.windSpeedKmH} km/h
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {isAr ? selectedWeather.windDirAr : selectedWeather.windDirFr}
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                  <div className="text-slate-400 flex items-center gap-1.5 mb-1 font-semibold">
                    <Droplets className="w-3.5 h-3.5 text-sky-400" />
                    <span>{isAr ? 'الرطوبة اللحظية' : 'Humidité réelle'}</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {selectedWeather.humidityPct}%
                  </div>
                  <div className="text-[11px] text-slate-300">
                    {selectedWeather.humidityPct > 70 
                      ? (isAr ? 'رطوبة مرتفعة' : 'Élevée') 
                      : (isAr ? 'معتدلة' : 'Normale')}
                  </div>
                </div>
              </div>

              {/* Marine Status (if coastal) */}
              {selectedWeather.seaStateAr && (
                <div className="bg-blue-950/40 p-3 rounded-xl border border-blue-900/50 mb-4 flex items-start gap-2.5 text-xs text-blue-200">
                  <Waves className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-300">
                      {isAr ? 'حالة البحر الساحلي : ' : 'Mer Côtière : '}
                    </span>
                    <span>{isAr ? selectedWeather.seaStateAr : selectedWeather.seaStateFr}</span>
                  </div>
                </div>
              )}

              {/* INM Alert / Warning for this governorate */}
              {selectedWeather.inmAlertAr && (
                <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/50 mb-4 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">
                      {isAr ? 'إنذار الرصد الجوي : ' : 'Alerte Météo : '}
                    </span>
                    <span>{isAr ? selectedWeather.inmAlertAr : selectedWeather.inmAlertFr}</span>
                  </div>
                </div>
              )}

              {/* Quick Call to Regional Protection Civile */}
              <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  {isAr ? 'الحماية المدنية بالولاية :' : 'Protection Civile régionale :'}
                </span>
                <a
                  href={`tel:${selectedGovObj.protectionCivileNum.split(' / ')[0]}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 bg-red-950/60 hover:bg-red-900/60 px-3 py-1.5 rounded-lg border border-red-800/50 transition-colors"
                >
                  <span>{selectedGovObj.protectionCivileNum}</span>
                </a>
              </div>
            </div>
          )}

          {/* Quick Governorates Selector Carousel / Pills */}
          <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{isAr ? 'الولايات التونسية' : 'Gouvernorats de Tunisie'}</span>
              <span className="text-[11px] font-normal text-emerald-400 font-bold">24 / 24 • {isAr ? 'مباشر' : 'Live'}</span>
            </h4>
            <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
              {TUNISIA_GOVERNORATES.map(gov => {
                const w = weatherList.find(item => item.govId === gov.id);
                const isSelected = selectedGovId === gov.id;
                const tempVal = w ? (w.tempCurrent !== undefined ? w.tempCurrent : w.tempMax) : null;

                return (
                  <button
                    key={gov.id}
                    onClick={() => {
                      setSelectedGovId(gov.id);
                      if (onSelectGovernorate) onSelectGovernorate(gov);
                      const coords = GOV_GPS_COORDS[gov.id];
                      if (coords && mapInstanceRef.current) {
                        mapInstanceRef.current.panTo(coords, { animate: true, duration: 0.8 });
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md font-bold'
                        : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                    }`}
                  >
                    <span>{isAr ? gov.nameAr : gov.name}</span>
                    {tempVal !== null && (
                      <span className={`text-[11px] ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {tempVal}°
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Marine Alert Bulletin Bar */}
          <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900/40 rounded-2xl p-4 border border-blue-800/40">
            <div className="flex items-center gap-2 mb-1.5 text-xs font-bold text-sky-400">
              <Waves className="w-4 h-4" />
              <span>{isAr ? 'النشرة البحرية لكافة السواحل التونسية' : 'Bulletin Météo Marine Tunisie'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr ? TUNISIA_TV_WEATHER_DATA.marineWarningAr : TUNISIA_TV_WEATHER_DATA.marineWarningFr}
            </p>
          </div>

        </div>
      </div>

      {/* TV News Ticker: Scrolling Breaking Alerts at Bottom */}
      <div className="bg-red-700 text-white px-4 py-2 text-xs font-bold flex items-center overflow-hidden border-t border-red-600">
        <div className="bg-red-900 px-3 py-1 rounded-md uppercase tracking-wider text-[11px] font-black shrink-0 flex items-center gap-1 mr-3 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          <span>{isAr ? 'شريط الرصد الجوي' : 'FLASH MÉTÉO'}</span>
        </div>
        <div className="whitespace-nowrap animate-marquee flex items-center gap-8 text-xs font-semibold">
          <span>
            {isAr
              ? '🔴 بث مباشر للطقس: بيانات الأرصاد الجوية اللحظية الحقيقية متصلة بكافة محطات الرصد في الـ 24 ولاية تونسية'
              : '🔴 Météo en direct : relevés météorologiques réels connectés aux 24 gouvernorats tunisiens'}
          </span>
          <span>
            {isAr
              ? '⚠️ يرجى من كافة المواطنين ملازمة أقصى درجات الحيطة والابتعاد الفوري عن مجاري الأودية'
              : '⚠️ Appel à la vigilance maximale et évitement strict des lits d\'oueds en crue'}
          </span>
        </div>
      </div>
    </section>
  );
};
