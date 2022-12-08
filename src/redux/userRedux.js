import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {publicRequest} from "../requestMethods";

const userRedux = createSlice({
    name: "cart",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
        isLoggedIn: false,
    },
    reducers:{
        loginStart:(state) => {
            state.isFetching = true;
            state.isLoggedIn = false;
        },
        loginSuccess:(state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
        loginFail:(state) => {
            state.isFetching = false;
            state.error = true;
            state.isLoggedIn = false;
        },
        userLogout:(state) => {
            state.isFetching = false;
            state.currentUser = null;
            state.isLoggedIn = false;
        },
        register_start:(state) => {
            state.isFetching = true;
            state.isLoggedIn = false;
        },
        register_success:(state) => {
            state.isFetching = false;
            state.isLoggedIn = false;
        },
        register_fail:(state) => {
            state.isFetching = false;
            state.isLoggedIn = false;
        },
        update_success:(state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true;
        },
    },
});

export const deleteUserThunk = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        const response = await publicRequest.delete("/users/delete/" + userId);
        return response.data;
    })

export const {loginStart, loginSuccess, loginFail, userLogout, update_success} = userRedux.actions;
export default userRedux.reducer;