import { useEffect } from "react";
import "./Education.css";

function Education() {
  useEffect(() => {
    document.title = "Sameer | Education";
  }, []);

  return (
    <section className="education">
      <div className="education-header">
        <p className="education-subtitle">MY ACADEMIC BACKGROUND</p>
        <h1>Education</h1>
        <p className="education-description">
          My academic journey and the foundation
          of my software engineering career.
        </p>
      </div>

      <div className="education-card">
        <div className="education-icon" aria-hidden="true">
          🎓
        </div>

        <div className="education-details">
          <span className="education-status">
            Currently Studying
          </span>

          <h2>BS Software Engineering</h2>
          <h3>University of Swat</h3>

          <p className="education-duration">
            2025 – 2029
          </p>

          <p className="education-text">
            Currently in my 3rd semester, building
            a strong foundation in programming,
            problem-solving, and software development.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Education;