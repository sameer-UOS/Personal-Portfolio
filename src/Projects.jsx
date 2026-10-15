import ProjectCard from './ProjectCard'
import { useState , useEffect} from 'react';
import "./Projects.css";

function Projects({projects}) {
    useEffect(() => {
        document.title = "Sameer | Projects";
    }, []);

    const [selectedCategory, setSelectedCategory] = useState("All");
    
    const filterProjects = selectedCategory === "All" ? projects : projects.filter(project => project.category === selectedCategory)

    const categories = ["All","Frontend","React","JavaScript"]
    
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
                        technologies={project.technologies} 
                        category={project.category} 
                        liveDemo={project.liveDemo}
                        github={project.github}/>
                ))}
            </div>

        </div>
    )
}

export default Projects