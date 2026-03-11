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
    primaryNavLabel: "Navegação principal",
    mobileNavLabel: "Navegação principal móvel",
    mobileDockLabel: "Navegação inferior móvel",
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
      eyebrow: "Leblon, Rio de Janeiro",
      title: "Um ateliê-escola de cerâmica.",
      description:
        "A MUD recebe adultos, crianças e iniciantes em um ateliê calmo e acolhedor.",
      primaryCta: "Conversar no WhatsApp",
      secondaryCta: "Conhecer as aulas",
      note: "Português, espanhol e inglês para moradores, expatriados e visitantes.",
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
        "Aprender cerâmica é também um tempo para si. Oferecemos diferentes formatos de aulas sempre com base técnica, acompanhamento atento e o prazer de criar com as mãos.",
      cards: [
        {
          key: "adults",
          title: "Aulas para adultos",
          summary: "Prática contínua para aprender fundamentos, ganhar repertório e desenvolver linguagem própria.",
          details: "Para iniciantes e para quem quer aprofundar técnica e projetos autorais.",
          badge: "Turmas mensalistas",
          cta: "Quero saber sobre adultos",
        },
        {
          key: "kids",
          title: "Aulas infantis",
          summary: "Experimentação lúdica guiada pelo interesse e pela curiosidade das crianças.",
          details: "Projetos interdisciplinares em um ambiente criativo, seguro e afetivo.",
          badge: "Lúdico e sensorial",
          cta: "Quero saber sobre infantil",
        },
        {
          key: "oneOff",
          title: "Aula avulsa",
          summary: "Primeira experiência para sentir o ateliê e descobrir se a cerâmica faz sentido para você.",
          details: "Boa para visitas, presentes e quem está de passagem pelo Rio.",
          badge: "Primeira experiência",
          cta: "Quero saber sobre aula avulsa",
        },
        {
          key: "wheel",
          title: "Aulas de torno",
          summary: "Para explorar o torno com precisão, ritmo e sensibilidade.",
          details: "Trabalhamos centralização e construção de formas para iniciantes e praticantes.",
          badge: "Torno cerâmico",
          cta: "Quero saber sobre aulas de torno",
        },
        {
          key: "groups",
          title: "Aulas para grupos fechados",
          summary: "Formatos para empresas, aniversários e encontros entre amigos.",
          details: "Experiência colaborativa e flexível para celebrações, encontros especiais e team building.",
          badge: "Sob medida",
          cta: "Quero planejar um grupo",
        },
      ],
    },
    pedagogy: {
      eyebrow: "ABC da cerâmica",
      title: "Metodologia",
      paragraphs: [
        "Criamos um material próprio que chamamos de ABC da Cerâmica, que orienta e organiza nossas aulas.",
        "Começamos com 8 aulas base. Nesse ciclo, o aluno experimenta diferentes técnicas de modelagem, pinch pot (belisco), placa, acordelado e torno, enquanto vivencia todas as etapas do processo: desde amassar o barro até a peça pronta.",
        "Nosso foco é desenvolver autonomia, liberdade criativa e repertório técnico, para que cada aluno possa construir sua própria relação com a cerâmica.",
      ],
      methods: ["Placa", "Cobrinha", "Pinch", "Kurinuki", "Argilas", "Engobes", "Esmaltes"],
      note: "A cerâmica é lenta: secagem, queima e acabamento fazem parte da experiência. Aqui, esse tempo é tratado como riqueza do processo.",
    },
    about: {
      eyebrow: "Sobre a MUD",
      title: "Método, troca e tempo real de ateliê.",
      paragraphs: [
        "A MUD nasceu para unir aprendizado técnico, presença e tempo real de ateliê.",
        "Aqui, técnica, escuta e pesquisa material convivem com afeto e liberdade para cada pessoa encontrar sua linguagem.",
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
        "Formatos especiais entram na conversa quando fazem sentido para a rotina do ateliê e a qualidade da experiência.",
      items: [
        "Integração de equipes e grupos corporativos",
        "Aniversários e encontros privados",
        "Experiências para visitantes e expatriados",
      ],
      cta: "Consultar possibilidades",
    },
    blog: {
      eyebrow: "Blog",
      title: "Conteúdo para a primeira aula e para aprofundar o olhar.",
      description: "Textos para dúvidas frequentes, busca local e conversas honestas sobre cerâmica.",
      cta: "Explorar o blog",
    },
    location: {
      eyebrow: "Endereço",
      title: "No Leblon, com acesso simples para a rotina do bairro e para quem visita o Rio.",
      description: "Rua Ataulfo de Paiva, Leblon: um endereço prático para alunos recorrentes e primeiras visitas.",
      cta: "Ver contato e mapa",
    },
  },
  about: {
    hero: {
      eyebrow: "Sobre",
      title: "Uma escola construída com afeto e presença.",
      description: "Ensino técnico e um ateliê acolhedor para criar com intenção.",
    },
    story: [
      "A MUD nasceu na pandemia de 2020, quando as pessoas começaram a procurar o ateliê buscando aulas. A procura revelava uma necessidade real de reconexão com o fazer manual.",
      "Foi assim que a escola surgiu: não apenas para ensinar técnica, mas como um espaço de presença, estudo e troca.",
    ],
    philosophyTitle: "Filosofia",
    philosophy: [
        "A MUD entende a cerâmica como arte, ofício e investigação. O ateliê valoriza trocas, escuta e autonomia, recebendo iniciantes com afeto e presença.",
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
      slowNote: "Na MUD, aprender cerâmica também é aprender a esperar: secar, queimar, observar e voltar para a peça.",
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
              "Na 4ª edição da exposição MUD, investigamos a relação entre presença e ausência, estrutura e suspensão. \"Quando o vazio sustenta a forma\" propõe pensar o espaço interno como parte ativa da obra cerâmica.",
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
      title: "Formatos para cada ritmo.",
      description: "Da primeira aula à prática contínua.",
    },
    abcEyebrow: "ABC da cerâmica",
    intro: [
      "Aprender cerâmica é também um tempo para si.",
      "Oferecemos diferentes formatos de aulas sempre com base técnica, acompanhamento atento e o prazer de criar com as mãos.",
    ],
    tracks: [
      {
        key: "adults",
        title: "Aulas para adultos",
          summary: "Prática contínua para aprender fundamentos, ganhar repertório e desenvolver linguagem própria.",
          details: "Para iniciantes e para quem quer aprofundar técnica e projetos autorais.",
        badge: "Turmas mensalistas",
        cta: "Falar sobre aulas para adultos",
      },
      {
        key: "kids",
        title: "Aulas infantis",
          summary: "Experimentação lúdica guiada pelo interesse e pela curiosidade das crianças.",
          details: "Projetos interdisciplinares com atenção ao desenvolvimento criativo e pedagógico.",
        badge: "Lúdico e sensorial",
        cta: "Falar sobre aulas infantis",
      },
        {
          key: "oneOff",
          title: "Aula avulsa",
          summary: "Primeira experiência para sentir o ateliê e descobrir se a cerâmica faz sentido para você.",
          details: "Boa para visitas, presentes e quem está de passagem pelo Rio.",
          badge: "Primeiro contato",
          cta: "Falar sobre aula avulsa",
        },
        {
          key: "wheel",
          title: "Aulas de torno",
          summary: "Para explorar o torno com precisão, ritmo e sensibilidade.",
          details: "Trabalhamos centralização e construção de formas para iniciantes e praticantes.",
          badge: "Torno cerâmico",
          cta: "Falar sobre aulas de torno",
        },
        {
          key: "groups",
          title: "Aulas para grupos fechados",
        summary: "Formatos para empresas, aniversários e encontros entre amigos.",
        details: "Experiência colaborativa e flexível para celebrações, encontros especiais e team building.",
        badge: "Sob medida",
        cta: "Falar sobre grupos",
      },
    ],
    abc: {
      title: "Metodologia",
      description:
        "Criamos um material próprio que chamamos de ABC da Cerâmica, que orienta e organiza nossas aulas.",
      steps: [
        "Começamos com 8 aulas base. Nesse ciclo, o aluno experimenta diferentes técnicas de modelagem, pinch pot (belisco), placa, acordelado e torno, enquanto vivencia todas as etapas do processo: desde amassar o barro até a peça pronta.",
        "Nosso foco é desenvolver autonomia, liberdade criativa e repertório técnico, para que cada aluno possa construir sua própria relação com a cerâmica.",
      ],
    },
    timeline: {
      title: "Como o tempo do processo funciona",
      items: [
        {
          title: "Modelagem",
          description: "A peça nasce no ritmo da mão, da observação e da repetição.",
        },
        {
          title: "Secagem e queima",
          description: "Depois da aula, a peça ainda precisa secar e passar por etapas de forno.",
        },
        {
          title: "Retorno e continuidade",
          description: "Esse intervalo faz parte da experiência e ajuda a compreender a cerâmica no longo prazo.",
        },
      ],
    },
    faqEyebrow: "FAQ",
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
    contactEyebrow: "Contato",
    cta: {
      title: "Quer descobrir qual formato faz mais sentido para você?",
      description: "Fale no WhatsApp para tirar dúvidas rápidas ou envie seu interesse com idioma e disponibilidade.",
      primary: "Falar no WhatsApp",
      secondary: "Ir para inscrição",
    },
  },
  team: {
    hero: {
      eyebrow: "Equipe",
      title: "Uma equipe comprometida com o seu processo.",
      description:
        "Ceramistas e professoras que entendem a técnica como ponto de partida.",
    },
    founderRole: "fundadora e diretora",
    founderBio: [
      "Vik Inaudi nasceu na Argentina e viveu quase 20 anos em Roma, onde descobriu sua trajetória como ceramista.",
      "No Rio, fundou a MUD como espaço de aprendizado e presença.",
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
        role: "Diretora e Professora",
        bio: [
          "Juliana é formada em Artes Visuais e Pedagogia pela UFRJ. Atua em projetos de arte-educação, desenvolvendo práticas pedagógicas baseadas nas múltiplas linguagens e no fazer com as mãos.",
          "Na cerâmica, investiga o legado do barro como ferramenta de criação, aprendizado e processo de autoconhecimento para crianças, jovens e adultos.",
          "Seu trabalho tem forte relação com a educação artística, criando experiências sensíveis que estimulam imaginação, expressão e autonomia.",
        ],
        imageKey: "julianaMorenoPortrait",
      },
      {
        name: "Bruna Lanes",
        role: "Professora",
        bio: [
          "Artista visual que transita por múltiplas linguagens, como pintura, costura, bordado, gravura, cerâmica e tatuagem.",
          "Desde a infância envolvida com as artes manuais, desenvolve uma produção marcada por cores intensas e formas simbólicas.",
          "Na cerâmica, encontra no barro um caminho para reconectar corpo e mente, acalmar a ansiedade e criar peças sensíveis e expressivas.",
        ],
        imageKey: "brunaLanesPortrait",
      },
      {
        name: "Cristiane Belaciano",
        role: "Professora de adultos",
        bio: [
          "Carioca, atuou por 22 anos como dentista antes de se dedicar à cerâmica, levando consigo precisão, observação e cuidado com a forma.",
          "Depois de muito trabalho de ateliê e experiência como assistente, hoje compartilha seus conhecimentos com os alunos da MUD.",
        ],
        imageKey: "cristianeBelacianoPortrait",
      },
    ],
    cta: "Quero falar com a equipe",
  },
  inquiry: {
    hero: {
      eyebrow: "Inscrição e interesse",
      title: "Conte o que você procura e a MUD responde com mais clareza.",
      description: "Use o formulário para aulas adultas, infantis, avulsas ou grupos. Para retorno rápido, o WhatsApp segue como canal principal.",
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
    formIntro: "Essas informações ajudam a escola a responder com mais precisão.",
    sideTitle: "Antes de enviar",
    sidePoints: [
      "WhatsApp é o canal mais rápido para dúvidas imediatas.",
      "Vagas, horários e formatos são confirmados individualmente.",
      "Secagem e queima fazem parte da experiência e também do planejamento.",
    ],
    whatsappCta: "Prefiro falar no WhatsApp",
  },
  blog: {
    hero: {
      eyebrow: "Blog",
      title: "Textos para apoiar a sua prática.",
      description: "Respostas reais e orientações sobre cerâmica.",
    },
    latestTitle: "Artigos recentes",
    empty: "Novos textos serão publicados em breve.",
    readArticle: "Ler artigo",
    backToBlog: "Voltar para o blog",
  },
  contact: {
    hero: {
      eyebrow: "Contato",
      title: "Fale com a MUD.",
      description: "WhatsApp para conversas rápidas, formulário para pedidos e Instagram para acompanhar o ateliê.",
    },
    moreOptionsLabel: "Mais formas de contato",
    formTitle: "Enviar mensagem",
    formIntro: "Se preferir escrever com mais contexto, envie um formulário com seus dados e disponibilidade.",
    detailsTitle: "Endereço e canais",
    detailsBody: "A escola fica no Leblon, na Rua Ataulfo de Paiva, Sobreloja 14/15. Use o mapa ou chame no WhatsApp.",
    mapTitle: "Como chegar",
    mapBody: "O mapa abaixo facilita visitas, primeiras aulas e encontros presenciais.",
    mapEmbedTitle: "Mapa da MUD Escola de Cerâmica",
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
    statement: "Escola e ateliê de cerâmica no Leblon, com técnica, pesquisa e presença.",
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
    optionalDetails: {
      label: "Informações complementares",
      hint: "Disponibilidade, idioma e contexto ajudam a MUD a responder com mais precisão.",
    },
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
