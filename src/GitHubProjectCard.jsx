import React from "react";

function GitHubProjectCard({ repo, onViewDetails }) {
  return (
    <article className="github-project-card">

      <div className="github-card-header">
        <span className="github-repo-label">
          GitHub Repository
        </span>

        <span className="github-repo-icon">
          Git
        </span>
      </div>

      <div className="github-card-content">
        <h3 className="github-project-title">
          {repo.name}
        </h3>

        <p className="github-project-description">
          {repo.description || "No description available"}
        </p>

        <div className="github-project-meta">
          <span className="github-language">
            <span className="language-dot"></span>
            {repo.language || "Not specified"}
          </span>

          <span>★ {repo.stargazers_count}</span>

          <span>⑂ {repo.forks_count}</span>
        </div>
      </div>

      <div className="github-project-actions">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-code-button"
        >
          View Code ↗
        </a>

        <button
          className="github-details-button"
          onClick={() => onViewDetails(repo)}
        >
          View Details →
        </button>
      </div>

    </article>
  );
}

export default React.memo(GitHubProjectCard);