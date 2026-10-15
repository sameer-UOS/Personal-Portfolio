import { useParams, Link } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails({ projects }) {

  const { id } = useParams();

  const project = projects.find(
    project => project.id === Number(id)
  );

  if (!project) {
    return (
      <div>
        <h2>Project not found</h2>
        <p>The project you're looking for doesn't exist.</p>

        <Link to="/projects">← Back to Projects</Link>
    </div>
    )
  }

   const currentIndex = projects.findIndex(
    (project) => project.id === Number(id)
  );

  const previousProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="project-detail-page">
      <Link className="back-projects" to="/projects">← Back to Projects</Link>
      <h1 className="project-details-title">{project.title}</h1>

      <h3 className="project-overview-title">Project Overview</h3>
      <p className="project-details-description">{project.description}</p>

      <p className="project-details-info">
        <strong>Category:</strong> {project.category}
      </p>

      <p>
        <strong>Technologies:</strong> {project.technologies}
      </p>

      <p>
        <strong>Project ID:</strong> {project.id}
      </p>

      <div className="technology-list">
          {project.technologies.split(",").map((technology, index) => (
          <span key={index}>{technology.trim()}</span>
        ))}
      </div>

      <div className="project-navigation">
        {previousProject && (
          <Link to={`/projects/${previousProject.id}`}>
            ← Previous
          </Link>
        )}

        {nextProject && (
          <Link to={`/projects/${nextProject.id}`}>
            Next →
          </Link>
        )}
      </div>

    </div>
  );
}

export default ProjectDetails;