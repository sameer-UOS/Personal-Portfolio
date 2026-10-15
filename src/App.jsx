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

  const projects = [
      {
        id:1,
        title:"Medical Store Inventory",
        description:"A medical store inventory system made with HTML, CSS, and JavaScript. It lets users add, edit, delete, and manage medicine records and keep track of available stock. I used Local Storage to save the data, so the medicine records stay saved even after refreshing the page.",
        technologies:"HTML, CSS, JavaScript",
        category:"Frontend",
        liveDemo: "https://sameer-uos.github.io/medical-store-inventory/",
        github: "https://github.com/sameer-UOS/medical-store-inventory.git"
      },
      
      {
        id:2,
        title:"Student Management System",
        description:"A student management system made with HTML, CSS, and JavaScript. It lets users add, edit, delete, and manage student records in one place. I used Local Storage to save the student data, so the records stay saved even after refreshing the page.",
        technologies:"HTML, CSS, JavaScript",
        category:"Frontend",
        liveDemo: "https://sameer-uos.github.io/student-management-system/",
        github: "https://github.com/sameer-UOS/student-management-system.git"
      },
      
      {   
        id:3,
        title:"Notes App",
        description:"A notes app made with HTML, CSS, and JavaScript. It lets users add, edit, delete, search, and filter their notes. I used Local Storage to save the notes, so they are still there even after refreshing the page.",
        technologies:"HTML, CSS, JavaScript",
        category:"Frontend",
        liveDemo: "https://sameer-uos.github.io/Notes-App/",
        github: "https://github.com/sameer-UOS/Notes-App.git"
      },
      
      {
        id:4,
        title:"Quiz App",
        description:"A simple and interactive quiz app built with HTML, CSS, and JavaScript. Users can answer multiple-choice questions, move through the quiz, and see their score at the end. The app has a clean and responsive design that makes taking quizzes easy and enjoyable.",technologies:"HTML CSS JavaScript",
        category:"Frontend",
        liveDemo: "sameer-uos.github.io/Quizz-App/",
        github: "https://github.com/sameer-UOS/Quizz-App.git"
      },

      {
        id: 5,
        title: "Modern Dashboard",
        description:
          "A modern dashboard built with React that displays useful information in a clean and responsive layout. It features a simple interface designed to make data easy to view and manage.",
        technologies: "React, CSS, JavaScript",
        category: "React",
        liveDemo: "https://dashboard-app-two-beta.vercel.app",
        github: "https://github.com/sameer-UOS/Dashboard-App.git"
      },
      {
        id: 6,
        title: "E-commerce Interface",
        description:"A simple e-commerce interface built with HTML, CSS, and JavaScript, featuring product search, filters, and a shopping cart.",
        technologies: "HTML, CSS, JavaScript",
        category: "Frontend",
        liveDemo: "https://sameer-uos.github.io/E-Commerce-Interface/",
        github: "https://github.com/sameer-UOS/E-Commerce-Interface.git"
      }
    ]


  return (
    <>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home homeData={homeData} />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />}/>
            <Route path="/projects" element={<Projects projects={projects} />}/>
            <Route path="/projects/:id" element={<ProjectDetails projects={projects} />}/>
            <Route path="/github-projects" element={<GitHubProjects />}/>
            <Route path="/github-projects/:id" element={<GitHubProjectDetail />}/>
            <Route path="/contact" element={<Contact />}/>
          </Routes>

          <Footer />
        </BrowserRouter>
    </>
  )
}

export default App