
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import ProjectManager from "./ProjectManager";
import SkillsManager from "./SkillsManager";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error || !data.session) {
        navigate("/admin", { replace: true });
      } else {
        setSession(data.session);
      }

      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;

      if (!nextSession) {
        setSession(null);
        navigate("/admin", { replace: true });
      } else {
        setSession(nextSession);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/admin", { replace: true });
  }

  if (loading || !session) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Checking your session...</p>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a href="#overview" className="admin-brand">
          <span className="admin-brand-icon">S</span>
          <span>
            <strong>Sameer</strong>
            <small>Admin Panel</small>
          </span>
        </a>

        <p className="admin-nav-label">WORKSPACE</p>

        <nav className="admin-nav">
          <a className="admin-nav-link active" href="#overview">
            <span>⌂</span> Overview
          </a>
          <a className="admin-nav-link" href="#projects">
            <span>▤</span> Projects
          </a>
          <a className="admin-nav-link" href="#skills">
            <span>◇</span> Skills
          </a>
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user">
            <div className="admin-avatar">
              {session.user.email?.charAt(0).toUpperCase() || "A"}
            </div>
            <div className="admin-user-info">
              <strong>Administrator</strong>
              <small>{session.user.email}</small>
            </div>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
          >
            <span>↪</span> Log out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <p className="admin-eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Admin Dashboard</h1>
          </div>
          <span className="admin-status">
            <span /> System connected
          </span>
        </header>

        <section id="overview" className="admin-welcome">
          <div>
            <p className="admin-eyebrow">YOUR PORTFOLIO CONTROL CENTER</p>
            <h2>Welcome back!</h2>
            <p>
              Manage your portfolio projects and skills from one place.
            </p>
          </div>
          <div className="admin-welcome-icon">✦</div>
        </section>

        <section className="admin-overview-cards">
          <a href="#projects" className="admin-overview-card">
            <span className="admin-card-icon projects-icon">▤</span>
            <span className="admin-card-copy">
              <strong>Projects</strong>
              <small>Add, edit and organize your work.</small>
            </span>
            <span className="admin-card-arrow">↗</span>
          </a>

          <a href="#skills" className="admin-overview-card">
            <span className="admin-card-icon skills-icon">◇</span>
            <span className="admin-card-copy">
              <strong>Skills</strong>
              <small>Update skills and proficiency levels.</small>
            </span>
            <span className="admin-card-arrow">↗</span>
          </a>
        </section>

        <section id="projects" className="admin-content-section">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">PORTFOLIO CONTENT</p>
              <h2>Project Management</h2>
              <p>Manage the projects displayed on your website.</p>
            </div>
            <span className="admin-section-number">01</span>
          </div>

          <div className="admin-manager-panel">
            <ProjectManager />
          </div>
        </section>

        <section id="skills" className="admin-content-section">
          <div className="admin-section-heading">
            <div>
              <p className="admin-eyebrow">YOUR EXPERTISE</p>
              <h2>Skills Management</h2>
              <p>Keep your skills and proficiency levels up to date.</p>
            </div>
            <span className="admin-section-number">02</span>
          </div>

          <div className="admin-manager-panel">
            <SkillsManager />
          </div>
        </section>

        <footer className="admin-footer">
          <span>Sameer Khan · Portfolio Admin</span>
          <span>Manage your work, one step at a time.</span>
        </footer>
      </main>
    </div>
  );
}
