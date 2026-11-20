import { useState } from "react";

function IntegrationVisual({ language }) {
  const pt = language === "pt-BR";
  return (
    <div className="integration-visual" role="img" aria-label={pt ? "Diagrama conceitual do Retorna: evento de venda, aplicação de regras de fidelidade e registro de pontos." : "Conceptual Retorna diagram: sales event, loyalty rules and points history."}>
      <div className="integration-topline">
        <span>{pt ? "FLUXO CONCEITUAL" : "CONCEPTUAL FLOW"}</span>
        <span>REToRNA / API</span>
      </div>
      <div className="integration-flow">
        <div className="integration-step">
          <span className="integration-step-index">01</span>
          <strong>{pt ? "Venda" : "Sale"}</strong>
          <small>{pt ? "Evento recebido" : "Event received"}</small>
        </div>
        <span className="integration-connector" aria-hidden="true">→</span>
        <div className="integration-step integration-step-active">
          <span className="integration-step-index">02</span>
          <strong>{pt ? "Regras" : "Rules"}</strong>
          <small>{pt ? "Empresa / loja" : "Company / store"}</small>
        </div>
        <span className="integration-connector" aria-hidden="true">→</span>
        <div className="integration-step">
          <span className="integration-step-index">03</span>
          <strong>{pt ? "Pontos" : "Points"}</strong>
          <small>{pt ? "Histórico" : "History"}</small>
        </div>
      </div>
      <div className="integration-base">
        <span>PostgreSQL</span>
        <span>{pt ? "Modelo ilustrativo, não captura de produção" : "Illustrative model, not a production capture"}</span>
      </div>
    </div>
  );
}

export default function ProjectCard({ project, language, viewCase }) {
  const [imageFailed, setImageFailed] = useState(false);
  const href = `./projects/${project.slug}.html?lang=${language === "en" ? "en" : "pt-BR"}`;

  return (
    <article id={project.id} className={`project-card ${project.featured ? "project-card-featured" : ""}`} data-reveal>
      <div className={`project-visual ${project.visual === "flow" ? "project-visual-flow" : ""}`} data-image-reveal>
        {project.visual === "image" && !imageFailed ? (
          <img
            src={project.image}
            alt={project.imageAlt || project.title}
            loading={project.featured ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={project.featured ? "high" : "auto"}
            onError={() => setImageFailed(true)}
          />
        ) : project.visual === "image" ? (
          <div className="project-image-fallback" role="img" aria-label={language === "pt-BR" ? `Imagem indisponível: ${project.title}` : `Image unavailable: ${project.title}`}>
            <span>{project.title}</span>
            <small>{language === "pt-BR" ? "Prévia indisponível" : "Preview unavailable"}</small>
          </div>
        ) : (
          <IntegrationVisual language={language} />
        )}
        {project.fact && <span className="project-fact">{project.fact}</span>}
      </div>
      <div className="project-card-content">
        <div className="project-card-topline">
          <p className="project-category">{project.category}</p>
          <p className="project-status">{project.status}</p>
        </div>
        <h3><a href={href}>{project.title}</a></h3>
        <p className="project-summary">{project.summary}</p>
        <div className="project-bottom">
          <ul className="tag-list" aria-label={language === "pt-BR" ? "Tecnologias e áreas" : "Technologies and areas"}>
            {project.tags.map(tag => <li key={tag}>{tag}</li>)}
          </ul>
          <a className="project-link" href={href}>{viewCase}</a>
        </div>
      </div>
    </article>
  );
}
