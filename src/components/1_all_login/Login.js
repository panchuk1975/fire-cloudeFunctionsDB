import React, { Component } from "react";
import fire from "../../config/Fire";
import { NavLink } from "react-router-dom";

let icnFacebook = require('../../pictures/facebook_icon.png');
let icnGoogle = require('../../pictures/google_icon.png');

let showPass = require('../../pictures/icon_open_armor.png');
let hidePass = require('../../pictures/icon_closed_armor.png');

// let contentWidth = "25%";
// contentWidth = `${
//   7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
//   3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
//   7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
//   6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
//   0.1046586 * window.innerWidth +
//   106.6952733
// }%`;

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
    fire.auth
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
    let showPassword = () => {
      const pass_field = document.querySelector(".show_pass");
      const show_btn = document.querySelector(".icon");
      if (pass_field.type === "password") {
        pass_field.type = "text";
        show_btn.src = showPass;
      } else {
        pass_field.type = "password";
        show_btn.src = hidePass;
      }
    };
    let errorNotification = this.state.fireErrors ? (
      <div className="Error" style={{ backgroundColor: "red" }}>
        {this.state.formTitle ||
          "Warning! Authorization Error! Check the data!"}
      </div>
    ) : null;
    // contentWidth = `${
    //   7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
    //   3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
    //   7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
    //   6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
    //   0.1046586 * window.innerWidth +
    //   106.6952733
    // }%`;
    return (
      <div className="layout">
        <div className="add_field size_field">
          <div className="layout__page layout__page_thin">
            <div className="shadow_box">
              <h1 className="shadow_box__title">Вхід</h1>
              <form action="#" className="form form_login" onSubmit={this.login}>
                <fieldset className="form__fields">
                  <div className="form_for_entering_phone_or_mail">
                    <input
                      type="email"
                      className="input_width form__field_input first_bord_radius"
                      placeholder="E-mail або Телефон"
                      value={this.state.email}
                      name="email"
                      onChange={this.handleChange}
                      required
                    />
                    <div className="underline"></div>
                  </div>
                  <div className="form_for_entering_password">
                    <div className="input_password_form">
                      <input
                        id="password"
                        type="password"
                        className="show_pass input_width form__field_input second_bord_radius"
                        placeholder="Пароль"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                        required
                      />
                      <div className="underline"></div>
                    </div>
                    <div className="show" onClick={showPassword}>
                      <span className="icon_eye">
                        <img src={hidePass} height="20" width="20" className="img icon" />
                      </span>
                    </div>
                  </div>
                  <div className="form__buttons">
                    <button type="submit" className="button_wide button_primary">
                      Увійти
                    </button>
                  </div>
                  <div className="form__field_socials">
                    <label className="form__field_label">Увійти за допомогою</label>
                    <div className="social_bottons">
                      <a href="#" title="Увійти за допомогою Facebook" className="socials_buttons_facebook">
                        <span className="icon_facebook">
                          <img src={icnFacebook} height="16" width="7" className="img" />
                        </span>
                      </a>
                      <a href="#" title="Увійти за допомогою Google" className="socials_buttons_google">
                        <span className="icon_google">
                          <img src={icnGoogle} height="12px" width="12px" className="img" />
                        </span>
                      </a>
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
            {errorNotification}
            <div className="shadow_box password_recovery_form">
              Забули пароль? 
              <span>
                <NavLink to={"/forgotpassword"} className="password_recovery_link"> Відновити </NavLink>
              </span>
            </div>
            <div className="shadow_box password_recovery_form">
              Ще немає облікового запису?
              <span>
                <NavLink to={"/register"} className="registration_link"> Зареєструватись</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login = React.memo(Login);
