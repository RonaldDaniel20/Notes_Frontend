import { useState, useEffect, useCallback, useRef } from "react"
import Button from '../Components/Button'
import Note from "../Components/Notes"
import Notification from "../Components/Notification"

import Login from "./login"
import NoteForm from "../Components/NoteForm"
import Togglable from "../Components/Togglable"

//Services
import notesService from "../src/services/notes"
import loginService from '../src/services/login'


//Estilos 
import '../src/index.css'

const Landing = () => {
    const [notas, setNotas] = useState([])
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState(null)


    const [state, setState] = useState({
        password: '',
        user: ""
    })
    
    const handleInput = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    const noteFormRef = useRef()
    
    const onSubmit = async(event) => {
        try{
            event.preventDefault()
            const request = await loginService.login(({
                username: state.user,
                password: state.password
            }))
            console.log(request.user)
            setUser(request.user)
            window.localStorage.setItem('user', JSON.stringify(request.user))
        }catch(error){
            console.log(error)
            setErrorMessage('Usuario o contraseña no validos')
            setTimeout(() => {
                setErrorMessage('')
            },4000)
        }        
    }

    const getNotes = useCallback(async () => {
        const notes = await notesService.getAll()
        setNotas(notes.notes)
    },[])

    useEffect(() => {
        getNotes()
    }, [getNotes])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem('user')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            setUser(user)
        }
    },[])

    const notesToShow = showAll ? notas : notas.filter(note => note.important)

    const addNote = async (noteObject) => {

        try{
            console.log(noteObject)
            await notesService.create(noteObject, user.token)
            alert('Nota añadida con exito')
            noteFormRef.current.toggleVisibility()
            getNotes()

        }catch(error){
            console.log(error)
            console.log(error.status)
            if(error.status === 401){
                localStorage.removeItem('user')
            } 
            else{
                setErrorMessage(
                    error.response.data.message
                )
    
                setTimeout(() => {
                    setErrorMessage('')
                },4000)
            }
        }
    }



    const toggleImportance = async (id) => {
        const note = notas.find(note => note.id === id)

        try{
            
            const changeNotes = {...note, important: !note.important}
            await notesService.update(id, changeNotes)
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

    const loginForm = () => {

        return (
            <div>
                <Togglable label = {'login in'}>
                    <Login onSubmit={onSubmit} handleInput={handleInput} state={state} />
                </Togglable>
            </div>

        )    
    }

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
        { errorMessage !== '' && <Notification message ={errorMessage} /> }
        {user === null ? loginForm():
            <div> 
                <p>{user.name} logged</p>
            </div>
        }

        {user !== null && noteForm()}
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