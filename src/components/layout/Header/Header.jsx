import { useLocation, useNavigate } from "react-router-dom";
import classes from "./Header.module.scss";

export const Header = ({ isLoggedin, logout, setUserId }) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className={classes.container}>
            {pathname === "/login" || pathname === "/register" ? null : (
                <button
                    className={classes.login}
                    onClick={() => {
                        if (isLoggedin) {
                            sessionStorage.clear();
                            logout();
                            setUserId();
                            navigate("/", { replace: true });
                        } else {
                            navigate("/login");
                        }
                    }}
                >
                    {isLoggedin ? "log out" : "log in"}
                </button>
            )}

            <img
                className={classes.mobileHide}
                src="images/bg-header-mobile.svg"
                alt=""
            />
            <img
                className={classes.desktopHide}
                src="images/bg-header-desktop.svg"
                alt=""
            />
        </div>
    );
};
