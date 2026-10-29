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
    "Concurrency tests": "Testes de concorrência"
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