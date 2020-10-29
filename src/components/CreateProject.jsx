import React, { useState, useContext, memo } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
var moment = require("moment");

export const CreateProject = memo(
  ({ client, project, setAlertText, setAlertClass, newProjects, userInfo }) => {
    const firebase = useContext(FirebaseContext);
    let initialForm = {};
    if (!project) {
      initialForm = {
        projectNumber: "",
        projectDate: moment(new Date()).format("YYYY-MM-DD"),
        typesOfLandWorks: "",
        projectCost: 0,
        contractExistence: "В наявності",
        signaturуOfAct: "В наявності",
        paymentDate: moment(new Date()).format("YYYY-MM-DD"),
        аmountOfPayments: 0,
        amountOfDebt: 0,
        fullCalculation: 0,

        departure: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        arrival: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
        indicatorListStart: client.carIndicatorLast,
        indicatorListFinish: 0,
        totalListMileage: 0,
        timeListFirst: client.carTimeFinish,
        timeListLast: 0,
        timeListTotal: 0,
        season: 1,
        openList: false,
        openRoute: false,
      };
    } else {
      initialForm = {
        ...project,
        openProject: false,
        openTask: false,
      };
    }
    let [form, setForm] = useState({ ...initialForm });
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    const createHandler = (event) => {
      let isListExists = !!newProjects.filter(
        // eslint-disable-next-line
        (project) => Number(project.projectNumber) == Number(form.projectNumber)
      ).length;
      event.preventDefault();
      !form.listNumber && setAlertText("Номер листа обовязковий!");
      !form.listNumber && setAlertClass("open");
      if (form.listNumber) {
        if (!project) {
          if (!isListExists) {
            if (
              (userInfo.company === userInfo.jointCompany) &
              (userInfo.owner === client.owner)
            ) {
              firebase
                .addList(form, client)
                .then(() => {
                  firebase.clouseNewList(client);
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
            (userInfo.owner === client.owner)
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
    if (!project) {
      classListBasis = "CreateListStyle";
    } else {
      classListBasis = "ModifyListStyle";
    }
    return (
      <div id={classListBasis}>
        <div>
          <div className="d-flex  flex-wrap justify-content-between">
            <div className="form-group">
              <label htmlFor="projectNumber">
                <small>Номер проекту</small>
              </label>
              <input
                type="text"
                className="form-control important"
                placeholder="Номер проекту"
                value={form.projectNumber}
                name="projectNumber"
                onChange={changeHandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectDate">
                <small>Дата проекту</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата листа"
                value={moment(form.projectDate).format("YYYY-MM-DD")}
                name="projectDate"
                onChange={changeHandler}
              />
            </div>
              <div className="form-group">
                <label htmlFor="typesOfLandWorks">
                  <small>Види землевпорядних робіт</small>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Види робіт"
                  value={form.typesOfLandWorks}
                  name="typesOfLandWorks"
                  onChange={changeHandler}
                />
              </div>
            <div className="form-group">
              <label htmlFor="projectCost">
                <small>Ціна проекту</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Ціна проекту"
                value={form.projectCost}
                name="projectCost"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contractExistence">
                <small>Наявність договору</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Наявність договору"
                value={form.contractExistence}
                name="contractExistence"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="signaturуOfAct">
                <small>Наявність підпису</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="виконаних робіт"
                value={form.signaturуOfAct}
                name="signaturуOfAct"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentDate">
                <small>Дата оплати</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Дата оплати"
                value={moment(form.paymentDate).format("YYYY-MM-DD")}
                name="paymentDate"
                onChange={changeHandler}
              />
            </div>
{/* 
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
              </div> */}
              <div  className="form-group">
                <label htmlFor="аmountOfPayments">
                  <small>Сумма оплати</small>
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Сумма оплати"
                  value={form.аmountOfPayments}
                  name="аmountOfPayments"
                  onChange={changeHandler}
                />
              </div>
              <div  className="form-group">
                <label htmlFor="amountOfDebt">
                  <small>Сума заборгованості</small>
                </label>
                <input
                  type="amountOfDebt"
                  className="form-control"
                  placeholder="Сума заборгованості"
                  value={form.amountOfDebt}
                  name="amountOfDebt"
                  onChange={changeHandler}
                />
              </div>
              <div className="form-group">
              <label htmlFor="fullCalculation">
                <small>Повний розрахунок</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Повний розрахунок"
                value={form.fullCalculation}
                name="fullCalculation"
                onChange={changeHandler}
              />
            </div>



            
         
            {(client.driver === "Автомобіль" ||
              client.driver === "Автомобіль-агрегат") && (
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
            {(client.driver === "Автомобіль" ||
              client.driver === "Автомобіль-агрегат") && (
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
            {(client.driver === "Автомобіль" ||
              client.driver === "Автомобіль-агрегат") && (
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
            {(client.driver === "Електроприлад" ||
              client.driver === "Автомобіль-агрегат" ||
              client.driver === "Агрегат") && (
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
            {(client.driver === "Електроприлад" ||
              client.driver === "Автомобіль-агрегат" ||
              client.driver === "Агрегат") && (
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
            {(client.driver === "Електроприлад" ||
              client.driver === "Автомобіль-агрегат" ||
              client.driver === "Агрегат") && (
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
            {(client.driver === "Автомобіль" ||
              client.driver === "Автомобіль-агрегат" ||
              client.driver === "Агрегат") && (
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
            {!project && "Створити лист"}
            {project && "Зберегти дані"}
          </button>
        </div>
      </div>
    );
  }
);
