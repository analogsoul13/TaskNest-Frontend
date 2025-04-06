import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        userRole: null,
        userInfo: null,
        token: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true
            state.userRole = action.payload?.user?.role || null

            const user = action.payload?.user
            if (user) {
                state.userInfo = {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    profilePic: user.profilePic || "",
                }
                state.token = action.payload?.token || null
                localStorage.setItem("token", action.payload?.token)
            } else {
                console.error("Login payload missing user data:", action.payload)
            }
        },

        logout: (state) => {
            state.isLoggedIn = false,
            state.userRole = null,
            state.userInfo = null,
            state.token = null,
            localStorage.removeItem("token")

        },

        updateProfile: (state, action) => {
            if (action.payload) {
                state.userInfo = {
                    ...state.userInfo,
                    ...action.payload
                }
            }
        }
    }
})

export const { login, logout, updateProfile } = authSlice.actions
export default authSlice.reducer