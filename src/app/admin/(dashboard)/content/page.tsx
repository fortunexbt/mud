import Link from "next/link";

export default function AdminContentPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[1.8rem] border border-outline/50 bg-white/82 p-6 shadow-soft">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Conteúdo</p>
        <h2 className="mt-2 font-display text-[2rem] leading-tight text-ink">Escopo do CMS da MUD</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
          Sim: este admin pode evoluir para algo no estilo Wix, com edição de páginas, serviços, blog e outros blocos do site. Mas o site atual ainda lê a maior parte do conteúdo direto do código e de arquivos Markdown, então isso precisa de uma segunda etapa de migração para um modelo de CMS.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-[1.6rem] border border-outline/50 bg-white/82 p-5 shadow-soft">
          <h3 className="font-display text-[1.5rem] text-ink">Já entregue agora</h3>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            <li>Leads salvos em banco de dados.</li>
            <li>Painel para acompanhar contatos do site.</li>
            <li>Status e notas internas por lead.</li>
            <li>Edição de formatos de aula no painel.</li>
            <li>Criação e edição de posts de blog no painel.</li>
          </ul>
        </article>

        <article className="rounded-[1.6rem] border border-outline/50 bg-white/82 p-5 shadow-soft">
          <h3 className="font-display text-[1.5rem] text-ink">Próxima etapa natural</h3>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            <li>FAQ, horários e textos de contato editáveis.</li>
            <li>Configurações institucionais em vez de conteúdo hardcoded.</li>
            <li>Equipe, exposições e seções da home editáveis no painel.</li>
          </ul>
        </article>

        <article className="rounded-[1.6rem] border border-outline/50 bg-white/82 p-5 shadow-soft">
          <h3 className="font-display text-[1.5rem] text-ink">Para ficar “tipo Wix”</h3>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            <li>Blog CRUD completo no banco.</li>
            <li>Modelos de conteúdo localizados por idioma.</li>
            <li>Blocos administráveis para páginas e seções do site.</li>
          </ul>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Link href="/admin/content/home" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Home</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Seções da Página Inicial</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Altere os textos de introdução, método pedagógico e principais chamadas da página inicial.
          </p>
        </Link>

        <Link href="/admin/content/services" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Serviços</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Editar aulas e formatos</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Ajuste títulos, resumos, badges, CTAs e visibilidade dos formatos que aparecem na home e na página de aulas.
          </p>
        </Link>

        <Link href="/admin/content/team" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Equipe</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Editar membros da equipe</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Edite informações da fundadora, membro em destaque e faculty. Nome, função, biografia e foto.
          </p>
        </Link>

        <Link href="/admin/content/exhibitions" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Sobre</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Exposições e Histórico</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Adicione novas exposições, posters e atualize o portfólio da escola na página Sobre.
          </p>
        </Link>

        <Link href="/admin/content/faq" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Aulas</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Perguntas Frequentes</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Adicione, edite ou oculte as dúvidas mais comuns dos alunos (FAQ).
          </p>
        </Link>

        <Link href="/admin/content/contact" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Contato</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Textos de Contato</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Atualize títulos, descrições do mapa e textos de introdução da página de contato.
          </p>
        </Link>

        <Link href="/admin/content/blog" className="rounded-[1.7rem] border border-outline/50 bg-white/82 p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Blog</p>
          <h3 className="mt-2 font-display text-[1.8rem] leading-tight text-ink">Criar e editar posts</h3>
          <p className="mt-3 text-sm leading-7 text-muted">
            Publique novos artigos, mantenha rascunhos e substitua gradualmente o fluxo de Markdown estático por conteúdo editável no painel.
          </p>
        </Link>
      </section>

      <section className="rounded-[1.8rem] border border-outline/50 bg-surface/45 p-6 shadow-soft">
        <h3 className="font-display text-[1.7rem] text-ink">O que muda para isso funcionar</h3>
        <p className="mt-3 text-base leading-7 text-muted">
          Hoje, o blog vem de arquivos Markdown e o restante do site vem de dicionários TypeScript. Para permitir edição no painel, precisamos migrar esse conteúdo para entidades no banco de dados e fazer o frontend ler essas entidades no lugar dos arquivos locais.
        </p>
        <p className="mt-3 text-base leading-7 text-muted">
          Em outras palavras: sim, dá para ter um painel bem completo para diretoria. Só não é uma chave que se vira de uma vez. O próximo passo certo é fazer primeiro serviços, perguntas frequentes, horários e blog; depois partimos para edição estrutural das páginas.
        </p>
      </section>
    </div>
  );
}
