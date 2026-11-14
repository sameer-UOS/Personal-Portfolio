import { useEffect } from "react";
import "./Education.css";

function Education() {
  useEffect(() => {
    document.title = "Sameer Khan | Education";
  }, []);

  return (
    <section className="education-section">
      <div className="container">

        {/* Education Header */}
        <div className="education-header text-center">
          <span className="education-subtitle">
            MY ACADEMIC BACKGROUND
          </span>

          <h1>
            My <span>Education</span>
          </h1>

          <p className="education-description">
            My academic journey and the foundation
            of my software engineering career.
          </p>
        </div>

        {/* Education Card */}
        <div className="row justify-content-center">
          <div className="col-12 col-lg-9">
            <div className="education-card">

              <div className="education-icon">
                <span>🎓</span>
              </div>

              <div className="education-details">

                <span className="education-status">
                  <span className="education-status-dot"></span>
                  Currently Studying
                </span>

                <h2>BS Software Engineering</h2>

                <h3>University of Swat</h3>

                <div className="education-duration">
                  <span>2025 – 2029</span>
                  <span className="education-divider">|</span>
                  <span>3rd Semester</span>
                </div>

                <p className="education-text">
                  Currently in my 3rd semester, building
                  a strong foundation in programming,
                  problem-solving, and software development.
                </p>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Education;