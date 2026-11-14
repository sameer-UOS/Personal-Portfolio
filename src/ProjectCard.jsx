import { Link } from "react-router-dom";

function ProjectCard(props) {
  const {
    id,
    title,
    description,
    technologies,
    category,
    liveDemo,
    github,
  } = props;

  const technologyList = Array.isArray(technologies)
    ? technologies
    : (technologies || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return (
    <article className="project-card">
      <div className="project-card-header">
        <span className="project-category">{category}</span>
        <span className="project-card-number">
          Project
        </span>
      </div>

      <div className="project-card-content">
        <h2 className="project-title">{title}</h2>

        <p className="project-description">
          {description}
        </p>

        <div className="project-technologies">
          {technologyList.map((technology, index) => (
            <span className="technology-tag" key={index}>
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div className="project-actions">
        {liveDemo && (
          <a
            href={liveDemo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-live"
          >
            Live Demo ↗
          </a>
        )}

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-code"
          >
            View Code ↗
          </a>
        )}

        <Link
          className="project-details"
          to={`/projects/${id}`}
        >
          Details →
        </Link>
      </div>
    </article>
  );
}

export default ProjectCard;