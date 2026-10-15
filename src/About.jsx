import { useState,useEffect } from 'react'
import LearningCard from './LearningCard'
import "./About.css";

function About() {
    useEffect(() => {
      document.title = "Sameer | About";
    }, []);

    const learningJourney = [
      {
        id: 1,
        topic: "HTML",
        status: "Completed",
        description: "Learned how to structure webpages using semantic HTML, forms, links, lists and other basic elements."
      },
      {
        id: 2,
        topic: "CSS",
        status: "Completed",
        description: "Currently practicing layouts, the box model, responsive design, selectors and basic styling."
      },
      {
        id: 3,
        topic: "JavaScript",
        status: "Learning",
        description: "Practicing JavaScript fundamentals, DOM concepts, events, arrays, objects and problem solving."
      },
      {
        id: 4,
        topic: "React",
        status: "Currently Learning",
        description: "Learning components, JSX, props, state, forms, React Router, APIs and React hooks through projects."
      }
    ]

    const [showJourney,setShowJourney] = useState(false);
    const visibleJourney = showJourney ? learningJourney : learningJourney.slice(0, 2);

    return(
        <div className='about'>

            <h2 className='about-title'>About Me</h2>

            <p className='about-intro'>
              I'm a Software Engineering student currently learning frontend development.
              I started with HTML and CSS, and I'm now focusing on JavaScript and React
              by building practical projects.
            </p>

            <div className="learning-grid">
              {visibleJourney.map((journey)=>(
                  <LearningCard 
                      key={journey.id}
                      topic={journey.topic}
                      status={journey.status}
                      description={journey.description} />
              ))}
            </div>

            <button className='about-more-button' onClick={() => setShowJourney(prev => !prev)}>
              {showJourney ? "Show Less" : "Show More"}
            </button>

            <div className="currently-learning">
              <h3>Currently Learning</h3>

              <p>
                  I'm currently focusing on JavaScript and React while building
                  practical projects to strengthen my frontend development skills.
              </p>

              <ul>
                  <li>JavaScript fundamentals</li>
                  <li>React components and hooks</li>
                  <li>Working with APIs</li>
                  <li>Building responsive interfaces</li>
              </ul>
          </div>
        </div>
    )
}
export default About