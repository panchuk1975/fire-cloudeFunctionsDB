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

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
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
  register = (event) => {
    event.preventDefault();
    fire.auth
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(function () {
        let user = fire.auth.currentUser;
        console.log(user);
        user.sendEmailVerification();
      })
      .catch(function (error) {
        console.log(error.message, 7000);
      });
    console.log(`Validation link was sent to email.`);
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
      const show_btn = document.querySelector(".icons");
      if (pass_field.type === "password") {
        pass_field.type = "text";
        show_btn.src = showPass;
      } else {
        pass_field.type = "password";
        show_btn.src = hidePass;
      }
    };
    let showConfirmPassword = () => {
      const conf_pass_field = document.querySelector(".show_confirm");
      const conf_show_btn = document.querySelector(".icon_conf");
      if (conf_pass_field.type === "password") {
        conf_pass_field.type = "text";
        conf_show_btn.src = showPass;
      } else {
        conf_pass_field.type = "password";
        conf_show_btn.src = hidePass;
      }
    };
    // contentWidth = `${
    //   7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
    //   3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
    //   7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
    //   6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
    //   0.1046586 * window.innerWidth +
    //   106.6952733
    // }%`;
    let errorNotification = this.state.fireErrors ? (
      <div className="Error" style={{ backgroundColor: "red" }}>
        {this.state.formTitle ||
          "Warning! Authorization Error! Check the data!"}
      </div>
    ) : null;
    return (
      <div className="layout_rg">
        <div className="add_field_rg size_field_rg">
          <div className="layout__page_rg layout__page_thin_rg">
            <div className="shadow_box_rg">
              <h1 className="shadow_box__title_rg">Реєстрація</h1>
              <form action="#" className="form_rg form_registration_rg" onSubmit={this.register}>
                <fieldset className="form__fields_rg">
                  <div className="form__field_socials_rg">
                    <label className="form__field_label_rg">За допомогою сервісу</label>
                    <div className="social_bottons_rg">
                      <NavLink to="#" title="Зареєструватися за допомогою Facebook" className="socials_buttons_facebook_rg">
                        <span className="icon_facebook_rg">
                          <img src={icnFacebook} height="16px" width="7px" className="img_rg" />
                        </span>
                      </NavLink>
                      <NavLink to="#" title="Зареєструватися за допомогою Google" className="socials_buttons_google_rg">
                        <span className="icon_google_rg">
                          <img src={icnGoogle} height="12px" width="12px" className="img_rg" />
                        </span>
                      </NavLink>
                    </div>
                  </div>
                  {errorNotification}
                  {this.state.password !== this.state.confirmPassword && (
                    <div className="notConfirm">Password is not confirmid!</div>
                  )}
                  <div className="input_field_email_rg">
                    <input
                      type="email"
                      className="input_rg input_width_rg form__field_input_rg first_bord_radius_rg"
                      placeholder="E-mail / Телефон"
                      value={this.state.email}
                      name="email"
                      onChange={this.handleChange}
                      required
                      autocomplete="off"
                      id="email"
                      />
                      <div className="underline_rg"></div>
                  </div>
                  <div className="input_field_tel_rg">
                    <input
                      type="text"
                      className="input_rg input_width_rg form__field_input_rg first_bord_radius_rg"
                      placeholder="ПIБ"
                      name="text"
                      onChange={this.handleChange}
                      required
                      autocomplete="off"
                      id="text"
                    />
                    <div className="underline_rg"></div>
                  </div>
                  <div className="input_field_password_rg">
                    <div className="input_password_form">
                      <input
                        type="password"
                        className="show_pass input_rg input_width_rg form__field_input_rg second_bord_radius_rg"
                        placeholder="Пароль"
                        value={this.state.password}
                        name="password"
                        onChange={this.handleChange}
                        required
                        autocomplete="off"
                        id="password"
                      />
                      <div className="underline_rg"></div>
                    </div>
                    <div className="show" onClick={showPassword}>
                      <span className="icon_eye">
                        <img src={hidePass} height="20" width="20" className="img icons" />
                      </span>
                    </div>
                  </div>
                  <div className="input_field_congfirm_password_rg">
                    <div className="input_password_form">
                      <input
                        type="password"
                        className="show_confirm input_rg input_width_rg form__field_input_rg second_bord_radius_rg"
                        placeholder="Підтвердити пароль"
                        value={this.state.confirmPassword}
                        name="confirmPassword"
                        onChange={this.handleChange}
                        required
                      />
                      <div className="underline_rg"></div>
                    </div>
                    <div className="show" onClick={showConfirmPassword}>
                      <span className="icon_eye">
                        <img src={hidePass} height="20" width="20" className="img icon_conf" />
                      </span>
                    </div>
                  </div>
                  <div class="form__buttons_rg">
                    <button type="submit" class="button_rg button_wide_rg button_primary_rg">
                      Зареєструватися
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
            <div class="shadow_box_rg authorization_form_rg">
              <span>
                Вже є аккаунт?
                <NavLink to="/login" className="authorization_link_rg"> Авторизуватись</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register = React.memo(Register);