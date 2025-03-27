import { useState } from "react"
import loginService from '../src/services/login'
import { setNotification } from "../src/store/slices/notificationSlice"
import { setAuthUser, setIsLoggedIn } from "../src/store/slices/authSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


const Login = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

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

    const onSubmit = async(event) => {
        try{
            event.preventDefault()
            const request = await loginService.login(({
                username: state.user,
                password: state.password
            }))

            console.log(request)

            dispatch(setNotification({
                title: '¡Exito!',
                text: 'Usuario y contraseña correctos',
                icon: 'success',
                timer: 3000
            }))
            window.localStorage.setItem('user',JSON.stringify(request.user))

            dispatch(setIsLoggedIn(true))
            dispatch(setAuthUser({
                name: request.user.name,
                token: request.user.token
            }))


            navigate('/home')


        }catch(error){
            console.log(error)
            dispatch(setNotification({
                title: '¡Ups!',
                text: error.message,
                icon: 'error',
                timer: 3000
            }))

        }        
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                <div>
                    username <input 
                        type="text"
                        name='user'
                        placeholder="Ingrese su usuario"
                        value={state.user}
                        onChange={handleInput}
                        />
                </div>
                <br />
                <div>
                    password <input 
                        type="password"
                        name= "password"
                        placeholder="Ingresa tu contraseña"
                        value={state.password}
                        onChange={handleInput}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )

}

export default Login