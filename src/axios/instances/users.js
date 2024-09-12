import axios from "axios";

export const axiosRegister = axios.create({
    baseURL: "http://localhost:2000/register",
});
export const axiosLogin = axios.create({
    baseURL: "http://localhost:2000/login",
});
