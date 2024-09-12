import { useField } from "formik";
import classes from "./TextField.module.scss";

const TextField = (props) => {
    const [field, meta] = useField(props);
    return (
        <div className={classes.container}>
            {props.type === "textarea" ? (
                <textarea
                    {...field}
                    {...props}
                    style={
                        meta.touched && meta.error
                            ? { borderColor: "red" }
                            : null
                    }
                ></textarea>
            ) : (
                <input
                    {...field}
                    {...props}
                    style={
                        meta.touched && meta.error
                            ? { borderColor: "red" }
                            : null
                    }
                />
            )}

            <p
                className={classes.errorMessage}
                style={
                    meta.touched && meta.error
                        ? { visibility: "visible" }
                        : null
                }
            >
                {meta.error || "preventLayoutShifting"}
            </p>
        </div>
    );
};

export default TextField;
