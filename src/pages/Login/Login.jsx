import classes from "./Login.module.scss";
import { Formik, Form } from "formik";
import { loginValidationSchema } from "../../utils/validation";
import TextField from "../../components/common/TextField/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { axiosLogin } from "../../axios/instances/users";
import { useState } from "react";

const Login = ({ login, setUserId, isAddBtnClicked, clearAddBtn }) => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState("");
    return (
        <div
            className={[
                classes.container,
                loginError ? classes.onError : null,
            ].join(" ")}
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={loginValidationSchema}
                onSubmit={async ({ email, password }) => {
                    try {
                        const { data } = await axiosLogin.post("", {
                            email,
                            password,
                        });
                        console.log(data);
                        sessionStorage.setItem("id", data.id);
                        sessionStorage.setItem("token", data.token);
                        login();
                        setUserId();
                        setLoginError("");
                        if (isAddBtnClicked) {
                            clearAddBtn();
                            navigate("/add-or-edit", { replace: true });
                        } else navigate("/", { replace: true });
                    } catch (error) {
                        setLoginError(error.response.data);
                        console.log(error.response.data);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <TextField
                            type="email"
                            name="email"
                            placeholder="Email"
                        />
                        <TextField
                            type="password"
                            name="password"
                            placeholder="Password"
                        />
                        <div className={classes.footer}>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <ScaleLoader color="#5ba4a4" height={20} />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                            <NavLink
                                className={classes.loginLink}
                                to={{ pathname: "/register" }}
                            >
                                Register instead !!
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
            <p className={classes.errorMessage}>{loginError}</p>
        </div>
    );
};

export default Login;
