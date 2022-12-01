import {loginFail, loginStart, loginSuccess, userLogout} from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:5001/api/auth/login", user);
        dispatch(loginSuccess(res.data));
    }catch (err){
        dispatch(loginFail());
    }
}

export const logout = () => (dispatch) => {
    dispatch(userLogout());
}
