import React, { useState, useEffect } from 'react';
import { HazardType, Governorate, CitizenAlert } from './types';
import { TUNISIA_GOVERNORATES, RECENT_CITIZEN_ALERTS } from './data/tunisiaData';
import { Navbar } from './components/Navbar';
import { EmergencyBanner } from './components/EmergencyBanner';
import { LocationEmergencyAlert } from './components/LocationEmergencyAlert';
import { WeatherTvMap } from './components/WeatherTvMap';
import { GovernorateMap } from './components/GovernorateMap';
import { HazardTabs } from './components/HazardTabs';
import { EmergencyKitChecker } from './components/EmergencyKitChecker';
import { VulnerabilityAssessment } from './components/VulnerabilityAssessment';
import { CitizenAlertsFeed } from './components/CitizenAlertsFeed';
import { EmergencyDirectory } from './components/EmergencyDirectory';
import { Footer } from './components/Footer';
import { GeminiAdvisorModal } from './components/GeminiAdvisorModal';

export default function App() {
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');
  const [selectedHazard, setSelectedHazard] = useState<HazardType>('flood');
  const [selectedGovId, setSelectedGovId] = useState<string>('jendouba');
  const [governorates, setGovernorates] = useState<Governorate[]>(TUNISIA_GOVERNORATES);
  const [citizenAlerts, setCitizenAlerts] = useState<CitizenAlert[]>(RECENT_CITIZEN_ALERTS);
  const [confirmedAlertIds, setConfirmedAlertIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('salama_confirmed_alerts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  
  // Modal states
  const [isAdvisorOpen, setIsAdvisorOpen] = useState<boolean>(false);
  const [advisorQuestion, setAdvisorQuestion] = useState<string>('');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  // Fetch live reports and governorates from API
  useEffect(() => {
    fetch('/api/reports')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCitizenAlerts(data);
        }
      })
      .catch((err) => console.log('Using local alerts data', err));

    fetch('/api/governorates')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGovernorates(data);
        }
      })
      .catch((err) => console.log('Using local governorates data', err));
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  };

  const handleSelectGov = (gov: Governorate) => {
    setSelectedGovId(gov.id);
  };

  const handleAskAdvisor = (question: string) => {
    setAdvisorQuestion(question);
    setIsAdvisorOpen(true);
  };

  const handleOpenAdvisorClean = () => {
    setAdvisorQuestion('');
    setIsAdvisorOpen(true);
  };

  const handleUpvoteAlert = async (id: string) => {
    const isAlreadyConfirmed = confirmedAlertIds.includes(id);
    const action = isAlreadyConfirmed ? 'down' : 'up';

    // Optimistically update confirmed list and local storage
    const newConfirmed = isAlreadyConfirmed
      ? confirmedAlertIds.filter((item) => item !== id)
      : [...confirmedAlertIds, id];

    setConfirmedAlertIds(newConfirmed);
    try {
      localStorage.setItem('salama_confirmed_alerts', JSON.stringify(newConfirmed));
    } catch (_) {}

    // Optimistically update vote counter
    setCitizenAlerts((prev) =>
      prev.map((alt) =>
        alt.id === id
          ? { ...alt, upvotes: Math.max(0, alt.upvotes + (isAlreadyConfirmed ? -1 : 1)) }
          : alt
      )
    );

    try {
      const res = await fetch(`/api/reports/${id}/upvote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (data.success && typeof data.upvotes === 'number') {
        setCitizenAlerts((prev) =>
          prev.map((alt) => (alt.id === id ? { ...alt, upvotes: data.upvotes } : alt))
        );
      }
    } catch (err) {
      console.log('Using optimistic confirmation update', err);
    }
  };

  const handleSubmitReport = async (newReportData: {
    governorateId: string;
    delegation: string;
    type: string;
    severity: string;
    title: string;
    description: string;
  }) => {
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReportData),
      });
      const created = await res.json();
      if (created && created.id) {
        setCitizenAlerts((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error(err);
      // Local optimistic fallback
      const gov = governorates.find((g) => g.id === newReportData.governorateId);
      const fallbackItem: CitizenAlert = {
        id: 'rep-' + Date.now(),
        governorateId: newReportData.governorateId,
        governorateName: gov ? gov.name : newReportData.governorateId,
        delegation: newReportData.delegation,
        type: newReportData.type as any,
        severity: newReportData.severity as any,
        title: newReportData.title,
        description: newReportData.description,
        reportedAt: "À l'instant",
        verified: false,
        upvotes: 0,
      };
      setCitizenAlerts((prev) => [fallbackItem, ...prev]);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectedGov = governorates.find((g) => g.id === selectedGovId) || governorates[0];

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      {/* Navigation Header */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onOpenAdvisor={handleOpenAdvisorClean}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onScrollToMeteo={() => scrollToSection('weather-tv-broadcast')}
        onScrollToLocationAlert={() => scrollToSection('location-early-warning')}
      />

      {/* Hero / Emergency SOS Ticker & Threat Selector */}
      <EmergencyBanner
        lang={lang}
        selectedHazard={selectedHazard}
        onSelectHazard={setSelectedHazard}
        onScrollToSection={scrollToSection}
      />

      {/* Location-Based Early Warning & Imminent Hazard Alert (إنذار الخطر القادم حسب الموقع) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <LocationEmergencyAlert
          governorates={governorates}
          selectedGovId={selectedGovId}
          onSelectGov={handleSelectGov}
          lang={lang}
        />
      </div>

      {/* Tunisia Weather TV News Broadcast Map Feature (نشرة الأخبار الجوية) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WeatherTvMap
          lang={lang}
          onSelectGovernorate={handleSelectGov}
        />
      </div>

      {/* Interactive Map & 24 Governorates Risk Watch */}
      <GovernorateMap
        governorates={governorates}
        selectedGovId={selectedGovId}
        onSelectGov={handleSelectGov}
        lang={lang}
      />

      {/* Action Guides for the 3 Hazards (Pluies, Incendies, Inondations) */}
      <HazardTabs
        selectedHazard={selectedHazard}
        onSelectHazard={setSelectedHazard}
        lang={lang}
        onAskAdvisor={handleAskAdvisor}
      />

      {/* 72h Survival Emergency Kit Checklist */}
      <EmergencyKitChecker lang={lang} />

      {/* Diagnostic & Personalized Vulnerability Assessment */}
      <VulnerabilityAssessment lang={lang} onAskAdvisor={handleAskAdvisor} />

      {/* Citizen Field Alerts & Reporting Feed */}
      <CitizenAlertsFeed
        alerts={citizenAlerts}
        governorates={governorates}
        lang={lang}
        confirmedAlertIds={confirmedAlertIds}
        onUpvote={handleUpvoteAlert}
        onSubmitReport={handleSubmitReport}
        isReportModalOpen={isReportModalOpen}
        onCloseReportModal={() => setIsReportModalOpen(false)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
      />

      {/* Official Directory of Emergency Numbers & Broadcast Radio Frequencies */}
      <EmergencyDirectory lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />

      {/* Gemini AI Emergency Crisis Advisor Modal */}
      <GeminiAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        lang={lang}
        selectedGov={selectedGov}
        initialQuestion={advisorQuestion}
      />
    </div>
  );
}
