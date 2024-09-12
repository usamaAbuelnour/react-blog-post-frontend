import { useEffect, useState } from "react";
import Post from "../Post/Post";
import classes from "./PostList.module.scss";
import { axiosPosts } from "../../../axios/instances/posts.js";
import { cloneDeep } from "lodash";
import { ScaleLoader } from "react-spinners";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(posts.length ? false : true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!posts.length) {
            (async () => {
                try {
                    const { data } = await axiosPosts.get();
                    setPosts(data);
                } catch (error) {
                    setErrorMessage(error.response?.data || error.message);
                }
                setIsLoading(false);
            })();
        }
    }, []);

    const deletePost = async (id) => {
        const postsClone = cloneDeep(posts);
        const postIndex = postsClone.findIndex((post) => post._id === id);
        postsClone.splice(postIndex, 1);
        setPosts(postsClone);

        try {
            await axiosPosts.delete(id);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className={classes.container}>
            {isLoading ? (
                <div className={classes.loaderWrapper}>
                    <ScaleLoader color="#5ba4a4" />
                </div>
            ) : posts.length ? (
                posts.map((post) => (
                    <Post
                        key={post._id}
                        id={post._id}
                        postUserId={post.userId}
                        title={post.title}
                        description={post.description}
                        imgUrl={post.imgUrl}
                        deletePost={() => deletePost(post._id)}
                    />
                ))
            ) : errorMessage ? (
                <div className={classes.error}>{errorMessage}</div>
            ) : (
                <div className={classes.noPosts}>No Posts Found!!</div>
            )}
            
        </div>
    );
};

export default PostList;
