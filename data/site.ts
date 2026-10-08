export type Language = "ar" | "en";

export type Copy = {
  discipline: string;
  statement: string;
  scroll: string;
  manifesto: string[];
  selected: string;
  selectedSub: string;
  people: string;
  peopleSub: string;
  toolkit: string;
  toolkitSub: string;
  servicesTitle: string;
  servicesSub: string;
  aboutTitle: string;
  aboutText: string;
  process: string;
  showreel: string;
  play: string;
  contact: string;
  contactText: string;
  start: string;
  work: string;
  close: string;
  soon: string;
  navWork: string;
  navAbout: string;
  navProjects: string;
  navServices: string;
  navContact: string;
  navLabel: string;
  footerRole: string;
  manifestoLabel: string;
  softwareLabel: string;
  softwareEyebrow: string;
  softwareTitle: string;
  workLabel: string;
  servicesLabel: string;
  collaborationsLabel: string;
  processLabel: string;
  showreelLabel: string;
  contactLabel: string;
  capture: string;
  edit: string;
  motion: string;
  frameToMotion: string;
  cameraNotes: string;
  languageShort: string;
  languageLong: string;
  menu: string;
  closeMenu: string;
  mobileNavigation: string;
  primaryNavigation: string;
  heroStatsLabel: string;
  homeAria: string;
  brandRole: string;
  switchToLight: string;
  switchToDark: string;
  yearsExperience: string;
  clients: string;
  projectsCount: string;
  primaryCta: string;
  secondaryCta: string;
  identityHeadline: string;
  identitySubline: string;
};

export type CameraSceneCopy = {
  eyebrow: string;
  title: string;
  body: string;
  label: string;
};

export type Project = {
  id: string;
  number: string;
  title: string;
  client: string;
  meta: string;
  category: string;
  tone: string;
};

export type SoftwareItem = {
  name: string;
  short: string;
  logo: string;
  detail: string;
};

export type ServiceMeta = {
  no: string;
  label: string;
  symbol: string;
};

export type LocaleContent = {
  collaborators: string[];
  software: SoftwareItem[];
  projects: Project[];
  services: string[];
  process: string[];
  serviceMeta: ServiceMeta[];
  cameraScene: CameraSceneCopy;
  copy: Copy;
};
