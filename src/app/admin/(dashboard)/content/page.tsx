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
          </ul>
        </article>

        <article className="rounded-[1.6rem] border border-outline/50 bg-white/82 p-5 shadow-soft">
          <h3 className="font-display text-[1.5rem] text-ink">Próxima etapa natural</h3>
          <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
            <li>Serviços e formatos de aula editáveis no painel.</li>
            <li>FAQ, horários e textos de contato editáveis.</li>
            <li>Configurações institucionais em vez de conteúdo hardcoded.</li>
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
