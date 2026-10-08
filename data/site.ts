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
  { ar: "عبدالرحمن الحضري", en: "Abdelrahman El-Hadary" },
  { ar: "منير أكاديمي", en: "Mounir Academy" },
  { ar: "TEDx Tabary", en: "TEDx Tabary" },
];

export const software = [
  { name: "Premiere Pro", short: "PR", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/premiere-pro.svg", detail: { ar: "المونتاج، بناء الإيقاع، وصياغة السرد من اللقطة إلى النسخة النهائية.", en: "Editing, rhythm and narrative construction from raw footage to final cut." } },
  { name: "After Effects", short: "AE", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/after-effects-40.svg", detail: { ar: "موشن جرافيك، انتقالات، معالجة بصرية، وحركة تمنح الفكرة حضورها.", en: "Motion graphics, transitions and visual treatment that give ideas presence." } },
  { name: "Photoshop", short: "PS", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/photoshop-40.svg", detail: { ar: "معالجة الصور، بناء التكوينات، وتجهيز العناصر البصرية للإنتاج.", en: "Image treatment, compositing and visual asset preparation for production." } },
  { name: "Illustrator", short: "AI", logo: "https://main--cc--adobecom.aem.live/cc-shared/assets/img/product-icons/svg/illustrator-40.svg", detail: { ar: "رسوم وهوية وعناصر متجهة قابلة للتطوير والتحريك.", en: "Illustration, identity systems and scalable motion-ready assets." } },
];

export const projects = [
  { id:"tedx-tabary", number:"01", title:{ar:"عود على بدء",en:"Back to the Beginning"}, client:"TEDx Tabary", meta:{ar:"الموسم الثالث",en:"Season 03"}, category:{ar:"مونتاج • موشن • هوية بصرية",en:"Editing • Motion • Visual Identity"}, tone:"ember" },
  { id:"mounir-academy", number:"02", title:{ar:"منير أكاديمي",en:"Mounir Academy"}, client:{ar:"مع د. أمير منير",en:"With Dr. Amir Mounir"}, meta:{ar:"محتوى بصري",en:"Visual Content"}, category:{ar:"مونتاج • سرد بصري",en:"Editing • Visual Storytelling"}, tone:"gold" },
  { id:"moving-identities", number:"03", title:{ar:"هويات تتحرك",en:"Moving Identities"}, client:{ar:"مشروعات وهوية ومحتوى بصري",en:"Identity & visual-content work"}, meta:{ar:"اتجاه إبداعي",en:"Creative Direction"}, category:{ar:"هوية بصرية • موشن • محتوى",en:"Visual Identity • Motion • Content"}, tone:"steel" },
];

export const services: Localized[] = [
  { ar:"مونتاج الفيديو", en:"Video Editing" },
  { ar:"التصوير السينمائي", en:"Cinematography" },
  { ar:"الفيديوجرافي", en:"Videography" },
  { ar:"الموشن جرافيك", en:"Motion Design" },
  { ar:"الريلز والمحتوى القصير", en:"Reels & Short-form" },
  { ar:"الهوية البصرية", en:"Visual Identity" },
];

export const process: Localized[] = [
  { ar:"نفهم الفكرة", en:"Understand" },
  { ar:"نصنع الكادر", en:"Frame" },
  { ar:"نبني الإيقاع", en:"Edit" },
  { ar:"نصقل التفاصيل", en:"Refine" },
  { ar:"نُخرج النسخة", en:"Deliver" },
];

export const cameraScene = {
  ar:{ eyebrow:"التصوير هو بداية الحكاية", title:"قبل أن يبدأ المونتاج، هناك كادر.", body:"أتعامل مع الصورة باعتبارها قرارًا: زاوية، ضوء، حركة وتكوين. ثم يأتي المونتاج ليمنح هذه العناصر إيقاعها ومعناها.", label:"CAMERA / CINEMATOGRAPHY" },
  en:{ eyebrow:"CINEMATOGRAPHY IS WHERE THE STORY STARTS", title:"Before the edit, there is a frame.", body:"Every image begins with a decision: angle, light, movement and composition. Editing then gives those elements rhythm and meaning.", label:"CAMERA / CINEMATOGRAPHY" },
};

export const copy = {
  ar:{
    discipline:"تصوير سينمائي · فيديوجرافي · مونتاج · موشن",
    statement:"أصنع الصورة من لحظة التقاطها حتى اللحظة التي تستقر فيها على الشاشة.",
    scroll:"مرّر للدخول إلى الحكاية",
    manifesto:["الصورة تلتقط الانتباه.","المونتاج يصنع الإيقاع.","والفكرة تمنح كل شيء معنى."],
    selected:"مشروعات مختارة",
    selectedSub:"من التصوير إلى المونتاج والموشن والمحتوى القصير؛ كل تفصيلة تُبنى لخدمة الفكرة لا لمجرد استعراض التقنية.",
    people:"أسماء ومشروعات صنعت الطريق.",
    peopleSub:"تعاونات وتجارب بصرية مع صُنّاع محتوى ومؤسسات ومشروعات مختلفة.",
    toolkit:"أدوات العمل",
    toolkitSub:"Premiere Pro، After Effects، Photoshop وIllustrator — أدوات متعددة، ولغة بصرية واحدة.",
    servicesTitle:"ما الذي يمكن أن نصنعه معًا؟",
    servicesSub:"من جلسة التصوير الأولى إلى النسخة النهائية، أتعامل مع المشروع كمنظومة بصرية متكاملة.",
    aboutTitle:"الصورة أولًا. ثم كل ما يجعلها تُروى.",
    aboutText:"مصور وفيديوجرافر ومحرر فيديو أعمل بين صناعة الكادر، وبناء الإيقاع، وتطوير المعالجة البصرية للمحتوى. الهدف ليس أن يبدو العمل جيدًا فقط، بل أن يصل إلى المشاهد كما ينبغي.",
    process:"من الفكرة إلى المشهد",
    showreel:"دع العمل يتحدث.",
    play:"تشغيل",
    contact:"لديك فكرة تستحق أن تُرى؟",
    contactText:"لنحوّلها إلى تجربة بصرية واضحة، متماسكة، ولا تُنسى.",
    start:"ابدأ مشروعًا",
    work:"شاهد الأعمال",
    close:"إغلاق",
    soon:"سيُضاف الشو ريل قريبًا",
    navWork:"الأعمال", navServices:"الخدمات", navContact:"تواصل",
    navLabel:"المشهد الحالي",
  },
  en:{
    discipline:"CINEMATOGRAPHY · VIDEOGRAPHY · EDITING · MOTION",
    statement:"I shape the image from the moment it is captured to the moment it lands on screen.",
    scroll:"SCROLL TO ENTER THE STORY",
    manifesto:["The image earns attention.","The edit creates rhythm.","The idea gives it meaning."],
    selected:"Selected work",
    selectedSub:"From cinematography to editing, motion and short-form content — every detail exists to serve the idea, never just the technique.",
    people:"Names and projects along the way.",
    peopleSub:"Selected collaborations and visual work across creators, platforms and creative projects.",
    toolkit:"The toolkit",
    toolkitSub:"Premiere Pro, After Effects, Photoshop and Illustrator — different tools, one visual language.",
    servicesTitle:"What can we create together?",
    servicesSub:"From the first shoot to the final export, every project is treated as one connected visual system.",
    aboutTitle:"The image first. Then everything that makes it speak.",
    aboutText:"A cinematographer, videographer and video editor working across capture, rhythm and visual treatment. The goal is not simply to make work look good, but to make it communicate exactly as intended.",
    process:"From idea to scene",
    showreel:"Let the work speak.",
    play:"Play",
    contact:"Have an idea worth seeing?",
    contactText:"Let’s turn it into a visual experience that feels clear, intentional and memorable.",
    start:"Start a project",
    work:"View work",
    close:"Close",
    soon:"Showreel will be added soon",
    navWork:"Work", navServices:"Services", navContact:"Contact",
    navLabel:"Current scene",
  },
} as const;
