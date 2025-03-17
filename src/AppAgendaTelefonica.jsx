import { useState, useEffect } from 'react'
import Button from '../Components/Button'
import phonesServices from './services/phones'
import Notification from '../Components/Notification'

//Estilos 

import './index.css'

const PersonForm = ({addPerson, handleInput, state}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <div>
                    name: <input 
                        type='text'
                        name='name'
                        placeholder='Ingrese un nombre'
                        value={state.name}
                        onChange={handleInput}
                    />
                </div>
                <br/>
                <div>
                    number: <input 
                        type='text'
                        name='number'
                        placeholder='Ingresa un numero'
                        value={state.number}
                        onChange={handleInput}
                    />
                </div>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

const Persons = ({name, number, deletePerson}) => {
    return (
        <p>{name} {number} <Button onClick={deletePerson} text={'delete'} /></p>
    )
}

const Filter = ({handleFilter, filter}) => {
    return (
        <div>
            filter shown with <input 
                type='text'
                name='filter'
                value={filter}
                placeholder='Search'
                onChange={handleFilter}
            />
        </div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [notificationType, setNotificationType] = useState('')
  const [notification, setNotification] = useState('')
  const [state, setState] = useState({
    name: '',
    number:'',
  })
  const [filter, setFilter] = useState('')

  const handleInput = (event) => {
    setState({
        ...state,
        [event.target.name]: event.target.value 
    })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const validatePerson = (name, number) => {

    if(name === '' || number === ''){
        alert('Please fill all the fields')
        setState({
            name: '',
            number: ''
        })
        return false
    }
    
    return true
  }



  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    const fetchData = async () => {
        const request = await phonesServices.getAll()
        setPersons(request)
    }

    fetchData()
  },[])
  

  const addPerson = async (event) => {
    event.preventDefault()

    if(!validatePerson(state.name, state.number)) return

    const person = persons.find(person => person.name === state.name)
    if(person){

        const updateConfirm = window.confirm(`${person.name} ya existe en la libreria quieres actualizar el número de telefono`)
        if(!updateConfirm) return

        const changePerson = {...person, number: state.number}

        updatePerson(person.id, changePerson)
        setState({
            name: '',
            number: ''
        })
        return
    }

    const newPerson = {
        name: state.name,
        number: state.number,
        id: String(persons.length + 1)
    }
    
    const request = await phonesServices.addPerson(newPerson)

    setPersons(persons.concat(request))
    setNotification(`${newPerson.name} se ha añadido exitosamente`)
    setNotificationType('success')
    rest()
    setState({
        name: '',
        number: ''
    })
  }

  const deletePersons =  async (id) => {

    const person = persons.find(person => person.id === id)


    const confirmDelete = window.confirm(`Do you really want to delete ${person.name}?`)

    if(!confirmDelete) return 

    try{
        await phonesServices.deletePerson(id)
        setPersons(persons.filter(person => person.id !== id))
        setNotification(`${person.name} se ha eliminado correctamente`)
        setNotificationType('success')
        rest()

    }catch(error){
        console.log(error.message)
        setNotification(`${person.name} no está registrado en el sistema`)
        setNotificationType('error')
        rest()
        setPersons(persons.filter(person => person.id !== id))
    }
  }

  const rest = () => {
    setTimeout(() => {
        setNotification('')
        setNotificationType('')
    }, 4000)
  }

  const updatePerson = async (id, newPerson) => {

    try{
        const request = await phonesServices.updatePerson(id, newPerson)
        setPersons(persons.map(person => person.id !== id ? person: request))
        setNotification(`${newPerson.name} se ha actualizado correctamente`)
        setNotificationType('success')
        rest()
        return true

    }catch(error){
        console.log(error.message)
        setNotification(`${newPerson.name} no está registrado en el sistema`)
        setNotificationType('error')
        rest()
        setPersons(persons.filter(person => person.id !== id))
        return false
    }
  }

  return (
    <div>
        <h2>Phonebook</h2>
        {notification !== '' && <Notification message={notification} type={notificationType}/>}
        <Filter handleFilter={handleFilter} filter={filter} />
        <h3>add a New</h3>
        <PersonForm addPerson={addPerson} handleInput={handleInput} state={state} />
        <h3>Numbers</h3>
        {filteredPersons.map((person) => <Persons key={person.id} name={person.name} number={person.number} deletePerson={() => deletePersons(person.id)} />)}
    </div>
  )
}

export default App