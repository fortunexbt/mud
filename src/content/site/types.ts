import type { MediaKey } from "@/lib/media";

export interface SeoEntry {
  title: string;
  description: string;
}

export interface LinkLabel {
  label: string;
  href?: string;
}

export interface ClassTrack {
  key: "adults" | "kids" | "oneOff" | "wheel" | "groups";
  title: string;
  summary: string;
  details: string;
  badge: string;
  cta: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string[];
  imageKey: MediaKey;
}

export interface FeaturedProfile {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  highlights: string[];
  imageKey: MediaKey;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ExhibitionEdition {
  year: string;
  editionLabel: string;
  title: string;
  date: string;
  location: string[];
  description: string;
  posterKey: MediaKey;
}

export interface SiteDictionary {
  localeName: string;
  localeNativeName: string;
  nav: {
    home: string;
    about: string;
    classes: string;
    team: string;
    inquiry: string;
    blog: string;
    contact: string;
    whatsapp: string;
    instagram: string;
    languageSwitcher: string;
    openMenu: string;
    closeMenu: string;
    skipToContent: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
    mobileDockLabel: string;
  };
  common: {
    primaryWhatsApp: string;
    secondaryInquiry: string;
    learnMore: string;
    readMore: string;
    viewAllPosts: string;
    openMaps: string;
    backHome: string;
    loading: string;
  };
  home: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      primaryCta: string;
      secondaryCta: string;
      note: string;
      trustPoints: string[];
    };
    classes: {
      eyebrow: string;
      title: string;
      intro: string;
      cards: ClassTrack[];
    };
    pedagogy: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      methods: string[];
      note: string;
    };
    about: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      cta: string;
    };
    team: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
    };
    experiences: {
      eyebrow: string;
      title: string;
      description: string;
      items: string[];
      cta: string;
    };
    blog: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
    };
    location: {
      eyebrow: string;
      title: string;
      description: string;
      cta: string;
    };
  };
  about: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    story: string[];
    philosophyTitle: string;
    philosophy: string[];
    valuesTitle: string;
    values: Array<{ title: string; description: string }>;
    whyTitle: string;
    whyPoints: string[];
    slowNote: string;
    exhibitions?: {
      eyebrow: string;
      title: string;
      intro: string[];
      items: ExhibitionEdition[];
    };
  };
  classes: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    abcEyebrow: string;
    intro: string[];
    tracks: ClassTrack[];
    abc: {
      title: string;
      description: string;
      steps: string[];
    };
    timeline: {
      title: string;
      items: Array<{ title: string; description: string }>;
    };
    faqEyebrow: string;
    faqTitle: string;
    faqs: FaqItem[];
    contactEyebrow: string;
    cta: {
      title: string;
      description: string;
      primary: string;
      secondary: string;
    };
  };
  team: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    founderRole: string;
    founderBio: string[];
    featuredTitle?: string;
    featuredIntro?: string;
    featuredMember?: FeaturedProfile;
    facultyTitle: string;
    facultyIntro: string;
    portraitPending: string;
    members: TeamMember[];
    cta: string;
  };
  inquiry: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    tracksTitle: string;
    tracks: ClassTrack[];
    formTitle: string;
    formIntro: string;
    sideTitle: string;
    sidePoints: string[];
    whatsappCta: string;
  };
  blog: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    latestTitle: string;
    empty: string;
    readArticle: string;
    backToBlog: string;
  };
  contact: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    moreOptionsLabel: string;
    formTitle: string;
    formIntro: string;
    detailsTitle: string;
    detailsBody: string;
    mapTitle: string;
    mapBody: string;
    mapEmbedTitle: string;
    whatsappCta: string;
    instagramCta: string;
  };
  privacy: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
    };
    sections: Array<{ title: string; paragraphs: string[] }>;
  };
  footer: {
    statement: string;
    contactTitle: string;
    linksTitle: string;
    socialTitle: string;
    privacy: string;
    rights: string;
  };
  notFound: {
    title: string;
    description: string;
    primary: string;
    secondary: string;
  };
  form: {
    labels: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      interest: string;
      preferredLanguage: string;
      availability: string;
      foundUs: string;
      childAge: string;
      consent: string;
      submit: string;
    };
    placeholders: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      message: string;
      availability: string;
      childAge: string;
    };
    interests: Record<"adults" | "kids" | "oneOff" | "wheel" | "groups", string>;
    languages: Record<"pt" | "es" | "en", string>;
    foundUsOptions: string[];
    optionalDetails: {
      label: string;
      hint: string;
    };
    consentHint: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    configurationTitle: string;
    configurationBody: string;
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    pages: Record<
      "home" | "about" | "classes" | "team" | "inquiry" | "blog" | "contact" | "privacy" | "notFound",
      SeoEntry
    >;
  };
}
