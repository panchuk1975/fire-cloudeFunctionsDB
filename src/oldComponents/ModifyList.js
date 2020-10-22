import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { AlertBox } from "../components/AlertBox";

export const ModifyList = ({ car, list }) => {
  let [alertClass, setAlertClass] = useState("modal");
  let [alertText, setAlertText] = useState("");
  const firebase = useContext(FirebaseContext);

  let [form, setForm] = useState({
    ...list,
    indicatorListStart: car.indicatorListFinish,
    timeListFirst: car.carTimeTotal,
    openList: false,
    openRoute: false,
  });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const modifyHandler = (event) => {
      !form.listNumber && setAlertText("Номер та дата листа обовязкові!");
      !form.listNumber && setAlertClass("open");
    event.preventDefault();
    if (form.listNumber) {
      firebase
        .closeList(form)
        .then(() => {})
        .catch(() => {
          setAlertText("Ошибка сервера!");
          setAlertClass("open");
        });
      setAlertText("Інформацію скореговано!");
      setAlertClass("open");
    }
  };
  return (
    <div id="ModifyList">
      <div>
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="listNumber">
              <small>Номер листа</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Номер листа"
              value={form.listNumber}
              name="listNumber"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="listDate">
              <small>Дата</small>
            </label>
            <input
              id="date"
              type="date"
              className="form-control"
              placeholder="Дата"
              value={form.listDate}
              name="listDate"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="driverName">
              <small>Водій</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Водій"
              value={form.driverName}
              name="driverName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="seniorName">
              <small>Старший машини</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Старший машини"
              value={form.seniorName}
              name="seniorName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="listRouteFrom">
              <small>Звідки</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Звідки"
              value={form.listRouteFrom}
              name="listRouteFrom"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="listRouteTo">
              <small>Куди</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Куди"
              value={form.listRouteTo}
              name="listRouteTo"
              onChange={changeHandler}
            />
          </div>
          <div id="time" className="form-group">
            <label htmlFor="departure">
              <small>Час вибуття</small>
            </label>
            <input
              type="time"
              className="form-control"
              placeholder="Час вибуття"
              value={form.departure}
              name="departure"
              onChange={changeHandler}
            />
          </div>
          <div id="time" className="form-group">
            <label htmlFor="arrival">
              <small>Час прибуття</small>
            </label>
            <input
              type="time"
              className="form-control"
              placeholder="Час прибуття"
              value={form.arrival}
              name="arrival"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="indicatorListStart">
              <small>Показники убуття</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Показники убуття"
              value={form.indicatorListStart}
              name="indicatorListStart"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="indicatorListFinish">
              <small>Показники прибуття</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Показники прибуття"
              value={form.indicatorListFinish}
              name="indicatorListFinish"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalListMileage">
              <small>Пробіг по листу</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Пробіг по листу"
              value={form.totalListMileage}
              name="totalListMileage"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeListFirst">
              <small>Початковий час</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Початковий час"
              value={form.timeListFirst}
              name="timeListFirst"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeListLast">
              <small>Загальний час</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Загальний час"
              value={form.timeListLast}
              name="timeListLast"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="timeListTotal">
              <small>Час роботи</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Час роботи"
              value={form.timeListTotal}
              name="timeListTotal"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="season">
              <small>Коефіцієнт сезону</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Коефіцієнт сезону"
              value={form.season}
              name="season"
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          id="modifyListBtn"
          className="btn btn-success"
          value="Enter"
          name="submit"
          onClick={modifyHandler}
        >
          Зберегти зміни
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
