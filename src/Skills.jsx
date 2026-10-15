import { useState,useEffect } from 'react'
import SkillCard from './SkillCard'
import "./Skills.css";

function Skills() {

    useEffect(() => {
        document.title = "Sameer | Skills";
    }, []);

    const skills = [
        {
            id:1,
            name:"HTML",
            level:80,
            category:"FrontEnd"
            
        },
        {
            id:2,
            name:"CSS",
            level:75,
            category:"FrontEnd"
            
        },
        {
            id:3,
            name:"JavaScript",
            level:75,
            category:"Language"
            
        },
        {
            id:4,
            name:"React",
            level:70,
            category:"FrontEnd"
            
        },
        {
            id:5,
            name:"Git & GitHub",
            level:60,
            category:"Tool"
        }
    ]

    const [selectSkill,setSelectSkill] = useState("All")

    const filterSkills = selectSkill === "All" ? skills : skills.filter(skill => skill.category === selectSkill) 

    const skillCategories = ["All","FrontEnd","Tool","Language"];

    return(
        <div className='skills'>

            <div className="skill-filters">
                {skillCategories.map((category)=>(
                    <button key={category} onClick={()=> setSelectSkill(category)}
                    className={`skill-filter ${selectSkill === category ? "active" : ""}`}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="skill-grid">
                {filterSkills.map((skill)=>(
                    <SkillCard 
                        key={skill.id}
                        name={skill.name}
                        category={skill.category}
                        level={skill.level}/>
                ))}
            </div>

        </div>
    )
}
export default Skills