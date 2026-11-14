const technologyIcons = {
  html: "html5/html5-original",
  css: "css3/css3-original",
  javascript: "javascript/javascript-original",
  react: "react/react-original",
  python: "python/python-original",
  "c++": "cplusplus/cplusplus-original",
  bootstrap: "bootstrap/bootstrap-original",
  git: "git/git-original",
  github: "github/github-original",
  "git & github": "git/git-original",
};

function SkillCard({ name, category, level }) {
  const iconKey = name.trim().toLowerCase();
  const icon = technologyIcons[iconKey];

  return (
    <div className="skill-card">
      <div className="skill-card-top">
        <div className="skill-icon">
          {icon ? (
            <img
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`}
              alt={`${name} logo`}
              loading="lazy"
            />
          ) : (
            <span>{name}</span>
          )}
        </div>

        <span className="skill-category">{category}</span>
      </div>

      <div className="skill-card-content">
        <h2>{name}</h2>
        <p>Current proficiency</p>
      </div>

      <div className="skill-progress-info">
        <span>Learning progress</span>
        <strong>{level}%</strong>
      </div>

      <div
        className="progress-container"
        role="progressbar"
        aria-label={`${name} learning progress`}
        aria-valuenow={level}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-bar"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default SkillCard;