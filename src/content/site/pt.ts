import type { SiteDictionary } from "@/content/site/types";

export const ptDictionary: SiteDictionary = {
  localeName: "pt",
  localeNativeName: "Português",
  nav: {
    home: "Início",
    about: "Sobre",
    classes: "Aulas",
    team: "Equipe",
    inquiry: "Inscrição",
    blog: "Blog",
    contact: "Contato",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    languageSwitcher: "Idioma",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    skipToContent: "Pular para o conteúdo",
  },
  common: {
    primaryWhatsApp: "Falar no WhatsApp",
    secondaryInquiry: "Enviar interesse",
    learnMore: "Saiba mais",
    readMore: "Ler mais",
    viewAllPosts: "Ver todos os artigos",
    openMaps: "Abrir no Google Maps",
    backHome: "Voltar ao início",
    loading: "Carregando",
  },
  home: {
    hero: {
      eyebrow: "Cerâmica, aprendizado e presença no Leblon",
      title: "Um ateliê-escola para quem busca técnica, tempo e autoria.",
      description:
        "A MUD Escola de Cerâmica recebe adultos, crianças e quem está chegando para a primeira aula em um espaço calmo, humano e pedagogicamente consistente no Rio de Janeiro.",
      primaryCta: "Conversar no WhatsApp",
      secondaryCta: "Conhecer as aulas",
      note: "Português, espanhol e inglês em uma experiência acolhedora para moradores, expatriados e visitantes.",
      trustPoints: [
        "Leblon, Rio de Janeiro",
        "Aulas recorrentes, infantis e avulsas",
        "Base técnica com pesquisa e autonomia",
      ],
    },
    classes: {
      eyebrow: "Aulas",
      title: "Formas diferentes de começar, o mesmo cuidado com o processo.",
      intro:
        "Na MUD, oferecemos diferentes formatos de aula, pensados para acolher perfis diversos sem perder o rigor técnico, a escuta e o prazer de trabalhar com as mãos.",
      cards: [
        {
          key: "adults",
          title: "Aulas para adultos",
          summary: "Uma prática contínua para quem deseja aprender os fundamentos da cerâmica, desenvolver sua própria linguagem e ganhar autonomia ao longo do tempo.",
          details:
            "Ideal para iniciantes e também para quem quer aprofundar técnica, repertório e projetos autorais.",
          badge: "Turmas mensalistas",
          cta: "Quero saber sobre adultos",
        },
        {
          key: "kids",
          title: "Aulas infantis",
          summary: "De forma lúdica, experimentamos as técnicas a partir do desejo e do interesse das crianças.",
          details:
            "Por meio de propostas interdisciplinares, trabalhamos com projetos que acompanham seu desenvolvimento criativo e pedagógico em um ambiente criativo, seguro e afetivo.",
          badge: "Lúdico e sensorial",
          cta: "Quero saber sobre infantil",
        },
        {
          key: "oneOff",
          title: "Aula avulsa",
          summary: "Ideal para quem quer viver uma primeira experiência com a cerâmica e descobrir se esse universo faz sentido para você.",
          details:
            "Uma ótima opção para primeiras visitas, para presentear alguém ou para quem está de passagem pela cidade.",
          badge: "Primeira experiência",
          cta: "Quero saber sobre aula avulsa",
        },
        {
          key: "wheel",
          title: "Aulas de torno",
          summary:
            "Voltadas para quem deseja explorar a modelagem no torno cerâmico, uma técnica que combina precisão, ritmo e sensibilidade.",
          details:
            "Ao longo das aulas, trabalhamos os fundamentos de centralização da peça e construção de formas. Indicadas tanto para iniciantes curiosos quanto para quem deseja aprofundar sua prática e incorporar o torno ao seu repertório na cerâmica.",
          badge: "Torno cerâmico",
          cta: "Quero saber sobre aulas de torno",
        },
        {
          key: "groups",
          title: "Aulas para grupos fechados",
          summary: "Propostas voltadas para equipes de empresas, celebrações de aniversário ou encontros entre amigos.",
          details:
            "Uma experiência em grupo, com clima leve e colaborativo, em um formato flexível para celebrações, encontros especiais e atividades de team building.",
          badge: "Sob medida",
          cta: "Quero planejar um grupo",
        },
      ],
    },
    pedagogy: {
      eyebrow: "ABC da cerâmica",
      title: "Fundamento antes do atalho.",
      paragraphs: [
        "Na MUD, a entrada no universo da cerâmica passa por uma primeira etapa de 8 aulas dedicada ao que o ateliê chama de ABC da cerâmica.",
        "Nesse ciclo, o aluno aprende técnicas de modelagem, como placa, cobrinha, pinch e kurinuki, enquanto se aproxima dos aspectos científicos e de pesquisa que sustentam o fazer cerâmico.",
        "A intenção não é acelerar o processo, mas construir repertório para que cada pessoa desenvolva projetos com mais independência, entendimento material e liberdade criativa.",
      ],
      methods: ["Placa", "Cobrinha", "Pinch", "Kurinuki", "Argilas", "Engobes", "Esmaltes"],
      note: "A cerâmica é lenta: secagem, queima e acabamento fazem parte da experiência. Aqui, esse tempo é tratado como riqueza do processo.",
    },
    about: {
      eyebrow: "Sobre a MUD",
      title: "Método, troca e tempo real de ateliê.",
      paragraphs: [
        "A MUD nasceu do desejo de criar um espaço em que aprender cerâmica significasse também desacelerar, observar e construir repertório com presença.",
        "No cotidiano do ateliê, técnica, escuta e pesquisa material convivem com afeto, autonomia e liberdade para que cada pessoa encontre sua própria linguagem.",
      ],
      cta: "Conhecer a história da MUD",
    },
    team: {
      eyebrow: "Equipe",
      title: "Uma equipe próxima, plural e presente no processo de cada aluno.",
      description:
        "Ceramistas, professoras e educadoras com formações diversas sustentam uma experiência calorosa, atenta e tecnicamente consistente.",
      cta: "Conhecer a equipe",
    },
    experiences: {
      eyebrow: "Experiências sob consulta",
      title: "A cerâmica também pode receber encontros, equipes e visitantes.",
      description:
        "A MUD abre espaço para conversas sobre formatos especiais quando houver encaixe com a rotina do ateliê e com a qualidade da experiência.",
      items: [
        "Team building e grupos corporativos",
        "Aniversários e encontros privados",
        "Experiências para visitantes e expatriados",
      ],
      cta: "Consultar possibilidades",
    },
    blog: {
      eyebrow: "Blog",
      title: "Conteúdo para quem está chegando ou quer aprofundar o olhar.",
      description:
        "Um espaço editorial para esclarecer dúvidas frequentes, apoiar buscas locais e compartilhar o universo da cerâmica a partir da MUD.",
      cta: "Explorar o blog",
    },
    location: {
      eyebrow: "Endereço",
      title: "No Leblon, com acesso simples para a rotina do bairro, da Zona Sul e de quem está de passagem pelo Rio.",
      description:
        "A escola funciona na Rua Ataulfo de Paiva, em Leblon, Rio de Janeiro — um ponto prático para alunos recorrentes e para quem descobre a MUD durante a estadia na cidade.",
      cta: "Ver contato e mapa",
    },
  },
  about: {
    hero: {
      eyebrow: "Sobre",
      title: "Uma escola de cerâmica que cresce sem perder afeto, escuta e presença.",
      description:
        "A MUD une ensino técnico, investigação material e um ambiente acolhedor para quem deseja criar com mais consciência e autonomia.",
    },
    story: [
      "Convencida de que o mundo precisaria parar para refletir sobre prioridades, Vik Inaudi teve o privilégio de continuar trabalhando em seu ateliê durante a pandemia de 2020, no mesmo espaço que hoje recebe a MUD Leblon.",
      "Nesse período, muitas pessoas começaram a chegar perguntando sobre cursos de cerâmica e arte. A procura revelava mais do que curiosidade: havia uma necessidade concreta de reencontro com a criatividade e com o próprio tempo interior.",
      "Foi assim que a MUD nasceu: não apenas como um lugar para aprender uma técnica, mas como um espaço de presença, aprendizado e pesquisa, em que o barro atua como matéria-prima e também como mediador sensível.",
    ],
    philosophyTitle: "Filosofia",
    philosophy: [
      "A MUD entende a cerâmica como arte milenar, ofício e campo de investigação. Por isso, o ensino começa pela base e convida o aluno a compreender o material para depois expandir repertório e linguagem própria.",
      "O ambiente do ateliê valoriza trocas, escuta e autonomia. Acolhe iniciantes sem infantilizar o processo e acompanha cada pessoa com atenção para que o aprendizado seja sério, mas nunca rígido ou impessoal.",
    ],
    valuesTitle: "Valores do ateliê",
    values: [
      {
        title: "Calma com profundidade",
        description:
          "O tempo da cerâmica não é tratado como obstáculo, e sim como parte do que torna o processo mais rico e transformador.",
      },
      {
        title: "Técnica com liberdade",
        description:
          "Fundamentos sólidos servem para abrir caminhos autorais, não para engessar a criação.",
      },
      {
        title: "Humanidade no crescimento",
        description:
          "Mesmo com ambição de crescer, a MUD quer manter o cuidado pessoal, o afeto e a sensação de ateliê vivo.",
      },
    ],
    whyTitle: "Por que MUD",
    whyPoints: [
      "Porque o Leblon reúne conveniência e vida de bairro para aulas recorrentes.",
      "Porque o acompanhamento pedagógico respeita o nível e o interesse de cada aluno.",
      "Porque a escola conversa bem com moradores, famílias, expatriados e visitantes curiosos.",
    ],
    slowNote:
      "Na MUD, aprender cerâmica significa também aprender a esperar: secar, queimar, observar e voltar para a peça faz parte da formação do olhar.",
    exhibitions: {
      eyebrow: "Exposições",
      title: "Exposições MUD - Escola de Cerâmica",
      intro: [
        "Todos os anos, como forma de encerramento do ciclo de atividades, realizamos uma exposição coletiva. Esse momento nos permite aprofundar nossas pesquisas e ampliar o diálogo com a arte. A cada edição escolhemos um tema e artistas que atravessam essa reflexão; a partir deles, investigamos processos, referências e criamos possíveis releituras de suas obras.",
        "Entendemos a exposição como um espaço de experimentação e partilha, que incentiva nossos alunos a expandirem suas investigações e a explorarem diferentes formas de expressão artística por meio da cerâmica.",
      ],
      items: [
        {
          year: "2025",
          editionLabel: "4ª edição",
          title: "Quando o vazio sustenta a forma",
          date: "04 de dezembro de 2025, às 16h",
          location: ["Rua Ataulfo de Paiva, 1174"],
          description:
            "Na 4ª edição da exposição MUD, investigamos a relação entre presença e ausência, estrutura e suspensão. \"Quando o vazio sustenta a forma\" propõe pensar o espaço interno como parte ativa da obra cerâmica. A mostra aconteceu em 4 de dezembro de 2025, às 16h, na Rua Ataulfo de Paiva, 1174.",
          posterKey: "mudExhibition2025",
        },
        {
          year: "2024",
          editionLabel: "3ª edição da Exposição MUD 2024",
          title: "As Américas",
          date: "5 e 6 de dezembro de 2024",
          location: ["Consulado Geral da República Argentina em Botafogo", "Praia de Botafogo, 228/SL 201"],
          description:
            "Na 3ª edição, o tema \"As Américas\" convidou os alunos a olhar para o continente como território plural de memórias, imagens e atravessamentos culturais. A exposição reuniu pesquisas em cerâmica conectadas a diferentes referências visuais e narrativas das Américas. Foi apresentada nos dias 5 e 6 de dezembro de 2024, no Consulado Geral da República Argentina, em Botafogo.",
          posterKey: "mudExhibition2024",
        },
        {
          year: "2023",
          editionLabel: "2ª edição",
          title: "YBY - Nossa Terra",
          date: "30 de novembro e 1º de dezembro de 2023",
          location: ["Consulado Geral da República Argentina, Botafogo"],
          description:
            "Em 2023, a exposição \"YBY - Nossa Terra\" voltou o olhar para a terra como matéria, origem e pertencimento. O tema aproximou processos cerâmicos, natureza e identidade, reforçando a relação entre criação e território. A mostra aconteceu em 30 de novembro e 1º de dezembro de 2023, no Consulado Geral da República Argentina, em Botafogo.",
          posterKey: "mudExhibition2023",
        },
        {
          year: "2022",
          editionLabel: "1ª edição",
          title: "O Possível",
          date: "26, 27 e 28 de outubro de 2022",
          location: ["Consulado Argentino", "Praia de Botafogo, 228, Botafogo"],
          description:
            "Em 2022, a exposição \"O Possível\" abriu espaço para experimentação, descoberta e novos gestos na cerâmica. O tema propôs pensar a criação a partir do que pode emergir do processo, do encontro e da matéria. A mostra foi realizada em 26, 27 e 28 de outubro de 2022, no Consulado Argentino, na Praia de Botafogo, 228.",
          posterKey: "mudExhibition2022",
        },
      ],
    },
  },
  classes: {
    hero: {
      eyebrow: "Aulas",
      title: "Formatos pensados para começar bem, aprofundar a prática e encontrar o seu ritmo.",
      description:
        "Da primeira experiência ao aprofundamento contínuo, a MUD apresenta a cerâmica como campo de técnica, pesquisa, criatividade e presença.",
    },
    intro: [
      "Na MUD, oferecemos diferentes formatos de aula para acolher perfis diversos sem perder o rigor técnico, a escuta e o prazer de trabalhar com as mãos.",
      "O objetivo é que cada aluno ganhe repertório para desenvolver projetos próprios, compreenda melhor a matéria e avance de forma gradual, acompanhada e consciente.",
    ],
    tracks: [
      {
        key: "adults",
        title: "Aulas para adultos",
        summary:
          "Uma prática contínua para quem deseja aprender os fundamentos da cerâmica, desenvolver sua própria linguagem e ganhar autonomia ao longo do tempo.",
        details:
          "Ideal para iniciantes e também para quem quer aprofundar técnica, repertório e projetos autorais.",
        badge: "Turmas mensalistas",
        cta: "Falar sobre aulas para adultos",
      },
      {
        key: "kids",
        title: "Aulas infantis",
        summary:
          "De forma lúdica, experimentamos as técnicas a partir do desejo e do interesse das crianças.",
        details:
          "Por meio de propostas interdisciplinares, trabalhamos com projetos que acompanham seu desenvolvimento criativo e pedagógico.",
        badge: "Lúdico e sensorial",
        cta: "Falar sobre aulas infantis",
      },
        {
          key: "oneOff",
          title: "Aula avulsa",
          summary:
            "Ideal para quem quer viver uma primeira experiência com a cerâmica e descobrir se esse universo faz sentido para você.",
          details:
            "Uma ótima opção para primeiras visitas, para presentear alguém ou para quem está de passagem pela cidade.",
          badge: "Primeiro contato",
          cta: "Falar sobre aula avulsa",
        },
        {
          key: "wheel",
          title: "Aulas de torno",
          summary:
            "Voltadas para quem deseja explorar a modelagem no torno cerâmico, uma técnica que combina precisão, ritmo e sensibilidade.",
          details:
            "Ao longo das aulas, trabalhamos os fundamentos de centralização da peça e construção de formas. Indicadas tanto para iniciantes curiosos quanto para quem deseja aprofundar sua prática e incorporar o torno ao seu repertório na cerâmica.",
          badge: "Torno cerâmico",
          cta: "Falar sobre aulas de torno",
        },
        {
          key: "groups",
          title: "Aulas para grupos fechados",
        summary:
          "Propostas voltadas para equipes de empresas, celebrações de aniversário ou encontros entre amigos.",
        details:
          "Uma experiência em grupo, com clima leve e colaborativo, em um formato flexível para celebrações, encontros especiais e atividades de team building.",
        badge: "Sob medida",
        cta: "Falar sobre grupos",
      },
    ],
    abc: {
      title: "O ciclo inicial de 8 aulas",
      description:
        "O ABC da cerâmica é a etapa em que o aluno aprende fundamentos de modelagem e se aproxima dos conhecimentos necessários para criar suas próprias argilas, esmaltes e engobes.",
      steps: [
        "Técnicas básicas: placa, cobrinha, pinch e kurinuki",
        "Compreensão de secagem, queima, acabamento e comportamento do barro",
        "Introdução gradual à pesquisa material e à autonomia de projeto",
      ],
    },
    timeline: {
      title: "Como o tempo do processo funciona",
      items: [
        {
          title: "Modelagem",
          description:
            "A peça nasce no ritmo da mão, da observação e da repetição. Não é um processo de pressa.",
        },
        {
          title: "Secagem e queima",
          description:
            "Depois da aula, a peça ainda precisa secar e passar por etapas de forno antes de estar pronta.",
        },
        {
          title: "Retorno e continuidade",
          description:
            "Esse intervalo faz parte da experiência e ajuda o aluno a compreender a cerâmica como prática de longo prazo.",
        },
      ],
    },
    faqTitle: "Perguntas frequentes",
    faqs: [
      {
        question: "Preciso ter experiência para começar?",
        answer:
          "Não. A MUD recebe iniciantes e organiza o começo do aprendizado de maneira estruturada, sem simplificar demais o processo.",
      },
      {
        question: "Quanto tempo dura o ciclo inicial?",
        answer:
          "A primeira etapa, chamada de ABC da cerâmica, tem duração de 8 aulas dedicadas aos fundamentos técnicos e ao repertório material.",
      },
      {
        question: "Como funciona a secagem e a queima?",
        answer:
          "As peças precisam passar por tempos de secagem e etapas de forno. A disponibilidade final não é imediata, e isso faz parte da natureza da cerâmica.",
      },
      {
        question: "Há aulas avulsas?",
        answer:
          "Sim. A aula avulsa é uma forma de experimentar o ateliê, entender a dinâmica e sentir se você quer seguir em um percurso recorrente.",
      },
      {
        question: "Há opções para crianças?",
        answer:
          "Sim. A MUD oferece aulas infantis com atenção à ludicidade, ao processo sensorial e ao cuidado pedagógico.",
      },
      {
        question: "Posso propor workshop para grupo ou empresa?",
        answer:
          "Sim. A escola recebe consultas para grupos privados, empresas, eventos e experiências especiais, sempre avaliando formato e disponibilidade.",
      },
    ],
    cta: {
      title: "Quer descobrir qual formato faz mais sentido para você?",
      description:
        "Chame no WhatsApp para tirar dúvidas rápidas ou envie um formulário com o tipo de interesse, idioma e disponibilidade.",
      primary: "Falar no WhatsApp",
      secondary: "Ir para inscrição",
    },
  },
  team: {
    hero: {
      eyebrow: "Equipe",
      title: "Uma equipe plural, próxima e comprometida com o processo de cada aluno.",
      description:
        "A MUD reúne ceramistas, professoras e profissionais da educação que entendem a técnica como ponto de partida para autoria, pesquisa e troca.",
    },
    founderRole: "fundadora e directora",
    founderBio: [
      "Vik Inaudi nasceu na Argentina e viveu quase 20 anos em Roma, onde descobriu sua trajetória como ceramista.",
      "Apaixonada pelo Rio, encontrou na cidade a vocação para a educação e fundou a MUD como espaço de aprendizado, escuta e presença através da cerâmica.",
    ],
    featuredTitle: "Professora em destaque",
    featuredIntro:
      "Dolores Damiano soma à equipe um percurso atravessado por deslocamentos, experimentação e um olhar atento para as múltiplas possibilidades da argila.",
    featuredMember: {
      name: "Dolores Damiano",
      role: "Professora",
      tagline: "Técnica e experimentação em diálogo contínuo com arte, terapia e reinvenção.",
      bio: [
        "Nascida na Argentina e com passagens pela Austrália, Dolores descobriu nas infinitas possibilidades da argila um caminho de constante reinvenção.",
        "Seu trabalho nasce do diálogo entre técnica e experimentação, arte e terapia, sempre em movimento.",
      ],
      highlights: [
        "Argentina e passagens pela Austrália",
        "Técnica e experimentação em diálogo",
        "Arte e terapia em movimento",
      ],
      imageKey: "doloresPortrait",
    },
    facultyTitle: "Professoras e equipe",
    facultyIntro:
      "Trajetórias diferentes se encontram no ateliê para sustentar uma experiência pedagógica calorosa, atenta e tecnicamente consistente.",
    portraitPending: "Foto em breve",
    members: [
      {
        name: "Juliana Moreno",
        role: "directora e professora",
        bio: [
          "Formada em Pedagogia pela UFRJ, atua em projetos ligados à Arte-Educação e à mediação escolar de crianças da Educação Infantil e Fundamental.",
          "Encantada pelos trabalhos manuais, encontra na MUD formas de redescobrir a relação com a arte e o fazer em ateliê.",
        ],
        imageKey: "teamPlaceholder",
      },
      {
        name: "Luiza Bittencourt",
        role: "Professora de adultos",
        bio: [
          "Com formação em Ciência Política pela UnB, deixou anos de trabalho em escritórios para se dedicar à arte em 2019.",
          "Nas aulas, prioriza a individualidade dos alunos e a liberdade de expressão, transformando a argila em obras únicas e significativas.",
        ],
        imageKey: "teamPlaceholder",
      },
      {
        name: "Cristiane Belaciano",
        role: "Professora de adultos",
        bio: [
          "Carioca, atuou por 22 anos como dentista antes de se dedicar à cerâmica, levando consigo precisão, observação e cuidado com a forma.",
          "Depois de muito trabalho de ateliê e experiência como assistente, hoje compartilha seus conhecimentos com os alunos da MUD.",
        ],
        imageKey: "teamPlaceholder",
      },
    ],
    cta: "Quero falar com a equipe",
  },
  inquiry: {
    hero: {
      eyebrow: "Inscrição e interesse",
      title: "Conte o que você procura e a MUD responde com mais clareza e cuidado.",
      description:
        "Use o formulário para aulas adultas, infantis, aula avulsa ou pedidos para grupos e empresas. Para retorno mais rápido, o WhatsApp segue como canal principal.",
    },
    tracksTitle: "Escolha o tipo de interesse",
    tracks: [
      {
        key: "adults",
        title: "Adultos",
        summary: "Para quem busca prática recorrente, técnica e desenvolvimento autoral.",
        details: "Conte seu nível, idioma preferido e disponibilidade.",
        badge: "Recorrente",
        cta: "Selecionar adultos",
      },
      {
        key: "kids",
        title: "Infantil",
        summary: "Para famílias interessadas em uma experiência criativa e cuidadosa para crianças.",
        details: "Você pode informar idade da criança e observações importantes.",
        badge: "Famílias",
        cta: "Selecionar infantil",
      },
        {
          key: "oneOff",
          title: "Aula avulsa",
          summary: "Para quem quer experimentar o ateliê sem compromisso inicial de longo prazo.",
          details: "Bom caminho para primeira visita, presente ou experiência breve no Rio.",
          badge: "Primeiro contato",
          cta: "Selecionar aula avulsa",
        },
        {
          key: "wheel",
          title: "Aulas de torno",
          summary:
            "Para quem deseja explorar a modelagem no torno cerâmico com atenção a técnica, ritmo e sensibilidade.",
          details:
            "Você pode contar sua experiência prévia com o torno e o que deseja desenvolver nas aulas.",
          badge: "Torno cerâmico",
          cta: "Selecionar aulas de torno",
        },
        {
          key: "groups",
          title: "Grupos, empresas e eventos",
        summary: "Para pedidos sob medida ligados a encontros privados, aniversários, ativações e equipes.",
        details: "Descreva objetivo, número de pessoas e expectativas para o formato.",
        badge: "Sob consulta",
        cta: "Selecionar grupos",
      },
    ],
    formTitle: "Formulário de interesse",
    formIntro:
      "As informações abaixo ajudam a escola a responder melhor e já deixam o atendimento pronto para futuras integrações de CRM e acompanhamento.",
    sideTitle: "Antes de enviar",
    sidePoints: [
      "WhatsApp é o canal mais rápido para dúvidas imediatas.",
      "As vagas, horários e formatos são confirmados individualmente.",
      "Na cerâmica, o tempo de secagem e queima faz parte da experiência — e também do planejamento.",
    ],
    whatsappCta: "Prefiro falar no WhatsApp",
  },
  blog: {
    hero: {
      eyebrow: "Blog",
      title: "Textos para orientar a primeira visita e aprofundar o universo da cerâmica.",
      description:
        "Conteúdo pensado para dúvidas reais de quem procura aulas de cerâmica no Leblon, no Rio de Janeiro e em uma experiência artesanal de confiança.",
    },
    latestTitle: "Artigos recentes",
    empty: "Novos textos serão publicados em breve.",
    readArticle: "Ler artigo",
    backToBlog: "Voltar para o blog",
  },
  contact: {
    hero: {
      eyebrow: "Contato",
      title: "Fale com a MUD pelo canal que fizer mais sentido para você.",
      description:
        "WhatsApp para conversas rápidas, formulário para pedidos mais estruturados e Instagram para acompanhar o dia a dia do ateliê.",
    },
    formTitle: "Enviar mensagem",
    formIntro:
      "Se preferir escrever com mais contexto, envie um formulário com seus dados, tipo de interesse e disponibilidade.",
    detailsTitle: "Endereço e canais",
    detailsBody:
      "A escola está no Leblon, na Rua Ataulfo de Paiva, Sobreloja 14/15. Use o mapa para traçar a rota ou clique no WhatsApp para um atendimento mais direto.",
    mapTitle: "Como chegar",
    mapBody:
      "O mapa abaixo aponta a localização da MUD no Leblon para facilitar visitas, primeiras aulas e encontros presenciais.",
    whatsappCta: "Chamar no WhatsApp",
    instagramCta: "Abrir Instagram",
  },
  privacy: {
    hero: {
      eyebrow: "Privacidade",
      title: "Como a MUD trata os dados enviados pelo site.",
      description:
        "Uma política simples, objetiva e compatível com o uso real do site para contato, inscrição e atendimento.",
    },
    sections: [
      {
        title: "Quais dados podem ser coletados",
        paragraphs: [
          "Quando você preenche um formulário, a MUD pode receber nome, sobrenome, e-mail, telefone, mensagem, interesse, idioma preferido, disponibilidade e informações de origem da visita, como UTMs.",
          "No caso de interesse em aulas infantis, dados como idade da criança só devem ser enviados por responsável legal e apenas quando forem relevantes para o atendimento.",
        ],
      },
      {
        title: "Para que esses dados são usados",
        paragraphs: [
          "Os dados servem para responder dúvidas, organizar inscrições, entender o interesse por formatos de aula e estruturar futuros fluxos de relacionamento e acompanhamento com mais clareza.",
          "A MUD não vende essas informações e busca coletar apenas o necessário para atendimento e organização interna.",
        ],
      },
      {
        title: "Canais externos e retenção",
        paragraphs: [
          "O site pode conter links para WhatsApp, Instagram e Google Maps, serviços que seguem políticas próprias de privacidade.",
          "Caso deseje atualizar ou remover informações enviadas pelo formulário, utilize os canais de contato disponibilizados no próprio site.",
        ],
      },
    ],
  },
  footer: {
    statement:
      "Escola e ateliê de cerâmica em Leblon, voltada a técnica, pesquisa, criatividade e presença.",
    contactTitle: "Contato",
    linksTitle: "Navegação",
    socialTitle: "Redes e canais",
    privacy: "Privacidade",
    rights: "Todos os direitos reservados.",
  },
  notFound: {
    title: "Página não encontrada.",
    description:
      "Talvez o conteúdo tenha mudado de lugar ou o link esteja incompleto. Você pode voltar para o início ou falar com a escola pelo WhatsApp.",
    primary: "Voltar ao início",
    secondary: "Abrir WhatsApp",
  },
  form: {
    labels: {
      firstName: "Nome",
      lastName: "Sobrenome",
      email: "E-mail",
      phone: "Telefone",
      message: "Mensagem",
      interest: "Interesse",
      preferredLanguage: "Idioma preferido",
      availability: "Faixa de horário / disponibilidade",
      foundUs: "Como nos encontrou?",
      childAge: "Idade da criança (opcional)",
      consent: "Autorizo o uso dessas informações para retorno sobre meu interesse.",
      submit: "Enviar mensagem",
    },
    placeholders: {
      firstName: "Ex.: Carla",
      lastName: "Ex.: Lima",
      email: "voce@email.com",
      phone: "(21) 99999-9999",
      message: "Conte um pouco sobre o que você procura.",
      availability: "Ex.: manhã de terça, fim de tarde, sábados...",
      childAge: "Ex.: 8 anos",
    },
    interests: {
      adults: "Adulto",
      kids: "Infantil",
      oneOff: "Aula avulsa",
      wheel: "Aulas de torno",
      groups: "Grupo / empresa / evento",
    },
    languages: {
      pt: "Português",
      es: "Español",
      en: "English",
    },
    foundUsOptions: [
      "Google / busca",
      "Instagram",
      "Indicação",
      "Passei em frente",
      "Parceria / empresa",
      "Outro",
    ],
    consentHint:
      "Usaremos seus dados apenas para responder ao contato, organizar o atendimento e melhorar futuros fluxos de acompanhamento.",
    successTitle: "Mensagem enviada",
    successBody:
      "Recebemos seu interesse. A equipe da MUD retorna pelos canais informados assim que possível.",
    errorTitle: "Não foi possível enviar agora",
    errorBody:
      "Tente novamente em instantes ou use o WhatsApp para falar com a escola de forma imediata.",
    configurationTitle: "Formulário em configuração",
    configurationBody:
      "O envio automático por formulário ainda precisa ser conectado a um destino final. Enquanto isso, use o WhatsApp para garantir atendimento.",
  },
  seo: {
    defaultTitle: "MUD Escola de Cerâmica | Cerâmica no Leblon, Rio de Janeiro",
    defaultDescription:
      "Escola de cerâmica no Leblon com aulas para adultos, crianças e experiências avulsas. Técnica, pesquisa e criatividade em um ateliê humano e acolhedor no Rio de Janeiro.",
    pages: {
      home: {
        title: "MUD Escola de Cerâmica | Escola de cerâmica no Leblon, Rio de Janeiro",
        description:
          "Conheça a MUD Escola de Cerâmica, no Leblon: aulas para adultos, crianças, aula avulsa e experiências em grupo com foco em técnica, pesquisa e autoria.",
      },
      about: {
        title: "Sobre a MUD | Filosofia, fundadora e valores do ateliê",
        description:
          "Conheça a história da MUD Escola de Cerâmica, a visão de Vik Inaudi e os valores que orientam o ateliê no Leblon.",
      },
      classes: {
        title: "Aulas de cerâmica | Adulto, infantil e aula avulsa no Leblon",
        description:
          "Veja como funcionam as aulas de cerâmica da MUD, incluindo o ABC da cerâmica, o ciclo inicial de 8 aulas e perguntas frequentes.",
      },
      team: {
        title: "Equipe | Professores e direção da MUD Escola de Cerâmica",
        description:
          "Conheça a equipe da MUD, com perfis que unem arte, educação, arquitetura e experiência de ateliê no Rio de Janeiro.",
      },
      inquiry: {
        title: "Inscrição | Interesse em aulas de cerâmica na MUD",
        description:
          "Envie seu interesse em aulas de cerâmica para adultos, crianças, aula avulsa ou grupos na MUD Escola de Cerâmica.",
      },
      blog: {
        title: "Blog | Cerâmica no Leblon, primeira aula e experiências na MUD",
        description:
          "Leia conteúdos da MUD sobre primeira aula de cerâmica, cerâmica no Leblon e experiências artesanais no Rio de Janeiro.",
      },
      contact: {
        title: "Contato | WhatsApp, mapa e formulário da MUD",
        description:
          "Entre em contato com a MUD Escola de Cerâmica por WhatsApp, formulário, Instagram e mapa no Leblon, Rio de Janeiro.",
      },
      privacy: {
        title: "Privacidade | Dados e formulários da MUD Escola de Cerâmica",
        description:
          "Veja como a MUD trata as informações enviadas pelo site para contato, inscrição e atendimento.",
      },
      notFound: {
        title: "Página não encontrada | MUD Escola de Cerâmica",
        description:
          "A página que você procura não foi encontrada. Volte ao início ou fale com a MUD pelo WhatsApp.",
      },
    },
  },
};
