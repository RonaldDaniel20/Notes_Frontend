import { useState, useEffect, useCallback } from "react"
import Button from '../Components/Button'
import Note from "../Components/Notes"
import Notification from "../Components/Notification"

//Services

import notesService from "./services/notes"


//Estilos 

import './index.css'

const App = () => {

    const [notas, setNotas] = useState([])
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const getNotes = useCallback(async () => {
        const notes = await notesService.getAll()
        setNotas(notes.notes)
    },[])

    useEffect(() => {
        getNotes()
    }, [getNotes])

    const notesToShow = showAll ? notas : notas.filter(note => note.important)

    const addNote = async (event) => {
        event.preventDefault()

        try{
            if(newNote === '') return alert('No puedes agregar una nota vacia')

                const nuevaNota = {
                    id: String(notas.length + 1),
                    content: newNote,
                    important: Math.random() < 0.5,
                }
        
                await notesService.create(nuevaNota)
                alert('Nota añadida con exito')
                getNotes()

        }catch(error){
            console.log(error.message)
        }finally{
            setNewNote('')
        }
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const toggleImportance = async (id) => {
        const note = notas.find(note => note.id === id)

        try{
        
            await notesService.update(id)
            alert('Nota actualizada con exito')

        }catch (error){
            console.log(error.message)
            setErrorMessage(
                `Note ${note.content} was already removed from server`
            )

            setTimeout(() => {
                setErrorMessage('')
            },4000)

            setNotas(notas.filter(nota => nota.id !== id))
        }finally{
            getNotes()
        }
    }

    const deleteNote = async (id) => {
        try{

            await notesService.deleteNota(id)
            alert('Nota eliminada con exito')
            
        }catch(error){
            console.log(error.message)
            setErrorMessage(
                `No se pudo eliminar la nota ya que no existe`
            )
        }finally{
            getNotes()
        }
    }

    const changeAll = () => setShowAll(current => !current)

    return (
        <div>
        <h1>Notes</h1>
        { errorMessage !== '' && <Notification message ={errorMessage} /> }
        <div>
            <Button onClick={changeAll} text={showAll ? 'important' : 'all'}/>
        </div>
        <ul>
            {notesToShow.map((note) => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} deleteNote={() => deleteNote(note.id)}/>)}
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