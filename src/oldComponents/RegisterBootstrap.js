import React, { Component } from "react";
import fire from "../config/Fire";
import { NavLink } from "react-router-dom";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      secondName: "",
      mobilePhon: "",
      address: "",
      company: "",
      fireErrors: "",
      formTitle: "",
      loginBtn: true,
    };
  }
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  register = (event) => {
    event.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });
  };
  render() {
    let errorNotification = this.state.fireErrors ? (
      <div className="Error">{this.state.formTitle}</div>
    ) : null;
    return (
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <h1 className="card-title text-center">TEHSUPPORT</h1>
          <div className="card bg-secondary border-dark">
            <div className="card-body">
              <h5 className="card-title text-center">Регістрація</h5>
              {errorNotification}
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter password"
                    value={this.state.password}
                    name="password"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputFirstName">Ім'я</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputFirstName"
                    placeholder="Enter first name"
                    value={this.state.firstName}
                    name="firstName"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputSecondName">Призвіще</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputSecondName"
                    placeholder="Enter second name"
                    value={this.state.secondName}
                    name="secondName"
                    onChange={this.handleChange}
                    required
                  />
                </div> 
                <div className="form-group">
                  <label htmlFor="exampleInputMobilePhon">Телефон</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="exampleInputMobilePhon"
                    placeholder="Enter mobile phon"
                    value={this.state.mobilePhon}
                    name="mobilePhon"
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputAddress">Адреса</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Enter address"
                    value={this.state.address}
                    name="address"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputСompany">Організація</label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputСompany"
                    placeholder="Enter company"
                    value={this.state.company}
                    name="company"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
              </form>
              <form className="d-flex justify-content-between">
                <button
                  type="register"
                  className="btn btn-light"
                  value="Register"
                  name="register"
                  onClick={this.register}
                >
                  Register
                </button>
                <NavLink to={"/"}>
                <button
                  type="submit"
                  className="btn btn-info text-white"
                  value="Enter"
                  name="submit"
                >
                  Login
                </button>
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
