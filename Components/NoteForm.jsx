import { useState } from "react"

const NoteForm = ({createNote}) => {

    const [newNote, setNewNote] = useState('')

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const addNote = async (event) => {
        event.preventDefault()
        if(newNote === '') return alert('No puedes agregar una nota vacia')

        createNote({
            content: newNote,
            important: Math.random() < 0.5,
        })
        setNewNote('')
    }

    return (
        <>
            <h2>Create a new note</h2>
            <form onSubmit={addNote}>
                <input 
                    value={newNote}
                    onChange={handleNoteChange}
                />
                <button type="submit">add note</button>
            </form>    
        </>
    )
}

export default NoteForm