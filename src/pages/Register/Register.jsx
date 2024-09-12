import classes from "./Register.module.scss";
import { Formik, Form } from "formik";
import { registerValidationSchema } from "../../utils/validation";
import TextField from "../../components/common/TextField/TextField";
import { NavLink, useNavigate } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { axiosRegister } from "../../axios/instances/users";
import { useState } from "react";

const Register = ({ login, setUserId, isAddBtnClicked, clearAddBtn }) => {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState("");

    return (
        <div
            className={[
                classes.container,
                registerError ? classes.onError : null,
            ].join(" ")}
        >
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={registerValidationSchema}
                onSubmit={async ({ name, email, password }) => {
                    try {
                        const { data } = await axiosRegister.post("", {
                            name,
                            email,
                            password,
                        });
                        console.log(data);
                        sessionStorage.setItem("id", data.id);
                        sessionStorage.setItem("token", data.token);
                        login();
                        setUserId();
                        setRegisterError("");
                        if (isAddBtnClicked) {
                            clearAddBtn();
                            navigate("/add-or-edit", { replace: true });
                        } else navigate("/", { replace: true });
                    } catch (error) {
                        setRegisterError(error.response.data);
                        console.log(error.message);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <TextField type="text" name="name" placeholder="Name" />
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
                        <TextField
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                        />
                        <div className={classes.footer}>
                            <button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <ScaleLoader color="#5ba4a4" height={20} />
                                ) : (
                                    "Register"
                                )}
                            </button>
                            <NavLink
                                className={classes.loginLink}
                                to={{ pathname: "/login" }}
                            >
                                Already have an account?
                            </NavLink>
                        </div>
                    </Form>
                )}
            </Formik>
            <p className={classes.errorMessage}>{registerError}</p>
        </div>
    );
};

export default Register;
