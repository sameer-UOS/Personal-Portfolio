function SkillCard(props) {
    const {name,category,level} = props
    return(
        <div className="skill-card">
            <h2>{name}</h2>
            <p className="skill-category">{category}</p>

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${level}%` }}>
                </div>
            </div>
            
            <span className="skill-level">{level}%</span>
        </div>
    )
}

export default SkillCard