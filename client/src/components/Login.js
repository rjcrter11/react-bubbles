import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { withFormik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <h1>Welcome to the Bubble App </h1>
      <Form>
        <Field type="text" name="username" />
        <Field type="password" name="password" />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
};

const FormikForm = withRouter(
  withFormik({
    mapPropsToValues({ username, password }) {
      return {
        username: username || "",
        password: password || ""
      };
    },
    handleSubmit(values, { props }) {
      axiosWithAuth()
        .post("login", values)
        .then((res) => {
          console.log(res);
          window.localStorage.setItem("token", res.data.payload);
          props.history.replace("/colors");
        })
        .catch((err) => console.log(err));
    }
  })(Login)
);

export default FormikForm;
