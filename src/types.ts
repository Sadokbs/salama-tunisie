export type HazardType = 'rain' | 'fire' | 'flood';

export type VigilanceLevel = 'vert' | 'jaune' | 'orange' | 'rouge' | 'Vert' | 'Jaune' | 'Orange' | 'Rouge';

export type TunisianRegion = 
  | 'Nord-Est'
  | 'Nord-Ouest'
  | 'Centre-Est'
  | 'Centre-Ouest'
  | 'Sud-Est'
  | 'Sud-Ouest';

export interface Governorate {
  id: string;
  name: string;
  nameAr: string;
  region: TunisianRegion;
  riskLevels: {
    rain: 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
    fire: 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
    flood: 'Faible' | 'Modéré' | 'Élevé' | 'Critique';
  };
  overallVigilance: VigilanceLevel;
  vigilanceReason: string;
  vigilanceReasonAr: string;
  keyVulnerabilities: string[];
  keyVulnerabilitiesAr: string[];
  protectionCivileNum: string;
  centerCoord: { x: number; y: number }; // Relative percentage on Tunisia map
}

export interface EmergencyContact {
  id: string;
  title: string;
  titleAr: string;
  number: string;
  altNumber?: string;
  category: 'vital' | 'securite' | 'utilites' | 'meteo';
  description: string;
  descriptionAr: string;
  available: string;
}

export interface GuideStep {
  title: string;
  titleAr: string;
  details: string;
  detailsAr: string;
  iconName: string;
  isCrucial?: boolean;
}

export interface HazardGuide {
  id: HazardType;
  title: string;
  titleAr: string;
  headline: string;
  headlineAr: string;
  color: string;
  accentBg: string;
  borderColor: string;
  goldenRules: {
    rule: string;
    ruleAr: string;
    warning: string;
    warningAr: string;
  }[];
  before: GuideStep[];
  during: GuideStep[];
  after: GuideStep[];
  tunisiaContext: string;
  tunisiaContextAr: string;
}

export interface EmergencyKitItem {
  id: string;
  category: 'survie' | 'sante' | 'communication' | 'documents';
  label: string;
  labelAr: string;
  quantityNote: string;
  whyCrucial: string;
  isCrucial: boolean;
}

export interface CitizenAlert {
  id: string;
  governorateId: string;
  governorateName: string;
  delegation: string;
  type: HazardType | 'oued_crue' | 'route_coupee' | 'inondation';
  severity: 'attention' | 'danger' | 'urgence_absolue';
  title: string;
  description: string;
  reportedAt: string;
  verified: boolean;
  upvotes: number;
}

export interface VulnerabilityProfile {
  governorateId: string;
  housingType: 'rez_de_chaussee' | 'etage' | 'campagne_foret' | 'proche_oued';
  pastIncident: boolean;
  hasEmergencyKit: boolean;
  hasElderlyOrInfants: boolean;
  hasDrainCheckValve: boolean;
  hasFireExtinguisher: boolean;
}

export interface VulnerabilityResult {
  score: number; // 0 to 100
  riskLevel: 'Faible' | 'Modéré' | 'Élevé' | 'Très Élevé';
  priorityActions: {
    fr: string;
    ar: string;
    hazard: HazardType;
  }[];
  criticalWarning?: {
    fr: string;
    ar: string;
  };
}

export interface GovernorateWeather {
  govId: string;
  lat?: number;
  lng?: number;
  tempCurrent?: number;
  tempMax: number;
  tempMin: number;
  condition: 'orage' | 'pluie' | 'nuageux' | 'ensoleille' | 'vent_fort';
  conditionFr: string;
  conditionAr: string;
  rainfallMm: number;
  windSpeedKmH: number;
  windDirAr: string;
  windDirFr: string;
  humidityPct: number;
  seaStateAr?: string;
  seaStateFr?: string;
  inmAlertAr?: string;
  inmAlertFr?: string;
}
