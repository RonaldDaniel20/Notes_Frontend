    import { Routes, Route } from 'react-router-dom';
    import Landing from "../pages/landing";
    import Login from '../pages/login';
    import ToastNotification from '../Components/Notification';
    import { setAuthUser, setIsLoggedIn, clearAuth } from './store/slices/authSlice';
    import { useDispatch } from 'react-redux';


    const App = () => {
        const dispatch = useDispatch()
        const loggedUser = window.localStorage.getItem('user')
        if(loggedUser){
            const user = JSON.parse(loggedUser)
            dispatch(setAuthUser({
                name: user.name,
                token: user.token
            }))
            dispatch(setIsLoggedIn(true))
        } else {
            dispatch(clearAuth())
        }

        return (
            <>
                <ToastNotification/>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path="home" element={<Landing />} />
                    <Route path="login" element={<Login />} />
                </Routes>
            </>
        );
    };

    export default App;
