import React, { memo, useState, useContext } from "react";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
//import { CreateComponent } from "../5_create_components/CreateComponent";
import { ModalBox } from "../6_common_help_comp/ModalBox";
//import { ProjectsComponent } from "../3_sub_conteiners/ProjectsComponent";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import fire from "../../config/Fire";
var normalize = require("normalize-object");
var moment = require("moment");

export const ProfileComponent = memo(
  ({
    clients,
    dates,
    lists,
    routes,
    openCar,
    closeCar,
    openNewList,
    clouseNewList,
    openNewRoute,
    closeNewRoute,
    openList,
    closeList,
    openRoute,
    closeRoute,
    removeDates,
    userInfos,
    windowWidth,
    removeUserInfos,
    ownerDates,
  }) => {
    //-----------------------------User data----------------------------//
    const user = fire.auth.currentUser;
    const owner = fire.auth.currentUser.uid;
    const firebase = useContext(FirebaseContext);
    let userClients = clients.filter((client) => client.owner === owner);
    localStorage.setItem(
      "userClientsLength",
      JSON.stringify(userClients.length)
    );
    const date = dates.find((date) => date.owner === owner);
    let userInfo = normalize(userInfos.find((info) => info.owner === owner));
    let userInfoExsists = !!userInfo;
    if (userInfoExsists) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    } else {
      userInfo = JSON.parse(localStorage.getItem("userInfo"));
    }
    let currentUserEmail = fire.auth.currentUser.email;
    let cutEmail = currentUserEmail.split("@")[0];
    //------------------------------Alert box-----------------------------//
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [modalClass, setClass] = useState("modal");
    let [textModal, setModalText] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    //-----SET DATA BLOCK------------------------------------------->
    let [dateForm, setDateForm] = useState({
      ...ownerDates,
    });
    if (Object.keys(dateForm).length === 0) {
      dateForm = JSON.parse(localStorage.getItem("date"));
    } else {
      localStorage.setItem("date", JSON.stringify(dateForm));
    }
    const changeDateHandler = (event) => {
      setDateForm({ ...dateForm, [event.target.name]: event.target.value });
      console.log(event.target.name, event.target.value);
    };
    // //------------------------Set deleted Data-----------------------//
    // let holdTime = new Date();
    // let requiredHoldTime = new Date();
    // holdTime.setMonth(holdTime.getMonth() - Number(form.dateOfEnd));
    // requiredHoldTime.setMonth(holdTime.getMonth() - 36);
    // //----------------------Set deleted old Items--------------------//
    // let routesForRemove = [];
    // let listsForRemove = [];
    // if (Number(form.dateOfEnd) > 36) {
    //   routesForRemove = ownerAllRoutes.filter(
    //     (route) => Date.parse(route.routArrival) < Date.parse(requiredHoldTime)
    //   );
    //   if (routesForRemove.length === 0) {
    //     routesForRemove = ownerAllRoutes.filter(
    //       (route) => Date.parse(route.routDate) < Date.parse(requiredHoldTime)
    //     );
    //   }
    //   listsForRemove = ownerAllLists.filter(
    //     (list) => Date.parse(list.listDate) < Date.parse(requiredHoldTime)
    //   );
    // } else {
    //   routesForRemove = ownerAllRoutes.filter(
    //     (route) => Date.parse(route.routArrival) < Date.parse(holdTime)
    //   );
    //   if (routesForRemove.length === 0) {
    //     routesForRemove = ownerAllRoutes.filter(
    //       (route) => Date.parse(route.routDate) < Date.parse(holdTime)
    //     );
    //   }
    //   listsForRemove = ownerAllLists.filter(
    //     (list) => Date.parse(list.listDate) < Date.parse(holdTime)
    //   );
    // }
    //----------------------------Set Date---------------------------//
    const createDateHandler = (event) => {
      event.preventDefault();
      // if (routesForRemove.length !== 0) {
      //   setId(event);
      //   setModalText(dataWarningText);
      //   setModalClass();
      // }
      // if (listsForRemove.length !== 0) {
      //   setId(event);
      //   setModalText(dataWarningText);
      //   setModalClass();
      // }
      if (!ownerDates) {
        firebase
          .addDates({ ...form })
          .then(() => { })
          .catch(() => {
            console.log("Error");
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Дату встановлено!");
        setAlertClass("open");
      } else {
        firebase
          .changeDates({ ...form, id: ownerDates.id })
          .then(() => { })
          .catch(() => {
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Дату змінено!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //------------------------Delete Old Data-----------------------//
    const deleteDateHandler = (event) => {
      event.preventDefault();
      // routesForRemove.forEach((element) => {
      //   firebase
      //     .removeRoute(element.id)
      //     .then(() => {})
      //     .catch(() => {
      //       setAlertText("Ошибка сервера!");
      //       setAlertClass("open");
      //     });
      //   setAlertText("Маршрути успішно видалено!");
      //   setAlertClass("open");
      // });
      // listsForRemove.forEach((element) => {
      //   firebase
      //     .removeList(element.id)
      //     .then(() => {})
      //     .catch(() => {
      //       setAlertText("Ошибка сервера!");
      //       setAlertClass("open");
      //     });
      //   setAlertText("Застарілі дані успішно видалено!");
      //   setAlertClass("open");
      // });
      // setTimeout(() => {
      //   setAlertClass("modal");
      // }, 1000);
    };
   
    // let dataWarningText =
    //   "У вас є застарілі дані, необхідно видалити їх та звільніти місце!";
    let dataWarningThanksText =
      "Дякуємо за видалення застарілих даних, ви звільнили додаткове місце!";

      // ---SET PROFILE BLOCK--------------------------------------------->
         //--------------------------Profile Initial form----------------------//
    let initialForm = {
      firstName: "",
      secondName: "",
      mobilePhon: "",
      company: cutEmail,
      jointCompany: "",
      email: currentUserEmail,
      carID: "",
      owner,
    };
    if (userInfo) {
      if (userInfo.owner === owner) {
        initialForm = {
          firstName: userInfo.firstName,
          secondName: userInfo.secondName,
          mobilePhon: userInfo.mobilePhon,
          company: userInfo.company,
          jointCompany: userInfo.jointCompany,
          email: currentUserEmail,
          carID: userInfo.carID,
          owner,
        };
      }
    }
    //------------------------------Form state----------------------------//
    let [form, setForm] = useState({
      ...initialForm,
    });
    //---------------------------Form change hendler----------------------//
    let existsuserClients = false;
    const changeHandler = (event) => {
      setForm({ ...form, [event.target.name]: event.target.value });
    };
    //---------------------------------Check ID-----------------------------//
    if (userInfoExsists) {
      if (userInfo.company !== form.company) {
        existsuserClients = !!userInfos.filter(
          (info) => info.company === form.company
        ).length;
      }
    }
    //-----------------------------Create user profile----------------------//
    const createProfileHandler = (event) => {
      event.preventDefault();
      !form.company && setAlertText("Особистий ідентифікатор обовязковий!");
      !form.company && setAlertClass("open");
      if (form.company) {
        firebase
          .addUserInfo({ ...form })
          .then(() => {})
          .catch((err) => {
            console.log(err);
            setAlertText("Ошибка сервера!");
            setAlertClass("open");
          });
        setAlertText("Профіль створено!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //-----------------------------Change user profile----------------------//
    const changeProfileHandler = (event) => {
      event.preventDefault();
      !form.company && setAlertText("Особистий ідентифікатор обовязковий!");
      !form.company && setAlertClass("open");
      existsuserClients &&
        setAlertText("Такий ідентифікатор вже існує, оберіть інший!");
      existsuserClients && setAlertClass("open");
      if (form.company) {
        if (!existsuserClients) {
          firebase
            .changeUserInfo({ ...form, id: userInfo.id })
            .then(() => {})
            .catch(() => {
              setAlertText("Ошибка сервера!");
              setAlertClass("open");
            });
          setAlertText("Профіль змінено!");
          setAlertClass("open");
        }
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1000);
    };
    //---------------------------Remove account function-----------------------//
    const dataAccountWarningText =
      "Ви намагаєтеся видалити дані аккаунта! Відновлення даних буде не можливим!!!";
    const removeAccounte = (user) => {
      let userClientsLength = JSON.parse(
        localStorage.getItem("userClientsLength")
      );
      if (userClientsLength === 0) {
        user.delete().catch((error) => {
          setAlertText(error.message);
          setAlertClass("open");
        });
        if (date) {
          removeDates(date.id);
        }
        if (userInfo) {
          removeUserInfos(userInfo.id);
        }
        return;
      } else {
        setAlertText("Для видалення аккаунта видаліть всі об'єкти!");
        setAlertClass("open");
      }
      setTimeout(() => {
        setAlertClass("modal");
      }, 1500);
    };
    //-------------------------------------Alert block------------------------------//
    const dataWarningText =
      "Ви намагаєтеся видалити дані! Після видалення відновлення даних буде не можливим!";
    const { removeCar, removeList } = useContext(FirebaseContext);
    let [fun, setFunct] = useState("");
    //------------------------------------Open car for ID-----------------------------//
    if (userInfo) {
      if (userInfo.carID) {
        userClients = userClients.filter(
          (client) => client.objectPassword === userInfo.carID
        );
      } else {
        userClients = [];
      }
    } else {
      userClients = [];
    }
    let carExists = !!userClients.length;
    //-----------------------------------------JSX------------------------------------//
    return (
      <div>
              <div>
        <div id="2345" className="createTimeBasis">
          <div className="d-flex flex-wrap justify-content-around">
            <div className="form-group">
              <label htmlFor="dateStart">
                <small>Початкова дата</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Початкова дата"
                value={moment(form.dateStart).format("YYYY-MM-DD")}
                name="dateStart"
                onChange={changeDateHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateFinish">
                <small>Кінцева дата</small>
              </label>
              <input
                type="date"
                className="form-control"
                placeholder="Кінцева дата"
                value={moment(form.dateFinish).format("YYYY-MM-DD")}
                name="dateFinish"
                onChange={changeDateHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfEnd">
                <small>Час зберігання,міс</small>
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Період зберігання,міс"
                value={form.dateOfEnd}
                name="dateOfEnd"
                onChange={changeDateHandler}
              />
            </div>
            <div className="createDateBtnConteiner">
              <button
                className="btn btn-success createDateBtn"
                value="Дата"
                name="submit"
                onClick={createDateHandler}
              >
                <small>Зберегти</small>
              </button>
            </div>
            <div className="createDateBtnConteiner">
              <button
                className="btn btn-danger createDateBtn"
                value="Дата"
                name="submit"
                onClick={(event) => {
                  setId(event);
                  setModalText(dataWarningThanksText);
                  setModalClass();
                }}
              >
                <small>Очистити</small>
              </button>
            </div>
          </div>
        </div>
        <div className="userInfoBasis">
          <div id="form" className="d-flex flex-wrap justify-content-between">
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
              <label htmlFor="secondName">
                <small>Призвіще</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Призвіще"
                value={form.secondName}
                name="secondName"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobilePhon">
                <small>Телефон</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Телефон"
                value={form.mobilePhon}
                name="mobilePhon"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">
                <small>Ідентифікатор</small>
              </label>
              <input
                type="text"
                className="important form-control"
                placeholder="Ідентифікатор"
                value={form.company}
                name="company"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="jointCompany">
                <small>Відображення</small>
              </label>
              <input
                type="text"
                className="important form-control"
                placeholder="Відображення"
                value={form.jointCompany}
                name="jointCompany"
                onChange={changeHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={form.email}
                onChange={changeHandler}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="carID">
                <small>Окремий ID</small>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="ID"
                value={form.carID}
                name="carID"
                onChange={changeHandler}
              />
            </div>
          </div>
          <div className=" d-flex justify-content-between">
            <button
              id="changeInfoBtn"
              className="btn btn-danger"
              value="Зберегти"
              name="submit"
              onClick={() => {
                setFunct("removeAccount");
                setModalText(dataAccountWarningText);
                setModalClass();
              }}
            >
              <small>Видалити аккаунт!</small>
            </button>
            {userInfoExsists && (
              <button
                id="changeInfoBtn"
                className="btn btn-success"
                value="Зберегти"
                name="submit"
                onClick={changeProfileHandler}
              >
                <small>Зберегти</small>
              </button>
            )}
            {!userInfoExsists && (
              <button
                id="changeInfoBtn"
                className="btn btn-success"
                value="Зберегти"
                name="submit"
                onClick={createProfileHandler}
              >
                <small>Створити</small>
              </button>
            )}
          </div>
        </div>
        <hr className="hrProfile" />
        <TransitionGroup
          id="TransitionGroup"
          component="ul"
          className="list-group"
        >
          {carExists &&
            userClients.map((car) => {
              //-----------------------------Car GSX---------------------------//
              if (!userInfo) {
                return null;
              }
              return (
                <CSSTransition key={car.id} classNames={"note"} timeout={800}>
                  <li key={car.id} id="carInnerLi" className="list-group-item">
                    <form
                      id="carBasis"
                      className="d-flex  justify-content-start"
                    >
                      {!car.openCar & (car.driver === "Автомобіль") && (
                        <div
                          onClick={() => {
                            openCar(car);
                          }}
                        >
                          <table className="carTable">
                            <tbody>
                              <tr align="center">
                                {windowWidth > 265 && (
                                  <td width="100">
                                    {/* <small className={carType}>
                                      {car.typeOfCar}
                                    </small> */}
                                  </td>
                                )}
                                <td width="88">
                                  {/* <small className={carType}>
                                    {car.governmentCarNumber}
                                  </small> */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      )}
                      <div>
                        {
                        //!car.openCar &
                          //!newLists.length &
                          (userInfo.company === userInfo.jointCompany) &
                          (userInfo.owner === car.owner) && (
                          <button
                            id="deleteCarBtn"
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => {
                              setId(car.id);
                              setFunct("removeCar");
                              setModalText(dataWarningText);
                              setModalClass();
                            }}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    </form>
                    <form className="addingObjTableProf">
                        <table
                          className="carTable"
                          onClick={() => {
                            closeCar(car);
                          }}
                        >
                          <tbody>
                            <tr align="center">
                              <td width="100">
                                {/* <small className={carType}>КР: </small>
                                <small className={typeRouteКР}>{КР}</small> */}
                              </td>
                              {windowWidth > 247 && (
                                <td width="50"
                                //className={typeRouteКР}
                                >
                                  {/* <small>{routeToКР}</small> */}
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                     </form>
                    {/* {!car.openCar && (
                      <ProjectsComponent
                        car={car}
                        dates={dates}
                        routes={routes}
                        newLists={newLists}
                        openNewList={openNewList}
                        clouseNewList={clouseNewList}
                        openNewRoute={openNewRoute}
                        closeNewRoute={closeNewRoute}
                        openList={openList}
                        closeList={closeList}
                        openRoute={openRoute}
                        closeRoute={closeRoute}
                        windowWidth={windowWidth}
                        setAlertClass={setAlertClass}
                        setAlertText={setAlertText}
                        setFunct={setFunct}
                        setModalText={setModalText}
                        setModalClass={setModalClass}
                        setId={setId}
                        modalClass={modalClass}
                        carRoutes={carRoutes}
                        listCarLiquids={listCarLiquids}
                        userInfo={userInfo}
                      />
                    )} */}
                    <form>
                      {/* {car.openCar && (
                        <CreateComponent
                          car={car}
                          userClients={userClients}
                          userInfo={userInfo}
                        />
                      )} */}
                    </form>
                  </li>
                </CSSTransition>
              );
            })}
          {fun === "removeCar" && (
            <ModalBox
              modalClass={modalClass}
              modalText={textModal}
              modalFunction={setClass}
              Id={Id}
              innerFunction={removeCar}
            />
          )}
          {fun === "removeList" && (
            <ModalBox
              modalClass={modalClass}
              modalText={textModal}
              modalFunction={setClass}
              Id={Id}
              innerFunction={removeList}
            />
          )}
          {fun === "removeAccount" && (
            <ModalBox
              modalClass={modalClass}
              modalText={textModal}
              modalFunction={setClass}
              Id={user}
              innerFunction={removeAccounte}
            />
          )}
           <ModalBox
          modalClass={modalClass}
          modalText={textModal}
          modalFunction={setClass}
          Id={Id}
          innerFunction={deleteDateHandler}
        />
        </TransitionGroup>
        <AlertBox
          modalClass={alertClass}
          modalText={alertText}
          modalFunction={setAlertClass}
        />
      </div>
      </div>
    );
  }
);
