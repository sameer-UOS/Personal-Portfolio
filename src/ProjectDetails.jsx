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
    return <p>Loading project details...</p>;
  }

  if (error) {
    return <p>Could not load project: {error}</p>;
  }

  if (!project) {
    return (
      <div>
        <h2>Project not found</h2>
        <p>The project you're looking for doesn't exist.</p>
        <Link to="/projects">← Back to Projects</Link>
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
    <div className="project-detail-page">
      <Link className="back-projects" to="/projects">
        ← Back to Projects
      </Link>

      <h1 className="project-details-title">
        {project.title}
      </h1>

      <h3 className="project-overview-title">
        Project Overview
      </h3>

      <p className="project-details-description">
        {project.description}
      </p>

      <p className="project-details-info">
        <strong>Category:</strong> {project.category || "Frontend"}
      </p>

      <p>
        <strong>Technologies:</strong> {technologies.join(", ")}
      </p>

      <p>
        <strong>Project ID:</strong> {project.id}
      </p>

      <div className="technology-list">
        {technologies.map((technology, index) => (
          <span key={index}>{technology}</span>
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