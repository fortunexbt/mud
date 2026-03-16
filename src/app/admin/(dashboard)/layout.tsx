import type { ReactNode } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { requireAdmin } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin | MUD",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const actor = await requireAdmin();

  const navItems = [
    { href: "/admin", label: "Início" },
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/content", label: "Conteúdo" },
    { href: "/admin/content/blog", label: "Blog" },
    { href: "/admin/content/services", label: "Serviços" },
    { href: "/admin/content/team", label: "Equipe" },
    { href: "/admin/content/exhibitions", label: "Exposições" },
    { href: "/admin/content/faq", label: "FAQ" },
    { href: "/admin/content/contact", label: "Contato" },
    { href: "/admin/content/home", label: "Home" },
    { href: "/admin/content/media", label: "Mídia" },
  ];

  if (actor.mode === "legacy" || actor.role === "director") {
    navItems.push({ href: "/admin/users", label: "Usuários" });
    navItems.push({ href: "/admin/settings", label: "Configurações" });
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar actor={actor} navItems={navItems} />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
