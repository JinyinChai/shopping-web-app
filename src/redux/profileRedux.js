
import {createAsyncThunk} from "@reduxjs/toolkit";
import {publicRequest} from "../requestMethods";
import {loginFail, loginStart, loginSuccess, update_success} from "./userRedux";


export const updateProfileThunk = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.put("/users/" + user._id, user);
        dispatch(loginSuccess(res.data));
    }catch (err){
        dispatch(loginFail());
    }
}

// export const updatePasswordThunk = createAsyncThunk(
//     'users/updatePassword',
//     async (product) => {
//         const response = await publicRequest.put("/users/update/" + user._id, product);
//         return response.data;
//     })