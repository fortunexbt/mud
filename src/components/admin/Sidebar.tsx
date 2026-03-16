"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/utils";
import { type AdminActor } from "@/lib/admin-auth";

interface NavItem {
  href: string;
  label: string;
}

export function Sidebar({ actor, navItems }: { actor: AdminActor; navItems: NavItem[] }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 lg:hidden bg-white rounded-full shadow-soft"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      <aside className={cn(
        "fixed left-0 top-0 h-screen w-64 border-r border-outline/50 bg-white/82 backdrop-blur p-6 flex flex-col justify-between z-40 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div>
          <div className="mb-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">MUD Admin</p>
            <h1 className="mt-1 font-display text-[1.4rem] leading-tight">Painel da diretoria</h1>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block rounded-full px-4 py-2 text-sm font-medium transition",
                  pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-surface hover:text-ink"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-outline/50 pt-6">
          <p className="text-xs text-muted mb-4 truncate">
            {actor.mode === "user" ? `${actor.fullName}` : actor.label}
          </p>
          <form action={logoutAction}>
            <button type="submit" className="w-full rounded-full border border-outline/60 bg-white px-4 py-2 text-sm font-medium text-ink transition hover:border-terracotta/40 hover:text-terracotta">
              Sair
            </button>
          </form>
        </div>
      </aside>
      
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-ink/20 z-30 lg:hidden" 
          onClick={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}
