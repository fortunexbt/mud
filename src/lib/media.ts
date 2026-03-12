import type { StaticImageData } from "next/image";

import type { Locale } from "@/lib/i18n-config";

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
import apronsOverheadWorkshop from "@/assets/generated/aprons-overhead-workshop.png";
import apronsKidsBacks from "@/assets/generated/aprons-kids-backs.png";
import brunaLanesPortrait from "@/assets/editorial/Bruna Lanes.jpeg";
import cristianeBelaciano from "@/assets/editorial/cristiane-belaciano.jpeg";
import doloresPortrait from "@/assets/editorial/dolores.jpeg";
import exhibition2025 from "@/assets/editorial/exhibition-2025.jpeg";
import exhibition2024 from "@/assets/editorial/exhibition-2024.jpeg";
import exhibition2023 from "@/assets/editorial/exhibition-2023.jpeg";
import exhibition2022 from "@/assets/editorial/exhibition-2022.jpeg";
import julianaMorenoPortrait from "@/assets/editorial/Juliana Dolores.jpeg";
import mudLocationExterior from "@/assets/editorial/mud location.jpeg";
import vikPortrait from "@/assets/editorial/Vik.jpeg";

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
  | "julianaMorenoPortrait"
  | "brunaLanesPortrait"
  | "kidsStudio"
  | "brandTag"
  | "mudLocationExterior"
  | "brandSeal"
  | "legacyBlogHeader"
  | "cristianeBelacianoPortrait"
  | "doloresPortrait"
  | "mudExhibition2025"
  | "mudExhibition2024"
  | "mudExhibition2023"
  | "mudExhibition2022";

export interface MediaAsset {
  src: StaticImageData;
  alt: Record<Locale, string>;
  objectPosition?: string;
  className?: string;
}

function localizedAlt(pt: string, es: string, en: string) {
  return { pt, es, en };
}

export const mediaAssets: Record<MediaKey, MediaAsset> = {
  logoPrimary: { src: logoPrimary, alt: localizedAlt("Logo da MUD Escola de Cerâmica", "Logo de MUD Escola de Cerâmica", "MUD Escola de Cerâmica logo") },
  logoSoft: { src: logoSoft, alt: localizedAlt("Logo da MUD sobre fundo claro", "Logo de MUD sobre fondo claro", "MUD logo on a light background") },
  logoTextured: { src: logoTextured, alt: localizedAlt("Logo da MUD com elementos orgânicos", "Logo de MUD con elementos orgánicos", "MUD logo with organic elements") },
  logoClay: { src: logoClay, alt: localizedAlt("Logo da MUD em fundo argila", "Logo de MUD sobre fondo arcilla", "MUD logo on a clay-colored background") },
  logoSlate: { src: logoSlate, alt: localizedAlt("Logo da MUD em fundo azul petróleo", "Logo de MUD sobre fondo azul petróleo", "MUD logo on a deep teal background") },
  logoTeal: { src: logoTeal, alt: localizedAlt("Logo da MUD em fundo verde", "Logo de MUD sobre fondo verde", "MUD logo on a green background") },
  moodboard: { src: moodboard, alt: localizedAlt("Moodboard da identidade visual da MUD", "Moodboard de la identidad visual de MUD", "Moodboard for MUD's visual identity") },
  glowLogo: { src: glowLogo, alt: localizedAlt("Versão iluminada do monograma MUD", "Versión iluminada del monograma MUD", "Illuminated version of the MUD monogram") },
  heroProcess: {
    src: apronKneadingVertical,
    alt: localizedAlt(
      "Avental da MUD em uso enquanto mãos modelam barro sobre a mesa do ateliê",
      "Delantal de MUD en uso mientras unas manos modelan barro sobre la mesa del atelier",
      "MUD apron in use while hands shape clay on the studio table",
    ),
    objectPosition: "50% 38%",
  },
  processHands: {
    src: apronsOverheadWorkshop,
    alt: localizedAlt(
      "Vista superior de uma mesa de oficina com aventais MUD, ferramentas e peças em cerâmica",
      "Vista superior de una mesa de taller con delantales MUD, herramientas y piezas de cerámica",
      "Overhead view of a workshop table with MUD aprons, tools, and ceramic pieces",
    ),
    objectPosition: "50% 50%",
  },
  founderPortrait: {
    src: vikPortrait,
    alt: localizedAlt(
      "Vik Inaudi no ateliê da MUD.",
      "Vik Inaudi en el atelier de MUD.",
      "Vik Inaudi at the MUD studio.",
    ),
    objectPosition: "50% 30%",
  },
  teamPlaceholder: {
    src: apronKneadingSquare,
    alt: localizedAlt("Imagem provisória do retrato da equipe da MUD", "Imagen provisoria del retrato del equipo de MUD", "Placeholder portrait for the MUD team"),
    objectPosition: "50% 50%",
  },
  julianaMorenoPortrait: {
    src: julianaMorenoPortrait,
    alt: localizedAlt("Juliana Moreno no ateliê da MUD.", "Juliana Moreno en el atelier de MUD.", "Juliana Moreno at the MUD studio."),
    objectPosition: "50% 28%",
  },
  brunaLanesPortrait: {
    src: brunaLanesPortrait,
    alt: localizedAlt("Bruna Lanes no ateliê da MUD.", "Bruna Lanes en el atelier de MUD.", "Bruna Lanes at the MUD studio."),
    objectPosition: "50% 28%",
  },
  kidsStudio: {
    src: apronsKidsBacks,
    alt: localizedAlt(
      "Crianças usando aventais da MUD em atividade no ateliê",
      "Niños usando delantales de MUD durante una actividad en el atelier",
      "Children wearing MUD aprons during a studio activity",
    ),
    objectPosition: "50% 50%",
  },
  brandTag: {
    src: apronsSketchTable,
    alt: localizedAlt(
      "Mesa de criação com aventais da MUD, cadernos, ferramentas e peças em argila",
      "Mesa de creación con delantales de MUD, cuadernos, herramientas y piezas de arcilla",
      "Creative table with MUD aprons, notebooks, tools, and clay pieces",
    ),
    objectPosition: "50% 50%",
  },
  mudLocationExterior: {
    src: mudLocationExterior,
    alt: localizedAlt(
      "Fachada do prédio da MUD em Leblon, com o ateliê no andar superior.",
      "Fachada del edificio de MUD en Leblon, con el atelier en la planta superior.",
      "Facade of MUD's building in Leblon, with the studio on the upper floor.",
    ),
    objectPosition: "50% 18%",
  },
  brandSeal: {
    src: apronWheelTrim,
    alt: localizedAlt(
      "Peça sendo torneada com avental da MUD em destaque",
      "Pieza trabajada en torno con el delantal de MUD en destaque",
      "Piece being shaped on the wheel with a MUD apron in view",
    ),
    objectPosition: "50% 45%",
  },
  legacyBlogHeader: {
    src: apronsGlazingClass,
    alt: localizedAlt(
      "Turma da MUD esmaltando peças no ateliê",
      "Clase de MUD esmaltando piezas en el atelier",
      "MUD class glazing pieces in the studio",
    ),
    objectPosition: "50% 50%",
  },
  cristianeBelacianoPortrait: {
    src: cristianeBelaciano,
    alt: localizedAlt(
      "Cristiane Belaciano no ateliê da MUD, usando avental da escola.",
      "Cristiane Belaciano en el atelier de MUD, usando el delantal de la escuela.",
      "Cristiane Belaciano at the MUD studio wearing the school's apron.",
    ),
    objectPosition: "50% 32%",
  },
  doloresPortrait: {
    src: doloresPortrait,
    alt: localizedAlt(
      "Dolores Damiano no ateliê da MUD, usando avental da escola.",
      "Dolores Damiano en el atelier de MUD, usando el delantal de la escuela.",
      "Dolores Damiano at the MUD studio wearing the school's apron.",
    ),
    objectPosition: "50% 36%",
  },
  mudExhibition2025: {
    src: exhibition2025,
    alt: localizedAlt(
      'Cartaz da exposição MUD 2025 "Quando o vazio sustenta a forma".',
      'Cartel de la exposición MUD 2025 "Quando o vazio sustenta a forma".',
      'Poster for the MUD 2025 exhibition "Quando o vazio sustenta a forma".',
    ),
    objectPosition: "50% 50%",
  },
  mudExhibition2024: {
    src: exhibition2024,
    alt: localizedAlt('Cartaz da exposição MUD 2024 "As Américas".', 'Cartel de la exposición MUD 2024 "As Américas".', 'Poster for the MUD 2024 exhibition "As Américas".'),
    objectPosition: "50% 50%",
  },
  mudExhibition2023: {
    src: exhibition2023,
    alt: localizedAlt('Cartaz da exposição MUD 2023 "YBY - Nossa Terra".', 'Cartel de la exposición MUD 2023 "YBY - Nossa Terra".', 'Poster for the MUD 2023 exhibition "YBY - Nossa Terra".'),
    objectPosition: "50% 50%",
  },
  mudExhibition2022: {
    src: exhibition2022,
    alt: localizedAlt('Cartaz da exposição MUD 2022 "O Possível".', 'Cartel de la exposición MUD 2022 "O Possível".', 'Poster for the MUD 2022 exhibition "O Possível".'),
    objectPosition: "50% 50%",
  },
};

export const mediaKeys = Object.keys(mediaAssets) as MediaKey[];

export function getMediaAsset(key: MediaKey, locale: Locale = "pt") {
  const asset = mediaAssets[key];

  return {
    ...asset,
    alt: asset.alt[locale],
  };
}
