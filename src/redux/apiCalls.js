import {loginFail, loginStart, loginSuccess, userLogout, update_success} from "./userRedux";
import axios from "axios";
import {publicRequest} from "../requestMethods";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch (err){
        dispatch(loginFail());
    }
}

export const logout = () => (dispatch) => {
    dispatch(userLogout());
}

export const updateUser = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        console.log(user);
        const res = await publicRequest.get("/users/find/" + user._id);
        dispatch(loginSuccess(res.data));
    }catch (err){
        dispatch(loginFail());
    }

}



