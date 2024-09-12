export const postsRequestInterceptor = (axiosPosts) => {
    axiosPosts.interceptors.request.use(
        (req) => {
            if (req.method === "GET") return req;
            const token = sessionStorage.getItem("token");
            if (token) req.headers.Authorization = `Bearer ${token}`;
            return req;
        },
        (error) => Promise.reject(error)
    );
};
