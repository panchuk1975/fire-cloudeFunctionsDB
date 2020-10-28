import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { AlertBox } from "./AlertBox";
import { useHistory } from "react-router-dom";
import fire from "../config/Fire";
var moment = require("moment");

export const CreateComponent = ({ client, clients, userInfo }) => {
  //-----------------------------Call stand by--------------------------------//
  const firebase = useContext(FirebaseContext);
  let history = useHistory();
  //------------------------------Alert block---------------------------------//
  let [alertClass, setAlertClass] = useState("modal");
  let [alertText, setAlertText] = useState("");
  //--------------------------------Car form----------------------------------//
  let initialForm = {};
  if (!client) {
    initialForm = {
      clientType: "Фізичний",// driver
      companyName: "",// typeOfCar
      secName: "", //carEngineNumber
      firstName: "",// govermentCarNumber
      thirdName: "", //factoryCarNumber,
      contractNumber: "", //carPassportNumber,
      adress: "", //operatingGroup,
      phonNumber: "",//specialCarEquipmentNumber,
      addPhonNumber: "",//specialCarEquipmentNumber,
      dateOfNegotiations: moment(new Date()).format("YYYY-MM-DD"),
      negotiationsResult: "Не узгоджено",
      incomingSourse: "Телефонний дзвінок",
      dateOfSignContract: moment(new Date()).format("YYYY-MM-DD"),
      contractPeriod: 0,
      registrationDate: moment(new Date()).format("YYYY-MM-DD"),
      ipNumber: 0,
      passportNumber:"",
    
      // nextTimeКР,
      // specialCarEquipment: "Відсутній",
      // carOwnerName: "",
      // dateOfCarProduction: "",
      // category: "2",
      // carIndicatorFirst: 0,
      // carIndicatorLast: 0,
      // totalCarMileage: 0,
      // carTimeStart: 0,
      // carTimeFinish: 0,
      // carTimeTotal: 0,
      // fuelActiveСonsumption: "",
      // fuelPassiveСonsumption: "",
      // carIndicatorLastTO2: 0,
      // carIndicatorLastTO1: 0,
      // routeToTO2: 0,
      // routeToTO1: 0,
      // carTimeLastTO2: 0,
      // carTimeLastTO1: 0,
      // nextTimeTO2: 0,
      // nextTimeTO1: 0,
      // carIndicatorLastКР: 0,
      // carIndicatorLastСР: 0,
      // routeToКР: 0,
      // routeToСР: 0,
      // carTimeLastКР: 0,
      // carTimeLastСР: 0,
      // nextTimeСР: 0,
      // serviceability: "Справний",
      // objectPassword: "",
      // serviceabilityreason: "",


      openClient: false,
      openList: false,
    };
  } else {
    initialForm = {
      ...client,
      openClient: false,
      openList: false,
    };
  }
  //---------------------------Form state-------------------------------//
  let [form, setForm] = useState({ ...initialForm });
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.currentTarget.value });
     };
  //-------------------------Create Car function------------------------//
  const createHandler = (event) => {
    var owner = fire.auth.currentUser.uid;
    clients = clients.filter((client) => client.owner === owner);
    let isClientExists = !!clients.filter(
      // eslint-disable-next-line
      (client) => client.contractNumber === form.contractNumber
    ).length;
    !form.secName && setAlertText("Призвіще  обовязкове!");
    !form.secName && setAlertClass("open");
    event.preventDefault();
    if (form.secName) {
      if (!client) {
        if (!isClientExists) {
          if (userInfo.company === userInfo.jointCompany) {
            firebase
              .addClient(form)
              .then(() => {
              //  firebase.changeCreate();
              })
              .catch(() => {
                setAlertText("Ошибка сервера!");
                setAlertClass("open");
              });
              setAlertText("Нового кліента створено!");
              setAlertClass("open");
          } else {
            setAlertText("У Вас відсутні права вносити зміни в документи!");
            setAlertClass("open");
            return;
          }
        } else {
          setAlertText(
            "Договір з таким номером вже існує! Оберіть інший або внесіть зміни!"
          );
          setAlertClass("open");
          return;
        }
        if (form.clientType === "Юрідичний") {
          setAlertText(
            "Нового кліента створено! Для перегляду перейдіть до юридичних осіб."
          );
          setAlertClass("open");
        } else if (form.clientType ===  "Фізичний") {
          setAlertText(
            "Нового кліента створено! Для перегляду перейдіть до фізичних осіб."
          );
          setAlertClass("open");
        // } else if (form.driver === "Агрегат") {
        //     setAlertText(
        //         "Новий електроагрегат створено! Для перегляду перейдіть на вкладку Агрегати."
        //       );
        //       setAlertClass("open");
        // } else if (form.driver === "Електроприлад") {
        //     setAlertText(
        //         "Новий прилад створено! Для перегляду перейдіть на вкладку Електроприлади."
        //       );
        //       setAlertClass("open");
         } else {
          history.push("/home");
          setAlertClass("modal");
        }
      } else {
        if (
          (userInfo.company === userInfo.jointCompany) &
          (userInfo.owner === client.owner)
        ) {
          firebase
            .closeClient(form)
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
  if (!client) {
    classCarBasis = "createCarBasis";
  } else {
    classCarBasis = "modifyCarForm";
  }
  //-------------------------------GSX car form------------------------------//
  return (
    <div className={classCarBasis}>
      <div id="carMainForm">
        <div className="d-flex flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="clientType">
              <small>Оберіть статус кліента:</small>
            </label>
            <div>
              <select
                type="text"
                name="clientType"
                value={form.clientType}
                onChange={changeHandler}
                className="custom-select custom-select-sm important"
              >
                <option className="main" value="Юрідичний">
                  Юрідичний
                </option>
                <option value="Юрідичний">Юрідичний</option>
                <option value="Фізичний">Фізичний</option>
                {/* <option value="Автомобіль-агрегат">Авто-агрегат</option>
                <option value="Електроприлад">Електроприлад</option> */}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="compamyName">
              <small>Найменування  компанії</small>
            </label>
            <input
              type="text"
              className="form-control important"
              placeholder="Найменування компанії"
              value={form.companyName || ""}
              name="companyName"
              onChange={changeHandler}
            />
          </div><div className="form-group">
            <label htmlFor="secName">
            <small>Призвіще</small>
            </label>
            <input
              type="text"
              className="form-control important"
              placeholder="Призвіще"
              value={form.secName}
              name="secName"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="firstName">
              <small>Ім'я</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Ім'я"
              value={form.firstName}
              name="firstName"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="thirdName">
              <small>По батькові</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="По батькові"
              value={form.thirdName}
              name="thirdName"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contractNumber">
              <small>Номер договору</small>
            </label>
            <input
              type="text"
              className="form-control important"
              placeholder="Номер договору"
              value={form.contractNumber}
              name="contractNumber"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="adress">
              <small>Адреса</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Адреса"
              value={form.adress}
              name="adress"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phonNumber">
              <small>Телефон</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Телефон"
              value={form.phonNumber}
              name="phonNumber"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="addPhonNumber">
              <small>Додатковтий телефон</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Додатковтий телефон"
              value={form.addPhonNumber}
              name="addPhonNumber"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfNegotiations">
              <small>Дата переговорів</small>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Дата переговорів"
              value={moment(form.dateOfNegotiations).format("YYYY-MM-DD")}
              name="dateOfNegotiations"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
            <label htmlFor="negotiationsResult">
              <small>Результат переговорів</small>
            </label>
            <div>
              <select
                type="text"
                name="negotiationsResult"
                value={form.negotiationsResult}
                onChange={changeHandler}
                className="custom-select custom-select-sm"
              >
                <option className="main" value="Не узгоджено">
                Не узгоджено
                </option>
                <option value="Узгоджено">Узгоджено</option>
                <option value="Відкладено">Відкладено</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="incomingSourse">
              <small>Джерело надходження</small>
            </label>
            <div>
              <select
                type="text"
                name="incomingSourse"
                value={form.incomingSourse}
                onChange={changeHandler}
                className="custom-select custom-select-sm"
              >
                <option className="main" value="Телефонний дзвінок">
                Телефонний дзвінок
                </option>
                <option value="Інтернет сайт">Інтернет сайт</option>
                <option value="Ютюб реклама">Ютюб реклама</option>
                <option value="Інші джерела">Інші джерела</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dateOfSignContract">
              <small>Дата укладання договору</small>
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="Дата укладання договору"
              value={moment(form.dateOfSignContract).format("YYYY-MM-DD")}
              name="dateOfSignContract"
              onChange={changeHandler}
             // required
            />
          </div>
          <div className="form-group">
              <label htmlFor="contractPeriod">
                <small>Строк дії догшовору, міс</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Строк дії догшовору, міс"
                value={form.contractPeriod}
                name="contractPeriod"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="ipNumber">
                <small>ІПН</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="ІПН"
                value={form.ipNumber}
                name="ipNumber"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
            <label htmlFor="passportNumber">
              <small>Серія та номер паспорту</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Серія та номер паспорту"
              value={form.passportNumber}
              name="passportNumber"
              onChange={changeHandler}
             // required
            />
          </div>
            
         

          {/* {(form.driver === "Автомобіль" ||
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
                type="number"
                className="form-control important"
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
                type="number"
                className="form-control important"
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
                type="number"
                className="form-control important"
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
                type="number"
                className="form-control important"
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
              type="text"
              className="form-control important"
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
          </div> */}
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
          {!client && "Створити новий виріб"}
          {client && "Зберегти дані"}
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
