
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { clearNotification } from '../src/store/slices/notificationSlice'

const ToastNotification = () => {


    const notification = useSelector((state) => state.notification)
    const dispatch = useDispatch()

    useEffect(() => {
    if (notification.title && !notification.isConfirmation) {
        Swal.fire({
        icon: 'success',
        timer: 5000,
        toast: true,
        timerProgressBar: true,
        position: 'top-right',
        showConfirmButton: false,
        showCloseButton: true,
        ...notification,
        }).then(() => {
        dispatch(clearNotification())
        })
    }
    }, [notification, dispatch])

    return null
}

export default ToastNotification
