export const projectPitches = {
  en: {
    intro: {
      eyebrow: "THE WORK, THE REASON BEHIND IT",
      title: "Every project starts with a problem worth solving.",
      description: "These are not just software exercises. Each one begins with a different operational or social challenge, then explores a product and technical response."
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
        headline: "Business software should fit the operation, not the other way around.",
        scenario: "A school and a beverage distributor both need management software, but their day-to-day work is fundamentally different. A broad, fixed package can leave teams paying for or navigating features they never use, while gaps in the workflow push them toward disconnected tools and duplicated information.",
        proposal: "Build a modular management platform around a shared foundation. Each organization starts with the common capabilities it needs, then adds modules that reflect its own type of operation.",
        solution: "Fractaw separates shared services such as organizations, people and access from business-specific workflows. The product direction includes modules for education, such as schedules and availability, and beverage distribution, such as inventory and daily operations. The current prototype demonstrates module selection and applicability for an organization.",
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
        headline: "A loyalty program should follow each business's rules.",
        scenario: "A loyalty strategy that works for one business may not work for another. Even branches of the same company can need different policies, rewards or temporary campaigns. Rigid programs make those differences difficult to represent, while replacing an existing point-of-sale or ERP system would create another problem.",
        proposal: "Create a multi-company loyalty platform that adapts to each business and connects to the systems it already uses, instead of forcing every store into one fixed program.",
        solution: "Companies can configure earning and redemption policies, apply store-level overrides and run campaigns. Sales events arrive through a versioned API; domain services apply the relevant rules and keep a traceable points history. Redemption logic also accounts for point batches and FEFO prioritization, with transactional safeguards around balance-changing operations.",
        visual: "flow",
        tags: ["Django REST Framework", "PostgreSQL", "Business rules"],
        slug: "retorna"
      },
      {
        id: "centro-em-movimento",
        title: "Centro em Movimento",
        category: "Public innovation proposal",
        status: "Functional prototype · in development",
        headline: "Discovering a store online should lead people back to the city centre.",
        scenario: "People increasingly discover and compare products online before choosing where to buy. Local businesses may struggle to keep their catalogues visible across separate channels, and someone who finds one store may have no easy way to discover nearby shops, services or activities. National online-shopping data describes a broader behaviour shift, but does not by itself prove what caused changes in Araras.",
        proposal: "Connect digital discovery with physical circulation. Instead of creating another isolated online storefront, the initiative gives people reasons to find local businesses, visit the centre, explore more destinations and return.",
        solution: "Vem pro Centro is the initiative's digital platform. It brings together store and product discovery, business-managed catalogues, themed discovery routes, a local calendar and shared campaigns. Reservations open an external conversation such as WhatsApp; purchases remain in the physical store and eligible purchases are confirmed by the merchant. The current prototype demonstrates the core discovery experience.",
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
      description: "Não são apenas exercícios de programação. Cada projeto parte de um desafio operacional ou social diferente e explora uma resposta de produto e tecnologia."
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
        headline: "O software deve se adaptar à operação, não o contrário.",
        scenario: "Uma escola e um depósito de bebidas precisam de sistemas de gestão, mas suas rotinas são fundamentalmente diferentes. Pacotes amplos e rígidos podem obrigar equipes a lidar com funções que não usam. Quando o sistema não acompanha o trabalho real, surgem ferramentas paralelas, informações duplicadas e processos desconectados.",
        proposal: "Construir uma plataforma de gestão modular a partir de uma base compartilhada. Cada organização começa com as capacidades comuns de que precisa e adiciona módulos que representam seu tipo de operação.",
        solution: "O Fractaw separa serviços compartilhados, como organizações, pessoas e acessos, dos fluxos específicos de cada negócio. A direção do produto inclui módulos para educação, como horários e disponibilidade, e para distribuição de bebidas, como estoque e operação diária. O protótipo atual demonstra a seleção e a aplicabilidade de módulos para uma organização.",
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
        headline: "Um programa de fidelidade precisa respeitar as regras de cada negócio.",
        scenario: "Uma estratégia de fidelidade que funciona para uma empresa pode não servir para outra. Até filiais da mesma rede podem precisar de políticas, recompensas e campanhas diferentes. Programas rígidos dificultam essas variações, enquanto substituir o PDV ou ERP existente criaria outro problema.",
        proposal: "Criar uma plataforma de fidelidade multiempresa, configurável para cada negócio e integrada aos sistemas que ele já utiliza, sem impor um único programa para todas as lojas.",
        solution: "Cada empresa pode configurar regras de acúmulo e resgate, definir exceções por estabelecimento e executar campanhas. Eventos de venda chegam por uma API versionada; serviços de domínio aplicam as regras correspondentes e mantêm um histórico rastreável de pontos. A lógica de resgate também considera lotes de pontos e priorização FEFO, com operações transacionais para proteger alterações de saldo.",
        visual: "flow",
        tags: ["Django REST Framework", "PostgreSQL", "Regras de negócio"],
        slug: "retorna"
      },
      {
        id: "centro-em-movimento",
        title: "Centro em Movimento",
        category: "Proposta de inovação pública",
        status: "Protótipo funcional · em desenvolvimento",
        headline: "Descobrir uma loja pela internet deve levar as pessoas de volta ao centro.",
        scenario: "As pessoas usam cada vez mais o ambiente digital para descobrir e comparar produtos antes de decidir onde comprar. Pequenos negócios podem ter dificuldade para manter seus catálogos visíveis em canais separados, e quem encontra uma loja nem sempre consegue descobrir com facilidade outros estabelecimentos, serviços e atividades próximos. Dados nacionais sobre compras on-line mostram uma mudança mais ampla de comportamento, mas não provam, por si só, o que causou as mudanças no Centro de Araras.",
        proposal: "Conectar descoberta digital e circulação presencial. Em vez de criar mais uma vitrine on-line isolada, a iniciativa busca dar motivos para encontrar negócios locais, visitar o centro, conhecer outros destinos e voltar.",
        solution: "O Vem pro Centro é a plataforma digital da iniciativa. Ela reúne descoberta de lojas e produtos, catálogos gerenciados pelos estabelecimentos, Rotas de Descoberta, calendário local e campanhas de fidelidade compartilhada. Reservas abrem uma conversa em um canal externo, como WhatsApp; as compras continuam acontecendo na loja física e compras elegíveis são confirmadas pelo próprio comerciante. O protótipo atual demonstra a experiência central de descoberta.",
        image: "https://github.com/user-attachments/assets/73cc398e-904c-4e6d-b097-83b7c9f824bd",
        imageAlt: "Tela inicial do protótipo Vem pro Centro com descoberta de lojas e rotas locais",
        visual: "image",
        tags: ["Design de produto", "Comércio local", "Protótipo web"],
        slug: "centro-em-movimento"
      }
    ]
  }
};
