import classes from "./Home.module.scss";
import PostList from "../../components/specific/PostList/PostList";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Home = ({ isLoggedin, setAddBtn  }) => {
    const navigate = useNavigate();
    return (
        <div className={classes.container}>
            <PostList />
            <button
                className={classes.add}
                onClick={() => {
                    setAddBtn();
                    if (isLoggedin) navigate("/add-or-edit");
                    else navigate("/login");
                }}
            >
                <IoMdAdd />
            </button>
        </div>
    );
};

export default Home;
