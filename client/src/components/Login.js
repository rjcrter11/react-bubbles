import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { withFormik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

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
    handleSubmit(values, { props, setStatus }) {
      axiosWithAuth()
        .post("login", values)
        .then((res) => {
          console.log(res);
          // window.localStorage.setItem('token', res.data.payload);
          // const login = res.data;
          // setStatus(login);
          // props.history.replace('/colors')
        })
        .catch((err) => console.log(err));
    }
  })(Login)
);

export default FormikForm;
