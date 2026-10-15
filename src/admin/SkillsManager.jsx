
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const emptyForm = {
  name: "",
  level: 50,
  category: "Frontend",
};

export default function SkillsManager() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadSkills() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessageType("error");
      setMessage(error.message);
    } else {
      setSkills(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadSkills();
  }, []);

  function handleChange(e) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]:
        e.target.name === "level"
          ? Number(e.target.value)
          : e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const skill = {
      name: form.name.trim(),
      level: Number(form.level),
      category: form.category,
    };

    const result = editingId
      ? await supabase
          .from("skills")
          .update(skill)
          .eq("id", editingId)
      : await supabase.from("skills").insert(skill);

    setSaving(false);

    if (result.error) {
      setMessageType("error");
      setMessage(result.error.message);
      return;
    }

    setMessageType("success");
    setMessage(
      editingId
        ? "Skill updated successfully."
        : "Skill added successfully."
    );

    setForm(emptyForm);
    setEditingId(null);
    await loadSkills();
  }

  function handleEdit(skill) {
    setEditingId(skill.id);
    setForm({
      name: skill.name || "",
      level: Number(skill.level) || 0,
      category: skill.category || "Frontend",
    });
    setMessage("");

    document.getElementById("skill-editor")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    const { error } = await supabase
      .from("skills")
      .delete()
      .eq("id", id);

    if (error) {
      setMessageType("error");
      setMessage(error.message);
      return;
    }

    setMessageType("success");
    setMessage("Skill deleted successfully.");

    if (editingId === id) {
      cancelEdit();
    }

    await loadSkills();
  }

  return (
    <section className="sm-manager">
      <div className="sm-editor" id="skill-editor">
        <div className="sm-editor-heading">
          <div>
            <span className="sm-kicker">
              {editingId ? "UPDATE YOUR EXPERTISE" : "GROW YOUR PROFILE"}
            </span>
            <h3>{editingId ? "Edit skill" : "Add a skill"}</h3>
            <p>
              Set a skill name, category and your current proficiency level.
            </p>
          </div>
          <span className="sm-editor-icon">◇</span>
        </div>

        <form className="sm-form" onSubmit={handleSubmit}>
          <div className="sm-field">
            <label htmlFor="sm-name">Skill name</label>
            <input
              id="sm-name"
              name="name"
              placeholder="e.g. JavaScript"
              value={form.name}
              onChange={handleChange}
              maxLength={80}
              required
            />
          </div>

          <div className="sm-form-grid">
            <div className="sm-field">
              <label htmlFor="sm-category">Category</label>
              <select
                id="sm-category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="Frontend">Frontend</option>
                <option value="Programming">Programming</option>
                <option value="Tools">Tools</option>
                <option value="Backend">Backend</option>
              </select>
            </div>

            <div className="sm-field">
              <label htmlFor="sm-level">Proficiency level</label>
              <div className="sm-level-value">{form.level}%</div>
            </div>
          </div>

          <div className="sm-slider-wrap">
            <input
              id="sm-level"
              className="sm-slider"
              type="range"
              name="level"
              min="0"
              max="100"
              step="5"
              value={form.level}
              onChange={handleChange}
              style={{
                "--sm-progress": `${form.level}%`,
              }}
            />
            <div className="sm-slider-labels">
              <span>Beginner · 0%</span>
              <span>Advanced · 100%</span>
            </div>
          </div>

          <div className="sm-form-actions">
            <button
              className="sm-primary-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Save changes"
                  : "＋ Add skill"}
            </button>

            {editingId && (
              <button
                className="sm-secondary-button"
                type="button"
                onClick={cancelEdit}
                disabled={saving}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {message && (
          <p
            className={`sm-message ${
              messageType === "error" ? "is-error" : "is-success"
            }`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>

      <div className="sm-list-heading">
        <div>
          <span className="sm-kicker">YOUR TOOLKIT</span>
          <h3>Existing skills</h3>
        </div>
        <span className="sm-count">{skills.length} skills</span>
      </div>

      {loading ? (
        <p className="sm-empty">Loading skills...</p>
      ) : skills.length === 0 ? (
        <div className="sm-empty">
          No skills added yet. Add your first skill above.
        </div>
      ) : (
        <div className="sm-skill-grid">
          {skills.map((skill) => (
            <article className="sm-skill-card" key={skill.id}>
              <div className="sm-skill-topline">
                <span className="sm-skill-symbol">◇</span>
                <span className="sm-category">
                  {skill.category || "Frontend"}
                </span>
              </div>

              <h4>{skill.name}</h4>

              <div className="sm-skill-level">
                <span>Proficiency</span>
                <strong>{skill.level}%</strong>
              </div>

              <div
                className="sm-progress-track"
                role="progressbar"
                aria-label={`${skill.name} proficiency`}
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="sm-progress-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              <div className="sm-skill-actions">
                <button
                  className="sm-edit-button"
                  type="button"
                  onClick={() => handleEdit(skill)}
                >
                  Edit
                </button>
                <button
                  className="sm-delete-button"
                  type="button"
                  onClick={() => handleDelete(skill.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
