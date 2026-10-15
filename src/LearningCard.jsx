function LearningCard(props) {
    const {topic,status,description} = props

    return(
        <div className="learning-card">

            <h2 className="learning-topic">{topic}</h2>
            <p className="learning-status">{status}</p>
            <p className="learning-description">{description}</p>
            
        </div>
    )
}

export default  LearningCard