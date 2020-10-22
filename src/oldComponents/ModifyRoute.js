import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { AlertBox } from "./AlertBox";
import "../CSS/CarsCompStyle.css";

export const ModifyRoute = ({ car, list, route }) => {
  let [alertClass, setAlertClass] = useState("modal");
  let [alertText, setAlertText] = useState("");
  const firebase = useContext(FirebaseContext);
  let [form, setForm] = useState({ 
      ...route,
      openRoute: false,
    });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const createHandler = (event) => {
      !form.routDate && setAlertText("Дата маршруту обовязкова!");
      !form.routNumber && setAlertText("Номер маршруту обовязковий!");
      !form.routDate && setAlertClass("open");
      !form.routNumber && setAlertClass("open");
    event.preventDefault();
    if (form.routNumber) {
      if (form.routDate) {
        firebase
          .closeRoute(form)
          .then(() => {
          })
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Маршрут збережено!");
        setAlertClass("open");
      }
    }
  };
  return (
    <div id="CreateRoute">
      <div>
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="routNumber">
              <small>Номер</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Номер"
              value={form.routNumber}
              name="routNumber"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="routDate">
              <small>Дата маршрута</small>
            </label>
            <input
              id="date"
              type="date"
              className="form-control"
              placeholder="Дата маршрута"
              value={form.routDate}
              name="routDate"
              onChange={changeHandler}
              required
            />
          </div>
          <div id="time" className="form-group">
            <label htmlFor="routArrival">
              <small>Час прибуття</small>
            </label>
            <input
              type="time"
              className="form-control"
              placeholder="Час прибуття"
              value={form.routArrival}
              name="routArrival"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeTotal">
              <small>Загальний пробіг</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Загальний пробіг"
              value={form.routeTotal}
              name="routeTotal"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routTotalTime">
              <small>Відпрацьовано мотогодин</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Відпрацьовано мотогодин"
              value={form.routTotalTime}
              name="routTotalTime"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="typeOfPavement">
              <small>Коефіцієнт шляху</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Коефіцієнт шляху"
              value={form.typeOfPavement}
              name="typeOfPavement"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="liquidName">
              <small>Тип ПММ</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Тип ПММ"
              value={form.liquidName}
              name="liquidName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="balanceStart">
              <small>Було ПММ</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Було ПММ"
              value={form.balanceStart}
              name="balanceStart"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="received">
              <small>Отримано ПММ</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Отримано ПММ"
              value={form.received}
              name="received"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="costCoefficient">
              <small>Коефіцієнт витрати</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Коефіцієнт витрати"
              value={form.costCoefficient}
              name="costCoefficient"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expended">
              <small>Витрачено ПММ</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Витрачено ПММ"
              value={form.expended}
              name="expended"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="balanceFinish">
              <small>Залишок ПММ</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Залишок ПММ"
              value={form.balanceFinish}
              name="balanceFinish"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeWithCargo">
              <small>Пробіг з вантажем</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Пробіг з вантажем"
              value={form.routeWithCargo}
              name="routeWithCargo"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeWithoutCargo">
              <small>Пробіг без вантажу</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Пробіг без вантажу"
              value={form.routeWithoutCargo}
              name="routeWithoutCargo"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeWithTrailer">
              <small>Пробіг з причепом</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Пробіг з причепом"
              value={form.routeWithTrailer}
              name="routeWithTrailer"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeInaTow">
              <small>Пробіг на буксирі</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Пробіг на буксирі"
              value={form.routeInaTow}
              name="routeInaTow"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeOnSite">
              <small>Мотогодин на місці</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Мотогодин на місці"
              value={form.timeOnSite}
              name="timeOnSite"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeInaMotion">
              <small>Мотогодин в русі</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Мотогодин в русі"
              value={form.timeInaMotion}
              name="timeInaMotion"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="trailerWeight">
              <small>Вага причепу</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Вага причепа"
              value={form.trailerWeight}
              name="trailerWeight"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cargoWeight">
              <small>Вага вантажу</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Вага вантажу"
              value={form.cargoWeight}
              name="cargoWeight"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="routeTo">
              <small>Кінцева точка</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Кінцева точка"
              value={form.routeTo}
              name="routeTo"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cargoName">
              <small>Назва вантажу</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Назва вантажу"
              value={form.cargoName}
              name="cargoName"
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          id="createListBtn"
          className="btn btn-success"
          value="Enter"
          name="submit"
          onClick={createHandler}
        >
          Зберегти дані
        </button>
      </div>
      <AlertBox
        modalClass={alertClass}
        modalText={alertText}
        modalFunction={setAlertClass}
      />
    </div>
  );
};
