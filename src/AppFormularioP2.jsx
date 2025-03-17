import { useState } from "react"

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>{text}</button>
    )
}

const App = () => {

    const notes = [
        {
          id: 1,
          content: 'HTML is easy',
          important: true,
        },
        {
          id: 2,
          content: 'Browser can execute only JavaScript',
          important: false,
        },
        {
          id: 3,
          content: 'GET and POST are the most important methods of HTTP protocol',
          important: true,
        },
      ]

    const [notas, setNotas] = useState(notes)
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)


    const notesToShow = showAll ? notas : notas.filter(note => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const nuevaNota = {
            id: notas.length + 1,
            content: newNote,
            important: Math.random() < 0.5,
        }

        setNotas([...notas, nuevaNota])
        setNewNote('')

    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const changeAll = () => setShowAll(current => !current)

    return (
        <div>
        <h1>Notes</h1>
        <div>
            <Button onClick={changeAll} text={showAll ? 'important' : 'all'}/>
        </div>
        <ul>
            {notesToShow.map((note) => <li key={note.id}>{note.content}</li>)}
        </ul>
        <form onSubmit={addNote}>
            <input 
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">add note</button>
        </form>
        </div>
    )
}

export default App