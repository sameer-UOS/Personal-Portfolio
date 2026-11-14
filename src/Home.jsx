import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({ homeData }) {
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    document.title = "Sameer Khan | Software Engineering Student";
  }, []);

  return (
    <section className="home-section">
      <div className="container">
        <div className="row align-items-center justify-content-center g-5">

          {/* Profile Image */}
          <div className="col-12 col-md-5 col-lg-4">
            <div className="home-image-wrapper">
              <div className="home-image-frame">
                <img
                  src="/Profile.jpeg"
                  alt="Sameer Khan"
                  className="home-profile-image"
                />
              </div>
              <div className="home-image-decoration"></div>
            </div>
          </div>

          {/* Home Content */}
          <div className="col-12 col-md-7 col-lg-7">
            <div className="home-content">

              <span className="home-label">
                SOFTWARE ENGINEERING STUDENT
              </span>

              <h1 className="home-title">
                Hi, I'm <span>Sameer Khan.</span>
              </h1>

              <h2 className="home-role">
                {homeData.role}
              </h2>

              <p className="home-description">
                {homeData.description}
              </p>

              {showDetail && (
                <p className="home-detail">
                  I am currently learning React and using it to build
                  my portfolio and other practical projects.
                </p>
              )}

              <button
                className="home-more-button"
                onClick={() => setShowDetail((prev) => !prev)}
              >
                {showDetail ? "Show Less ↑" : "Read More ↓"}
              </button>

              <div className="home-actions">
                {homeData.buttons.map((button) => (
                  <Link
                    className="home-button"
                    key={button.text}
                    to={button.link}
                  >
                    {button.text}
                    <span> →</span>
                  </Link>
                ))}
              </div>

              <div className="home-footer-text">
                <span className="home-status-dot"></span>
                Currently learning and building practical projects
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Home;