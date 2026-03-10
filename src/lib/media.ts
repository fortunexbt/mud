import type { StaticImageData } from "next/image";

import moodboard from "@/assets/brand/mud-moodboard.png";
import glowLogo from "@/assets/brand/mud-glow.png";
import logoPrimary from "@/assets/brand/logo-primary.png";
import logoSoft from "@/assets/brand/logo-soft.png";
import logoTextured from "@/assets/brand/logo-textured.png";
import logoClay from "@/assets/brand/logo-clay.png";
import logoSlate from "@/assets/brand/logo-slate.png";
import logoTeal from "@/assets/brand/logo-teal.png";
import apronsSketchTable from "@/assets/generated/aprons-sketch-table.png";
import apronKneadingVertical from "@/assets/generated/apron-kneading-vertical.png";
import apronKneadingSquare from "@/assets/generated/apron-kneading-square.png";
import apronWheelTrim from "@/assets/generated/apron-wheel-trim.png";
import apronsGlazingClass from "@/assets/generated/aprons-glazing-class.png";
import apronShelvingBack from "@/assets/generated/apron-shelving-back.png";
import apronsOverheadWorkshop from "@/assets/generated/aprons-overhead-workshop.png";
import apronsKidsBacks from "@/assets/generated/aprons-kids-backs.png";
import doloresPortrait from "@/assets/editorial/dolores.jpeg";
import exhibition2025 from "@/assets/editorial/exhibition-2025.jpeg";
import exhibition2024 from "@/assets/editorial/exhibition-2024.jpeg";
import exhibition2023 from "@/assets/editorial/exhibition-2023.jpeg";
import exhibition2022 from "@/assets/editorial/exhibition-2022.jpeg";

export type MediaKey =
  | "logoPrimary"
  | "logoSoft"
  | "logoTextured"
  | "logoClay"
  | "logoSlate"
  | "logoTeal"
  | "moodboard"
  | "glowLogo"
  | "heroProcess"
  | "processHands"
  | "founderPortrait"
  | "teamPlaceholder"
  | "kidsStudio"
  | "brandTag"
  | "brandSeal"
  | "legacyBlogHeader"
  | "doloresPortrait"
  | "mudExhibition2025"
  | "mudExhibition2024"
  | "mudExhibition2023"
  | "mudExhibition2022";

export interface MediaAsset {
  src: StaticImageData;
  alt: string;
  objectPosition?: string;
  className?: string;
}

export const mediaAssets: Record<MediaKey, MediaAsset> = {
  logoPrimary: { src: logoPrimary, alt: "Logo da MUD Escola de Cerâmica" },
  logoSoft: { src: logoSoft, alt: "Logo da MUD sobre fundo claro" },
  logoTextured: { src: logoTextured, alt: "Logo da MUD com elementos orgânicos" },
  logoClay: { src: logoClay, alt: "Logo da MUD em fundo argila" },
  logoSlate: { src: logoSlate, alt: "Logo da MUD em fundo azul petróleo" },
  logoTeal: { src: logoTeal, alt: "Logo da MUD em fundo verde" },
  moodboard: { src: moodboard, alt: "Moodboard da identidade visual da MUD" },
  glowLogo: { src: glowLogo, alt: "Versão iluminada do monograma MUD" },
  heroProcess: {
    src: apronKneadingVertical,
    alt: "Avental da MUD em uso enquanto mãos modelam barro sobre a mesa do ateliê",
    objectPosition: "50% 38%",
  },
  processHands: {
    src: apronsOverheadWorkshop,
    alt: "Vista superior de uma mesa de oficina com aventais MUD, ferramentas e peças em cerâmica",
    objectPosition: "50% 50%",
  },
  founderPortrait: {
    src: apronShelvingBack,
    alt: "Ambiente do ateliê da MUD com avental da marca diante de prateleiras cheias de peças",
    objectPosition: "50% 40%",
  },
  teamPlaceholder: {
    src: apronKneadingSquare,
    alt: "Placeholder de retrato da equipe da MUD",
    objectPosition: "50% 50%",
  },
  kidsStudio: {
    src: apronsKidsBacks,
    alt: "Crianças usando aventais da MUD em atividade no ateliê",
    objectPosition: "50% 50%",
  },
  brandTag: {
    src: apronsSketchTable,
    alt: "Mesa de criação com aventais da MUD, cadernos, ferramentas e peças em argila",
    objectPosition: "50% 50%",
  },
  brandSeal: {
    src: apronWheelTrim,
    alt: "Peça sendo torneada com avental da MUD em destaque",
    objectPosition: "50% 45%",
  },
  legacyBlogHeader: {
    src: apronsGlazingClass,
    alt: "Turma da MUD esmaltando peças no ateliê",
    objectPosition: "50% 50%",
  },
  doloresPortrait: {
    src: doloresPortrait,
    alt: "Dolores Damiano no ateliê da MUD, usando avental da escola.",
    objectPosition: "50% 36%",
  },
  mudExhibition2025: {
    src: exhibition2025,
    alt: 'Cartaz da exposição MUD 2025 "Quando o vazio sustenta a forma".',
    objectPosition: "50% 50%",
  },
  mudExhibition2024: {
    src: exhibition2024,
    alt: 'Cartaz da exposição MUD 2024 "As Américas".',
    objectPosition: "50% 50%",
  },
  mudExhibition2023: {
    src: exhibition2023,
    alt: 'Cartaz da exposição MUD 2023 "YBY - Nossa Terra".',
    objectPosition: "50% 50%",
  },
  mudExhibition2022: {
    src: exhibition2022,
    alt: 'Cartaz da exposição MUD 2022 "O Possível".',
    objectPosition: "50% 50%",
  },
};

export const mediaKeys = Object.keys(mediaAssets) as MediaKey[];

export function getMediaAsset(key: MediaKey) {
  return mediaAssets[key];
}
