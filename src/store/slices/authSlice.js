import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: null,
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        clearAuth: () => {
            return initialState
        }
    }
})

export const {setAuthUser, setIsLoggedIn, clearAuth} = authSlice.actions
export default authSlice.reducer
