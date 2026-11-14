import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GitHubProjectDetail.css";

function GitHubProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function getProject() {
      setError("");
      setProject(null);

      try {
        const response = await fetch(
          `https://api.github.com/repositories/${id}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Repository not found!");
        }

        const data = await response.json();
        setProject(data);

      } catch (err) {
        if (err.name === "AbortError") return;

        console.error(err);
        setError("Failed to load repository. Please try again.");
      }
    }

    getProject();

    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <div className="github-detail">
        <div className="github-detail-message">
          <h2>Unable to load repository</h2>
          <p>{error}</p>

          <button
            className="github-back-button"
            onClick={() => navigate(-1)}
          >
            Back to Repositories
          </button>
        </div>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="github-detail">
        <p className="github-detail-message">
          Loading repository...
        </p>
      </div>
    );
  }

  return (
    <section className="github-detail">

      <button
        className="github-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back to Repositories
      </button>

      <div className="github-detail-header">
        <span className="github-detail-label">
          GitHub Repository
        </span>

        <h1 className="github-detail-title">
          {project.name}
        </h1>

        <p className="github-detail-fullname">
          {project.full_name}
        </p>

        <p className="github-detail-description">
          {project.description || "No description available"}
        </p>
      </div>

      <div className="github-detail-info">
        <h2>Repository Information</h2>

        <div className="github-detail-stats">

          <div className="github-stat">
            <span className="github-stat-label">Language</span>
            <strong>{project.language || "Not specified"}</strong>
          </div>

          <div className="github-stat">
            <span className="github-stat-label">Stars</span>
            <strong>★ {project.stargazers_count}</strong>
          </div>

          <div className="github-stat">
            <span className="github-stat-label">Forks</span>
            <strong>⑂ {project.forks_count}</strong>
          </div>

          <div className="github-stat">
            <span className="github-stat-label">Open Issues</span>
            <strong>{project.open_issues_count}</strong>
          </div>

          <div className="github-stat">
            <span className="github-stat-label">Default Branch</span>
            <strong>{project.default_branch}</strong>
          </div>

          <div className="github-stat">
            <span className="github-stat-label">Visibility</span>
            <strong>{project.visibility}</strong>
          </div>

        </div>
      </div>

      <a
        className="github-detail-link"
        href={project.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Repository on GitHub ↗
      </a>

    </section>
  );
}

export default GitHubProjectDetail;