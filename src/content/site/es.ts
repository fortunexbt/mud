import type { SiteDictionary } from "@/content/site/types";

export const esDictionary: SiteDictionary = {
  localeName: "es",
  localeNativeName: "Español",
  nav: {
    home: "Inicio",
    about: "Sobre",
    classes: "Clases",
    team: "Equipo",
    inquiry: "Inscripción",
    blog: "Blog",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    languageSwitcher: "Idioma",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipToContent: "Saltar al contenido",
  },
  common: {
    primaryWhatsApp: "Hablar por WhatsApp",
    secondaryInquiry: "Enviar consulta",
    learnMore: "Saber más",
    readMore: "Leer más",
    viewAllPosts: "Ver todos los artículos",
    openMaps: "Abrir en Google Maps",
    backHome: "Volver al inicio",
    loading: "Cargando",
  },
  home: {
    hero: {
      eyebrow: "Cerámica, aprendizaje y presencia en Leblon - Río de Janeiro",
      title: "Un atelier-escuela para quienes buscan técnica, creación y voz propia.",
      description:
        "Recibimos a adultos, niños y personas curiosas que desean explorar procesos creativos en un ambiente acogedor, sereno, inspirador y lleno de intercambio. Aquí, técnica y experimentación avanzan juntas, alentando a cada alumno a desarrollar su propio lenguaje.",
      primaryCta: "Hablar por WhatsApp",
      secondaryCta: "Conocer las clases",
      note: "Portugués, español e inglés en clases regulares, infantiles, sueltas y formatos para grupos.",
      trustPoints: [
        "Atelier-escuela en Leblon",
        "Grupos mensuales, infantiles y clases sueltas",
        "Técnica y experimentación a la par",
      ],
    },
    classes: {
      eyebrow: "Clases",
      title: "Distintas puertas de entrada, el mismo cuidado con el proceso.",
      intro:
        "En MUD ofrecemos distintos formatos de clase pensados para recibir perfiles diversos sin perder rigor técnico, escucha y placer por el trabajo manual.",
      cards: [
        {
          key: "adults",
          title: "Clases para adultos",
          summary: "Una práctica continua para quienes desean aprender los fundamentos de la cerámica, desarrollar su propio lenguaje y ganar autonomía con el tiempo.",
          details:
            "Ideal para principiantes y también para quienes quieren profundizar técnica, repertorio y proyectos autorales.",
          badge: "Grupos mensuales",
          cta: "Quiero saber sobre adultos",
        },
        {
          key: "kids",
          title: "Clases infantiles",
          summary: "De forma lúdica, experimentamos las técnicas a partir del deseo y del interés de los niños.",
          details:
            "A través de propuestas interdisciplinarias, trabajamos con proyectos que acompañan su desarrollo creativo y pedagógico en un ambiente creativo, seguro y afectivo.",
          badge: "Lúdico y sensorial",
          cta: "Quiero saber sobre infantil",
        },
        {
          key: "oneOff",
          title: "Clase suelta",
          summary: "Ideal para quien quiere vivir una primera experiencia con la cerámica y descubrir si este universo tiene sentido para sí.",
          details:
            "Una gran opción para primeras visitas, regalos o para quien está de paso por la ciudad.",
          badge: "Primera experiencia",
          cta: "Quiero saber sobre clase suelta",
        },
        {
          key: "wheel",
          title: "Clases de torno",
          summary: "Para quienes desean explorar el modelado en torno cerámico con técnica, ritmo y sensibilidad.",
          details:
            "Trabajamos la centralización de la pieza y la construcción de formas, tanto para principiantes como para quienes quieren profundizar su práctica.",
          badge: "Torno cerámico",
          cta: "Quiero saber sobre torno",
        },
        {
          key: "groups",
          title: "Clases para grupos cerrados",
          summary: "Propuestas dirigidas a equipos de empresa, celebraciones de cumpleaños o encuentros entre amigos.",
          details:
            "Una experiencia grupal, ligera y colaborativa, en un formato flexible para celebraciones, encuentros especiales y actividades de team building.",
          badge: "A medida",
          cta: "Quiero planificar un grupo",
        },
      ],
    },
    pedagogy: {
      eyebrow: "ABC de la cerámica",
      title: "Base antes que atajo.",
      paragraphs: [
        "En MUD, la entrada al universo cerámico pasa por una primera etapa de 8 clases dedicada a lo que el atelier llama ABC de la cerámica.",
        "En ese ciclo, el alumno aprende técnicas como plancha, churro, pinch y kurinuki, mientras se aproxima a los aspectos científicos y de investigación que sostienen el hacer cerámico.",
        "La idea no es acelerar el proceso, sino construir un repertorio que permita desarrollar proyectos con más independencia, comprensión material y libertad creativa.",
      ],
      methods: ["Plancha", "Churro", "Pinch", "Kurinuki", "Arcillas", "Engobes", "Esmaltes"],
      note: "La cerámica es lenta: secado, horno y terminación forman parte de la experiencia. Aquí ese tiempo se trata como parte de su valor.",
    },
    about: {
      eyebrow: "Sobre MUD",
      title: "Método, intercambio y tiempo real de atelier.",
      paragraphs: [
        "MUD nació del deseo de crear un espacio en el que aprender cerámica también signifique desacelerar, observar y construir repertorio con presencia.",
        "En el día a día del atelier, técnica, escucha e investigación material conviven con afecto, autonomía y libertad para que cada persona encuentre su propio lenguaje.",
      ],
      cta: "Conocer la historia de MUD",
    },
    team: {
      eyebrow: "Equipo",
      title: "Un equipo cercano, plural y presente en el proceso de cada alumno.",
      description:
        "Ceramistas, profesoras y educadoras con trayectorias diversas sostienen una experiencia cálida, atenta y técnicamente consistente.",
      cta: "Conocer al equipo",
    },
    experiences: {
      eyebrow: "Experiencias a consultar",
      title: "La cerámica también puede recibir equipos, grupos y visitantes.",
      description:
        "MUD abre espacio para conversar sobre formatos especiales cuando haya coherencia con la rutina del atelier y con la calidad de la experiencia.",
      items: [
        "Team building y grupos corporativos",
        "Cumpleaños y encuentros privados",
        "Experiencias para visitantes y expatriados",
      ],
      cta: "Consultar posibilidades",
    },
    blog: {
      eyebrow: "Blog",
      title: "Contenido para quien recién llega o quiere mirar con más profundidad.",
      description:
        "Un espacio editorial para aclarar dudas frecuentes, apoyar búsquedas locales y compartir el universo de la cerámica desde MUD.",
      cta: "Explorar el blog",
    },
    location: {
      eyebrow: "Ubicación",
      title: "En Leblon, con acceso simple para la rutina del barrio, la Zona Sul y quienes están de paso por Río.",
      description:
        "La escuela funciona en Rua Ataulfo de Paiva, en Leblon, un punto práctico para alumnos regulares y para quienes descubren MUD durante su estadía en la ciudad.",
      cta: "Ver contacto y mapa",
    },
  },
  about: {
    hero: {
      eyebrow: "Sobre",
      title: "Una escuela de cerámica que crece sin perder afecto, escucha y presencia.",
      description:
        "MUD une enseñanza técnica, investigación material y un ambiente acogedor para quienes quieren crear con más conciencia y autonomía.",
    },
    story: [
      "Convencida de que el mundo tendría que detenerse para revisar prioridades, Vik Inaudi pudo seguir trabajando en su atelier durante la pandemia de 2020, en el mismo espacio que hoy recibe a MUD Leblon.",
      "En ese período, muchas personas entraban preguntando por cursos de cerámica y arte. La búsqueda revelaba algo más profundo que una curiosidad pasajera: una necesidad real de reconexión con la creatividad y con el propio tiempo.",
      "Así nació MUD: no solo como un lugar para aprender una técnica, sino como un espacio de presencia, aprendizaje e investigación, donde el barro funciona como materia y también como mediador sensible.",
    ],
    philosophyTitle: "Filosofía",
    philosophy: [
      "MUD entiende la cerámica como arte milenario, oficio y campo de investigación. Por eso la enseñanza comienza por la base y acompaña al alumno hacia una comprensión más amplia del material.",
      "El ambiente del atelier valora el intercambio, la escucha y la autonomía. Recibe a principiantes sin simplificar en exceso el proceso y acompaña a cada persona con cercanía y seriedad.",
    ],
    valuesTitle: "Valores del atelier",
    values: [
      {
        title: "Calma con profundidad",
        description:
          "El tiempo de la cerámica no se vive como obstáculo, sino como parte de lo que vuelve el proceso más rico.",
      },
      {
        title: "Técnica con libertad",
        description:
          "Los fundamentos sirven para abrir caminos personales, no para uniformar la creación.",
      },
      {
        title: "Humanidad al crecer",
        description:
          "Aunque el proyecto quiera crecer, MUD busca mantener el cuidado personal y la sensación de atelier vivo.",
      },
    ],
    whyTitle: "Por qué MUD",
    whyPoints: [
      "Porque Leblon ofrece conveniencia y vida de barrio para clases regulares.",
      "Porque el acompañamiento pedagógico respeta el nivel y el interés de cada alumno.",
      "Porque la escuela dialoga bien con vecinos, familias, expatriados y visitantes curiosos.",
    ],
    slowNote:
      "Aprender cerámica en MUD también significa aprender a esperar: secar, hornear, observar y volver a la pieza forma parte del desarrollo de la mirada.",
    exhibitions: {
      eyebrow: "Exposiciones",
      title: "La producción del atelier también se encuentra con el público en muestras anuales.",
      intro: [
        "Las exposiciones de MUD amplían el recorrido del atelier más allá del aula y crean un punto de encuentro entre investigación, autoría y ciudad.",
        "Reúnen procesos desarrollados a lo largo del año y muestran cómo el aprendizaje técnico se convierte en lenguaje propio y presencia pública.",
      ],
      items: [
        {
          year: "2025",
          editionLabel: "Exposición MUD 2025",
          title: "Quando o vazio sustenta a forma",
          date: "Muestra anual",
          location: ["MUD Escola de Cerâmica", "Leblon, Río de Janeiro"],
          description:
            "Muestra colectiva dedicada a las relaciones entre vacío, estructura y presencia material en las investigaciones desarrolladas en el atelier.",
          posterKey: "mudExhibition2025",
        },
        {
          year: "2024",
          editionLabel: "Exposición MUD 2024",
          title: "As Américas",
          date: "Muestra anual",
          location: ["MUD Escola de Cerâmica", "Leblon, Río de Janeiro"],
          description:
            "Edición que reunió obras en torno a cruces, territorios y repertorios compartidos entre materia, memoria y desplazamiento.",
          posterKey: "mudExhibition2024",
        },
        {
          year: "2023",
          editionLabel: "Exposición MUD 2023",
          title: "YBY - Nossa Terra",
          date: "Muestra anual",
          location: ["MUD Escola de Cerâmica", "Leblon, Río de Janeiro"],
          description:
            "Muestra centrada en la relación con la tierra como origen, soporte e imaginación material para las búsquedas del atelier.",
          posterKey: "mudExhibition2023",
        },
        {
          year: "2022",
          editionLabel: "Exposición MUD 2022",
          title: "O Possível",
          date: "Muestra anual",
          location: ["MUD Escola de Cerâmica", "Leblon, Río de Janeiro"],
          description:
            "Primera edición de esta secuencia de muestras, afirmando la experimentación y la autoría como partes centrales de la pedagogía de MUD.",
          posterKey: "mudExhibition2022",
        },
      ],
    },
  },
  classes: {
    hero: {
      eyebrow: "Clases",
      title: "Formatos pensados para empezar bien, profundizar la práctica y encontrar tu ritmo.",
      description:
        "Desde la primera experiencia hasta una práctica continua, MUD presenta la cerámica como técnica, investigación, creatividad y presencia.",
    },
    intro: [
      "En MUD ofrecemos distintos formatos de clase para recibir perfiles diversos sin perder rigor técnico, escucha y placer por el trabajo manual.",
      "El objetivo es que cada alumno gane repertorio para desarrollar proyectos propios, comprender mejor la materia y avanzar de manera gradual y acompañada.",
    ],
    tracks: [
      {
        key: "adults",
        title: "Clases para adultos",
        summary:
          "Una práctica continua para quienes desean aprender los fundamentos de la cerámica, desarrollar su propio lenguaje y ganar autonomía con el tiempo.",
        details:
          "Ideal para principiantes y también para quienes quieren profundizar técnica, repertorio y proyectos autorales.",
        badge: "Grupos mensuales",
        cta: "Hablar sobre clases para adultos",
      },
      {
        key: "kids",
        title: "Clases infantiles",
        summary:
          "De forma lúdica, experimentamos las técnicas a partir del deseo y del interés de los niños.",
        details:
          "A través de propuestas interdisciplinarias, trabajamos con proyectos que acompañan su desarrollo creativo y pedagógico.",
        badge: "Lúdico y sensorial",
        cta: "Hablar sobre clases infantiles",
      },
        {
          key: "oneOff",
          title: "Clase suelta",
          summary:
            "Ideal para quien quiere vivir una primera experiencia con la cerámica y descubrir si este universo tiene sentido para sí.",
          details:
            "Una gran opción para primeras visitas, regalos o para quien está de paso por la ciudad.",
          badge: "Primer contacto",
          cta: "Hablar sobre clase suelta",
        },
        {
          key: "wheel",
          title: "Clases de torno",
          summary: "Para quienes desean explorar el modelado en torno cerámico con técnica, ritmo y sensibilidad.",
          details:
            "Trabajamos la centralización de la pieza y la construcción de formas, tanto para principiantes como para quienes quieren profundizar su práctica.",
          badge: "Torno cerámico",
          cta: "Hablar sobre torno",
        },
        {
          key: "groups",
          title: "Clases para grupos cerrados",
        summary:
          "Propuestas dirigidas a equipos de empresa, celebraciones de cumpleaños o encuentros entre amigos.",
        details:
          "Una experiencia grupal, ligera y colaborativa, en un formato flexible para celebraciones, encuentros especiales y actividades de team building.",
        badge: "A medida",
        cta: "Hablar sobre grupos",
      },
    ],
    abc: {
      title: "El ciclo inicial de 8 clases",
      description:
        "El ABC de la cerámica es la etapa en la que el alumno aprende fundamentos de modelado y se aproxima a conocimientos necesarios para desarrollar sus propias arcillas, esmaltes y engobes.",
      steps: [
        "Técnicas básicas: plancha, churro, pinch y kurinuki",
        "Comprensión de secado, horno, acabado y comportamiento del barro",
        "Introducción gradual a la investigación material y a la autonomía de proyecto",
      ],
    },
    timeline: {
      title: "Cómo funciona el tiempo del proceso",
      items: [
        {
          title: "Modelado",
          description:
            "La pieza nace al ritmo de la mano, de la observación y de la repetición. No es un proceso apresurado.",
        },
        {
          title: "Secado y horno",
          description:
            "Después de la clase, la pieza todavía necesita secarse y pasar por etapas de horno antes de estar lista.",
        },
        {
          title: "Regreso y continuidad",
          description:
            "Ese intervalo forma parte de la experiencia y ayuda a comprender la cerámica como práctica de largo aliento.",
        },
      ],
    },
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        question: "¿Necesito experiencia previa para empezar?",
        answer:
          "No. MUD recibe a principiantes y organiza el inicio del aprendizaje de forma clara, sin simplificar demasiado el proceso.",
      },
      {
        question: "¿Cuánto dura el ciclo inicial?",
        answer:
          "La primera etapa, llamada ABC de la cerámica, tiene una duración de 8 clases dedicadas a fundamentos técnicos y repertorio material.",
      },
      {
        question: "¿Cómo funcionan el secado y el horno?",
        answer:
          "Las piezas necesitan pasar por tiempos de secado y etapas de horno. La disponibilidad final no es inmediata, y eso forma parte de la naturaleza de la cerámica.",
      },
      {
        question: "¿Hay clases sueltas?",
        answer:
          "Sí. La clase suelta es una buena manera de conocer el atelier, entender la dinámica y sentir si quieres continuar.",
      },
      {
        question: "¿Hay opciones para niños?",
        answer:
          "Sí. MUD ofrece clases infantiles con atención a la ludicidad, al proceso sensorial y al cuidado pedagógico.",
      },
      {
        question: "¿Puedo proponer un workshop para grupo o empresa?",
        answer:
          "Sí. La escuela recibe consultas para grupos privados, empresas, eventos y experiencias especiales, siempre evaluando formato y disponibilidad.",
      },
    ],
    cta: {
      title: "¿Quieres descubrir qué formato encaja mejor contigo?",
      description:
        "Escríbenos por WhatsApp para dudas rápidas o envía un formulario con tu interés, idioma y disponibilidad.",
      primary: "Hablar por WhatsApp",
      secondary: "Ir a inscripción",
    },
  },
  team: {
    hero: {
      eyebrow: "Equipo",
      title: "Un equipo cercano, plural y comprometido con el proceso de cada alumno.",
      description:
        "MUD reúne ceramistas, profesoras y profesionales de la educación que entienden la técnica como punto de partida para la autoría, la investigación y el intercambio.",
    },
    founderRole: "Fundadora y directora",
    founderBio: [
      "Vik Inaudi nació en Argentina y vivió casi 20 años en Roma, donde descubrió su camino como ceramista.",
      "En Río encontró una vocación por la educación y fundó MUD como un espacio de aprendizaje, escucha y presencia a través de la cerámica.",
    ],
    facultyTitle: "Profesoras y equipo",
    facultyIntro:
      "Trayectorias distintas se encuentran en el atelier para sostener una experiencia pedagógica cálida, atenta y técnicamente consistente.",
    portraitPending: "Foto pronto",
    members: [
      {
        name: "Juliana Moreno",
        role: "Administración · Profesora de niños y adultos",
        bio: [
          "Formada en Pedagogía por la UFRJ, trabaja con proyectos ligados al Arte-Educación y la mediación escolar.",
          "Encantada por el trabajo manual, encuentra en MUD una forma de redescubrir el vínculo entre arte y práctica de atelier.",
        ],
        imageKey: "teamPlaceholder",
      },
      {
        name: "Luiza Bittencourt",
        role: "Profesora de adultos",
        bio: [
          "Con formación en Ciencia Política por la UnB, dejó años de trabajo de oficina para dedicarse al arte en 2019.",
          "En sus clases prioriza la individualidad de cada alumno y la libertad de expresión.",
        ],
        imageKey: "teamPlaceholder",
      },
      {
        name: "Cristiane Belaciano",
        role: "Profesora de adultos",
        bio: [
          "Carioca, trabajó 22 años como odontóloga antes de dedicarse a la cerámica, llevando consigo precisión y atención a la forma.",
          "Después de mucha práctica de atelier y experiencia como asistente, hoy comparte sus conocimientos con los alumnos de MUD.",
        ],
        imageKey: "teamPlaceholder",
      },
    ],
    cta: "Quiero hablar con el equipo",
  },
  inquiry: {
    hero: {
      eyebrow: "Inscripción e interés",
      title: "Cuéntanos qué buscas y MUD podrá responder con más claridad y cuidado.",
      description:
        "Usa el formulario para clases de adultos, infantiles, clase suelta o pedidos para grupos y empresas. Para una respuesta más rápida, WhatsApp sigue siendo el canal principal.",
    },
    tracksTitle: "Elige el tipo de interés",
    tracks: [
      {
        key: "adults",
        title: "Adultos",
        summary: "Para quienes buscan práctica regular, técnica y desarrollo autoral.",
        details: "Cuéntanos tu nivel, idioma preferido y disponibilidad.",
        badge: "Continuidad",
        cta: "Seleccionar adultos",
      },
      {
        key: "kids",
        title: "Infantil",
        summary: "Para familias interesadas en una experiencia creativa y cuidada para niños.",
        details: "Puedes informar la edad del niño y observaciones importantes.",
        badge: "Familias",
        cta: "Seleccionar infantil",
      },
        {
          key: "oneOff",
          title: "Clase suelta",
          summary: "Para quienes quieren probar el atelier sin asumir un proceso largo desde el inicio.",
          details: "Un buen camino para una primera visita o una experiencia puntual en Río.",
          badge: "Primer contacto",
          cta: "Seleccionar clase suelta",
        },
        {
          key: "wheel",
          title: "Clases de torno",
          summary: "Para quienes desean explorar el modelado en torno cerámico con técnica, ritmo y sensibilidad.",
          details: "Puedes contar tu experiencia previa con el torno y lo que deseas desarrollar en las clases.",
          badge: "Torno cerámico",
          cta: "Seleccionar torno",
        },
        {
          key: "groups",
          title: "Grupos, empresas y eventos",
        summary: "Para pedidos a medida relacionados con encuentros privados, cumpleaños, activaciones y equipos.",
        details: "Describe objetivo, cantidad de personas y expectativas del formato.",
        badge: "A consultar",
        cta: "Seleccionar grupos",
      },
    ],
    formTitle: "Formulario de interés",
    formIntro:
      "La información ayuda a la escuela a responder mejor y deja el contacto preparado para futuras integraciones de CRM y seguimiento.",
    sideTitle: "Antes de enviar",
    sidePoints: [
      "WhatsApp es el canal más rápido para dudas inmediatas.",
      "Las vacantes, horarios y formatos se confirman de manera individual.",
      "En cerámica, el tiempo de secado y horno forma parte de la experiencia y también de la planificación.",
    ],
    whatsappCta: "Prefiero escribir por WhatsApp",
  },
  blog: {
    hero: {
      eyebrow: "Blog",
      title: "Textos para orientar la primera visita y ampliar la mirada sobre la cerámica.",
      description:
        "Contenido pensado para dudas reales de quien busca clases de cerámica en Leblon, en Río de Janeiro y una experiencia artesanal confiable.",
    },
    latestTitle: "Artículos recientes",
    empty: "Pronto publicaremos nuevos textos.",
    readArticle: "Leer artículo",
    backToBlog: "Volver al blog",
  },
  contact: {
    hero: {
      eyebrow: "Contacto",
      title: "Habla con MUD por el canal que mejor se adapte a ti.",
      description:
        "WhatsApp para conversaciones rápidas, formulario para pedidos más estructurados e Instagram para acompañar el día a día del atelier.",
    },
    formTitle: "Enviar mensaje",
    formIntro:
      "Si prefieres escribir con más contexto, envía un formulario con tus datos, tipo de interés y disponibilidad.",
    detailsTitle: "Dirección y canales",
    detailsBody:
      "La escuela está en Leblon, en Rua Ataulfo de Paiva, Sobreloja 14/15. Usa el mapa para planificar la ruta o escribe por WhatsApp para una atención más directa.",
    mapTitle: "Cómo llegar",
    mapBody:
      "El mapa marca la ubicación de MUD en Leblon para facilitar visitas, primeras clases y encuentros presenciales.",
    whatsappCta: "Escribir por WhatsApp",
    instagramCta: "Abrir Instagram",
  },
  privacy: {
    hero: {
      eyebrow: "Privacidad",
      title: "Cómo trata MUD los datos enviados a través del sitio.",
      description:
        "Una política simple y honesta, alineada con el uso real del sitio para contacto, inscripción y atención.",
    },
    sections: [
      {
        title: "Qué datos pueden recopilarse",
        paragraphs: [
          "Cuando completas un formulario, MUD puede recibir nombre, apellido, correo, teléfono, mensaje, interés, idioma preferido, disponibilidad e información de origen de la visita, como UTMs.",
          "En el caso de interés por clases infantiles, datos como la edad del niño solo deben ser enviados por un responsable legal y únicamente cuando sean relevantes para la atención.",
        ],
      },
      {
        title: "Para qué se usan esos datos",
        paragraphs: [
          "Los datos se utilizan para responder dudas, organizar inscripciones, entender el interés por cada formato de clase y estructurar futuros flujos de relación y seguimiento.",
          "MUD no vende esa información y procura recopilar solo lo necesario para la atención y la organización interna.",
        ],
      },
      {
        title: "Canales externos y retención",
        paragraphs: [
          "El sitio puede contener enlaces a WhatsApp, Instagram y Google Maps, servicios que siguen sus propias políticas de privacidad.",
          "Si deseas actualizar o eliminar información enviada por formulario, utiliza los canales de contacto disponibles en el sitio.",
        ],
      },
    ],
  },
  footer: {
    statement:
      "Escuela y atelier de cerámica en Leblon, orientada a técnica, investigación, creatividad y presencia.",
    contactTitle: "Contacto",
    linksTitle: "Navegación",
    socialTitle: "Redes y canales",
    privacy: "Privacidad",
    rights: "Todos los derechos reservados.",
  },
  notFound: {
    title: "Página no encontrada.",
    description:
      "Tal vez el contenido cambió de lugar o el enlace está incompleto. Puedes volver al inicio o hablar con la escuela por WhatsApp.",
    primary: "Volver al inicio",
    secondary: "Abrir WhatsApp",
  },
  form: {
    labels: {
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo electrónico",
      phone: "Teléfono",
      message: "Mensaje",
      interest: "Interés",
      preferredLanguage: "Idioma preferido",
      availability: "Horario / disponibilidad",
      foundUs: "¿Cómo nos encontraste?",
      childAge: "Edad del niño (opcional)",
      consent: "Autorizo el uso de esta información para recibir respuesta sobre mi interés.",
      submit: "Enviar mensaje",
    },
    placeholders: {
      firstName: "Ej.: Carla",
      lastName: "Ej.: Lima",
      email: "tu@email.com",
      phone: "+55 21 99999-9999",
      message: "Cuéntanos un poco qué estás buscando.",
      availability: "Ej.: martes por la mañana, fin de tarde, sábados...",
      childAge: "Ej.: 8 años",
    },
    interests: {
      adults: "Adultos",
      kids: "Infantil",
      oneOff: "Clase suelta",
      wheel: "Clases de torno",
      groups: "Grupo / empresa / evento",
    },
    languages: {
      pt: "Português",
      es: "Español",
      en: "English",
    },
    foundUsOptions: [
      "Google / búsqueda",
      "Instagram",
      "Recomendación",
      "Pasé por la puerta",
      "Alianza / empresa",
      "Otro",
    ],
    consentHint:
      "Usaremos tus datos solo para responder al contacto, organizar la atención y mejorar futuros flujos de seguimiento.",
    successTitle: "Mensaje enviado",
    successBody:
      "Recibimos tu interés. El equipo de MUD responderá por los canales informados lo antes posible.",
    errorTitle: "No fue posible enviar ahora",
    errorBody:
      "Inténtalo nuevamente en unos minutos o usa WhatsApp para hablar con la escuela de manera inmediata.",
    configurationTitle: "Formulario en configuración",
    configurationBody:
      "El envío automático del formulario todavía debe conectarse a un destino final. Mientras tanto, usa WhatsApp para garantizar atención.",
  },
  seo: {
    defaultTitle: "MUD Escola de Cerâmica | Clases de cerámica en Leblon, Río de Janeiro",
    defaultDescription:
      "Escuela de cerámica en Leblon con clases para adultos, niños y experiencias sueltas. Técnica, investigación y creatividad en un atelier humano y acogedor en Río de Janeiro.",
    pages: {
      home: {
        title: "MUD Escola de Cerâmica | Clases de cerámica en Leblon, Río de Janeiro",
        description:
          "Conoce MUD Escola de Cerâmica en Leblon: clases para adultos, niños, clase suelta y experiencias en grupo con foco en técnica, investigación y autoría.",
      },
      about: {
        title: "Sobre MUD | Filosofía, fundadora y valores del atelier",
        description:
          "Conoce la historia de MUD Escola de Cerâmica, la visión de Vik Inaudi y los valores que orientan el atelier en Leblon.",
      },
      classes: {
        title: "Clases de cerámica | Adultos, infantil y clase suelta en Leblon",
        description:
          "Descubre cómo funcionan las clases de cerámica de MUD, incluido el ABC de la cerámica, el ciclo inicial de 8 clases y preguntas frecuentes.",
      },
      team: {
        title: "Equipo | Profesoras y dirección de MUD Escola de Cerâmica",
        description:
          "Conoce al equipo de MUD, con perfiles que unen arte, educación, arquitectura y experiencia de atelier en Río de Janeiro.",
      },
      inquiry: {
        title: "Inscripción | Interés en clases de cerámica en MUD",
        description:
          "Envía tu interés para clases de cerámica de adultos, niños, clase suelta o grupos en MUD Escola de Cerâmica.",
      },
      blog: {
        title: "Blog | Cerámica en Leblon, primera clase y experiencias en MUD",
        description:
          "Lee contenidos de MUD sobre primera clase de cerámica, cerámica en Leblon y experiencias artesanales en Río de Janeiro.",
      },
      contact: {
        title: "Contacto | WhatsApp, mapa y formulario de MUD",
        description:
          "Habla con MUD Escola de Cerâmica por WhatsApp, formulario, Instagram y mapa en Leblon, Río de Janeiro.",
      },
      privacy: {
        title: "Privacidad | Datos y formularios de MUD Escola de Cerâmica",
        description:
          "Mira cómo trata MUD la información enviada por el sitio para contacto, inscripción y atención.",
      },
      notFound: {
        title: "Página no encontrada | MUD Escola de Cerâmica",
        description:
          "La página que buscas no fue encontrada. Vuelve al inicio o habla con MUD por WhatsApp.",
      },
    },
  },
};
