import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="footer-brand">
          Sameer Khan
        </Link>

        <p className="footer-text">
          Software Engineering Student | Learning by Building
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/education">Education</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <div className="footer-socials">
          <a
            href="https://github.com/sameer-UOS"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href="https://www.linkedin.com/in/sameer-khan-2a5788403/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <p className="footer-copyright">
          © {currentYear} Sameer Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;