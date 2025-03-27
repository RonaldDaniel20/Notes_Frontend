import { Routes, Route } from 'react-router-dom';
import Landing from "../pages/landing";
import Login from '../pages/login';
import ToastNotification from '../Components/Notification';

const App = () => {
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
