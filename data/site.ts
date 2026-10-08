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
  { name: "Premiere Pro", short: "PR", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/premiere-pro.svg", detail: { ar: "مونتاج وإيقاع وبناء الحكاية", en: "Editing, rhythm and story construction" } },
  { name: "After Effects", short: "AE", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/after-effects-40.svg", detail: { ar: "موشن ديزاين وحركة بصرية", en: "Motion design and visual movement" } },
  { name: "Photoshop", short: "PS", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/photoshop-40.svg", detail: { ar: "معالجة وتصميم العناصر البصرية", en: "Visual treatment and graphic composition" } },
  { name: "Illustrator", short: "AI", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/illustrator-40.svg", detail: { ar: "رسوم وهوية وعناصر قابلة للتحريك", en: "Illustration, identity and motion-ready assets" } },
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
  { ar: "تصوير سينمائي", en: "Cinematography" },
  { ar: "فيديوجرافي", en: "Videography" },
  { ar: "موشن ديزاين", en: "Motion Design" },
  { ar: "ريلز ومحتوى قصير", en: "Reels & Short-form" },
  { ar: "هوية بصرية", en: "Visual Identity" },
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
    discipline: "تصوير · فيديوجرافي · مونتاج فيديو · موشن ديزاين",
    statement: "من أول كادر لآخر Cut… الحكاية لازم تتشاف.",
    scroll: "اسحب لتدخل الحكاية",
    manifesto: ["التصوير بيخلق اللحظة.", "المونتاج بيخلق الإيقاع.", "والفكرة هي اللي بتربط الاتنين."],
    selected: "أعمال مختارة",
    selectedSub: "تصوير، مونتاج، موشن، وريلز مصممة عشان الفكرة تعيش على الشاشة.",
    people: "في الطريق، قابلنا ناس كتير.",
    peopleSub: "أشخاص عندهم حاجة تستاهل تتحكي.",
    toolkit: "العدة",
    toolkitSub: "Premiere، After Effects، Photoshop، Illustrator — أدوات مختلفة، رؤية واحدة.",
    aboutTitle: "وراء كل Cut قرار.",
    aboutText: "مصور وفيديوجرافر وفيديو إيديتور. بشتغل على صناعة الصورة من لحظة التصوير، لحد المونتاج والموشن والـ Reels — عشان كل ثانية تخدم الفكرة وتوصل الإحساس.",
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
    discipline: "CINEMATOGRAPHY · VIDEOGRAPHY · VIDEO EDITING · MOTION DESIGN",
    statement: "From the first frame to the final cut — make the story seen.",
    scroll: "SCROLL TO ENTER",
    manifesto: ["Cinematography creates the moment.", "Editing creates the rhythm.", "The idea connects them both."],
    selected: "Selected work",
    selectedSub: "Cinematography, editing, motion and reels built to keep the idea alive on screen.",
    people: "Along the way, I met people with something worth saying.",
    peopleSub: "Selected collaborators and creative relationships.",
    toolkit: "The toolkit",
    toolkitSub: "Premiere, After Effects, Photoshop, Illustrator — different tools, one visual language.",
    aboutTitle: "Behind every cut is a choice.",
    aboutText: "A cinematographer, videographer and video editor shaping the whole visual journey — from capturing the frame to editing, motion and social-first reels.",
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
