export type Locale = "en" | "ar";
export const copy = {
  en: {
    nav: ["Home", "About", "Services", "Projects", "Contact"],
    heroEyebrow: "Civil Engineering · Architecture · Design",
    heroTitle: "Spaces built with purpose. Structures built to last.",
    heroText: "A considered approach to architecture and civil engineering — from the first concept to the final detail.",
    explore: "Explore selected work", contact: "Start a conversation", scroll: "Scroll to discover",
    aboutLabel: "01 / About", aboutTitle: "Engineering precision. Architectural vision.",
    aboutText: "I bring design thinking and technical discipline together to create spaces that are functional, enduring and meaningful. Every project begins with listening, clear planning and a strong understanding of its context.",
    servicesLabel: "02 / Expertise", servicesTitle: "What I do",
    projectsLabel: "03 / Selected work", projectsTitle: "A selection of projects",
    allProjects: "View all projects", contactLabel: "04 / Contact", contactTitle: "Have a project in mind?",
    contactText: "Tell me a little about your project, and let's explore what we can build together.",
    name: "Your name", email: "Email address", message: "Tell me about your project", send: "Send message",
    footer: "Independent civil engineering & architecture portfolio.", details: "View project",
    noProjects: "Projects will appear here once published from the admin dashboard."
  },
  ar: {
    nav: ["الرئيسية", "من أنا", "الخدمات", "المشاريع", "تواصل"],
    heroEyebrow: "هندسة مدنية · عمارة · تصميم",
    heroTitle: "مساحات تُصمَّم بهدف. ومنشآت تُبنى لتدوم.",
    heroText: "رؤية متكاملة تجمع التصميم المعماري بالخبرة الهندسية، من الفكرة الأولى حتى أدق تفاصيل التنفيذ.",
    explore: "استكشف الأعمال", contact: "ابدأ محادثة", scroll: "مرّر لاكتشاف المزيد",
    aboutLabel: "01 / من أنا", aboutTitle: "دقة هندسية. ورؤية معمارية.",
    aboutText: "أجمع بين التفكير التصميمي والانضباط الهندسي لصناعة مساحات عملية، متينة وذات معنى. يبدأ كل مشروع بالاستماع والتخطيط الواضح وفهم سياقه ومتطلباته.",
    servicesLabel: "02 / مجالات الخبرة", servicesTitle: "ماذا أقدم",
    projectsLabel: "03 / أعمال مختارة", projectsTitle: "نماذج من المشاريع",
    allProjects: "عرض جميع المشاريع", contactLabel: "04 / تواصل", contactTitle: "هل لديك مشروع في ذهنك؟",
    contactText: "أخبرني عن مشروعك، ولنستكشف معاً ما يمكننا إنجازه.",
    name: "الاسم", email: "البريد الإلكتروني", message: "أخبرني عن مشروعك", send: "إرسال الرسالة",
    footer: "معرض أعمال مستقل للهندسة المدنية والعمارة.", details: "عرض المشروع",
    noProjects: "ستظهر المشاريع هنا بعد نشرها من لوحة الإدارة."
  }
} as const;

export const services = [
  { icon: "01", en: "Architectural Design", ar: "التصميم المعماري", descEn: "Concept design, plans, elevations and design development.", descAr: "تطوير الفكرة المعمارية والمخططات والواجهات والتفاصيل التصميمية." },
  { icon: "02", en: "Civil & Structural Engineering", ar: "الهندسة المدنية والإنشائية", descEn: "Technical coordination, structural concepts and construction documentation.", descAr: "التنسيق الفني والحلول الإنشائية وإعداد وثائق التنفيذ." },
  { icon: "03", en: "Interior & Space Planning", ar: "التصميم الداخلي وتخطيط المساحات", descEn: "Functional layouts, material direction and interior environments.", descAr: "توزيع وظيفي للمساحات واختيار المواد وتطوير البيئات الداخلية." },
  { icon: "04", en: "3D Visualization", ar: "التصور والإظهار ثلاثي الأبعاد", descEn: "Photorealistic renders that communicate design intent.", descAr: "إنتاج تصورات ورندرات واقعية توضح الفكرة التصميمية." },
  { icon: "05", en: "Site & Project Coordination", ar: "تنسيق الموقع وإدارة المشروع", descEn: "Organized project communication, follow-up and delivery support.", descAr: "تنظيم التواصل والمتابعة ودعم مراحل تنفيذ وتسليم المشروع." },
  { icon: "06", en: "Renovation & Development", ar: "التجديد والتطوير", descEn: "Thoughtful upgrades that improve performance and character.", descAr: "تطوير المباني القائمة وتحسين أدائها وهويتها المعمارية." }
];