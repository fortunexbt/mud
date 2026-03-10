import { siteConfig } from "@/config/site";

export function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-outline/50 bg-white/78 shadow-soft sm:rounded-[2rem]">
      <iframe
        title="MUD Escola de Cerâmica map"
        src={siteConfig.mapsEmbedUrl}
        className="h-[18rem] w-full border-0 sm:h-[22rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
