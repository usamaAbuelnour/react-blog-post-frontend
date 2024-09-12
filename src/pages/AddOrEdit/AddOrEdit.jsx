import { useLocation, useNavigate } from "react-router-dom";
import TextField from "../../components/common/TextField/TextField";
import { postValidationSchema } from "../../utils/validation";
import classes from "./AddOrEdit.module.scss";
import { Formik, Form } from "formik";
import { axiosPosts } from "../../axios/instances/posts";
import ProtectedRoute from "../../HOC/ProtectedRoute/ProtectedRoute";

const AddOrEdit = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    return (
        <ProtectedRoute>
            <div className={classes.container}>
                <Formik
                    initialValues={{
                        title: state ? state.title : "",
                        description: state ? state.description : "",
                        imgUrl: state ? state.imgUrl : "",
                    }}
                    validationSchema={postValidationSchema}
                    onSubmit={async (values) => {
                        try {
                            if (state) {
                                await axiosPosts.patch(state.id, values);
                            } else {
                                await axiosPosts.post("", values);
                            }
                            navigate("/");
                        } catch (error) {
                            console.log(error.response.data);
                        }
                    }}
                >
                    {() => (
                        <Form>
                            <TextField
                                type="text"
                                name="title"
                                placeholder="Title"
                            />
                            <TextField
                                type="textarea"
                                name="description"
                                placeholder="Description"
                            />
                            <TextField
                                type="text"
                                name="imgUrl"
                                placeholder="Image URL"
                            />
                            <div className={classes.footer}>
                                <button type="submit">
                                    {state ? "Save" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate("/")}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </ProtectedRoute>
    );
};

export default AddOrEdit;
