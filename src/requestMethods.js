import axios from "axios";



const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;
// const BASE_URL = "http://localhost:5001/api/"
const BASE_URL = process.env.REACT_APP_API_BASE;

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`},
});

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})