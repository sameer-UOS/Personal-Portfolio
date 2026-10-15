import {Link} from 'react-router-dom'

function ProjectCard(props) {
    const {id,title,description,technologies,category,liveDemo, github} = props

    return(
        <div className='project-card'>
            <h2 className='project-title'>{title}</h2>
            <p className='project-description'>{description}</p>
            <p className='project-technologies'>{technologies}</p>
            <span className='project-category'>{category}</span>
            
            <div className="project-actions">
                <a
                  href={liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-live"
                >
                  Live Demo
                </a>

                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-code"
                >
                  View Code
                </a>

                <Link
                  className="project-details"
                  to={`/projects/${id}`}
                >
                  View Details
                </Link>
            </div>
        </div>
    )
}

export default ProjectCard