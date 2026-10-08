export type Language = "ar" | "en";

export type Localized = { ar: string; en: string };

export const collaborators: Localized[] = [
  { ar: "د. أمير منير", en: "Dr. Amir Mounir" },
  { ar: "إبراهيم أنور", en: "Ibrahim Anwar" },
  { ar: "مصعب حمدي", en: "Mosab Hamdy" },
  { ar: "مصطفى حسن", en: "Mostafa Hassan" },
  { ar: "محمد بهاء", en: "Mohamed Bahaa" },
  { ar: "محمود أبو المجد", en: "Mahmoud Abu El-Magd" },
  { ar: "عبدالله العرمان", en: "Abdullah Al-Arman" },
  { ar: "مستر عبدالرحمن الحضري", en: "Mr. Abdelrahman El-Hadary" },
  { ar: "منير أكاديمي", en: "Mounir Academy" },
  { ar: "TEDx Tabary", en: "TEDx Tabary" },
];

export const software = [
  { name: "Premiere Pro", short: "PR", detail: { ar: "مونتاج وإيقاع وبناء الحكاية", en: "Editing, rhythm and story construction" } },
  { name: "After Effects", short: "AE", detail: { ar: "موشن ديزاين وحركة بصرية", en: "Motion design and visual movement" } },
  { name: "Photoshop", short: "PS", detail: { ar: "معالجة وتصميم العناصر البصرية", en: "Visual treatment and graphic composition" } },
  { name: "Illustrator", short: "AI", detail: { ar: "رسوم وهوية وعناصر قابلة للتحريك", en: "Illustration, identity and motion-ready assets" } },
];

export const projects = [
  {
    id: "tedx-tabary",
    number: "01",
    title: { ar: "عود على بدء", en: "Back to the Beginning" },
    client: "TEDx Tabary",
    meta: { ar: "الموسم الثالث", en: "Season 03" },
    category: { ar: "مونتاج • موشن • هوية بصرية", en: "Editing • Motion • Visual Identity" },
    tone: "ember",
  },
  {
    id: "mounir-academy",
    number: "02",
    title: { ar: "منير أكاديمي", en: "Mounir Academy" },
    client: { ar: "مع د. أمير منير", en: "With Dr. Amir Mounir" },
    meta: { ar: "محتوى بصري", en: "Visual Content" },
    category: { ar: "مونتاج • سرد بصري", en: "Editing • Visual Storytelling" },
    tone: "gold",
  },
  {
    id: "moving-identities",
    number: "03",
    title: { ar: "هويات تتحرك", en: "Moving Identities" },
    client: { ar: "مشاريع هوية بصرية كاملة", en: "Complete visual identity projects" },
    meta: { ar: "اتجاه إبداعي", en: "Creative Direction" },
    category: { ar: "هوية بصرية • موشن", en: "Visual Identity • Motion" },
    tone: "steel",
  },
];

export const services: Localized[] = [
  { ar: "مونتاج فيديو", en: "Video Editing" },
  { ar: "موشن ديزاين", en: "Motion Design" },
  { ar: "سرد بصري", en: "Visual Storytelling" },
  { ar: "هوية بصرية", en: "Brand Visuals" },
  { ar: "محتوى إبداعي", en: "Creative Content" },
  { ar: "اتجاه إبداعي", en: "Creative Direction" },
];

export const process: Localized[] = [
  { ar: "نفهم", en: "Understand" },
  { ar: "نؤطر", en: "Frame" },
  { ar: "نمنتج", en: "Edit" },
  { ar: "نصقل", en: "Refine" },
  { ar: "نسلّم", en: "Deliver" },
];

export const cameraScene = {
  ar: {
    eyebrow: "المشهد يبدأ قبل الـ Cut",
    title: "العين تسبق المونتاج.",
    body: "من الكادر الأول يبدأ القرار: زاوية، إضاءة، حركة وإيقاع.",
    label: "CAMERA / CINEMATOGRAPHY",
  },
  en: {
    eyebrow: "THE SCENE STARTS BEFORE THE CUT",
    title: "The eye comes before the edit.",
    body: "The decision starts with the frame: angle, light, movement and rhythm.",
    label: "CAMERA / CINEMATOGRAPHY",
  },
};

export const copy = {
  ar: {
    discipline: "مونتاج فيديو · موشن ديزاين · سرد بصري",
    statement: "أحوّل الفكرة إلى مشهد.",
    scroll: "اسحب لتدخل الحكاية",
    manifesto: ["مش كل لقطة محتاجة Cut.", "ومش كل فكرة محتاجة صوت عالي.", "أحيانًا، التفاصيل هي اللي بتحكي."],
    selected: "أعمال مختارة",
    selectedSub: "كل Cut قرار. كل حركة لها معنى.",
    people: "في الطريق، قابلنا ناس كتير.",
    peopleSub: "أشخاص عندهم حاجة تستاهل تتحكي.",
    toolkit: "العدة",
    toolkitSub: "الأدوات تتغير. العين هي الثابتة.",
    aboutTitle: "وراء كل Cut قرار.",
    aboutText: "أشتغل عند تقاطع المونتاج والتصميم والموشن والسرد. أبحث عن الإيقاع الذي يجعل الفكرة تُرى، لا أن تُشرح فقط.",
    process: "من الفكرة إلى المشهد",
    showreel: "شوف الشغل وهو بيتكلم.",
    play: "شغّل",
    contact: "عندك فكرة؟",
    contactText: "خلّيها تستاهل المشاهدة.",
    start: "ابدأ مشروع",
    work: "شاهد الأعمال",
    close: "إغلاق",
    soon: "الشو ريل قريبًا",
  },
  en: {
    discipline: "VIDEO EDITING · MOTION DESIGN · VISUAL STORYTELLING",
    statement: "I turn ideas into scenes.",
    scroll: "SCROLL TO ENTER",
    manifesto: ["Not every frame needs a cut.", "Not every idea needs to be loud.", "Sometimes, the details do the talking."],
    selected: "Selected work",
    selectedSub: "Every cut is a decision. Every movement has a reason.",
    people: "Along the way, I met people with something worth saying.",
    peopleSub: "Selected collaborators and creative relationships.",
    toolkit: "The toolkit",
    toolkitSub: "Tools change. The eye stays.",
    aboutTitle: "Behind every cut is a choice.",
    aboutText: "Working at the intersection of editing, design, motion and storytelling. Looking for the rhythm that lets an idea be seen, not simply explained.",
    process: "From idea to scene",
    showreel: "Let the work speak.",
    play: "Play",
    contact: "Have a story to tell?",
    contactText: "Let’s make it worth watching.",
    start: "Start a project",
    work: "View work",
    close: "Close",
    soon: "Showreel coming soon",
  },
} as const;
