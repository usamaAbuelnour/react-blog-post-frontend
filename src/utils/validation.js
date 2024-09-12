import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required Field!!"),
    email: Yup.string()
        .email("Enter a Valid Email")
        .required("Required Field!!"),
    password: Yup.string()
        .min(3)
        .max(20)
        .required("Required Field")
        .matches(/o+/, "should include o"),
    confirmPassword: Yup.string()
        .required("Required Field")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Enter a Valid Email")
        .required("Required Field!!"),
    password: Yup.string()
        .min(3)
        .max(20)
        .required("Required Field")
        .matches(/o+/, "should include o"),
});

export const postValidationSchema = Yup.object().shape({
    title: Yup.string().required("Required Field!!"),
    description: Yup.string().required("Required Field"),
    imgUrl: Yup.string().url(),
});
