import { useContext } from "react";
import classes from "./Post.module.scss";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoggedInUserContext } from "../../../App";

const Post = ({ id, postUserId, title, description, imgUrl, deletePost }) => {
    const navigate = useNavigate();
    const loggedinUserId = useContext(LoggedInUserContext);
    console.log({postUserId, loggedinUserId});
    return (
        
        <div className={classes.container}>
            <div className={classes.image}>
                <img src={imgUrl || "/images/placeholder-image.webp"} alt="" />
            </div>
            <div className={classes.titleWrapper}>
                <div className={classes.title}>{title}</div>
                <div className={classes.description}>{description}</div>
            </div>
            {postUserId === loggedinUserId && (
                <div className={classes.buttonWrapper}>
                    <button
                        className={classes.edit}
                        onClick={() =>
                            navigate("/add-or-edit", {
                                state: { id, title, description, imgUrl },
                            })
                        }
                    >
                        <BiSolidEditAlt />
                    </button>
                    <button className={classes.delete} onClick={deletePost}>
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Post;
