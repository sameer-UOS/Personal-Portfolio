import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Education from "./Education";
import Skills from "./Skills";
import Projects from "./Projects";
import ProjectDetails from "./ProjectDetails";

import GitHubProjectDetail from "./GitHubProjectDetail";
import GitHubProjects from "./GitHubProjects";
import Contact from "./Contact";
import Footer from "./Footer";

import { supabase } from "./supabaseClient";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

function App() {
  const homeData = {
    name: "Sameer Khan",
    role: "Software Engineering Student",
    description:"I'm a Software Engineering student learning JavaScript and React. I enjoy building small real-world projects to improve my frontend development skills.",

    buttons:[
      {
        text:"View Projects",
        link: "/projects"
      },
      {
        text:"Contact Me",
        link:"/contact"
      }
    ]
  };

  return (
    <>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home homeData={homeData} />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />}/>
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />}/>
            <Route path="/github-projects" element={<GitHubProjects />}/>
            <Route path="/github-projects/:id" element={<GitHubProjectDetail />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>

          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App