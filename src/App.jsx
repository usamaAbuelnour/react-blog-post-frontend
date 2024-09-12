import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./HOC/Layout/Layout";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import AddOrEdit from "./pages/AddOrEdit/AddOrEdit";
import { createContext, useEffect, useState } from "react";

export const LoggedInUserContext = createContext();

function App() {
    const [isLoggedin, setIsLoggedin] = useState();
    const login = () => setIsLoggedin(true);
    const logout = () => setIsLoggedin(false);
    const [loggedinUserId, setLoggedinUserId] = useState("");
    const [isAddBtnClicked, setIsAddBtnClicked] = useState(false);

    const setUserId = () => setLoggedinUserId(sessionStorage.getItem("id"));

    const setAddBtn = () => setIsAddBtnClicked(true);
    const clearAddBtn = () => setIsAddBtnClicked(false);

    useEffect(() => {
        setIsLoggedin(sessionStorage.getItem("token") ? true : false);
        setUserId();
    }, []);

    return (
        <Layout isLoggedin={isLoggedin} logout={logout} setUserId={setUserId}>
            <Routes>
                <Route
                    path=""
                    element={
                        <LoggedInUserContext.Provider value={loggedinUserId}>
                            <Home
                                isLoggedin={isLoggedin}
                                setAddBtn={setAddBtn}
                            />
                        </LoggedInUserContext.Provider>
                    }
                />
                <Route
                    path="register"
                    element={
                        <Register
                            login={login}
                            setUserId={setUserId}
                            isAddBtnClicked={isAddBtnClicked}
                            clearAddBtn={clearAddBtn}
                        />
                    }
                />
                <Route
                    path="login"
                    element={
                        <Login
                            login={login}
                            setUserId={setUserId}
                            isAddBtnClicked={isAddBtnClicked}
                            clearAddBtn={clearAddBtn}
                        />
                    }
                />
                <Route path="add-or-edit" element={<AddOrEdit />} />
            </Routes>
        </Layout>
    );
}

export default App;
