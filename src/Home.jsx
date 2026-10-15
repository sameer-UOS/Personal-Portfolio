import { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home({homeData}) {

    const [showDetail,setShowDetail] = useState(false)
    
    useEffect(() => {
        document.title = "Sameer | Home";
    }, []);

    return(
        <section className="home">

            <div className="home-image">
                <img src="/Profile.jpeg" alt="Sameer Khan" />
            </div>

            <div className="home-content">
                <h2 className="home-title">{homeData.name}</h2>
                <p className="home-role">{homeData.role}</p>
                <p className="home-description">{homeData.description}</p>
                {showDetail && (
                    <p className="home-detail">
                        I am currently learning React and using it to build my portfolio and other practical projects.
                    </p>
                )}
    
                <button className="home-more-button" onClick={()=> setShowDetail(prev => !prev)}>
                    {showDetail ? "Show Less" : "Show More"}
                </button>
                
                <div className="home-actions">
                    {homeData.buttons.map((button)=>(
                        <Link className="home-button" key={button.text} to={button.link}>
                            {button.text}
                        </Link>
                    ))}
                </div>
            </div>
            
        </section>
    )
}

export default Home