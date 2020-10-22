import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { AlertBox } from "./AlertBox";
import { useHistory } from "react-router-dom";
import fire from "../config/Fire";
import "../CSS/CreateObjStyle.scss";
var moment = require("moment");

export const CreateCar = ({ car, cars, userInfo }) => {
  //-----------------------------Call stand by--------------------------------//
  const firebase = useContext(FirebaseContext);
  let history = useHistory();
  //------------------------------Alert block---------------------------------//
  let [alertClass, setAlertClass] = useState("modal");
  let [alertText, setAlertText] = useState("");
  //--------------------------------Car form----------------------------------//
  let initialForm = {};
  if (!car) {
    initialForm = {
      typeOfCar: "",
      governmentCarNumber: "",
      factoryCarNumber: "",
      dateOfRegistration: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      carEngineNumber: "",
      carPassportNumber: "",
      specialCarEquipment: "Відсутній",
      specialCarEquipmentNumber: "-----",
      carOwnerName: "",
      dateOfCarProduction: "",
      operatingGroup: "",
      category: "2",
      carIndicatorFirst: 0,
      carIndicatorLast: 0,
      totalCarMileage: 0,
      carTimeStart: 0,
      carTimeFinish: 0,
      carTimeTotal: 0,
      fuelActiveСonsumption: "",
      fuelPassiveСonsumption: "",
      carIndicatorLastTO2: 0,
      carIndicatorLastTO1: 0,
      routeToTO2: 0,
      routeToTO1: 0,
      carTimeLastTO2: 0,
      carTimeLastTO1: 0,
      nextTimeTO2: 0,
      nextTimeTO1: 0,
      carIndicatorLastКР: 0,
      carIndicatorLastСР: 0,
      routeToКР: 0,
      routeToСР: 0,
      carTimeLastКР: 0,
      carTimeLastСР: 0,
      nextTimeКР: 0,
      nextTimeСР: 0,
      driver: "Автомобіль",
      serviceability: "Справний",
      objectPassword: "",
      serviceabilityreason: "",
      openCar: false,
      openList: false,
    };
  } else {
    initialForm = {
      ...car,
      openCar: false,
      openList: false,
    };
  }
  //---------------------------Form state-------------------------------//
  let [form, setForm] = useState({ ...initialForm });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.currentTarget.value });
  };
  //--------------------------Math functions----------------------------//
  form.carIndicatorLast =
    parseInt(
      (Number(form.carIndicatorFirst) + Number(form.totalCarMileage)) * 100
    ) / 100;
  form.carTimeFinish =
    parseInt((Number(form.carTimeStart) + Number(form.carTimeTotal)) * 100) /
    100;
  //-------------------------Create Car function------------------------//
  const createHandler = (event) => {
    var owner = fire.auth().currentUser.uid;
    cars = cars.filter((car) => car.owner === owner);
    let isCarExists = !!cars.filter(
      // eslint-disable-next-line
      (car) => car.governmentCarNumber == form.governmentCarNumber
    ).length;
    !form.governmentCarNumber && setAlertText("Обліковий номер обовязковий!");
    !form.typeOfCar && setAlertText("Найменування обовязкове!");
    !form.governmentCarNumber && setAlertClass("open");
    !form.typeOfCar && setAlertClass("open");
    event.preventDefault();
    if (form.governmentCarNumber) {
      if (!car) {
        if (!isCarExists) {
          if (userInfo.company === userInfo.jointCompany) {
            firebase
              .addCar(form)
              .then(() => {
                firebase.changeCreate();
              })
              .catch(() => {
                setAlertText("Ошибка сервера!");
                setAlertClass("open");
              });
            setAlertText("Новий виріб створено!");
            setAlertClass("open");
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        } else {
          setAlertText(
            "Виріб з таким номером вже існує! Оберіть інший або внесіть зміни!"
          );
          setAlertClass("open");
          return;
        }
        if (form.driver === "Автомобіль") {
          setAlertText(
            "Новий автомобіль створено! Для перегляду перейдіть на вкладку Авто."
          );
          setAlertClass("open");
        } else if (form.driver === "Автомобіль-агрегат") {
          setAlertText(
            "Новий автомобіль створено! Для перегляду перейдіть на вкладку Авто-агрегати."
          );
          setAlertClass("open");
        } else if (form.driver === "Агрегат") {
            setAlertText(
                "Новий електроагрегат створено! Для перегляду перейдіть на вкладку Агрегати."
              );
              setAlertClass("open");
        } else if (form.driver === "Електроприлад") {
            setAlertText(
                "Новий прилад створено! Для перегляду перейдіть на вкладку Електроприлади."
              );
              setAlertClass("open");
        } else {
          history.push("/home");
          setAlertClass("modal");
        }
      } else {
        if (
          (userInfo.company === userInfo.jointCompany) &
          (userInfo.owner === car.owner)
        ) {
          firebase
            .closeCar(form)
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
      }, 1500);
    }
  };
  //-----------------------------Change car basis----------------------------//
  let classCarBasis = null;
  if (!car) {
    classCarBasis = "createCarBasis";
  } else {
    classCarBasis = "modifyCarForm";
  }
  //-------------------------------GSX car form------------------------------//
  return (
    <div className={classCarBasis}>
      <hr id="createCarHr" />
      <div id="carMainForm">
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="driver">
              <small>Оберіть тип виробу:</small>
            </label>
            <div>
              <select
                id="important"
                type="text"
                name="driver"
                value={form.driver}
                onChange={changeHandler}
                className="custom-select custom-select-sm"
              >
                <option className="main" value="Автомобіль">
                  Автомобіль
                </option>
                <option value="Автомобіль">Автомобіль</option>
                <option value="Агрегат">Агрегат</option>
                <option value="Автомобіль-агрегат">Авто-агрегат</option>
                <option value="Електроприлад">Електроприлад</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="typeOfCar">
              <small>Найменування</small>
            </label>
            <input
              id="important"
              type="text"
              className="form-control"
              placeholder="Найменування"
              value={form.typeOfCar}
              name="typeOfCar"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="governmentCarNumber">
              <small>Обліковий номер</small>
            </label>
            <input
              id="important"
              type="text"
              className="form-control"
              placeholder="Номер"
              value={form.governmentCarNumber}
              name="governmentCarNumber"
              onChange={changeHandler}
              required
            />
          </div>
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="factoryCarNumber">
                <small>Заводський номер</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="З/номер"
                value={form.factoryCarNumber}
                name="factoryCarNumber"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Електроприлад" && (
            <div className="form-group">
              <label htmlFor="carEngineNumber">
                <small>Номер двигуна</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Номер двигуна"
                value={form.carEngineNumber}
                name="carEngineNumber"
                onChange={changeHandler}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="carPassportNumber">
              <small>Номер паспорту</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Номер паспорту"
              value={form.carPassportNumber}
              name="carPassportNumber"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="operatingGroup">
              <small>Група експлуатації</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Група експлуатації"
              value={form.operatingGroup}
              name="operatingGroup"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">
              <small>Категорія</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Категорія"
              value={form.category}
              name="category"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carOwnerName">
              <small>Власник</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Власник"
              value={form.carOwnerName}
              name="carOwnerName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfCarProduction">
              <small>Дата випуску</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Дата випуску"
              value={form.dateOfCarProduction}
              name="dateOfCarProduction"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialCarEquipment">
              <small>Спецобладнання</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Спецобладнання"
              value={form.specialCarEquipment}
              name="specialCarEquipment"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialCarEquipmentNumber">
              <small>№ спецобладнання</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="№ спецобладнання"
              value={form.specialCarEquipmentNumber}
              name="specialCarEquipmentNumber"
              onChange={changeHandler}
            />
          </div>
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="carIndicatorFirst">
                <small>Початковий, км</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Км старт"
                value={form.carIndicatorFirst}
                name="carIndicatorFirst"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="carIndicatorLast">
                <small>Останній, км</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Км финиш"
                value={form.carIndicatorLast}
                name="carIndicatorLast"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="totalCarMileage">
                <small>Загальний пробіг, км</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Загальний пробіг"
                value={form.totalCarMileage}
                name="totalCarMileage"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeStart">
                <small>Початкові мотогодини</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="Початкові м/г"
                value={form.carTimeStart}
                name="carTimeStart"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeFinish">
                <small>Останні мотогодини</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Останні м/г"
                value={form.carTimeFinish}
                name="carTimeFinish"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeTotal">
                <small>Напрацювання, м/г</small>
              </label>
              <input
                id="danger"
                type="number"
                className="form-control"
                placeholder="Загальне напрацювання"
                value={form.carTimeTotal}
                name="carTimeTotal"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="fuelActiveСonsumption">
                <small>Палива на км, л</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="На км/л"
                value={form.fuelActiveСonsumption}
                name="fuelActiveСonsumption"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль-агрегат" ||
            form.driver === "Агрегат") && (
            <div className="form-group">
              <label htmlFor="fuelPassiveСonsumption">
                <small>Палива на год, л</small>
              </label>
              <input
                id="important"
                type="number"
                className="form-control"
                placeholder="На год, л"
                value={form.fuelPassiveСonsumption}
                name="fuelPassiveСonsumption"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="carIndicatorLastTO2">
                <small>На останнє ТО2, км</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="На ТО2, км"
                value={form.carIndicatorLastTO2}
                name="carIndicatorLastTO2"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeToTO2">
                <small>Пробіг до ТО2</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До ТО2"
                value={form.routeToTO2}
                name="routeToTO2"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="carIndicatorLastTO1">
                <small>На останнє ТО1, км</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="На ТО1, км"
                value={form.carIndicatorLastTO1}
                name="carIndicatorLastTO1"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeToTO1">
                <small>Пробіг до ТО1</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До ТО1"
                value={form.routeToTO1}
                name="routeToTO1"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeLastTO2">
                <small>М/г під час ТО2</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="М/г на ТО2"
                value={form.carTimeLastTO2}
                name="carTimeLastTO2"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="nextTimeTO2">
                <small>М/г до ТО2</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До ТО2"
                value={form.nextTimeTO2}
                name="nextTimeTO2"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeLastTO1">
                <small>М\г під час ТО1</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="М\г на ТО1"
                value={form.carTimeLastTO1}
                name="carTimeLastTO1"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="nextTimeTO1">
                <small>М\г до ТО1</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До ТО1"
                value={form.nextTimeTO1}
                name="nextTimeTO1"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="carIndicatorLastКР">
                <small>Км на останній КР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Км на КР"
                value={form.carIndicatorLastКР}
                name="carIndicatorLastКР"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeToКР">
                <small>Пробіг до КР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До КР"
                value={form.routeToКР}
                name="routeToКР"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="carIndicatorLastСР">
                <small>Км на останній СР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Км на СР"
                value={form.carIndicatorLastСР}
                name="carIndicatorLastСР"
                onChange={changeHandler}
              />
            </div>
          )}
          {(form.driver === "Автомобіль" ||
            form.driver === "Автомобіль-агрегат") && (
            <div className="form-group">
              <label htmlFor="routeToСР">
                <small>Пробіг до СР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До СР"
                value={form.routeToСР}
                name="routeToСР"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeLastКР">
                <small>М\г під час КР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Під час КР"
                value={form.carTimeLastКР}
                name="carTimeLastКР"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="nextTimeКР">
                <small>М\г до КР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До КР"
                value={form.nextTimeКР}
                name="nextTimeКР"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="carTimeLastСР">
                <small>М\г під час СР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Під час СР"
                value={form.carTimeLastСР}
                name="carTimeLastСР"
                onChange={changeHandler}
              />
            </div>
          )}
          {form.driver !== "Автомобіль" && (
            <div className="form-group">
              <label htmlFor="nextTimeСР">
                <small>М\г до СР</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="До СР"
                value={form.nextTimeСР}
                name="nextTimeСР"
                onChange={changeHandler}
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="serviceability">
              <small>Поточний стан</small>
            </label>
            <input
              id="important"
              type="text"
              className="form-control"
              placeholder="Стан"
              value={form.serviceability}
              name="serviceability"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="objectPassword">
              <small>Ідентифікатор</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ідентифікатор"
              value={form.objectPassword || ""}
              name="objectPassword"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div id="serviceabilityCarReasonConteiner" className="form-group">
          <label htmlFor="serviceabilityReason">
            <small>Додаткові дані</small>
          </label>
          <textarea
            id="serviceabilityCarReason"
            type="text"
            className="form-control"
            placeholder="Додатково"
            value={form.serviceabilityReason}
            name="serviceabilityReason"
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          id="createCarBtn"
          className="btn btn-success"
          value="Enter"
          name="submit"
          onClick={createHandler}
        >
          {!car && "Створити новий виріб"}
          {car && "Зберегти дані"}
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
