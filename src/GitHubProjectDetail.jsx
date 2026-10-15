import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./GitHubProjectDetail.css";

function GitHubProjectDetail() {
    const {id} = useParams();
    const [project,setProject] = useState(null);
    const [error,setError] = useState("")

    useEffect(()=>{

        async function getProject() {
            setError("");
            setProject(null)

            try{
                const response = await fetch(`https://api.github.com/repositories/${id}`);

                if (!response.ok) {
                    throw new Error("Repository not found!");
                }

                const data = await response.json();
                
                setProject(data);

            } catch (err){
                console.log(err);
                
                setError("Failed to load repository!")
                setProject(null)
            }
        }
        getProject();
    },[id]);

    if (error) return <p>{error}</p>
    if (project === null ) return <p>Loading repository...</p>

    return(
        <div className="github-detail">
            <h3 className="github-detail-title">{project.name}</h3>
            <p className="github-detail-description">{project.description || "No description available"}</p>
            
            <p className="github-detail-info">
                <strong>Language:</strong>{" "}
                {project.language || "Not specified"}
            </p>

            <p>
                <strong>⭐ Stars: </strong>
                {project.stargazers_count}
            </p>

            <p>
                <strong>🍴 Forks:</strong> 
                {project.forks_count}
            </p>

            <p>
                <strong>Open Issues:</strong> 
                {project.open_issues_count}
            </p>

            <a
                className="github-detail-link"
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
            >View on GitHub</a>
            
        </div>
    )
}

export default GitHubProjectDetail