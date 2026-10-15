import { useState ,useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import GitHubProjectCard from "./GitHubProjectCard";
import useFetch from "./hooks/useFetch";
import "./GitHubProjects.css";

function GitHubProjects() {
    const [searchTerm,setSearchTerm] = useState("");
    const navigate = useNavigate();

    const {data:projects = [], loading, error} = useFetch("https://api.github.com/users/sameer-UOS/repos");

    const filteredProjects = useMemo(() =>{
        return projects.filter(project => project.name.toLowerCase().includes(searchTerm.trim().toLowerCase()));
    },[projects,searchTerm]);

    const handleViewDetails = useCallback((repo) => {
        navigate(`/github-projects/${repo.id}`)
    }, [navigate]);

    return(
        <div className="github-projects">
            <h1 className="github-title">GitHub Projects</h1>

            <input 
            className="github-search"
            type="search"
            aria-label="Search GitHub repositories"
            value={searchTerm} 
            onChange={(e)=> setSearchTerm(e.target.value)} 
            placeholder="Search repositories..."/>

            <div className="github-grid">
                {loading ? <p>Loading...</p> : filteredProjects.map((repo) => (
                    <GitHubProjectCard key={repo.id} repo={repo} onViewDetails={handleViewDetails} />
                ))}
            </div>


            {!loading && !error && filteredProjects.length === 0 && <p>No repositories found.</p>}
            {error && <p>Failed to load repositories.</p>}
        </div>
    )

}

export default GitHubProjects