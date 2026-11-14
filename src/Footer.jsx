import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-top">
          <div className="footer-brand-section">
            <Link to="/" className="footer-brand">
              Sameer Khan<span>.</span>
            </Link>

            <p className="footer-text">
              Software Engineering Student
              <br />
              Learning by Building.
            </p>
          </div>

          <div className="footer-navigation">
            <h3>Quick Links</h3>

            <nav className="footer-links" aria-label="Footer navigation">
              <Link to="/">Home</Link>
              <Link to="/about">About</Link>
              <Link to="/education">Education</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>

          <div className="footer-social-section">
            <h3>Connect With Me</h3>

            <div className="footer-socials">
              <a
                href="https://github.com/sameer-UOS"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>

              <a
                href="https://www.linkedin.com/in/sameer-khan-2a5788403/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Sameer Khan. All rights reserved.
          </p>

          <Link to="/" className="footer-back-top">
            Back to Home ↑
          </Link>
        </div>

      </div>
    </footer>
  );
}

export default Footer;