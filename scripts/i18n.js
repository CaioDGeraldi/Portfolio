/*
 * Portfolio localization: English source copy lives in index.html.
 * Translation keys are exact English text nodes or attribute values.
 * Priority: ?lang= > previously selected language > browser languages > English.
 * Incoming GitHub links explicitly select ?lang=en; referrer is intentionally ignored.
 */
(() => {
  "use strict";

  const STORAGE_KEY = "caiodgeraldi.portfolio.language";
  const translations = new Map(Object.entries({
    "CaioDGeraldi | Software Developer": "CaioDGeraldi | Desenvolvedor de Software",
    "Portfolio of CaioDGeraldi, a software developer focused on backend engineering, architecture and maintainable systems.": "Portfólio de CaioDGeraldi, desenvolvedor de software com foco em back-end, arquitetura e sistemas sustentáveis.",
    "Skip to content": "Pular para o conteúdo",
    "MY": "MEU",
    "PORTFOLIO": "PORTFÓLIO",
    "scroll to explore": "role para explorar",
    "About": "Sobre",
    "Experience": "Experiência",
    "Projects": "Projetos",
    "Education": "Formação",
    "Certificates": "Certificados",
    "Backend Software Developer": "Desenvolvedor Backend",
    "Location": "Localização",
    "Hello, I am": "Olá, eu sou",
    "Backend · Architecture · Software Engineering": "Back-end · Arquitetura · Engenharia de Software",
    "I study Systems Development and build projects focused on backend development, software architecture and engineering practices.": "Estudo Desenvolvimento de Sistemas e desenvolvo projetos com foco em back-end, arquitetura e boas práticas de engenharia.",
    "I am especially interested in modularity, domain modeling, relational databases and the engineering trade-offs that keep systems understandable as they evolve.": "Tenho especial interesse em modularidade, modelagem de domínio, bancos de dados relacionais e decisões técnicas que ajudam a manter sistemas compreensíveis à medida que evoluem.",
    "View projects": "Ver projetos",
    "Currently learning": "Estudando e aprofundando",
    "Currently reading": "Lendo atualmente",
    "Clean Code — Robert C. Martin": "Código Limpo — Robert C. Martin",
    "Backend and languages": "Back-end e linguagens",
    "Databases": "Bancos de dados",
    "Tools": "Ferramentas",
    "Engineering": "Engenharia",
    "Software architecture": "Arquitetura de software",
    "Domain modeling": "Modelagem de domínio",
    "Requirements engineering": "Engenharia de requisitos",
    "Modularity": "Modularidade",
    "Testing": "Testes",
    "Professional experience": "Experiência profissional",
    "Systems Development Intern": "Estágio em Desenvolvimento de Sistemas",
    "Worked on software development and maintenance using Delphi / Object Pascal and Oracle Database.": "Desenvolvimento e manutenção de sistemas com Delphi / Object Pascal e Oracle Database.",
    "Educational experiences": "Vivências formativas",
    "Industry learning activities": "Experiências com empresas",
    "Eight sessions covering organizational structure, cross-team collaboration, requirements, prototyping, Git Flow and UX with Figma.": "Oito encontros sobre estrutura organizacional, integração entre áreas, requisitos, prototipagem, Git Flow e UX com Figma.",
    "Activities on teamwork, personal development, innovation and creativity as part of professional learning.": "Atividades de integração, desenvolvimento pessoal, inovação e criatividade voltadas ao aprendizado e à formação profissional.",
    "School project involving sensor-based industrial monitoring, an introduction to Git and collaborative technical review.": "Projeto escolar sobre monitoramento industrial por sensores, introdução ao Git e atividades colaborativas de revisão técnica.",
    "All": "Todos",
    "Architecture": "Arquitetura",
    "Team software project": "Projeto de software em equipe",
    "Configurable multi-company loyalty platform built with Django, PostgreSQL and a versioned REST API. Includes transactional redemptions, idempotency, concurrency tests and automated CI.": "Plataforma de fidelidade multiempresa configurável, construída com Django, PostgreSQL e API REST versionada. Inclui resgates transacionais, idempotência, testes de concorrência e integração contínua.",
    "Modular ERP": "ERP modular",
    "Private · In development": "Privado · Em desenvolvimento",
    "A modular Django business-management platform organized around enterprise capabilities and domain boundaries. Source code is currently private.": "Plataforma modular de gestão empresarial em Django, organizada por capacidades empresariais e fronteiras de domínio. O código-fonte é privado.",
    "Modular architecture": "Arquitetura modular",
    "Desktop application": "Aplicação desktop",
    "Exchange application developed with Delphi / Object Pascal and FireMonkey as a learning project.": "Aplicação de trocas desenvolvida com Delphi / Object Pascal e FireMonkey como projeto de aprendizagem.",
    "Web development": "Desenvolvimento web",
    "Personal portfolio website using semantic HTML, CSS, JavaScript, responsive layouts and Three.js.": "Portfólio pessoal desenvolvido com HTML semântico, CSS, JavaScript, layouts responsivos e Three.js.",
    "Experimental desktop project": "Projeto desktop experimental",
    "Experimental · Private": "Experimental · Privado",
    "Exploration of a local-first Markdown editor using Rust, Tauri, Svelte, TypeScript, SQLite and Git integration. Not a released product.": "Exploração de um editor Markdown local-first com Rust, Tauri, Svelte, TypeScript, SQLite e integração com Git. Ainda não foi lançado.",
    "See public repositories": "Ver repositórios públicos",
    "Education and interests": "Formação e interesses",
    "In progress": "Em andamento",
    "Technical Program in Systems Development": "Técnico em Desenvolvimento de Sistemas",
    "Planned next step via AMS": "Próxima etapa planejada via AMS",
    "FATEC — Systems Analysis and Development": "FATEC — Análise e Desenvolvimento de Sistemas",
    "Planned higher-education pathway through the ETEC AMS program.": "Plano de continuidade dos estudos superiores por meio do programa AMS da ETEC.",
    "Areas of interest": "Áreas de interesse",
    "Software engineering": "Engenharia de software",
    "Software architecture": "Arquitetura de software",
    "Modular systems": "Sistemas modulares",
    "Testing and quality": "Testes e qualidade",
    "Linux and infrastructure": "Linux e infraestrutura",
    "AI-assisted development": "IA aplicada ao desenvolvimento",
    "GitHub Certification Training": "Formação GitHub Certification",
    "Apr 3, 2026": "03 abr 2026",
    "Complete Web Development — 20 courses + 20 projects": "Desenvolvimento Web Completo — 20 cursos + 20 projetos",
    "Oct 13, 2025": "13 out 2025",
    "Introduction to React.js": "Introdução a React.js",
    "Apr 3, 2025": "03 abr 2025",
    "Video Editing and Recording with Movavi": "Edição e gravação de vídeos com Movavi",
    "Apr 21, 2020": "21 abr 2020",
    "Contact": "Contato",
    "GitHub, LinkedIn and email.": "GitHub, LinkedIn e e-mail.",
    "Get in touch using the professional links below.": "Entre em contato pelos canais profissionais abaixo.",
    "Backend, architecture and software engineering.": "Back-end, arquitetura e engenharia de software.",
    "Main navigation": "Navegação principal",
    "Go to introduction": "Ir para a apresentação",
    "Toggle theme": "Alternar tema",
    "Open menu": "Abrir menu",
    "Contact information": "Informações de contato",
    "Professional profiles": "Redes profissionais",
    "Portfolio introduction": "Abertura do portfólio",
    "Filter projects": "Filtrar projetos",
    "View Retorna on GitHub": "Ver Retorna no GitHub",
    "View Kambio on GitHub": "Ver Kambio no GitHub",
    "View portfolio source on GitHub": "Ver código do portfólio no GitHub",
    "Technologies I am learning": "Tecnologias que estou estudando",
    "Software developer portfolio by Caio Darin Geraldi. Explore Django and PostgreSQL projects, engineering decisions, tests and professional experience.": "Portfólio de Caio Darin Geraldi. Explore projetos Django e PostgreSQL, decisões de engenharia, testes e experiência profissional.",
    "Jump to projects": "Ir aos projetos",
    "Based in Brazil · Interested in international teams": "No Brasil · Interesse em equipes internacionais",
    "Get in touch": "Entrar em contato",
    "FEATURED / BACKEND": "DESTAQUE / BACK-END",
    "Technical case study": "Estudo de caso técnico",
    "Concurrency tests": "Testes de concorrência",
    "PORTFOLIO / SOFTWARE ENGINEERING": "PORTFÓLIO / ENGENHARIA DE SOFTWARE",
    "Backend engineering,": "Engenharia de back-end,",
    "from rules to reliability.": "das regras à confiabilidade.",
    "I'm Caio, a software development student with professional experience maintaining business systems.": "Sou Caio, estudante de Desenvolvimento de Sistemas com experiência profissional em manutenção de sistemas empresariais.",
    "My focus is on Django, relational databases and engineering decisions that make software easier to test, understand and evolve. I care about what happens when requests fail, repeat or arrive at the same time.": "Meu foco é Django, bancos de dados relacionais e decisões que tornam o software mais fácil de testar, compreender e evoluir. Dou atenção ao que acontece quando requisições falham, se repetem ou chegam ao mesmo tempo.",
    "Technical focus": "Focos técnicos",
    "01 / BACKEND": "01 / BACK-END",
    "02 / DATA": "02 / DADOS",
    "03 / QUALITY": "03 / QUALIDADE",
    "Tests & CI": "Testes e CI",
    "Selected work": "Projetos selecionados",
    "A closer look at the engineering decisions, trade-offs and source code behind Retorna.": "Uma análise das decisões de engenharia, dos compromissos técnicos e do código por trás do Retorna.",
    "Read case study": "Ler estudo de caso",
    "Inspect tests": "Ver testes",
    "Back to portfolio": "Voltar ao portfólio",
    "All projects": "Todos os projetos",
    "Retorna technical case study: modular Django architecture, PostgreSQL transactions, idempotent redemptions and concurrency testing.": "Estudo de caso técnico do Retorna: arquitetura modular em Django, transações PostgreSQL, resgates idempotentes e testes de concorrência.",
    "Retorna | Engineering Case Study": "Retorna | Estudo de caso técnico",
    "Skip to content": "Pular para o conteúdo",
    "CASE STUDY / 01": "ESTUDO DE CASO / 01",
    "TEAM PROJECT": "PROJETO EM EQUIPE",
    "Loyalty infrastructure built around predictable business rules.": "Infraestrutura de fidelidade construída sobre regras de negócio previsíveis.",
    "A configurable multi-company loyalty application developed for the Data System Challenge. External business systems generate events; the platform applies loyalty rules and records the result.": "Aplicação de fidelidade multiempresa configurável desenvolvida para o Data System Challenge. Sistemas empresariais externos geram eventos; a plataforma aplica as regras de fidelidade e registra o resultado.",
    "Source repository": "Repositório do projeto",
    "Redemption service": "Serviço de resgates",
    "Project facts": "Dados do projeto",
    "ROLE": "PAPEL",
    "Collaborative team project": "Projeto colaborativo em equipe",
    "STACK": "TECNOLOGIAS",
    "FOCUS": "FOCO",
    "Data integrity & business rules": "Integridade dos dados e regras de negócio",
    "On this page": "Nesta página",
    "ON THIS PAGE": "NESTA PÁGINA",
    "The problem": "O problema",
    "Engineering decisions": "Decisões de engenharia",
    "Evidence": "Evidências",
    "01 / CONTEXT": "01 / CONTEXTO",
    "A loyalty platform must do more than calculate a balance. Purchases and redemptions can arrive twice, requests can overlap, and different stores can use different policies. In those situations, a visually correct dashboard does not prove that the data is correct.": "Uma plataforma de fidelidade precisa fazer mais do que calcular um saldo. Compras e resgates podem chegar duas vezes, requisições podem se sobrepor e lojas podem usar políticas diferentes. Nessas situações, um dashboard correto visualmente não comprova a integridade dos dados.",
    "The central engineering requirement was to protect points history and business invariants when integrations retry operations or customers attempt concurrent redemptions.": "O requisito central de engenharia era proteger o histórico de pontos e as invariantes de negócio quando integrações repetem operações ou clientes tentam resgates simultâneos.",
    "02 / SYSTEM": "02 / SISTEMA",
    "A modular Django monolith, with shared business services used by the web interface and versioned REST API.": "Um monólito modular Django, com serviços de negócio compartilhados pela interface web e API REST versionada.",
    "External business systems connect to a REST API, which calls Django domain services backed by PostgreSQL and audit history.": "Sistemas empresariais externos se conectam à API REST, que chama os serviços de domínio Django apoiados pelo PostgreSQL e histórico de auditoria.",
    "INPUT": "ENTRADA",
    "Sales / ERP / Commerce": "Vendas / ERP / Comércio",
    "INTEGRATION": "INTEGRAÇÃO",
    "Versioned REST API": "API REST versionada",
    "APPLICATION": "APLICAÇÃO",
    "Django domain services": "Serviços de domínio Django",
    "Companies · Customers · Loyalty": "Empresas · Clientes · Fidelidade",
    "PERSISTENCE": "PERSISTÊNCIA",
    "Transactions · Constraints · Audit": "Transações · Restrições · Auditoria",
    "Conceptual diagram, not a production infrastructure diagram.": "Diagrama conceitual, não um diagrama de infraestrutura de produção.",
    "03 / DESIGN": "03 / PROJETO",
    "Idempotent operations": "Operações idempotentes",
    "A repeated request should not create a second redemption. The redemption service checks external identifiers and handles conflicting retries.": "Uma requisição repetida não deve criar um segundo resgate. O serviço verifica identificadores externos e trata tentativas repetidas conflitantes.",
    "Inspect implementation": "Examinar implementação",
    "Concurrency control": "Controle de concorrência",
    "Transactional boundaries, row locks and PostgreSQL advisory locks guard balance-changing operations when requests arrive simultaneously.": "Transações, bloqueios de linhas e advisory locks do PostgreSQL protegem operações que alteram o saldo quando as requisições chegam ao mesmo tempo.",
    "Modular boundaries": "Limites modulares",
    "Domain services centralize loyalty operations so the REST API and server-rendered interface do not have to duplicate rules.": "Serviços de domínio centralizam operações de fidelidade para que a API REST e a interface renderizada no servidor não precisem duplicar regras.",
    "Explore application modules": "Explorar módulos da aplicação",
    "04 / VERIFICATION": "04 / VERIFICAÇÃO",
    "Evidence & limitations": "Evidências e limites",
    "What can be inspected": "O que pode ser verificado",
    "The repository includes business services, database-backed concurrency tests, API documentation, CI workflows and the development history.": "O repositório inclui serviços de negócio, testes de concorrência com banco de dados, documentação de API, workflows de CI e histórico do desenvolvimento.",
    "Successful historical CI run": "Execução histórica bem-sucedida do CI",
    "CI workflow": "Workflow de CI",
    "AI-assisted development disclosure": "Declaração de uso de IA no desenvolvimento",
    "Scope matters": "Contexto importa",
    "This is a collaborative challenge project, not a claim of sole authorship or commercial production deployment. The team documents the use of AI tools. A historical passing CI run is not a security audit or a load test.": "Este é um projeto de desafio desenvolvido em equipe, não uma alegação de autoria individual ou de implantação comercial em produção. A equipe documenta o uso de ferramentas de IA. Uma execução histórica bem-sucedida do CI não é auditoria de segurança nem teste de carga.",
    "OTHER WORK": "OUTROS PROJETOS",
    "Explore the rest of the portfolio.": "Explore o restante do portfólio.",
    "Caio Darin Geraldi | Software Development": "Caio Darin Geraldi | Desenvolvimento de Software",
    "Caio Darin Geraldi: software development, Fractaw's business problem, and the Retorna engineering case study.": "Caio Darin Geraldi: desenvolvimento de software, o problema empresarial do Fractaw e o estudo de caso técnico do Retorna.",
    "Go to introduction": "Ir para apresentação",
    "SOFTWARE DEVELOPMENT · BRAZIL": "DESENVOLVIMENTO DE SOFTWARE · BRASIL",
    "SOFTWARE DEVELOPMENT / PORTFOLIO": "DESENVOLVIMENTO DE SOFTWARE / PORTFÓLIO",
    "I build software around real problems, not just technology.": "Desenvolvo software para problemas reais, não apenas para usar tecnologia.",
    "Explore the work": "Conheça os projetos",
    "About me": "Sobre mim",
    "BACKEND · SYSTEMS · SOFTWARE ENGINEERING": "BACK-END · SISTEMAS · ENGENHARIA DE SOFTWARE",
    "01 / CENTRAL IDEA": "01 / IDEIA CENTRAL",
    "02 / ENGINEERING CASE": "02 / CASO TÉCNICO",
    "Fractaw official logo": "Logo oficial do Fractaw",
    "Retorna official logo": "Logo oficial do Retorna",
    "FRACTAW / PRODUCT VISION": "FRACTAW / VISÃO DE PRODUTO",
    "Business software should fit the business.": "O software empresarial deve se adaptar à empresa.",
    "Fractaw starts with a practical problem: companies face fragmented systems, repeated work and software that forces everyone into the same workflow.": "Fractaw nasce de um problema prático: empresas lidam com sistemas fragmentados, trabalho repetido e programas que impõem o mesmo fluxo de trabalho para todos.",
    "The idea is a modular management platform. A business adopts the capabilities it needs instead of managing disconnected tools. The concept comes first; the private codebase is not the product story here.": "A ideia é uma plataforma modular de gestão. Cada empresa adota as capacidades de que precisa, em vez de administrar ferramentas desconectadas. O conceito vem primeiro; o código privado não é o foco desta apresentação.",
    "Fractaw concept highlights": "Destaques do conceito Fractaw",
    "Modularity": "Modularidade",
    "Business workflows": "Fluxos de trabalho empresariais",
    "Product architecture": "Arquitetura de produto",
    "Explore Fractaw's idea": "Conheça a ideia do Fractaw",
    "RETORNA / COLLABORATIVE PROJECT": "RETORNA / PROJETO EM EQUIPE",
    "What happens when a request arrives twice?": "O que acontece quando uma requisição chega duas vezes?",
    "Retorna is a multi-company loyalty application where business rules must remain consistent even under retries and concurrent requests.": "Retorna é uma aplicação de fidelidade multiempresa em que as regras de negócio precisam permanecer consistentes mesmo com tentativas repetidas e requisições simultâneas.",
    "Django, PostgreSQL, transactional redemptions, idempotency and automated tests. The case study shows the trade-offs and the source that a reviewer can inspect.": "Django, PostgreSQL, resgates transacionais, idempotência e testes automatizados. O estudo de caso apresenta as decisões técnicas e o código que podem ser analisados.",
    "Retorna technologies": "Tecnologias do Retorna",
    "Explore Retorna's case": "Conheça o estudo do Retorna",
    "ABOUT / EXPERIENCE": "SOBRE / EXPERIÊNCIA",
    "Curiosity is useful.": "A curiosidade ajuda.",
    "Engineering discipline makes it last.": "A disciplina de engenharia faz durar.",
    "I'm studying Systems Development at ETEC Alberto Feres (AMS). I worked with Delphi / Object Pascal and Oracle Database at Soma Soluções, and I focus my independent work on Python, Django, databases and maintainable system design.": "Estudo Desenvolvimento de Sistemas na ETEC Alberto Feres (AMS). Trabalhei com Delphi / Object Pascal e Oracle Database na Soma Soluções, e foco meus projetos independentes em Python, Django, bancos de dados e sistemas fáceis de manter.",
    "EXPERIENCE": "EXPERIÊNCIA",
    "Systems development internship · Delphi / Oracle": "Estágio em desenvolvimento de sistemas · Delphi / Oracle",
    "EDUCATION": "FORMAÇÃO",
    "Systems Development · AMS": "Desenvolvimento de Sistemas · AMS",
    "CURRENT FOCUS": "FOCO ATUAL",
    "Backend & Architecture": "Back-end e arquitetura",
    "CONTACT / NEXT STEP": "CONTATO / PRÓXIMO PASSO",
    "Have a problem worth solving?": "Tem um problema que vale a pena resolver?",
    "I'm interested in software engineering opportunities, including international teams. The best introduction is a technical conversation.": "Tenho interesse em oportunidades de engenharia de software, inclusive em equipes internacionais. A melhor apresentação é uma conversa técnica.",
    "BASED IN BRAZIL · OPEN TO INTERNATIONAL COLLABORATION": "NO BRASIL · ABERTO À COLABORAÇÃO INTERNACIONAL",
    "Portfolio scenes": "Cenas do portfólio",
    "Previous scene": "Cena anterior",
    "Next scene": "Próxima cena",
    "Intro": "Início",
    "Fractaw | Product Vision": "Fractaw | Visão de produto",
    "Fractaw: the product problem behind a modular business software concept.": "Fractaw: o problema de negócio por trás de um conceito modular de software empresarial.",
    "PRODUCT VISION": "VISÃO DE PRODUTO",
    "MODULAR BUSINESS SOFTWARE": "SOFTWARE EMPRESARIAL MODULAR",
    "One business should not need five disconnected systems.": "Uma empresa não deveria precisar de cinco sistemas desconectados.",
    "Fractaw is a product vision for modular business management. The idea starts from companies needing different capabilities but facing fragmented tools, repeated information and difficult integrations.": "Fractaw é uma visão de produto para gestão empresarial modular. A ideia parte de empresas que precisam de capacidades diferentes, mas enfrentam ferramentas fragmentadas, informações repetidas e integrações difíceis.",
    "TYPE": "TIPO",
    "Independent product concept": "Conceito independente de produto",
    "PROBLEM": "PROBLEMA",
    "Fragmented business operations": "Operações empresariais fragmentadas",
    "STAGE": "ESTÁGIO",
    "Prototype / in development": "Protótipo / em desenvolvimento",
    "Consider a school and a beverage distributor. Both need to manage operations, people and information, but their daily workflows are different. A single rigid system fits neither one particularly well.": "Considere uma escola e um distribuidor de bebidas. Ambos precisam gerenciar operações, pessoas e informações, mas seus fluxos diários são diferentes. Um sistema rígido não atende bem a nenhum dos dois.",
    "Switching between separate tools also costs attention: information has to be entered twice, processes become inconsistent and teams must learn how everything fits together.": "Alternar entre ferramentas separadas também consome atenção: informações precisam ser inseridas duas vezes, processos ficam inconsistentes e equipes precisam descobrir como tudo se conecta.",
    "Fractaw's central question is simple: can software share a stable foundation while allowing the business-specific parts to change?": "A pergunta central do Fractaw é simples: um software pode compartilhar uma base estável e permitir que as partes específicas de cada negócio mudem?",
    "02 / PRODUCT": "02 / PRODUTO",
    "The approach": "A abordagem",
    "A common foundation with modules selected by business needs, rather than a disconnected collection of applications.": "Uma base comum com módulos escolhidos pelas necessidades do negócio, em vez de um conjunto desconectado de aplicativos.",
    "A common business foundation supports optional modules for different industries, such as education and beverage distribution.": "Uma base empresarial comum oferece módulos opcionais para setores diferentes, como educação e distribuição de bebidas.",
    "SHARED FOUNDATION": "BASE COMPARTILHADA",
    "Organization · People · Access · Shared services": "Organização · Pessoas · Acesso · Serviços comuns",
    "OPTIONAL CAPABILITY": "CAPACIDADE OPCIONAL",
    "Education workflows": "Fluxos de educação",
    "Schedules and availability": "Horários e disponibilidade",
    "Beverage distribution": "Distribuição de bebidas",
    "Inventory and daily operations": "Estoque e operações diárias",
    "Conceptual model illustrating the product direction. Not a production deployment diagram.": "Modelo conceitual que ilustra a direção do produto. Não representa uma implantação em produção.",
    "03 / PRINCIPLES": "03 / PRINCÍPIOS",
    "Product decisions": "Decisões de produto",
    "Start with the workflow": "Começar pelo fluxo de trabalho",
    "Understand what a team needs to accomplish before deciding which screens or technical modules to build.": "Entender o que uma equipe precisa realizar antes de definir telas ou módulos técnicos.",
    "Keep modules independent": "Manter os módulos independentes",
    "Different business capabilities should have understandable boundaries and explicit dependencies.": "Capacidades empresariais diferentes devem ter limites compreensíveis e dependências explícitas.",
    "Build for change": "Preparar para mudanças",
    "The goal is to evolve shared behavior without forcing every type of company into the same process.": "O objetivo é evoluir comportamentos compartilhados sem obrigar todos os tipos de empresa a seguir o mesmo processo.",
    "04 / HONESTY": "04 / TRANSPARÊNCIA",
    "Current scope": "Escopo atual",
    "What this case demonstrates": "O que este caso demonstra",
    "Problem framing, product thinking, modularity and domain modeling. The project is under development; this page focuses on the business problem rather than showcasing private implementation details.": "Definição de problemas, pensamento de produto, modularidade e modelagem de domínio. O projeto está em desenvolvimento; esta página destaca o problema empresarial, não os detalhes privados da implementação.",
    "Not a commercial claim": "Sem alegações comerciais",
    "No customer adoption, production deployment, measured performance or financial outcomes are claimed here. This is a product direction and evolving prototype, not a finished commercial ERP.": "Não há alegações de clientes, implantação em produção, métricas de desempenho ou resultados financeiros. Trata-se de uma direção de produto e de um protótipo em evolução, não de um ERP comercial concluído.",
    "NEXT CASE": "PRÓXIMO CASO",
    "See an engineering implementation.": "Veja uma implementação de engenharia.",
    "Explore Retorna": "Conheça o Retorna",
    "Product thinking & software engineering": "Produto e engenharia de software",
    "Explore the Fractaw concept.": "Conheça o conceito Fractaw.",
    "Scroll to continue": "Role para continuar",
    "Go to next scene": "Ir para a próxima cena",
    "Companies should not have to juggle disconnected tools or adapt their routines to a rigid system. Fractaw addresses that gap with a shared foundation built around different business needs.": "Empresas não deveriam precisar alternar entre ferramentas desconectadas ou adaptar suas rotinas a um sistema engessado. O Fractaw propõe uma base compartilhada que atende a diferentes necessidades de negócio.",
    "Its approach is modular: each organization uses the capabilities relevant to its operations, while common information and services stay connected. The product vision matters more here than private implementation details.": "A abordagem é modular: cada organização usa os recursos necessários para suas operações, mantendo informações e serviços comuns conectados. Aqui, a visão do produto importa mais do que os detalhes do código privado.",
    "Loyalty that works across businesses and stores.": "Fidelidade para diferentes empresas e lojas.",
    "Retorna is a loyalty platform designed to help businesses bring customers back through points, configurable rewards and campaigns across multiple stores.": "O Retorna é uma plataforma de fidelidade pensada para incentivar clientes a voltar, com pontos, recompensas configuráveis e campanhas em várias lojas.",
    "Its approach combines company-level loyalty policies, store-specific rules and API integrations with existing sales systems. Django and PostgreSQL support the workflows; tests cover critical redemption scenarios.": "A abordagem combina políticas de fidelidade por empresa, regras específicas por loja e integração por API com sistemas de vendas existentes. Django e PostgreSQL sustentam os fluxos, enquanto os testes cobrem cenários críticos de resgate.",
    "Loyalty programs": "Programas de fidelidade",
    "Multi-store policies": "Regras por loja",
    "Django & PostgreSQL": "Django e PostgreSQL",
    "Retorna is a multi-company loyalty platform with configurable points, rewards, campaigns, store-level policies and API integrations.": "O Retorna é uma plataforma de fidelidade multiempresa com pontos, recompensas e campanhas configuráveis, políticas por loja e integrações por API.",
    "A loyalty program that fits different businesses and stores.": "Um programa de fidelidade adaptável a diferentes empresas e lojas.",
    "Retorna is a collaborative loyalty platform designed to reward returning customers. Companies can define loyalty policies, adapt rules for individual stores and run temporary campaigns. Existing sales systems connect through a versioned API instead of being replaced.": "O Retorna é uma plataforma colaborativa de fidelidade criada para recompensar clientes recorrentes. Empresas podem definir políticas de fidelidade, adaptar regras para lojas específicas e criar campanhas temporárias. Sistemas de vendas existentes se conectam por uma API versionada, sem precisar ser substituídos.",
    "Loyalty programs & flexible policies": "Programas de fidelidade e regras flexíveis",
    "A business wants to reward customers for coming back. But a loyalty program becomes difficult to manage when every store has different rewards, campaigns or rules for earning and redeeming points. Disconnected spreadsheets or ad hoc integrations make the customer experience inconsistent.": "Uma empresa quer recompensar clientes que voltam. Mas um programa de fidelidade fica difícil de administrar quando cada loja tem recompensas, campanhas ou regras diferentes de acúmulo e resgate. Planilhas desconectadas e integrações improvisadas tornam a experiência inconsistente.",
    "Retorna addresses that with a multi-company loyalty model: a company can operate several stores, define configurable policies and connect external sales channels through an API. Keeping balances and redemptions consistent is an important technical requirement within that broader product.": "O Retorna aborda isso com um modelo multiempresa: cada empresa pode operar várias lojas, definir políticas configuráveis e conectar canais de venda externos por API. Manter saldos e resgates consistentes é um requisito técnico importante dentro desse produto.",
    "A shared loyalty platform sits alongside existing sales systems. External operations supply the transaction facts; Retorna applies configured loyalty rules, maintains history and returns the result. Django services keep the API and web interface aligned.": "Uma plataforma de fidelidade compartilhada funciona ao lado dos sistemas de vendas existentes. As operações externas enviam os dados da transação; o Retorna aplica as regras de fidelidade configuradas, mantém o histórico e devolve o resultado. Serviços Django mantêm a API e a interface web alinhadas.",
    "02 / PRODUCT": "02 / PRODUTO",
    "Product and engineering decisions": "Decisões de produto e engenharia",
    "Configurable loyalty policies": "Políticas de fidelidade configuráveis",
    "The product model supports companies with multiple stores, configurable earning and redemption policies, store overrides and temporary campaigns instead of a single hard-coded program.": "O modelo do produto contempla empresas com várias lojas, políticas configuráveis de acúmulo e resgate, exceções por loja e campanhas temporárias, sem depender de um programa fixo.",
    "Inspect product model": "Ver modelo do produto",
    "Integrate, don't replace": "Integrar, não substituir",
    "Retorna is not a point-of-sale system or ERP. Existing tools send business events through a versioned API; the loyalty platform applies its rules and records the result.": "O Retorna não substitui um PDV ou ERP. Sistemas existentes enviam eventos de negócio por uma API versionada; a plataforma aplica suas regras de fidelidade e registra o resultado.",
    "Inspect integration strategy": "Ver estratégia de integração",
    "Reliable points and redemptions": "Pontos e resgates confiáveis",
    "Core balance-changing operations use transactional services. Idempotency and concurrency tests address repeated or simultaneous redemption requests without making those edge cases the product's purpose.": "Operações que alteram saldos usam serviços transacionais. Testes de idempotência e concorrência cobrem pedidos de resgate repetidos ou simultâneos, sem transformar esses casos extremos no objetivo do produto.",
    "Inspect redemption tests": "Ver testes de resgate",
    "Business management without disconnected workflows.": "Gestão empresarial sem processos desconectados.",
    "Fractaw addresses the difficulty of running a business across unrelated tools. It proposes a shared management foundation with modules chosen for the organization's actual work, so information and processes can stay connected without forcing different industries into the same workflow.": "O Fractaw aborda a dificuldade de administrar uma empresa com ferramentas que não se conectam. A proposta é uma base comum de gestão, com módulos escolhidos conforme o trabalho real da organização, conectando informações e processos sem impor o mesmo fluxo a setores diferentes.",
    "The approach combines shared organizational services with independent business modules. A school and a beverage distributor can rely on a common foundation while keeping their daily operations different.": "A abordagem combina serviços organizacionais compartilhados com módulos independentes. Uma escola e um distribuidor de bebidas podem usar a mesma base sem perder as particularidades das operações diárias.",
    "Fractaw product vision": "Visão de produto Fractaw",
    "Back to selected work": "Voltar aos projetos selecionados",
    "Engineering portfolio": "Portfólio de engenharia",
    "Software that fits your business, not the other way around.": "Software que se adapta à empresa, não o contrário.",
    "Companies often pay for software features they never use, while still relying on disconnected tools. Fractaw aims to change that with a modular management platform.": "Muitas empresas pagam por funções que nunca usam e ainda precisam de ferramentas desconectadas. O Fractaw propõe mudar isso com uma plataforma modular de gestão.",
    "The approach is to let each business select the capabilities it needs and adapt workflows to its reality, keeping shared data and services connected instead of forcing a one-size-fits-all system.": "A proposta é permitir que cada empresa escolha os recursos necessários e adapte os processos à sua realidade, mantendo dados e serviços conectados, sem impor um sistema igual para todos.",
    "Only relevant capabilities": "Só os recursos necessários",
    "Adaptable workflows": "Processos adaptáveis",
    "Shared foundation": "Base compartilhada",
    "A loyalty program shaped around each business.": "Fidelidade moldada à realidade de cada empresa.",
    "Retorna lets businesses shape their own loyalty programs, with configurable points, rewards and campaigns instead of a fixed, one-size-fits-all model.": "O Retorna permite que cada empresa configure seu programa de fidelidade, com pontos, recompensas e campanhas adaptáveis, em vez de regras fixas para todos.",
    "Companies can tailor loyalty rules across their stores, including local overrides and temporary campaigns, and integrate existing sales tools through an API. Reliable transactions support that flexibility.": "As empresas podem ajustar regras por loja, criar campanhas temporárias e integrar os sistemas de venda que já utilizam por API. Transações confiáveis sustentam essa flexibilidade.",
    "Configurable rewards": "Recompensas configuráveis",
    "Store-level rules": "Regras por loja",
    "API integrations": "Integrações por API",
    "Fractaw proposes modular business software that avoids unused features, fragmented tools and inflexible workflows.": "O Fractaw propõe um software de gestão modular para evitar funções não utilizadas, ferramentas fragmentadas e processos engessados.",
    "Use what your business needs. Not an entire package you don't.": "Use o que sua empresa precisa, não um pacote cheio de funções que não usa.",
    "Businesses can end up paying for broad software packages while using only a small share of their features, yet still need separate tools for everyday work. Fractaw proposes modular management: choose capabilities that fit the business, connect shared information and adapt workflows without a rigid, one-size-fits-all package.": "Empresas acabam pagando por pacotes extensos e utilizando apenas uma parte das funcionalidades, mas ainda precisam de outras ferramentas no dia a dia. O Fractaw propõe uma gestão modular: escolher recursos adequados ao negócio, conectar informações e adaptar processos sem depender de um pacote rígido.",
    "Unused features & fragmented workflows": "Funções não utilizadas e processos fragmentados",
    "A school and a beverage distributor both need software to run their operations, but not the same capabilities. When software comes as an oversized package, organizations can pay for functions they rarely or never use while still lacking what their teams actually need.": "Uma escola e uma distribuidora de bebidas precisam de sistemas para operar, mas não dos mesmos recursos. Quando o software vem em um pacote grande, as empresas podem pagar por funções que pouco utilizam e ainda sentir falta daquilo de que realmente precisam.",
    "When that package does not fit, teams add separate tools. Information gets duplicated, workflows become inconsistent and the cost of managing software keeps growing.": "Quando esse pacote não atende às necessidades, as equipes recorrem a outras ferramentas. Os dados se repetem, os processos ficam inconsistentes e a gestão dos sistemas se torna mais trabalhosa.",
    "Fractaw asks a different question: what if a company could select just the capabilities relevant to its work, with the flexibility to adjust them as its needs change?": "O Fractaw parte de uma pergunta: e se a empresa pudesse escolher apenas os recursos necessários e ajustá-los conforme suas necessidades mudam?",
    "The product direction is a shared foundation with business-specific modules. Organizations should be able to choose the capabilities they need and adapt how they work, rather than inherit unused functions from a fixed package.": "A proposta é uma base compartilhada com módulos específicos para cada tipo de negócio. Cada organização pode selecionar o que precisa e ajustar seus processos, em vez de receber funções desnecessárias de um pacote fechado.",
    "Start with what the business uses": "Começar pelo que a empresa realmente utiliza",
    "Identify the actual tasks, people and rules first. Unused capabilities should not be part of the default experience.": "Primeiro, entender tarefas, pessoas e regras reais. Funcionalidades sem utilidade não devem fazer parte da experiência padrão.",
    "Choose capabilities, not a bundle": "Escolher recursos, não um pacote fechado",
    "Give each module clear boundaries so different businesses can use the parts that fit, without taking on an entire package.": "Definir limites claros entre módulos para que empresas diferentes adotem apenas as partes que fazem sentido.",
    "Adapt as needs evolve": "Adaptar conforme o negócio evolui",
    "Keep shared data and services consistent while allowing business-specific workflows and modules to change over time.": "Manter dados e serviços comuns consistentes, permitindo que os módulos e processos específicos evoluam com a empresa.",
    "No customer adoption, production deployment, pricing model, proven cost savings or financial results are claimed here. Selecting modules is a product direction, not a claim that module-based billing is already available.": "Não há alegações de clientes, implantação em produção, modelo de cobrança, economia comprovada ou resultados financeiros. A seleção de módulos é uma direção do produto, não uma afirmação de que a cobrança por módulo já existe.",
    "Retorna is a configurable multi-company loyalty platform that adapts points, rewards, campaigns and store-specific policies to each business.": "O Retorna é uma plataforma de fidelidade multiempresa configurável, que adapta pontos, recompensas, campanhas e regras por loja às necessidades de cada negócio.",
    "Loyalty programs should fit the business, not force the business to fit.": "O programa de fidelidade deve se adaptar à empresa, não o contrário.",
    "Retorna is a collaborative loyalty platform designed around each company's needs. Businesses can configure how customers earn points, define rewards and redemptions, adapt policies for individual stores and run temporary campaigns. Existing sales systems connect through an API rather than being replaced.": "O Retorna é uma plataforma de fidelidade desenvolvida em equipe para atender às particularidades de cada empresa. É possível configurar o acúmulo de pontos, as recompensas e os resgates, ajustar políticas por loja e criar campanhas temporárias. Os sistemas de vendas existentes se conectam por API, sem precisar ser substituídos.",
    "Adaptable loyalty programs": "Programas de fidelidade adaptáveis",
    "Businesses want to encourage customers to return, but loyalty programs rarely work the same way everywhere. Fixed rules make it difficult to reflect each company's reward strategy, and multiple stores may need different policies or temporary campaigns.": "As empresas querem incentivar seus clientes a voltar, mas um programa de fidelidade não funciona da mesma forma em todos os negócios. Regras fixas dificultam estratégias próprias, e lojas diferentes podem exigir políticas ou campanhas específicas.",
    "Retorna's model is configurable by company, with store-level overrides, reward and redemption policies, and campaign rules. It connects to existing sales channels through an API so the loyalty program can fit the company's operations. Transactional integrity supports the experience behind the scenes.": "O modelo do Retorna permite configurações por empresa, exceções por loja, políticas de recompensas e resgates e regras de campanhas. Ele se integra aos canais de venda existentes por API para acompanhar a operação de cada negócio. A integridade das transações sustenta essa experiência.",
    "Rather than replacing a point-of-sale system or ERP, Retorna receives sales events from those tools, applies the business's configured loyalty policies, records the points history and returns a result. Shared Django services support both the interface and the versioned API.": "Em vez de substituir o PDV ou ERP, o Retorna recebe eventos de venda desses sistemas, aplica as regras de fidelidade configuradas, registra o histórico de pontos e devolve o resultado. Serviços Django compartilhados atendem à interface e à API versionada.",
    "Rules that match each business": "Regras adequadas a cada empresa",
    "Each business can define points and redemption policies, override rules for individual stores and use temporary campaigns instead of being limited to one hard-coded loyalty program.": "Cada empresa pode definir políticas de acúmulo e resgate, ajustar regras por loja e criar campanhas temporárias, sem ficar presa a um único programa de fidelidade fixo.",
  }));

  function normalizeLanguage(value) {
    if (typeof value !== "string") return null;
    const code = value.toLowerCase();
    if (code === "pt" || code.startsWith("pt-")) return "pt-BR";
    if (code === "en" || code.startsWith("en-")) return "en";
    return null;
  }

  function storedLanguage() {
    try { return normalizeLanguage(localStorage.getItem(STORAGE_KEY)); }
    catch { return null; }
  }

  function rememberLanguage(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); }
    catch { /* Private browsing may disable storage. */ }
  }

  function initialLanguage() {
    const params = new URLSearchParams(window.location.search);
    const explicit = normalizeLanguage(params.get("lang"));
    if (explicit) return explicit;
    const stored = storedLanguage();
    if (stored) return stored;
    const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
    return languages.map(normalizeLanguage).find(Boolean) || "en";
  }

  function translateTextNode(node, lang) {
    if (!node.parentElement || node.parentElement.closest("script, style, noscript")) return;
    const source = node.nodeValue || "";
    const trimmed = source.trim();
    if (!trimmed) return;
    const translated = lang === "pt-BR" ? translations.get(trimmed) : null;
    node.nodeValue = source.replace(trimmed, translated || trimmed);
  }

  function install() {
    // Preserve immutable English source strings so language can be switched repeatedly.
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement?.closest("script, style, noscript")) continue;
      nodes.push({ node, english: node.nodeValue });
    }

    const attributes = [];
    for (const element of document.querySelectorAll("[aria-label], [title], [placeholder], [alt]")) {
      for (const name of ["aria-label", "title", "placeholder", "alt"]) {
        if (element.hasAttribute(name)) attributes.push({ element, name, english: element.getAttribute(name) });
      }
    }

    const meta = document.querySelector('meta[name="description"]');
    const originalDescription = meta?.content;
    const originalTitle = document.title;
    const links = [...document.querySelectorAll("[data-portfolio-lang]")];
    const localizedLinks = [...document.querySelectorAll("[data-localized-link]")];

    function apply(lang, updateUrl = false) {
      document.documentElement.lang = lang;
      for (const { node, english } of nodes) {
        node.nodeValue = english;
        translateTextNode(node, lang);
      }
      for (const { element, name, english } of attributes) {
        element.setAttribute(name, (lang === "pt-BR" && translations.get(english)) || english);
      }
      if (meta) meta.content = (lang === "pt-BR" && translations.get(originalDescription)) || originalDescription;
      for (const link of localizedLinks) {
        const original = link.dataset.originalHref || link.getAttribute("href");
        if (!original) continue;
        link.dataset.originalHref = original;
        const target = new URL(original, window.location.href);
        target.searchParams.set("lang", lang);
        link.setAttribute("href", target.pathname + target.search + target.hash);
      }
      document.title = (lang === "pt-BR" && translations.get(originalTitle)) || originalTitle;
      for (const link of links) {
        const active = link.dataset.portfolioLang === lang;
        if (active) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      }
      rememberLanguage(lang);
      if (updateUrl) {
        const url = new URL(window.location.href);
        url.searchParams.set("lang", lang);
        history.replaceState(null, "", url.pathname + url.search + url.hash);
      }
      window.dispatchEvent(new CustomEvent("portfolio-language-change", { detail: { language: lang } }));
    }

    links.forEach(link => {
      link.addEventListener("click", event => {
        const lang = normalizeLanguage(link.dataset.portfolioLang);
        if (!lang) return;
        event.preventDefault();
        apply(lang, true);
      });
    });

    apply(initialLanguage());
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();
})();