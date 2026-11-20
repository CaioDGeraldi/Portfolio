import retornaSymbol from "../../assets/retorna-symbol.svg";
import fractawLogo from "../../assets/fractaw-logo-dark.svg";

function RetornaFlow({ language }) {
  const pt = language === "pt-BR";
  return (
    <div className="pitch-flow" role="img" aria-label={pt ? "Fluxo conceitual do Retorna: evento de venda, regras configuradas e histórico de pontos." : "Retorna conceptual flow: sales event, configured rules and points history."}>
      <div className="pitch-flow-step"><span>01</span><strong>{pt ? "Venda" : "Sale"}</strong><small>{pt ? "Sistema existente" : "Existing system"}</small></div>
      <span className="pitch-flow-arrow" aria-hidden="true">→</span>
      <div className="pitch-flow-step pitch-flow-step-active"><span>02</span><strong>{pt ? "Regras" : "Rules"}</strong><small>{pt ? "Empresa e loja" : "Company and store"}</small></div>
      <span className="pitch-flow-arrow" aria-hidden="true">→</span>
      <div className="pitch-flow-step"><span>03</span><strong>{pt ? "Pontos" : "Points"}</strong><small>{pt ? "Histórico e resgate" : "History and redemption"}</small></div>
    </div>
  );
}

export default function ProjectPitch({ project, labels, language }) {
  const href = `./projects/${project.slug}.html?lang=${language === "en" ? "en" : "pt-BR"}`;
  return (
    <article id={project.id} className="project-pitch" data-reveal>
      <div className="pitch-heading">
        <div>
          <p className="pitch-category">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <span className="pitch-status">{project.status}</span>
      </div>
      <p className="pitch-headline">{project.headline}</p>
      <div className="pitch-body">
        <div className="pitch-story">
          <section className="pitch-chapter">
            <h4>{labels.scenario}</h4>
            <p>{project.scenario}</p>
          </section>
          <section className="pitch-chapter pitch-proposal">
            <h4>{labels.proposal}</h4>
            <p>{project.proposal}</p>
          </section>
          <section className="pitch-chapter">
            <h4>{labels.solution}</h4>
            <p>{project.solution}</p>
          </section>
          <ul className="pitch-tags" aria-label={language === "pt-BR" ? "Tecnologias e áreas" : "Technologies and areas"}>
            {project.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <a className="project-link pitch-link" href={href}>{labels.explore}<span aria-hidden="true"> ↗</span></a>{project.demoUrl && <a className="project-link pitch-link" href={project.demoUrl} target="_blank" rel="noopener noreferrer">{language === "pt-BR" ? "Ver protótipo ao vivo" : "Live prototype"}<span aria-hidden="true"> ↗</span></a>}
        </div>
        <div className={`pitch-visual pitch-visual-${project.visual}`}>
          {project.visual === "image" ? (
            <figure>
              <img src={project.image} alt={project.imageAlt} loading={project.id === "fractaw" ? "eager" : "lazy"} decoding="async" onError={project.id === "fractaw" ? event => { event.currentTarget.onerror = null; event.currentTarget.src = fractawLogo; event.currentTarget.classList.add("pitch-image-fallback"); } : undefined} />
              <figcaption>{labels.visualNote}</figcaption>
            </figure>
          ) : project.visual === "retorna" ? (
            <div className="pitch-retorna-panel">
              <div className="pitch-retorna-brand">
                <img src={retornaSymbol} alt="Símbolo oficial do Retorna" width="42" height="42" />
                <div><strong>Retorna</strong><span>{language === "pt-BR" ? "FIDELIDADE CONFIGURÁVEL" : "CONFIGURABLE LOYALTY"}</span></div>
              </div>
              <div className="pitch-retorna-flow">
                <div className="pitch-visual-kicker">RETORNA / API</div>
                <RetornaFlow language={language} />
                <p className="pitch-visual-note">{language === "pt-BR" ? "Fluxo conceitual da integração, não uma captura de produção." : "Conceptual integration flow, not a production capture."}</p>
              </div>
            </div>
          ) : (
            <div className="pitch-visual-kicker">PROJECT / OVERVIEW</div>
          )}
        </div>
      </div>
    </article>
  );
}
