export const projectPitches = {
  en: {
    intro: {
      eyebrow: "THE WORK, THE REASON BEHIND IT",
      title: "Every project starts with a problem worth solving.",
      description: "Each project begins with a different operational or social challenge, then explores a product and technical response."
    },
    labels: {
      scenario: "The scenario",
      proposal: "The proposal",
      solution: "How it works",
      stage: "Current stage",
      explore: "Explore the project",
      visualNote: "Project interface / conceptual model"
    },
    items: [
      {
        id: "fractaw",
        title: "Fractaw Modules",
        category: "Independent product concept",
        status: "Prototype · in development",
        headline: "Organizations should not have to pay for software modules they never use.",
        scenario: "Many management systems are sold as rigid, broad packages. Organizations end up paying for features that do not fit their operation, while missing capabilities or poor separation between modules make the system harder to adapt and evolve. A school and a beverage distributor, for example, have very different workflows and should not need the same specialized features.",
        proposal: "Build a modular management ecosystem around a shared foundation. Each organization can compose its environment with the capabilities it actually needs, without carrying unrelated functionality.",
        solution: "Fractaw separates shared capabilities from modules specialized for each type of organization. The product direction includes education workflows such as schedules and availability, and beverage distribution workflows such as inventory and daily operations. The architecture is intended to let these modules evolve independently while using common foundations. The current prototype demonstrates module selection and applicability for an organization.",
        image: "https://raw.githubusercontent.com/CaioDGeraldi/FractawModules/1449d4d8633c32edbdfdd01e0649b47b869b307c/docs/evidencias/ux143/modularidade-1440.png",
        imageAlt: "Fractaw prototype showing module administration for a fictional school",
        visual: "image",
        tags: ["Python", "Django", "Domain modeling"],
        slug: "fractaw"
      },
      {
        id: "retorna",
        title: "Retorna",
        category: "Collaborative project",
        status: "Source available",
        headline: "A loyalty system needs to fit each business and work with the systems it already has.",
        scenario: "A loyalty strategy that works for one business may not work for another. Even branches of the same company can need different policies, rewards or campaigns. At the same time, replacing an existing point-of-sale or ERP system just to introduce loyalty features is often impractical.",
        proposal: "Create a configurable, multi-company loyalty platform that integrates with existing commercial systems and centralizes the rules and operations behind points, campaigns, balances and redemptions.",
        solution: "Each company configures its earning and redemption policies, with rules that can vary by establishment. Sales events arrive through an API and are processed according to the applicable configuration. The platform manages customers, point balances and a traceable transaction history, including expiration and redemption by point batches using FEFO prioritization. Transactional safeguards protect balance-changing operations.",
        visual: "flow",
        tags: ["Django REST Framework", "PostgreSQL", "Business rules"],
        slug: "retorna"
      },
      {
        id: "centro-em-movimento",
        title: "Centro em Movimento",
        category: "Public innovation proposal",
        status: "Functional prototype · in development",
        headline: "Digital discovery should create more reasons to visit, explore and return to the city centre.",
        scenario: "The city centre's loss of vitality is connected to several challenges: local businesses struggle to compete for attention in digital channels, consumers have fewer reasons to discover stores beyond the ones they already know, and information about shops and activities is scattered. The issue is not simply online shopping; it is the weakening connection between discovery, physical circulation and local commerce.",
        proposal: "A local development initiative supported by a digital platform that connects consumers and businesses, turns online discovery into in-person visits and encourages people to explore more of the centre. Technology is the instrument, not the end goal.",
        solution: "Vem pro Centro brings together business and product catalogues, search, discovery routes, local events and activities, and shared loyalty campaigns. The intended journey is to discover a place, explore nearby options, visit a business, make a purchase and have a reason to return. Reservations start through an external contact channel, primarily WhatsApp, with a prepared message; the merchant confirms directly with the customer. Purchases happen in person and are confirmed by the establishment for eligible loyalty activity, so the platform is not a marketplace with an online checkout. Aggregated information can also help public decision-makers understand local trends and gaps without exposing individual consumers.",
        image: "https://github.com/user-attachments/assets/73cc398e-904c-4e6d-b097-83b7c9f824bd",
        imageAlt: "Vem pro Centro prototype home screen with local store discovery and routes",
        visual: "image",
        tags: ["Product design", "Local commerce", "Web prototype"],
        slug: "centro-em-movimento"
      }
    ]
  },
  "pt-BR": {
    intro: {
      eyebrow: "O PROJETO E O MOTIVO POR TRÁS DELE",
      title: "Todo projeto começa com um problema que merece ser resolvido.",
      description: "Cada projeto parte de um desafio operacional ou social diferente e explora uma resposta de produto e tecnologia."
    },
    labels: {
      scenario: "O cenário",
      proposal: "A proposta",
      solution: "Como funciona",
      stage: "Estágio atual",
      explore: "Conhecer o projeto",
      visualNote: "Interface do projeto / modelo conceitual"
    },
    items: [
      {
        id: "fractaw",
        title: "Fractaw Modules",
        category: "Projeto autoral",
        status: "Protótipo · em desenvolvimento",
        headline: "Uma organização não deveria pagar por módulos de software que nunca utiliza.",
        scenario: "Muitos sistemas de gestão são comercializados em pacotes amplos e rígidos. As organizações acabam pagando por funcionalidades que não fazem parte de sua operação, enquanto limitações ou uma separação ruim entre módulos dificultam a adaptação e a evolução do sistema. Uma escola e um depósito de bebidas, por exemplo, possuem rotinas muito diferentes e não deveriam precisar das mesmas funcionalidades especializadas.",
        proposal: "Construir um ecossistema de gestão modular a partir de uma base compartilhada. Cada organização pode compor seu ambiente com as capacidades de que realmente precisa, sem carregar funcionalidades que não têm relação com sua operação.",
        solution: "O Fractaw separa capacidades compartilhadas de módulos especializados para cada tipo de organização. A direção do produto inclui fluxos de educação, como gestão de horários e disponibilidade, e de distribuição de bebidas, como estoque e operação diária. A arquitetura busca permitir que esses módulos evoluam de forma independente, utilizando fundamentos comuns. O protótipo atual demonstra a seleção e a aplicabilidade de módulos para uma organização.",
        image: "https://raw.githubusercontent.com/CaioDGeraldi/FractawModules/1449d4d8633c32edbdfdd01e0649b47b869b307c/docs/evidencias/ux143/modularidade-1440.png",
        imageAlt: "Protótipo do Fractaw mostrando a administração de módulos para uma escola fictícia",
        visual: "image",
        tags: ["Python", "Django", "Modelagem de domínio"],
        slug: "fractaw"
      },
      {
        id: "retorna",
        title: "Retorna",
        category: "Projeto colaborativo",
        status: "Código disponível",
        headline: "Um sistema de fidelidade precisa se adaptar a cada negócio e funcionar com os sistemas que ele já utiliza.",
        scenario: "Uma estratégia de fidelidade que funciona para uma empresa pode não servir para outra. Até filiais da mesma rede podem precisar de políticas, recompensas e campanhas diferentes. Ao mesmo tempo, substituir um PDV ou ERP existente apenas para adicionar funcionalidades de fidelidade costuma ser pouco viável.",
        proposal: "Criar uma plataforma de fidelidade multiempresa e configurável, integrada aos sistemas comerciais existentes e capaz de centralizar as regras e operações de pontos, campanhas, saldos e resgates.",
        solution: "Cada empresa configura suas regras de acúmulo e resgate, que podem variar por estabelecimento. Eventos de venda chegam por uma API e são processados conforme a configuração aplicável. A plataforma administra clientes, saldos de pontos e um histórico rastreável de movimentações, incluindo expiração e resgate por lotes com priorização FEFO. Operações transacionais protegem as alterações de saldo.",
        visual: "flow",
        tags: ["Django REST Framework", "PostgreSQL", "Regras de negócio"],
        slug: "retorna"
      },
      {
        id: "centro-em-movimento",
        title: "Centro em Movimento",
        category: "Proposta de inovação pública",
        status: "Protótipo funcional · em desenvolvimento",
        headline: "A descoberta digital deve criar mais motivos para visitar, explorar e voltar ao Centro.",
        scenario: "A perda de vitalidade do Centro está ligada a desafios diferentes: comerciantes têm dificuldade para disputar atenção nos canais digitais, consumidores encontram menos motivos para descobrir lojas além daquelas que já conhecem e as informações sobre estabelecimentos e atividades ficam dispersas. O problema não é simplesmente comprar pela internet, mas o enfraquecimento da conexão entre descoberta, circulação presencial e comércio local.",
        proposal: "Uma iniciativa de desenvolvimento local apoiada por uma plataforma digital que conecta consumidores e estabelecimentos, transforma a descoberta on-line em visitas presenciais e incentiva as pessoas a explorar mais o Centro. A tecnologia é um instrumento, não o objetivo final.",
        solution: "O Vem pro Centro reúne catálogos de estabelecimentos e produtos, busca, Rotas de Descoberta, eventos e atividades locais e campanhas de fidelidade compartilhada. A jornada proposta é descobrir um lugar, explorar opções próximas, visitar um estabelecimento, comprar e ter motivos para voltar. As reservas começam por um canal externo de contato, principalmente WhatsApp, com uma mensagem preparada; o comerciante confirma diretamente com o consumidor. As compras acontecem presencialmente e são confirmadas pelo estabelecimento para as ações de fidelidade elegíveis. Portanto, a plataforma não é um marketplace com checkout on-line. Informações agregadas também podem apoiar decisões públicas sobre tendências e lacunas do comércio local, sem expor consumidores individualmente.",
        image: "https://github.com/user-attachments/assets/73cc398e-904c-4e6d-b097-83b7c9f824bd",
        imageAlt: "Tela inicial do protótipo Vem pro Centro com descoberta de lojas e rotas locais",
        visual: "image",
        tags: ["Design de produto", "Comércio local", "Protótipo web"],
        slug: "centro-em-movimento"
      }
    ]
  }
};
