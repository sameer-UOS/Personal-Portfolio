import { useState } from "react";
import { Link } from 'react-router-dom'
import "./Navbar.css"
function Navbar() {
    const [menuOpen,setMenuOpen] = useState(false)
    const [activeSection,setActiveSection] = useState("Home")

    const navLinks = [
      { name: "Home", to: "/" },
      { name: "About", to: "/about" },
      { name: "Education", to: "/education" },
      { name: "Skills", to: "/skills" },
      { name: "Projects", to: "/projects" },
      { name: "Github", to: "/github-projects" },
      { name: "Contact", to: "/contact"}
    ];

    return(
        <nav className="navbar">
          <div className="navbar-container">

              <button onClick={()=> setMenuOpen(!menuOpen)}>
                ☰
              </button>

              <ul className={menuOpen ? "active" : ""}>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.to}
                      className={activeSection === link.name ? "active" : ""}
                      onClick={() => {
                        setMenuOpen(false);
                        setActiveSection(link.name);
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
        </nav>
    )
}

export default Navbar