import axios from "axios";
import { postsRequestInterceptor } from "../interceptors/postRequest";

export const axiosPosts = axios.create({
    baseURL: "http://localhost:2000/posts/",
});

postsRequestInterceptor(axiosPosts);
