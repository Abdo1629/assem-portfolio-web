/**
 * Temporary bilingual content fixture for finalizing the homepage UX.
 * All four portfolio projects below are fictional concept studies, not verified client work.
 * Replace project copy/posters with approved material when real content becomes available.
 */
export type HomeProjectFixture = {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  format: string;
  role: string;
  summary: string;
  conceptLabel: string;
  tone: "ember" | "gold" | "steel" | "paper";
  poster: string;
  visualTitle: string;
  visualSubline: string;
  year: string;
};

export type HomeServiceFixture = {
  id: string;
  title: string;
  description: string;
  symbol: string;
  label: string;
};

export const homepageFixture = {
  ar: {
    hero: {
      kicker: "مخرج بصري · صناعة الحكايات بالصورة",
      headline: "كل فكرة تستحق",
      accent: "رؤية تميّزها.",
      description: "محمد عاصم أحمد — ممارسة بصرية تجمع الإخراج والتصوير والمونتاج والتصميم في اتجاه إبداعي واحد، تقوده الفكرة ويحدده أثرها.",
      sideNote: "توجيه بصري · تصوير · مونتاج",
      sideCaption: "من أول فكرة إلى النسخة النهائية",
      portraitCaption: "محمد عاصم · بورتريه",
      location: "القاهرة، مصر · متاح للتعاون",
      scroll: "ابدأ الرحلة",
    },
    manifesto: {
      eyebrow: "ما وراء الصورة",
      title: "الصورة ليست مجرد شكل.",
      accent: "إنها طريقة لرؤية الفكرة.",
      body: "كل مشروع يبدأ بسؤال: ما الذي نريد أن يشعر به الناس، ويفهموه، ويتذكروه؟ الإجابة هي التي تحدد الإطار والإيقاع واللغة البصرية.",
      signature: "الفكرة ← الاتجاه ← الكادر",
    },
    work: {
      eyebrow: "أعمال مختارة · دراسات مفاهيمية",
      title: "أفكار تتحول",
      accent: "إلى أثر بصري.",
      description: "نماذج تجريبية صُممت لاختبار طريقة عرض الأعمال واتجاهها الفني. أسماء المشاريع والعملاء هنا افتراضية، وستُستبدل بالأعمال الفعلية عند توفرها.",
      footer: "هذه نماذج تصميمية وليست ادعاءً بتنفيذ أعمال لصالح علامات تجارية حقيقية.",
      allWork: "استكشف الأعمال",
      conceptTag: "دراسة مفاهيمية",
    },
    craft: {
      eyebrow: "من الفكرة إلى التنفيذ",
      title: "رؤية واحدة.",
      accent: "أدوات متعددة.",
      description: "تتغير الأدوات بحسب القصة والجمهور والهدف؛ لكن كل اختيار بصري يجب أن يخدم الفكرة، لا أن ينافسها على الانتباه.",
      cta: "استكشف مجالات العمل",
      disciplines: [
        "الإخراج والتوجيه البصري",
        "التصوير الفوتوغرافي والسينمائي",
        "المونتاج وما بعد الإنتاج",
        "الموشن والهوية البصرية",
      ],
    },
    services: {
      eyebrow: "الخدمات",
      title: "كل تفصيلة",
      accent: "لها دور في الحكاية.",
      description: "مجالات عمل مترابطة، يمكن جمعها في مشروع واحد أو الاستعانة بكل منها بحسب الاحتياج.",
      items: [
        { id: "direction", title: "الإخراج والتوجيه البصري", description: "تحديد الفكرة والنبرة واللغة البصرية، ثم توجيه القرارات الإبداعية لتخدم هدف المشروع.", symbol: "DIR", label: "اتجاه" },
        { id: "cinematography", title: "التصوير السينمائي", description: "بناء الكادر بالضوء والتكوين والحركة، بحيث تحمل الصورة معنى يتجاوز جمالها.", symbol: "CAM", label: "تصوير" },
        { id: "editing", title: "المونتاج والسرد", description: "تنظيم اللقطات والإيقاع والصوت لتتحول المادة الخام إلى قصة واضحة ومتماسكة.", symbol: "CUT", label: "مونتاج" },
        { id: "motion", title: "الموشن والمعالجة البصرية", description: "إضافة الحركة والتفاصيل البصرية حين تكون جزءًا من الفكرة، لا مجرد مؤثر إضافي.", symbol: "FX", label: "حركة" },
        { id: "short-form", title: "المحتوى القصير", description: "صياغة محتوى رأسي سريع وواضح يحترم طبيعة المنصة ويحافظ على جوهر الرسالة.", symbol: "9:16", label: "قصير" },
        { id: "identity", title: "الهوية البصرية", description: "بناء عناصر ونظام بصري متماسك يساعد العلامة على الظهور بصوت مميز وقابل للتذكر.", symbol: "ID", label: "هوية" },
      ] satisfies HomeServiceFixture[],
    },
    approach: {
      eyebrow: "طريقة العمل",
      title: "من أول سؤال،",
      accent: "إلى آخر تفصيلة.",
      description: "عملية واضحة تبقي الهدف حاضرًا في كل مرحلة، من فهم الاحتياج حتى تسليم الملفات النهائية.",
      steps: [
        { number: "01", title: "الفهم والتحديد", description: "تحديد الهدف والجمهور والسياق ومعايير نجاح المشروع." },
        { number: "02", title: "بناء الاتجاه", description: "تطوير الفكرة والمرجعيات واللغة البصرية قبل بدء التنفيذ." },
        { number: "03", title: "التنفيذ والصقل", description: "إنتاج العمل ومراجعة الإيقاع والتكوين والتفاصيل بعناية." },
        { number: "04", title: "التسليم بوضوح", description: "تجهيز النسخ والمقاسات والملفات بما يناسب الاستخدام النهائي." },
      ],
    },
    contact: {
      eyebrow: "لديك فكرة؟",
      title: "لنصنع شيئًا",
      accent: "يستحق أن يُرى.",
      description: "احكِ عن الفكرة والجمهور والنتيجة التي تريد الوصول إليها. سنبدأ من هناك.",
      pending: "ستظهر بيانات التواصل هنا بعد تأكيدها.",
    },
    projects: [
      {
        id: "after-the-last-light", number: "01", title: "بعد آخر ضوء", client: "مشروع قصير · افتراضي",
        category: "سرد بصري · تصوير · مونتاج", format: "فيلم قصير", role: "اتجاه إبداعي · دراسة تصوير",
        summary: "دراسة سينمائية عن انتقال الضوء وتغيّر الإحساس بالمكان خلال لحظة هادئة.",
        conceptLabel: "دراسة فيلمية", tone: "ember", poster: "/images/concept-after-light.svg",
        visualTitle: "AFTER THE LIGHT", visualSubline: "A STUDY IN ATMOSPHERE", year: "CONCEPT / 01",
      },
      {
        id: "form-in-motion", number: "02", title: "الشكل في حركة", client: "دراسة هوية · افتراضية",
        category: "هوية بصرية · موشن", format: "نظام بصري", role: "تصميم اتجاه بصري",
        summary: "تجربة تجريدية تختبر كيف تتحول الأشكال الهندسية إلى نظام بصري مرن ومتحرك.",
        conceptLabel: "دراسة هوية", tone: "gold", poster: "/images/concept-form-motion.svg",
        visualTitle: "FORM / MOTION", visualSubline: "IDENTITY IN TRANSITION", year: "CONCEPT / 02",
      },
      {
        id: "human-frequency", number: "03", title: "تردد إنساني", client: "دراسة بورتريه · افتراضية",
        category: "بورتريه · قصة قصيرة", format: "سلسلة صور", role: "تصور بصري · معالجة",
        summary: "تصور بصري افتراضي يضع الشخصية والملمس والتباين في مركز الحكاية.",
        conceptLabel: "دراسة بورتريه", tone: "steel", poster: "/images/concept-human-frequency.svg",
        visualTitle: "HUMAN FREQUENCY", visualSubline: "CHARACTER / TEXTURE / LIGHT", year: "CONCEPT / 03",
      },
      {
        id: "signal-to-story", number: "04", title: "من الإشارة إلى الحكاية", client: "دراسة محتوى · افتراضية",
        category: "محتوى قصير · مونتاج", format: "حملة رقمية", role: "سرد · إيقاع · معالجة",
        summary: "نموذج لحملة رقمية قصيرة تنتقل من فكرة واحدة إلى مجموعة أصول متناسقة.",
        conceptLabel: "دراسة حملة", tone: "paper", poster: "/images/concept-signal-story.svg",
        visualTitle: "SIGNAL TO STORY", visualSubline: "SHORT-FORM SYSTEM", year: "CONCEPT / 04",
      },
    ] satisfies HomeProjectFixture[],
  },
  en: {
    hero: {
      kicker: "VISUAL DIRECTOR · VISUAL STORYTELLING",
      headline: "Ideas deserve",
      accent: "a point of view.",
      description: "Mohamed Assem Ahmed — a visual practice connecting direction, cinematography, editing and design through one considered creative point of view.",
      sideNote: "DIRECTION · CAMERA · EDIT",
      sideCaption: "From first idea to final cut",
      portraitCaption: "MOHAMED ASSEM · PORTRAIT",
      location: "CAIRO, EGYPT · OPEN TO COLLABORATIONS",
      scroll: "SCROLL TO EXPLORE",
    },
    manifesto: {
      eyebrow: "BEYOND THE IMAGE",
      title: "A visual is never",
      accent: "just an image.",
      body: "Every project starts with a question: what should people feel, understand and remember? The answer shapes the frame, the rhythm and the visual language.",
      signature: "IDEA → DIRECTION → FRAME",
    },
    work: {
      eyebrow: "SELECTED WORK · CONCEPT STUDIES",
      title: "Ideas, shaped",
      accent: "into imagery.",
      description: "Exploratory concepts created to test the portfolio’s art direction and presentation. Project and client names are fictional placeholders, to be replaced with verified work when available.",
      footer: "These are visual concept studies, not claims of commissioned work for real brands.",
      allWork: "EXPLORE ALL WORK",
      conceptTag: "CONCEPT STUDY",
    },
    craft: {
      eyebrow: "FROM INTENT TO EXECUTION",
      title: "One vision.",
      accent: "Many disciplines.",
      description: "The tools shift with the story, audience and goal. Every visual decision should serve the idea, not compete with it for attention.",
      cta: "EXPLORE THE CRAFT",
      disciplines: [
        "Creative & visual direction",
        "Cinematography & photography",
        "Editing & post-production",
        "Motion & visual identity",
      ],
    },
    services: {
      eyebrow: "SERVICES",
      title: "Every detail",
      accent: "has a role in the story.",
      description: "Connected disciplines that can work together as one production or be commissioned according to the brief.",
      items: [
        { id: "direction", title: "Creative & Visual Direction", description: "Define the concept, tone and visual language, then guide creative decisions toward the brief.", symbol: "DIR", label: "DIRECTION" },
        { id: "cinematography", title: "Cinematography", description: "Build the frame through light, composition and movement so the image carries meaning beyond its surface.", symbol: "CAM", label: "CAMERA" },
        { id: "editing", title: "Editing & Storytelling", description: "Shape footage, rhythm and sound into a clear, coherent narrative with a deliberate pace.", symbol: "CUT", label: "EDIT" },
        { id: "motion", title: "Motion & Visual Treatment", description: "Use movement and visual detail when they strengthen the idea, not as effects for their own sake.", symbol: "FX", label: "MOTION" },
        { id: "short-form", title: "Short-form Content", description: "Create focused vertical content that respects the platform while preserving the core message.", symbol: "9:16", label: "SHORT FORM" },
        { id: "identity", title: "Visual Identity", description: "Build a coherent visual system that gives a brand a distinct and memorable presence.", symbol: "ID", label: "IDENTITY" },
      ] satisfies HomeServiceFixture[],
    },
    approach: {
      eyebrow: "THE APPROACH",
      title: "From first question",
      accent: "to final detail.",
      description: "A clear process keeps the intended outcome present at every stage, from discovery through final delivery.",
      steps: [
        { number: "01", title: "Listen & Define", description: "Clarify the goal, audience, context and measures of success." },
        { number: "02", title: "Shape the Direction", description: "Develop the concept, references and visual language before production." },
        { number: "03", title: "Create & Refine", description: "Produce the work and carefully refine rhythm, composition and detail." },
        { number: "04", title: "Deliver with Purpose", description: "Prepare the versions, dimensions and files required for their final use." },
      ],
    },
    contact: {
      eyebrow: "HAVE A PROJECT IN MIND?",
      title: "Let’s make",
      accent: "something worth seeing.",
      description: "Tell me about the idea, the audience and the outcome you want to achieve. We’ll take it from there.",
      pending: "Contact details will appear here once confirmed.",
    },
    projects: [
      {
        id: "after-the-last-light", number: "01", title: "After the Last Light", client: "Short film · Fictional concept",
        category: "Visual storytelling · Camera · Edit", format: "Short film", role: "Creative direction · Cinematography study",
        summary: "A cinematic study of fading light and the way atmosphere can change our reading of a quiet place.",
        conceptLabel: "FILM STUDY", tone: "ember", poster: "/images/concept-after-light.svg",
        visualTitle: "AFTER THE LIGHT", visualSubline: "A STUDY IN ATMOSPHERE", year: "CONCEPT / 01",
      },
      {
        id: "form-in-motion", number: "02", title: "Form in Motion", client: "Identity study · Fictional",
        category: "Visual identity · Motion", format: "Visual system", role: "Visual art direction",
        summary: "An abstract exploration of how geometric forms can become a flexible, moving visual system.",
        conceptLabel: "IDENTITY STUDY", tone: "gold", poster: "/images/concept-form-motion.svg",
        visualTitle: "FORM / MOTION", visualSubline: "IDENTITY IN TRANSITION", year: "CONCEPT / 02",
      },
      {
        id: "human-frequency", number: "03", title: "Human Frequency", client: "Portrait study · Fictional",
        category: "Portraiture · Short narrative", format: "Photo series", role: "Visual concept · Treatment",
        summary: "A fictional visual concept placing character, texture and contrast at the centre of the story.",
        conceptLabel: "PORTRAIT STUDY", tone: "steel", poster: "/images/concept-human-frequency.svg",
        visualTitle: "HUMAN FREQUENCY", visualSubline: "CHARACTER / TEXTURE / LIGHT", year: "CONCEPT / 03",
      },
      {
        id: "signal-to-story", number: "04", title: "Signal to Story", client: "Content study · Fictional",
        category: "Short-form · Editing", format: "Digital campaign", role: "Narrative · Rhythm · Treatment",
        summary: "A model for a short digital campaign that grows one central idea into a coherent set of assets.",
        conceptLabel: "CAMPAIGN STUDY", tone: "paper", poster: "/images/concept-signal-story.svg",
        visualTitle: "SIGNAL TO STORY", visualSubline: "SHORT-FORM SYSTEM", year: "CONCEPT / 04",
      },
    ] satisfies HomeProjectFixture[],
  },
} as const;
