import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MUD Escola de Cerâmica",
    short_name: "MUD",
    description:
      "Ceramics school and atelier in Leblon, Rio de Janeiro, with classes for adults, children, and one-off experiences.",
    start_url: "/pt",
    display: "standalone",
    background_color: "#f5f0e9",
    theme_color: "#f5f0e9",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
