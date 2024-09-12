import axios from "axios";
import { postsRequestInterceptor } from "../interceptors/postRequest";

export const axiosPosts = axios.create({
    baseURL: "https://react-blog-post.vercel.app/posts/",
});

postsRequestInterceptor(axiosPosts);
