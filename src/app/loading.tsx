import Image from "next/image";

import logoTeal from "@/assets/brand/logo-teal.png";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center text-muted">
      <div className="relative h-32 w-32 animate-glow">
        <Image src={logoTeal} alt="MUD loading mark" fill className="object-contain" priority />
      </div>
      <p className="text-sm uppercase tracking-[0.24em]">Loading MUD</p>
    </div>
  );
}
