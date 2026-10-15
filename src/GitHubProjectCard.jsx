import React from "react";

function GitHubProjectCard({ repo, onViewDetails }) {
  return (
    <div className="github-project-card">
      <h3 className="github-project-title">{repo.name}</h3>

      <p className="github-project-description">
        {repo.description || "No description available"}
      </p>

      <p className="github-project-language">
        <strong>Language:</strong>{" "}
        {repo.language || "Not specified"}
      </p>

      <div className="github-project-actions">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-code-button"
        >
          View Code
        </a>

        <button className="github-details-button" onClick={() => onViewDetails(repo)}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default React.memo(GitHubProjectCard);