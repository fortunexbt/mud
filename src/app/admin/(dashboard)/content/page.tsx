import Link from "next/link";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">CMS</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Gerenciador de Conteúdo</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Gerencie todos os aspectos dinâmicos do site, desde informações institucionais e equipe, até exposições, blog e dúvidas frequentes.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Link href="/admin/content/home" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Home</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Página Inicial</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Edite textos de introdução, métodos pedagógicos e chamadas principais.
          </p>
        </Link>

        <Link href="/admin/content/services" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Serviços</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Aulas e Formatos</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Ajuste títulos, resumos e badges das aulas ofertadas.
          </p>
        </Link>

        <Link href="/admin/content/team" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Equipe</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Membros da Equipe</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Gerencie fundadora, faculty e membro em destaque.
          </p>
        </Link>

        <Link href="/admin/content/exhibitions" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Sobre</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Exposições</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Mantenha o portfólio de exposições da escola atualizado.
          </p>
        </Link>

        <Link href="/admin/content/faq" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Aulas</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Perguntas Frequentes</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Gerencie dúvidas comuns dos alunos.
          </p>
        </Link>

        <Link href="/admin/content/contact" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Contato</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Textos de Contato</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Edite títulos, descrições e textos da página de contato.
          </p>
        </Link>

        <Link href="/admin/content/blog" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Blog</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Artigos</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Crie, edite e gerencie seus artigos.
          </p>
        </Link>
      </section>
    </div>
  );
}
