import React, { useState, useContext, memo } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
//import "../CSS/CreateListStyle.scss";
var moment = require("moment");

export const CreateList = memo(
  ({ car, list, setAlertText, setAlertClass, newLists, userInfo }) => {
    const firebase = useContext(FirebaseContext);
    let initialForm = {};
    if (!list) {
      initialForm = {
        listNumber: "",
        listDate: moment(new Date()).format("YYYY-MM-DD"),
        driverName: "Штатний",
        listRouteFrom: "Планово",
        listRouteTo: "Планово",
        seniorName: "Штатний",
        departure: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        arrival: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        indicatorListStart: car.carIndicatorLast,
        indicatorListFinish: 0,
        totalListMileage: 0,
        timeListFirst: car.carTimeFinish,
        timeListLast: 0,
        timeListTotal: 0,
        season: 1,
        openList: false,
        openRoute: false,
      };
    } else {
      initialForm = {
        ...list,
        openList: false,
        openRoute: false,
      };
    }
    let [form, setForm] = useState({ ...initialForm });
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    const createHandler = (event) => {
      let isListExists = !!newLists.filter(
        // eslint-disable-next-line
        (list) => Number(list.listNumber) == Number(form.listNumber)
      ).length;
      event.preventDefault();
      !form.listNumber && setAlertText("Номер листа обовязковий!");
      !form.listNumber && setAlertClass("open");
      if (form.listNumber) {
        if (!list) {
          if (!isListExists) {
            if (
              (userInfo.company === userInfo.jointCompany) &
              (userInfo.owner === car.owner)
            ) {
              firebase
                .addList(form, car)
                .then(() => {
                  firebase.clouseNewList(car);
                })
                .catch(() => {
                  setAlertText("Ошибка сервера!");
                  setAlertClass("open");
                });
              setAlertText("Новий лист створено!");
              setAlertClass("open");
            } else {
              setAlertText("У Вас відсутні права вносити зміни в документи!");
              setAlertClass("open");
              return;
            }
          } else {
            setAlertText("Такий лист вже існує!");
            setAlertClass("open");
            return;
          }
        } else {
          if (
            (userInfo.company === userInfo.jointCompany) &
            (userInfo.owner === car.owner)
          ) {
            firebase
              .closeList(form)
              .then(() => {})
              .catch(() => {
                setAlertText("Ошибка сервера!");
                setAlertClass("open");
              });
            setAlertText("Інформацію скореговано!");
            setAlertClass("open");
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        }
        setTimeout(() => {
          setAlertClass("modal");
        }, 1000);
      }
    };
    let classListBasis = null;
    if (!list) {
      classListBasis = "CreateListStyle";
    } else {
      classListBasis = "ModifyListStyle";
    }
    return (
      <div id={classListBasis}>
        <div>
          <div className="d-flex  flex-wrap justify-content-between">
            <div className="form-group">
              <label htmlFor="listNumber">
                <small>Номер листа</small>
              </label>
              <input
                id="important"
                type="number"
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
                <small>Дата листа</small>
              </label>
              <input
                id="date"
                type="date"
                className="form-control"
                placeholder="Дата листа"
                value={form.listDate}
                name="listDate"
                onChange={changeHandler}
                required
              />
            </div>
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат") && (
              <div className="form-group">
                <label htmlFor="driverName">
                  <small>Водій(механік)</small>
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
            )}
            <div className="form-group">
              <label htmlFor="seniorName">
                <small>Старший(механік)</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Відповідальний"
                value={form.seniorName}
                name="seniorName"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="listRouteFrom">
                <small>Звідки(зауваження)</small>
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
                <small>Куди(мета роботи)</small>
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
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат") && (
              <div id="datetime-local" className="form-group">
                <label htmlFor="departure">
                  <small>Час початку</small>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="Час початку"
                  value={form.departure}
                  name="departure"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат") && (
              <div id="datetime-local" className="form-group">
                <label htmlFor="arrival">
                  <small>Час закінчення</small>
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  placeholder="Час закінчення"
                  value={form.arrival}
                  name="arrival"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат") && (
              <div className="form-group">
                <label htmlFor="indicatorListStart">
                  <small>Показники убуття</small>
                </label>
                <input
                  id="danger"
                  type="number"
                  className="form-control"
                  placeholder="Показники убуття"
                  value={form.indicatorListStart}
                  name="indicatorListStart"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат") && (
              <div className="form-group">
                <label htmlFor="indicatorListFinish">
                  <small>Показники прибуття</small>
                </label>
                <input
                  id="danger"
                  type="number"
                  className="form-control"
                  placeholder="Показники прибуття"
                  value={form.indicatorListFinish}
                  name="indicatorListFinish"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат") && (
              <div className="form-group">
                <label htmlFor="totalListMileage">
                  <small>Пробіг по листу</small>
                </label>
                <input
                  id="danger"
                  type="text"
                  className="form-control"
                  placeholder="Пробіг по листу"
                  value={form.totalListMileage}
                  name="totalListMileage"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Електроприлад" ||
              car.driver === "Автомобіль-агрегат" ||
              car.driver === "Агрегат") && (
              <div className="form-group">
                <label htmlFor="timeListFirst">
                  <small>Початковий час</small>
                </label>
                <input
                  id="danger"
                  type="text"
                  className="form-control"
                  placeholder="Початковий час"
                  value={form.timeListFirst}
                  name="timeListFirst"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Електроприлад" ||
              car.driver === "Автомобіль-агрегат" ||
              car.driver === "Агрегат") && (
              <div className="form-group">
                <label htmlFor="timeListLast">
                  <small>Загальний час</small>
                </label>
                <input
                  id="danger"
                  type="number"
                  className="form-control"
                  placeholder="Загальний час"
                  value={form.timeListLast}
                  name="timeListLast"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Електроприлад" ||
              car.driver === "Автомобіль-агрегат" ||
              car.driver === "Агрегат") && (
              <div className="form-group">
                <label htmlFor="timeListTotal">
                  <small>Час роботи</small>
                </label>
                <input
                  id="danger"
                  type="number"
                  className="form-control"
                  placeholder="Час роботи"
                  value={form.timeListTotal}
                  name="timeListTotal"
                  onChange={changeHandler}
                />
              </div>
            )}
            {(car.driver === "Автомобіль" ||
              car.driver === "Автомобіль-агрегат" ||
              car.driver === "Агрегат") && (
              <div className="form-group">
                <label htmlFor="season">
                  <small>Коефіцієнт сезону</small>
                </label>
                <input
                  id="important"
                  type="number"
                  className="form-control"
                  placeholder="Коефіцієнт сезону"
                  value={form.season}
                  name="season"
                  onChange={changeHandler}
                />
              </div>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button
            id="saveListBtn"
            className="btn btn-success"
            value="Enter"
            name="submit"
            onClick={createHandler}
          >
            {!list && "Створити лист"}
            {list && "Зберегти дані"}
          </button>
        </div>
      </div>
    );
  }
);
