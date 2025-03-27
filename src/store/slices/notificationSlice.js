import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: '',
}

export const notificationSlice = createSlice({
    name: 'notificacion',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload
        },

        clearNotification: () => {
            return initialState
        }
    }
})

export const {setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer