import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "./supabaseClient";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [previousProject, setPreviousProject] = useState(null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sameer | Project Details";

    async function loadProject() {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const currentIndex = data.findIndex(
        (item) => String(item.id) === id
      );

      if (currentIndex === -1) {
        setProject(null);
        setPreviousProject(null);
        setNextProject(null);
      } else {
        setProject(data[currentIndex]);
        setPreviousProject(data[currentIndex - 1] || null);
        setNextProject(data[currentIndex + 1] || null);
      }

      setLoading(false);
    }

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <div className="project-detail-message">
        Loading project details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail-message">
        Could not load project: {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="project-detail-page">
        <div className="project-not-found">
          <h2>Project Not Found</h2>
          <p>The project you're looking for doesn't exist.</p>
          <Link to="/projects" className="back-projects">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : (project.technologies || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return (
    <section className="project-detail-section">
      <div className="project-detail-page">

        <Link className="back-projects" to="/projects">
          ← Back to Projects
        </Link>

        <div className="project-detail-header">
          <span className="project-detail-label">
            PROJECT DETAILS
          </span>

          <h1 className="project-details-title">
            {project.title}
          </h1>

          <span className="project-detail-category">
            {project.category || "Frontend"}
          </span>
        </div>

        <div className="project-detail-content">

          <div className="project-overview-card">
            <h2 className="project-overview-title">
              Project Overview
            </h2>

            <p className="project-details-description">
              {project.description}
            </p>
          </div>

          <div className="project-information-card">
            <h2>Project Information</h2>

            <div className="project-info-row">
              <span>Category</span>
              <strong>{project.category || "Frontend"}</strong>
            </div>

            <div className="project-info-row">
              <span>Project ID</span>
              <strong>#{project.id}</strong>
            </div>

            <div className="project-info-row">
              <span>Total Technologies</span>
              <strong>{technologies.length}</strong>
            </div>
          </div>

          <div className="project-technology-card">
            <h2>Technologies Used</h2>

            <div className="technology-list">
              {technologies.map((technology, index) => (
                <span className="technology-tag" key={index}>
                  {technology}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="project-navigation">
          {previousProject ? (
            <Link to={`/projects/${previousProject.id}`}>
              ← Previous Project
            </Link>
          ) : (
            <span />
          )}

          {nextProject && (
            <Link to={`/projects/${nextProject.id}`}>
              Next Project →
            </Link>
          )}
        </div>

      </div>
    </section>
  );
}

export default ProjectDetails;