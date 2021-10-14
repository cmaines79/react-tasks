const Overview = ({ tasks }) => {
    return (
        <div className='results'>
            {tasks.map((tasks) => (
                <h3 key={tasks.id}>
                    {tasks.text}
                </h3>
            ))}
        </div>
    )
}

export default Overview
