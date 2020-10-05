import React, { Component } from "react";
import "./login.css";
import logo from "../../assets/images/logo.png";
import { Redirect } from "react-router-dom";
import CustomForm from "./customForm";
import memoryUtils from "../../utils/memoryUtils";

/*
Login Router component
*/
export default class Login extends Component {
  render() {
    //if user already login, to the admin page
    const user = memoryUtils.user;
    if (user && user._id) {
      return <Redirect to="/" />;
    }
    return (
      <div className="Login">
        <header className="Login_header">
          <img className="Logo_img" src={logo} alt="logo"></img>
          <h1 className="logo-title">Management System</h1>
        </header>
        <section className="Login_content">
          <h2>Login</h2>
          <CustomForm {...this.props} />
        </section>
      </div>
    );
  }
}
