import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action ) => {
            state.status = true;
            state.userData = action.payload.userData
        },
        clearUser: (state) => {
            state.status = false,
            state.userData = null
        }
    }
})



export const { setUser, clearUser } = authSlice.actions

export default authSlice.reducer
