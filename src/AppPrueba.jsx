import axios from 'axios'
import { useState, useEffect } from 'react'

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>{text}</button>
)

const App = () => {

    const [data, setData] = useState([])

    const establecerData = () => {
        axios.get('http://localhost:3001/notes').then(response => {
            setData(response.data)
        })
    }

    useEffect(establecerData, [])


    return (
        <>
            <h1>Hello, world!</h1> 
            <ul>
                {data.map((note, index) => <li key={index}>{note.content}</li>)}
            </ul>       
        </>
    )

}

export default App