import classes from "./Layout.module.scss";
import { Header } from "../../components/layout/Header/Header";

const Layout = ({ children, isLoggedin, logout, setUserId }) => {
    return (
        <div className={classes.container}>
            <Header isLoggedin={isLoggedin} logout={logout} setUserId={setUserId} />
            <div className={classes.body}>{children}</div>
        </div>
    );
};

export default Layout;
