import { useState, useEffect, useCallback, useRef } from "react"
import { setNotification } from "../src/store/slices/notificationSlice"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearAuth } from "../src/store/slices/authSlice"
import Button from '../Components/Button'
import Note from "../Components/Notes"

import NoteForm from "../Components/NoteForm"
import Togglable from "../Components/Togglable"

//Services
import notesService from "../src/services/notes"



//Estilos 
import '../src/index.css'

const Landing = () => {
    const [notas, setNotas] = useState([])
    const [showAll, setShowAll] = useState(true)
    const noteFormRef = useRef()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const usuario = useSelector((state) => state.auth.authUser)

    const redireccion = () => {
        if(!usuario){
            navigate('/login')
            return true
        }

        return false
    }
    
    const getNotes = useCallback(async () => {
        const notes = await notesService.getAll()
        setNotas(notes.notes)
    },[])

    useEffect(() => {
        getNotes()
    }, [getNotes])


    const notesToShow = showAll ? notas : notas.filter(note => note.important)

    const addNote = async (noteObject) => {

        if(redireccion()) return
    
        try{
            await notesService.create(noteObject, usuario.token)
            noteFormRef.current.toggleVisibility()
            dispatch(setNotification({
                title: '¡Exito!',
                text: 'Nota añadida con exito',
                icon: 'success',
                timer: 3000
            }))
            getNotes()

        }catch(error){
            console.log(error)
            console.log(error.status)
            if(error.status === 401){
                dispatch(setNotification({
                    title: '¡Ups!',
                    text: 'Tu sesión ha expirado. Por favor, vuelve a ingresar',
                    icon: 'error',
                    timer: 3000
                }))
                navigate('/login')
                dispatch(clearAuth())
            } 
            else{
                dispatch(setNotification({
                    title: 'Ocurrio un error',
                    text: error.response.data.message,
                    icon: 'error',
                    timer: 3000
                }))
            }
        }
    }


    const toggleImportance = async (id) => {
        const note = notas.find(note => note.id === id)

        try{
            
            const changeNotes = {...note, important: !note.important}
            await notesService.update(id, changeNotes)
            dispatch(setNotification({
                title: '¡Exito!',
                text: 'Nota actualizada con exito',
                icon: 'success',
                timer: 3000
            }))

        }catch (error){
            console.log(error.message)
            dispatch(setNotification({
                title: 'Ocurrio un error',
                text: 'Vuelve a intentarlo más tarde',
                icon: 'error',
                timer: 3000
            }))
        }finally{
            getNotes()
        }
    }

    const deleteNote = async (id) => {
        try{

            await notesService.deleteNota(id)
            dispatch(setNotification({
                title: '¡Exito!',
                text: 'Nota eliminada con exito',
                icon: 'success',
                timer: 3000
            }))
            
        }catch(error){
            console.log(error.message)
            dispatch(setNotification({
                title: 'Ocurrio un error',
                text: 'Vuelve a intentarlo más tarde',
                icon: 'error',
                timer: 3000
            }))
        }finally{
            getNotes()
        }
    }

    const changeAll = () => setShowAll(current => !current)

    const noteForm = () => {
        return (
            <Togglable label={'new nota'} ref={noteFormRef}>
                <NoteForm createNote={addNote}/>
            </Togglable>
        )
    }

    return (
        <div>
        <h1>Notes App</h1>

        {usuario !== null && <p>{usuario.name}</p>}


        {noteForm()}
        <br/>
        <div>
            <Button onClick={changeAll} text={showAll ? 'important' : 'all'}/>
        </div>
        <ul>
            {notesToShow.map((note) => <Note key={note.id} note={note} toggleImportance={() => toggleImportance(note.id)} deleteNote={() => deleteNote(note.id)}/>)}
        </ul>
        </div>
    )
}

export default Landing