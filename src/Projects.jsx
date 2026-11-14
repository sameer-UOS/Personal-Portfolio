import ProjectCard from './ProjectCard'
import { useState , useEffect} from 'react';
import { supabase } from "./supabaseClient";
import "./Projects.css";

function Projects() {
     const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    
    useEffect(() => {
        document.title = "Sameer | Projects";

        async function loadProjects() {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                setError(error.message);
            } else {
                setProjects(data);
            }

            setLoading(false);
        }

        loadProjects();
    }, []);
    
    const filterProjects = selectedCategory === "All" ? projects : projects.filter(project => project.category === selectedCategory)

    const categories = ["All","Frontend","React","JavaScript"];

    if (loading) {
          return (
            <div className="projects-message">
              Loading projects...
            </div>
          );
        }

    if (error) {
          return (
            <div className="projects-message">
              Could not load projects: {error}
            </div>
          );
    }
    
    return(
        <div className='projects'>
            <h2 className='projects-title'>My Projects</h2>

            <div className="project-filters">
                {categories.map((category)=>(
                    <button 
                    className={`project-filter 
                    ${selectedCategory === category ? "active" : ""}`} 
                    key={category} 
                    onClick={()=> setSelectedCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="projects-grid">
                {filterProjects.map((project)=>(
                    <ProjectCard
                        key={project.id}
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        technologies={Array.isArray(project.technologies) ? project.technologies.join(", ") : (project.technologies || "")}
                        category={project.category || "Frontend"}
                        liveDemo={project.project_url}
                        github={project.github_url}
                    />
                ))}
            </div>

        </div>
    )
}

export default Projects