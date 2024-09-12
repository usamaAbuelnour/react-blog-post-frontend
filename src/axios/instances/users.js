import axios from "axios";

export const axiosRegister = axios.create({
    baseURL: "https://react-blog-post.vercel.app/register",
});
export const axiosLogin = axios.create({
    baseURL: "https://react-blog-post.vercel.app/login",
});
