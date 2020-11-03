import React, { memo, useState, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import {
  ExportReactCSV,
  instExelInfo,
  instTimeExelInfo,
} from "../mathfunctions/liquidsFunctions";
import { CreateComponent } from "./CreateComponent";
import { ModalBox } from "./ModalBox";
import { AlertBox } from "./AlertBox";
import fire from "../config/Fire";
import { AllProjectsComponent } from "./AllProjectsComponent";
var moment = require("moment");

export const AllProjects = memo(
  ({
    //---COMMON DATES ----------------------->
    windowWidth,
    clientType,
    //---COMMON STATE ----------------------->
    dates,
    userInfos,
    clients,
    projects,
    //---CLIENT FUNCTIONS ------------------->
    removeClient,
    //---PROJECTS FUNCTIONS ----------------->
    addProject,
    openProject,
    clouseProject,
    removeProject,
    openCurrentProject,
    clouseCurrentProject,
  }) => {
    //---Alert functions block---------------->
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
    //--Create user data----------------------->
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
    //--Create clients data array--------------->
    clients = clients.filter((client) => client.owner === userInUse.owner);
    //clients = clients.filter((client) => client.clientType === clientType);
    clients.sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    let clientsExists = clients.length;
    if (clientsExists === 0) {
      return null;
    }
     //--TABLE FUNCTION-------------------------->
     let sizeArray = [
      { size: 75, name: "№ проекту" },
      { size: 50, name: "Строк дог." },
      { size: 30, name: "Підп." },
      { size: 30, name: "Пакет" },
      { size: 25, name: "ТД" },
      { size: 25, name: "Екс" },
      { size: 25, name: "ДЗК" },
      { size: 20, name: "%" },
      { size: 50, name: "Сума" },
      { size: 100, name: "Розрахунок " },
      { size: 100, name: "Відповідальний" },
      { size: 100, name: "Виконавець" },
      { size: 100, name: "Термін" },
      { size: 150, name: "Термін" },
    ];
    if (windowWidth > 800) {
      sizeArray = [
        { size: 80, name: "№ проекту" },
        { size: 80, name: "Строк договору" },
        { size: 70, name: "Підпис клієнта" },
        { size: 70, name: "Пакет докум." },
        { size: 70, name: "Техн. док." },
        { size: 70, name: "Екст. погод." },
        { size: 70, name: "ДЗК" },
        { size: 100, name: "%" },
        { size: 100, name: "Сума" },
        { size: 100, name: "Розрахунок " },
        { size: 100, name: "Відповідальний" },
        { size: 100, name: "Виконавець" },
        { size: 100, name: "Термін" },
        { size: 150, name: "Термін" },
      ]
    }
    const summArray = (numb, sizeArray) => {
      let i = 0;
      let summ = 0;
      while (i < numb) {
        summ = summ + sizeArray[i].size;
        i++;
      }
      return summ;
    };
    //---------------------------------Cars JSX block----------------------------------//
    return (
      <div>
        <li className="list-group-item clientInnerLi">
          <div>
          <div className="d-flex justify-content-between">
            <table className="headTable">
              <tbody>
                <tr align="center">
                  {windowWidth > 75 + summArray(1, sizeArray) && (
                    <td width={sizeArray[0].size}>
                      <small>{sizeArray[0].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(2, sizeArray) && (
                    <td width={sizeArray[1].size}>
                      <small>{sizeArray[1].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(3, sizeArray) && (
                    <td width={sizeArray[2].size}>
                      <small>{sizeArray[2].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(4, sizeArray) && (
                    <td width={sizeArray[3].size}>
                      <small>{sizeArray[3].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(5, sizeArray) && (
                    <td width={sizeArray[4].size}>
                      <small>{sizeArray[4].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(6, sizeArray) && (
                    <td width={sizeArray[5].size}>
                      <small>{sizeArray[5].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(7, sizeArray) && (
                    <td width={sizeArray[6].size}>
                      <small>{sizeArray[6].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(8, sizeArray) && (
                    <td width={sizeArray[7].size}>
                      <small>{sizeArray[7].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(9, sizeArray) && (
                    <td width={sizeArray[8].size}>
                      <small>{sizeArray[8].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(10, sizeArray) && (
                    <td width={sizeArray[9].size}>
                      <small>{sizeArray[9].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(11, sizeArray) && (
                    <td width={sizeArray[10].size}>
                      <small>{sizeArray[10].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(12, sizeArray) && (
                    <td width={sizeArray[11].size}>
                      <small>{sizeArray[11].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(13, sizeArray) && (
                    <td width={sizeArray[12].size}>
                      <small>{sizeArray[12].name}</small>
                    </td>
                  )}
                  {windowWidth > 75 + summArray(14, sizeArray) && (
                    <td width={sizeArray[13].size}>
                      <small>{sizeArray[13].name}</small>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
            {clientsExists &&
              clients.map((client) => {
                //--------------------Create client projects and routes-----------------------//
                let newProjects = projects.filter(
                  (project) => project.projectOwner === client.id
                );
                newProjects.sort((a, b) => a.projectNumber - b.projectNumber);
                //---------------------------CLIENTS RENDER----------------------------//
                return (
                  <AllProjectsComponent
                    client={client}
                    dates={dates}
                    //routes={routes}
                    newProjects={newProjects}
                    //openNewRoute={openNewRoute}
                    //closeNewRoute={closeNewRoute}
                    addProject={addProject}
                    openProject={openProject}
                    clouseProject={clouseProject}
                    removeProject={removeProject}
                    openCurrentProject={openCurrentProject}
                    clouseCurrentProject={clouseCurrentProject}
                    //openRoute={openRoute}
                    //closeRoute={closeRoute}
                    windowWidth={windowWidth}
                    setAlertClass={setAlertClass}
                    setAlertText={setAlertText}
                    setFunct={setFunct}
                    setModalText={setModalText}
                    setModalClass={setModalClass}
                    setId={setId}
                    modalClass={modalClass}
                    //carRoutes={carRoutes}
                    //listCarLiquids={listCarLiquids}
                    userInfo={userInfo}
                  />
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
            {fun === "removeList" && (
              <ModalBox
                modalClass={modalClass}
                modalText={textModal}
                modalFunction={setClass}
                Id={Id}
                innerFunction={removeProject}
              />
            )}
            <AlertBox
              modalClass={alertClass}
              modalText={alertText}
              modalFunction={setAlertClass}
            />
          </div>
          <div className="d-flex justify-content-between">
            {/* <ExportReactCSV
            csvData={carExelInfo(clients)}
            fileName={"авто"}
            textCSV="авто.xlx"
          /> */}
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
        </li>
      </div>
    );
  }
);
