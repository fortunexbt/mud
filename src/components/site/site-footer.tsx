import Image from "next/image";
import Link from "next/link";

import logoWordmark from "../../../images, logos, favicon, etc/MUD (Logo no escoladeceramica).png";
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "@/components/icons";
import type { SiteDictionary } from "@/content/site";
import type { PageKey } from "@/lib/routes";
import { formatPhoneDisplay } from "@/lib/utils";

interface FooterProps {
  dictionary: SiteDictionary;
  navItems: Array<{ label: string; href: string; page: PageKey }>;
  whatsappHref: string;
  instagramUrl: string;
  privacyHref: string;
  email?: string;
  phone: string;
  addressLines: string[];
}

export function SiteFooter({
  dictionary,
  navItems,
  whatsappHref,
  instagramUrl,
  privacyHref,
  email,
  phone,
  addressLines,
}: FooterProps) {
  const year = new Date().getFullYear();
  const mobileLinks = navItems.filter((item) => item.page === "about" || item.page === "team" || item.page === "blog");
  const socialLinks = [
    {
      href: whatsappHref,
      label: formatPhoneDisplay(phone),
      icon: <WhatsAppIcon className="h-4 w-4 text-clay" />,
    },
    {
      href: instagramUrl,
      label: "Instagram",
      icon: <InstagramIcon className="h-4 w-4 text-clay" />,
    },
  ];

  return (
    <footer className="border-t border-outline/50 bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-5 shadow-soft sm:p-8 lg:p-10">
          <div className="sm:hidden">
            <div className="space-y-5">
              <div className="space-y-4">
                <div className="flex h-[4.5rem] w-[9.25rem] items-center overflow-hidden rounded-[1.35rem] border border-white/10 bg-background/95 px-3 shadow-soft">
                  <div className="relative h-[5.6rem] w-full">
                    <Image
                      src={logoWordmark}
                      alt="MUD Escola de Cerâmica"
                      fill
                      className="object-contain"
                      sizes="148px"
                    />
                  </div>
                </div>
                <p className="max-w-[18rem] text-sm leading-6 text-white/78">{dictionary.footer.statement}</p>
              </div>

              <div className="space-y-3 rounded-[1.35rem] border border-white/8 bg-black/10 p-4 text-sm text-white/76">
                <p className="font-semibold uppercase tracking-[0.16em] text-white/55">{dictionary.footer.contactTitle}</p>
                <p className="flex items-start gap-2 leading-6">
                  <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay" />
                  <span>{addressLines.join(", ")}</span>
                </p>
                {email ? (
                  <Link className="inline-flex hover:text-white" href={`mailto:${email}`}>
                    {email}
                  </Link>
                ) : null}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.35rem] border border-white/8 bg-black/10 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{dictionary.footer.socialTitle}</p>
                  <div className="grid gap-3 text-sm text-white/78">
                    {socialLinks.map((item) => (
                      <Link key={item.href} className="inline-flex items-center gap-2 hover:text-white" href={item.href} target="_blank" rel="noreferrer">
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-white/8 bg-black/10 p-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/55">{dictionary.footer.linksTitle}</p>
                  <nav className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-white/78">
                    {mobileLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="hover:text-white">
                        {item.label}
                      </Link>
                    ))}
                    <Link href={privacyHref} className="hover:text-white">
                      {dictionary.footer.privacy}
                    </Link>
                  </nav>
                </div>
              </div>

              <p className="text-[0.68rem] uppercase tracking-[0.18em] text-white/42">© {year} {dictionary.footer.rights}</p>
            </div>
          </div>

          <div className="hidden gap-10 sm:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,0.9fr)]">
            <div className="flex min-h-full flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="space-y-5">
                  <div className="flex h-[5.15rem] w-[11.5rem] items-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-background/95 px-4 shadow-soft">
                    <div className="relative h-[6.6rem] w-full">
                      <Image
                        src={logoWordmark}
                        alt="MUD Escola de Cerâmica"
                        fill
                        className="object-contain"
                        sizes="184px"
                      />
                    </div>
                  </div>
                  <p className="max-w-sm text-base leading-8 text-white/78">{dictionary.footer.statement}</p>
                </div>
              </div>
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-white/42">© {year} {dictionary.footer.rights}</p>
            </div>

            <div className="space-y-4 text-sm text-white/76">
              <h2 className="font-semibold uppercase tracking-[0.18em] text-white/58">{dictionary.footer.contactTitle}</h2>
              <p className="flex items-start gap-2 leading-7">
                <MapPinIcon className="mt-1 h-4 w-4 shrink-0 text-clay" />
                <span>{addressLines.join(", ")}</span>
              </p>
              {email ? (
                <Link className="inline-flex hover:text-white" href={`mailto:${email}`}>
                  {email}
                </Link>
              ) : null}
            </div>

            <div className="space-y-6 text-sm text-white/76">
              <div>
                <h2 className="mb-4 font-semibold uppercase tracking-[0.18em] text-white/58">{dictionary.footer.socialTitle}</h2>
                <div className="grid gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.href} className="inline-flex items-center gap-2 hover:text-white" href={item.href} target="_blank" rel="noreferrer">
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="mb-4 font-semibold uppercase tracking-[0.18em] text-white/58">{dictionary.footer.linksTitle}</h2>
                <nav className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  ))}
                  <Link href={privacyHref} className="hover:text-white">
                    {dictionary.footer.privacy}
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
