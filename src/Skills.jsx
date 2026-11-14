import { useState, useEffect } from "react";
import SkillCard from "./SkillCard";
import { supabase } from "./supabaseClient";
import "./Skills.css";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [selectSkill, setSelectSkill] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Sameer Khan | Skills";

    async function loadSkills() {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setSkills(data);
      }

      setLoading(false);
    }

    loadSkills();
  }, []);

  const filteredSkills =
    selectSkill === "All"
      ? skills
      : skills.filter(
          (skill) => skill.category === selectSkill
        );

  const skillCategories = [
    "All",
    "Frontend",
    "Programming",
    "Tools",
    "Backend",
  ];

  if (loading) {
    return (
      <section className="skills-section">
        <div className="container text-center">
          <p className="skills-message">Loading skills...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="skills-section">
        <div className="container text-center">
          <p className="skills-error">
            Could not load skills: {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="skills-section">
      <div className="container">

        <div className="skills-header text-center">
          <span className="skills-subtitle">
            MY TECHNICAL EXPERTISE
          </span>

          <h1>
            My <span>Skills</span>
          </h1>

          <p className="skills-description">
            Technologies and tools I am learning and using
            to build practical software projects.
          </p>
        </div>

        <div className="skill-filters">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectSkill(category)}
              className={`skill-filter ${
                selectSkill === category ? "active" : ""
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skill-grid">
          {filteredSkills.length === 0 ? (
            <p className="skills-message">
              No skills found in this category.
            </p>
          ) : (
            filteredSkills.map((skill) => (
              <SkillCard
                key={skill.id}
                name={skill.name}
                category={skill.category}
                level={skill.level}
              />
            ))
          )}
        </div>

      </div>
    </section>
  );
}

export default Skills;