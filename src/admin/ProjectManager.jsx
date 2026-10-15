
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const emptyForm = {
  title: "",
  description: "",
  technologies: "",
  category: "Frontend",
  image_url: "",
  project_url: "",
  github_url: "",
};

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessageType("error");
      setMessage(error.message);
    } else {
      setProjects(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  function handleChange(e) {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const project = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      image_url: form.image_url.trim() || null,
      project_url: form.project_url.trim() || null,
      github_url: form.github_url.trim() || null,
    };

    const result = editingId
      ? await supabase
          .from("projects")
          .update(project)
          .eq("id", editingId)
      : await supabase.from("projects").insert(project);

    setSaving(false);

    if (result.error) {
      setMessageType("error");
      setMessage(result.error.message);
      return;
    }

    setMessageType("success");
    setMessage(editingId ? "Project updated successfully." : "Project added successfully.");
    setForm(emptyForm);
    setEditingId(null);
    await loadProjects();
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : project.technologies || "",
      category: project.category || "Frontend",
      image_url: project.image_url || "",
      project_url: project.project_url || "",
      github_url: project.github_url || "",
    });
    setMessage("");
    document.getElementById("project-editor")?.scrollIntoView({
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
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      setMessageType("error");
      setMessage(error.message);
      return;
    }

    setMessageType("success");
    setMessage("Project deleted successfully.");

    if (editingId === id) {
      cancelEdit();
    }

    await loadProjects();
  }

  return (
    <section className="pm-manager">
      <div className="pm-editor" id="project-editor">
        <div className="pm-editor-heading">
          <div>
            <span className="pm-kicker">
              {editingId ? "EDIT EXISTING WORK" : "ADD SOMETHING NEW"}
            </span>
            <h3>{editingId ? "Update project" : "Create a project"}</h3>
            <p>
              {editingId
                ? "Make your changes and save them."
                : "Add a project to display on your portfolio."}
            </p>
          </div>
          <span className="pm-editor-icon">＋</span>
        </div>

        <form className="pm-form" onSubmit={handleSubmit}>
          <div className="pm-field">
            <label htmlFor="pm-title">Project title</label>
            <input
              id="pm-title"
              name="title"
              placeholder="e.g. Weather Application"
              value={form.title}
              onChange={handleChange}
              required
              maxLength={120}
            />
          </div>

          <div className="pm-field">
            <label htmlFor="pm-description">Description</label>
            <textarea
              id="pm-description"
              name="description"
              placeholder="What does this project do?"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              maxLength={2000}
            />
          </div>

          <div className="pm-form-grid">
            <div className="pm-field">
              <label htmlFor="pm-technologies">Technologies</label>
              <input
                id="pm-technologies"
                name="technologies"
                placeholder="React, CSS, JavaScript"
                value={form.technologies}
                onChange={handleChange}
                required
              />
              <small>Separate technologies with commas.</small>
            </div>

            <div className="pm-field">
              <label htmlFor="pm-category">Category</label>
              <select
                id="pm-category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="Frontend">Frontend</option>
                <option value="React">React</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>
          </div>

          <div className="pm-field">
            <label htmlFor="pm-image">Preview image URL <span>Optional</span></label>
            <input
              id="pm-image"
              name="image_url"
              type="url"
              placeholder="https://example.com/image.png"
              value={form.image_url}
              onChange={handleChange}
            />
          </div>

          <div className="pm-form-grid">
            <div className="pm-field">
              <label htmlFor="pm-live">Live project URL <span>Optional</span></label>
              <input
                id="pm-live"
                name="project_url"
                type="url"
                placeholder="https://your-project.vercel.app"
                value={form.project_url}
                onChange={handleChange}
              />
            </div>

            <div className="pm-field">
              <label htmlFor="pm-github">GitHub URL <span>Optional</span></label>
              <input
                id="pm-github"
                name="github_url"
                type="url"
                placeholder="https://github.com/username/repo"
                value={form.github_url}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pm-form-actions">
            <button className="pm-primary-button" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Save changes" : "＋ Add project"}
            </button>

            {editingId && (
              <button
                className="pm-secondary-button"
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
            className={`pm-message ${messageType === "error" ? "is-error" : "is-success"}`}
            role="status"
          >
            {message}
          </p>
        )}
      </div>

      <div className="pm-list-heading">
        <div>
          <span className="pm-kicker">YOUR PORTFOLIO</span>
          <h3>Existing projects</h3>
        </div>
        <span className="pm-count">{projects.length} projects</span>
      </div>

      {loading ? (
        <p className="pm-empty">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="pm-empty">No projects yet. Add your first project above.</div>
      ) : (
        <div className="pm-project-grid">
          {projects.map((project) => (
            <article className="pm-project-card" key={project.id}>
              {project.image_url ? (
                <img
                  className="pm-project-image"
                  src={project.image_url}
                  alt={`${project.title} preview`}
                  loading="lazy"
                />
              ) : (
                <div className="pm-project-placeholder">▤</div>
              )}

              <div className="pm-project-content">
                <div className="pm-project-topline">
                  <span className="pm-category">{project.category || "Frontend"}</span>
                  <span className="pm-project-id">#{project.id}</span>
                </div>

                <h4>{project.title}</h4>
                <p className="pm-project-description">{project.description}</p>

                <div className="pm-tech-list">
                  {(Array.isArray(project.technologies)
                    ? project.technologies
                    : []
                  ).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="pm-project-links">
                  {project.project_url && (
                    <a href={project.project_url} target="_blank" rel="noreferrer">
                      Live preview ↗
                    </a>
                  )}
                  {project.github_url && (
                    <a href={project.github_url} target="_blank" rel="noreferrer">
                      GitHub ↗
                    </a>
                  )}
                </div>

                <div className="pm-project-actions">
                  <button
                    className="pm-edit-button"
                    type="button"
                    onClick={() => handleEdit(project)}
                  >
                    Edit
                  </button>
                  <button
                    className="pm-delete-button"
                    type="button"
                    onClick={() => handleDelete(project.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}