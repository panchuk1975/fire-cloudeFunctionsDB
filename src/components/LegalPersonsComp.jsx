import React, { memo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
//import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import {
  ExportReactCSV,
  carExelInfo,
  //carLiquidsExelInfo,
  //carListLiquidsExelInfo,
} from "../mathfunctions/liquidsFunctions";
import { CreateComponent } from "./CreateComponent";
import { ModalBox } from "./ModalBox";
import { AlertBox } from "./AlertBox";
import fire from "../config/Fire";
//import { ListComponent } from "./ListComponent";
var moment = require("moment");

export const LegalPersonsComp = memo(
  ({
    clients,
    dates,
    userInfos,
    removeClient,
    openClient,
    closeClient,
    windowWidth,
    clouseClient,

    //lists,
    //routes,
    // openNewList,
    // clouseNewList,
    // openNewRoute,
    // closeNewRoute,
    // openList,
    // closeList,
    // openRoute,
    // closeRoute,
   
    
  }) => {
    //------------------------------Alert functions block------------------------------//
    const dataWarningText =
      "Ви намагаєтеся видалити дані! Після видалення відновлення даних буде не можливим!";
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [modalClass, setClass] = useState("modal");
    let [fun, setFunct] = useState("");
    let [textModal, setModalText] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    //--------------------------------Create user data---------------------------------//
    var owner = fire.auth.currentUser.uid;
    let userInfo = userInfos.find((info) => info.owner === owner);
    if (!userInfo) {
      return null;
    }
    let userInUse = userInfos.find(
      (infoUse) => infoUse.company === userInfo.jointCompany
    );
    if (!userInUse) {
      return null;
    }
    //------------------------------Create clients data array------------------------------//
    clients = clients.filter((client) => client.owner === userInUse.owner);
    clients = clients.filter((client) => client.clientType === "Юрідичний");
    clients.sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    // clients.sort(
    //   (a, b) => (b.registrationDate - a.registrationDate)
    // );
    let clientsExists = clients.length;
    if (clientsExists === 0) {
      return null;
    }
    //---------------------------------Cars JSX block----------------------------------//
    return (
      <div>
        <div>
          <TransitionGroup component="ul" className="list-group">
            {clientsExists &&
              clients.map((client) => {
                // //--------------------Create client lists and routes-----------------------//
                // let newLists = lists.filter(
                //   (list) => list.listOwner === client.id
                // );
                // newLists.sort((a, b) => a.listNumber - b.listNumber);
                // let carRoutes = routes.filter(
                //   (route) => route.listOwner === client.id
                // );
                // //---------------------------Car liquids array---------------------------//
                // let listCarLiquids = NewListLiquidsCount(carRoutes);
                //------------------------Color alert types for TO----------------------//
                let clientType = null;
                if (client.clientType === "Юрідичний") {
                  clientType = "legalClients";
                } else {
                  clientType = "unlegalClients";
                }
                //--------------------------------JSX Car--------------------------------//
                return (
                  <CSSTransition key={client.id} classNames={"note"} timeout={800}>
                    <li
                      key={client.id}
                      className="list-group-item clientInnerLi"
                    >
                      <form
                        id="carBasis"
                        className="d-flex justify-content-between clientInnerForm"
                      >
                        {!client.openClient && (
                          <div
                            onClick={() => {
                              openClient(client);
                            }}
                          >
                            <table className="clientTable">
                              <tbody>
                                <tr align="center">
                                  {windowWidth > 265 && (
                                    <td width="150">
                                      <small className={clientType}>
                                        {client.companyName}
                                      </small>
                                    </td>
                                  )}
                                  <td width="100">
                                    <small>
                                      {client.secName}
                                    </small>
                                  </td>
                                  {windowWidth > 330 && (
                                    <td width="80">
                                      <small>{client.firstName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 390 && (
                                    <td width="120">
                                      <small>{client.thirdName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 522 && (
                                    <td width="82">
                                      <small>
                                        {`${moment(
                                          client.registrationDate
                                        ).format("DD.MM HH:mm")}`}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 532 && (
                                    <td width="80">
                                      <small>{client.contractNumber}</small>
                                    </td>
                                  )}
                                  {windowWidth > 762 && (
                                    <td width="300">
                                      <small>{client.adress}</small>
                                    </td>
                                  )}
                                  {windowWidth > 762 && (
                                    <td width="90">
                                      <small>{client.phonNumber}</small>
                                    </td>
                                  )}
                                  {windowWidth > 992 && (
                                    <td width="90">
                                      <small>{client.dateOfNegotiations}</small>
                                    </td>
                                  )}
                                  {windowWidth > 992 && (
                                    <td width="90">
                                      <small>{client.contractPeriod}</small>
                                    </td>
                                  )}
                                   {windowWidth > 992 && (
                                    <td width="90">
                                      <small>{client.dateOfSignContract}</small>
                                    </td>
                                  )}
                                  {/* {windowWidth > 1201 && (
                                    <td width="90">
                                      <small className={clientType}>ТО1: </small>
                                      <small className={typeRouteTO1}>
                                        {TO1}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="42" className={typeRouteTO1}>
                                      <small>{routeToTO1}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="90">
                                      <small className={clientType}>ТО2: </small>
                                      <small className={typeRouteTO2}>
                                        {TO2}
                                      </small>
                                    </td>
                                  )}
                                  {windowWidth > 1201 && (
                                    <td width="42" className={typeRouteTO2}>
                                      <small>{routeToTO2}</small>
                                    </td>
                                  )} */}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                        <div>
                          {!client.openClient &
                           // !newLists.length &
                            (userInfo.company === userInfo.jointCompany) && (
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm deleteCarBtn"
                              onClick={() => {
                                setId(client.id);
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
                      <form className="addingObjTable">
                        {client.openClient && (
                          <table
                            className="carTable"
                            onClick={() => {
                              closeClient(client);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="100">
                                  <small className={clientType}>КР: </small>
                                  {/* <small className={typeRouteКР}>{КР}</small> */}
                                </td>
                                {/* {windowWidth > 247 && (
                                  <td width="50" className={typeRouteКР}>
                                    <small>{routeToКР}</small>
                                  </td>
                                )} */}
                                {windowWidth > 327 && (
                                  <td width="100">
                                    <small className={clientType}>СР: </small>
                                    {/* <small className={typeRouteСР}>{СР}</small> */}
                                  </td>
                                )}
                                {/* {windowWidth > 377 && (
                                  <td width="50" className={typeRouteСР}>
                                    <small>{routeToСР}</small>
                                  </td>
                                )} */}
                                {windowWidth > 477 && (
                                  <td width="100">
                                    <small className={clientType}>ТО1: </small>
                                    {/* <small className={typeRouteTO1}>
                                      {TO1}
                                    </small> */}
                                  </td>
                                )}
                                {/* {windowWidth > 527 && (
                                  <td width="50" className={typeRouteTO1}>
                                    <small>{routeToTO1}</small>
                                  </td>
                                )} */}
                                {windowWidth > 770 && (
                                  <td width="100">
                                    <small className={clientType}>ТО2: </small>
                                    {/* <small className={typeRouteTO2}>
                                      {TO2}
                                    </small> */}
                                  </td>
                                )}
                                {/* {windowWidth > 770 && (
                                  <td width="50" className={typeRouteTO2}>
                                    <small>{routeToTO2}</small>
                                  </td>
                                )} */}
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </form>
                      {/* {!client.openClient && (
                        <ListComponent
                          client={client}
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
                        {client.openClient && (
                          <CreateComponent
                            client={client}
                            clients={clients}
                            userInfo={userInfo}
                          />
                        )}
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
                innerFunction={removeClient}
              />
            )}
            {/* {fun === "removeList" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeList}
              />
            )} */}
            <AlertBox
              modalClass={alertClass}
              modalText={alertText}
              modalFunction={setAlertClass}
            />
          </TransitionGroup>
        </div>
        <div className="d-flex justify-content-between">
          <ExportReactCSV
            csvData={carExelInfo(clients)}
            fileName={"авто"}
            textCSV="авто.xlx"
          />
          {/* <ExportReactCSV
            csvData={carLiquidsExelInfo(clients, lists, routes)}
            fileName={"пммАвто"}
            textCSV="пмм.xlx"
          /> */}
          {/* <ExportReactCSV
            csvData={carListLiquidsExelInfo(clients, lists, routes)}
            fileName={"пммЛист"}
            textCSV="листи.xlx"
          />    */}
        </div>
      </div>
    );
  }
);
