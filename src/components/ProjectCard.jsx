function ArrowUpRight() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 15.5 15 5m-8.5 0H15v8.5" /></svg>;
}

function IntegrationVisual() {
  return (
    <div className="integration-visual" role="img" aria-label="Conceptual flow: existing sales tools connect to an API, which applies loyalty rules and stores the result in PostgreSQL.">
      <span className="integration-label">CONCEPTUAL INTEGRATION FLOW</span>
      <div className="integration-flow">
        <span>Sales tools</span><i aria-hidden="true">→</i><span>API</span><i aria-hidden="true">→</i><span>Rules</span>
      </div>
      <div className="integration-base"><span>PostgreSQL</span><span>Points · History · Rewards</span></div>
    </div>
  );
}

export default function ProjectCard({ project, language, viewCase, featuredLabel }) {
  const href = `./projects/${project.slug}.html?lang=${language === "en" ? "en" : "pt-BR"}`;
  return (
    <article id={project.id} className={`project-card ${project.featured ? "project-card-featured" : ""}`} data-reveal>
      <div className={`project-visual ${project.visual === "flow" ? "project-visual-flow" : ""}`}>
        {project.visual === "image" ? (
          <img src={project.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <IntegrationVisual />
        )}
        <span className="project-index">{project.number} / 03</span>
        {project.featured && <span className="project-award">{project.fact}</span>}
      </div>
      <div className="project-card-content">
        <div className="project-card-topline">
          <p className="eyebrow">{project.category}</p>
          {project.featured && <span className="featured-label">{featuredLabel}</span>}
        </div>
        <h3><a href={href}>{project.title}</a></h3>
        <p className="project-summary">{project.summary}</p>
        <div className="tag-list" aria-label="Project areas">
          {project.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
        <a className="project-link" href={href}>
          {viewCase}
          <ArrowUpRight />
        </a>
      </div>
    </article>
  );
}
