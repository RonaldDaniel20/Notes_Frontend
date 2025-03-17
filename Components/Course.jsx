const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Content = ({parts}) => {
    return parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)
}

const Part = ({name, exercises}) => {
    return <p>{name} {exercises}</p>
}

const Course = ({course}) => {

    const {name, parts} = course

    const totalExercises = parts.reduce((acc, part) => acc + part.exercises,0)


    return(
        <div>
            <Header name = {name} />
            <Content parts = {parts} />
            <p><strong>total of {totalExercises} exercises</strong></p>
        </div>
    )

}

export default Course