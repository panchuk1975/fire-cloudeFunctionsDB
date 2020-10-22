import React, { Component } from "react";
import fire from "../config/Fire";
import { NavLink } from "react-router-dom";
import "../CSS/LoginFormStyle.css";

let contentWidth = "25%";
if (window.innerWidth <= 568) {
  contentWidth = "95%";
} else if (window.innerWidth <= 768) {
  contentWidth = "75%";
} else if (window.innerWidth <= 1068) {
  contentWidth = "55%";
} else if (window.innerWidth <= 1368) {
  contentWidth = "45%";
} else if (window.innerWidth <= 1668) {
  contentWidth = "35%";
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fireErrors: "",
      formTitle: "",
      loginBtn: true,
      width: 0,
      height: 0,
    };
  }
  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };
  login = (event) => {
    event.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });
  };
  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  render() {
    let errorNotification = this.state.fireErrors ? (
      <div className="Error" style={{ backgroundColor: "red" }}>
        {this.state.formTitle || "Увага! Помилка авторізації! Перевірте дані!"}
      </div>
    ) : null;
    if (window.innerWidth <= 468) {
      contentWidth = "100%";
    } else if (window.innerWidth <= 568) {
      contentWidth = "95%";
    } else if (window.innerWidth <= 768) {
      contentWidth = "75%";
    } else if (window.innerWidth <= 1068) {
      contentWidth = "55%";
    } else if (window.innerWidth <= 1368) {
      contentWidth = "45%";
    } else if (window.innerWidth <= 1668) {
      contentWidth = "35%";
    }
    return (
      <div className="row">
        <div className="col-sm-6 mx-auto">
          <h1 className="card-title text-center">TEHSUPPORT</h1>
          <div className="card bg-secondary border-dark">
            <div className="card-body">
              <h5 className="card-title text-center">Авторізація</h5>
              {errorNotification}
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
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
                  type="submit"
                  className="btn btn-light"
                  value="Enter"
                  name="submit"
                  onClick={this.login}
                >
                  Login
                </button>
                <NavLink to={"/register"}>
                  <button
                    type="register"
                    className="btn btn-info text-white"
                    value="Register"
                    name="register"
                  >
                    Register
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

export default Login = React.memo(Login);
