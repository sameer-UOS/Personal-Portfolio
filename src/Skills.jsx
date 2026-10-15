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
    document.title = "Sameer | Skills";

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

  const filterSkills =
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
    return <p>Loading skills...</p>;
  }

  if (error) {
    return <p>Could not load skills: {error}</p>;
  }

  return (
    <div className="skills">
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
        {filterSkills.length === 0 ? (
          <p>No skills found in this category.</p>
        ) : (
          filterSkills.map((skill) => (
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
  );
}

export default Skills;