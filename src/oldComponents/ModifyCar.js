import React, { useState, useContext } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { AlertBox } from "../components/AlertBox";

export const ModifyCar = ({ car, lists }) => {
  let [alertClass, setAlertClass] = useState("modal");
  let [alertText, setAlertText] = useState("");
  const firebase = useContext(FirebaseContext);

  let [form, setForm] = useState({ ...car, openCar: false });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const modifyHandler = (event) => {
    !form.governmentCarNumber && setAlertText("Номер авто обовязковий!");
    !form.typeOfCar && setAlertText("Тип авто обовязковий!");
    !form.governmentCarNumber && setAlertClass("open");
    !form.typeOfCar && setAlertClass("open");
    event.preventDefault();
    if (form.governmentCarNumber) {
      if (form.typeOfCar) {
        firebase
          .closeCar(form)
          .then(() => {})
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Інформацію скореговано!");
        setAlertClass("open");
      }
    }
  };
  return (
    <div>
      <div id="modifyCarForm">
        <div className="d-flex  flex-wrap justify-content-between">
          <div className="form-group">
            <label htmlFor="typeOfCar">
              <small>Тип авто</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Тип авто"
              value={form.typeOfCar}
              name="typeOfCar"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="governmentCarNumber">
              <small>Державний номер</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Державний номер"
              value={form.governmentCarNumber}
              name="governmentCarNumber"
              onChange={changeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="factoryCarNumber">
              <small>Номер шасі</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Номер шасі"
              value={form.factoryCarNumber}
              name="factoryCarNumber"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateOfRegistration">
              <small>Дата регістрації</small>
            </label>
            <input
              id="date"
              type="date"
              className="form-control"
              placeholder="Дата регістрації"
              value={form.dateOfRegistration}
              name="dateOfRegistration"
              onChange={changeHandler}
            />
          </div>
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
              <small>Номер спецобладнання</small>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Номер спецобладнання"
              value={form.specialCarEquipmentNumber}
              name="specialCarEquipmentNumber"
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
            <label htmlFor="carIndicatorFirst">
              <small>Початковий кілометраж</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Початковий кілометраж"
              value={form.carIndicatorFirst}
              name="carIndicatorFirst"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carIndicatorLast">
              <small>Останній показник</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Останній показник"
              value={form.carIndicatorLast}
              name="carIndicatorLast"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalCarMileage">
              <small>Загальний пробіг</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Загальний пробіг"
              value={form.totalCarMileage}
              name="totalCarMileage"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carTimeStart">
              <small>Початкові мотогодини</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Початкові мотогодини"
              value={form.carTimeStart}
              name="carTimeStart"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carTimeFinish">
              <small>Останні мотогодини</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Останні мотогодини"
              value={form.carTimeFinish}
              name="carTimeFinish"
              onChange={changeHandler}
            />
          </div>
          {/* <div className="form-group">
            <label htmlFor="carTimeLast">
              <small>Останні мотогодини</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="carTimeLast"
              value={form.carTimeLast}
              name="Останні мотогодини"
              onChange={changeHandler}
            />
          </div> */}
          <div className="form-group">
            <label htmlFor="carTimeTotal">
              <small>Загальне напрацювання</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Загальне напрацювання"
              value={form.carTimeTotal}
              name="carTimeTotal"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuelActiveСonsumption">
              <small>Палива на км</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Палива на км"
              value={form.fuelActiveСonsumption}
              name="fuelActiveСonsumption"
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuelPassiveСonsumption">
              <small>Палива на год</small>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Палива на год"
              value={form.fuelPassiveСonsumption}
              name="fuelPassiveСonsumption"
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <button
          id="saveCarBtn"
          className="btn btn-success"
          value="Enter"
          name="submit"
          onClick={modifyHandler}
        >
          Зберегти зміни
        </button>
      </div>
      {!car.openCar && (
        <details>
          <summary>
            <small>Дорожні листи</small>
          </summary>
          {lists.map((list) => (
            <div
              key={list.id}
              className="d-flex flex-wrap justify-content-around bg-info"
              style={{ margin: 3 }}
            >
              <div>{list.listNumber}</div>
              <div>{list.listDate}</div>
              <div>{list.listRouteFrom}</div>
              <div>{list.listRouteTo}</div>
              <div>{list.totalListMileage}</div>
              <div>{list.timeListTotal}</div>
            </div>
          ))}
        </details>
      )}
      <AlertBox
        modalClass={alertClass}
        modalText={alertText}
        modalFunction={setAlertClass}
      />
    </div>
  );
};
