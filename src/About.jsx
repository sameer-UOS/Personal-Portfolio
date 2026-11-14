import { useState, useEffect } from "react";
import LearningCard from "./LearningCard";
import "./About.css";

function About() {
  useEffect(() => {
    document.title = "Sameer Khan | About";
  }, []);

  const learningJourney = [
    {
      id: 1,
      topic: "HTML",
      status: "Completed",
      description:
        "Learned how to structure webpages using semantic HTML, forms, links, lists and other basic elements.",
    },
    {
      id: 2,
      topic: "CSS",
      status: "Completed",
      description:
        "Currently practicing layouts, the box model, responsive design, selectors and basic styling.",
    },
    {
      id: 3,
      topic: "JavaScript",
      status: "Learning",
      description:
        "Practicing JavaScript fundamentals, DOM concepts, events, arrays, objects and problem solving.",
    },
    {
      id: 4,
      topic: "React",
      status: "Currently Learning",
      description:
        "Learning components, JSX, props, state, forms, React Router, APIs and React hooks through projects.",
    },
  ];

  const [showJourney, setShowJourney] = useState(false);

  const visibleJourney = showJourney
    ? learningJourney
    : learningJourney.slice(0, 2);

  return (
    <section className="about-section">
      <div className="container">

        {/* About Introduction */}
        <div className="about-header">
          <span className="about-label">GET TO KNOW ME</span>

          <h1 className="about-title">
            About <span>Me</span>
          </h1>

          <p className="about-intro">
            I'm a Software Engineering student currently learning
            frontend development. I started with HTML and CSS,
            and I'm now focusing on JavaScript and React by
            building practical projects.
          </p>
        </div>

        {/* Learning Journey */}
        <div className="learning-section">
          <div className="learning-heading">
            <div>
              <span className="about-label">MY PROGRESS</span>
              <h2>My Learning Journey</h2>
            </div>

            <span className="journey-count">
              {learningJourney.length} Technologies
            </span>
          </div>

          <div className="row g-4">
            {visibleJourney.map((journey) => (
              <div className="col-12 col-md-6" key={journey.id}>
                <LearningCard
                  topic={journey.topic}
                  status={journey.status}
                  description={journey.description}
                />
              </div>
            ))}
          </div>

          <button
            className="about-more-button"
            onClick={() => setShowJourney((prev) => !prev)}
          >
            {showJourney ? "Show Less ↑" : "Show All Technologies ↓"}
          </button>
        </div>

        {/* Currently Learning */}
        <div className="currently-learning custom-card">
          <div className="currently-learning-content">
            <span className="about-label">WHAT I'M FOCUSING ON</span>

            <h2>Currently Learning</h2>

            <p>
              I'm currently focusing on JavaScript and React while
              building practical projects to strengthen my
              frontend development skills.
            </p>

            <ul>
              <li>JavaScript fundamentals</li>
              <li>React components and hooks</li>
              <li>Working with APIs</li>
              <li>Building responsive interfaces</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;