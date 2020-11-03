import React, { memo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
//import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import { CreateProject } from "./CreateProject";
//import { RouteComponent } from "./RouteComponent";
import fire from "../config/Fire";
//import "../CSS/ListCompStyle.scss";
var moment = require("moment");

export const ProjectsComponent = memo(
  ({
    client,
    dates,
    userInfo,
    newProjects,

    openProject,
    clouseProject,
    openCurrentProject,
    clouseCurrentProject,

    windowWidth,
    setAlertClass,
    setAlertText,
    setFunct,
    setModalText,
    setModalClass,
    setId,
    modalClass,
    openClientTableClass,

    carRoutes,
    //routes,
    openNewList,
    clouseNewList,
    openNewRoute,
    closeNewRoute,
    openList,
    closeList,
    openRoute,
    closeRoute,

    changeListRouteTime,
    //listCarLiquids,
  }) => {
    let dataListWarningText =
      "Видалення проекту! Для видалення клієнту необхідно видалити всі проекти!!!";
    let owner = fire.auth.currentUser.uid;
    let ownerDates = dates.find((date) => date.owner === owner);
    if (!ownerDates) {
      ownerDates = {
        dateStart: "1970-01-01T00:00",
        dateFinish: "2070-01-01T00:00",
      };
    }
    //let listCarLiquids = [];
    // newProjects = newProjects.filter((project) => project.progectDate >= ownerDates.dateStart);
    // newProjects = newProjects.filter(
    //   (project) => project.listDate <= ownerDates.dateFinish
    // );
    // let newCarRoutes = routes.filter((route) => route.listOwner === car.id);

    //--TABLE FUNCTION-------------------------->
    const sizeArray = [
      75,
      50,
      30,
      30,
      30,

      50,
      100,
      100,
      100,
      100,
      100,
      100,
      100,
      150,
    ];
    const summArray = (numb, sizeArray) => {
      let i = 0;
      let summ = 0;
      while (i < numb) {
        summ = summ + sizeArray[i];
        i++;
      }
      return summ;
    };
    //-----------------------RENDER----------------->
    return (
      <form>
        <details>
          <summary id="summary">
            <div
              id="summaryConteiner"
              className="d-flex justify-content-between"
            >
              <small id="small">Проекти</small>
              {userInfo.company === userInfo.jointCompany && (
                <small id="small" className="smallEnd">
                  {/* {car.objectPassword} */}
                </small>
              )}
            </div>
          </summary>
          <div className="d-flex justify-content-between">
            <table className="headTable">
              <tbody>
                <tr align="center">
                  {windowWidth > 70 + summArray(1, sizeArray) && (
                    <td width={sizeArray[0]}>
                      <small>№ проекту</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(2, sizeArray) && (
                    <td width={sizeArray[1]}>
                      <small>Дата</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(3, sizeArray) && (
                    <td width={sizeArray[2]}>
                      <small>Дог.</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(4, sizeArray) && (
                    <td width={sizeArray[3]}>
                      <small>ПАВР</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(5, sizeArray) && (
                    <td width={sizeArray[4]}>
                      <small>Пакет</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(6, sizeArray) && (
                    <td width={sizeArray[5]}>
                      <small>Підпис</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(7, sizeArray) && (
                    <td width={sizeArray[6]}>
                      <small>Дата</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(8, sizeArray) && (
                    <td width={sizeArray[7]}>
                      <small>Сумма</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(9, sizeArray) && (
                    <td width={sizeArray[8]}>
                      <small>Сумма</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(10, sizeArray) && (
                    <td width={sizeArray[9]}>
                      <small>Розрахунок</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(11, sizeArray) && (
                    <td width={sizeArray[10]}>
                      <small>Відповідальний</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(12, sizeArray) && (
                    <td width={sizeArray[11]}>
                      <small>Виконавець</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(13, sizeArray) && (
                    <td width={sizeArray[12]}>
                      <small>Термін</small>
                    </td>
                  )}
                  {windowWidth > 70 + summArray(14, sizeArray) && (
                    <td width={sizeArray[13]}>
                      <small>Термін</small>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <TransitionGroup component="ul" className="project-group">
            {newProjects.map((project) => {
              let newRoutes = [];
              // let newRoutes = routes.filter(
              //   (route) => route.routeOwner === project.id
              // );
              newRoutes.sort((a, b) => a.routNumber - b.routNumber);
              //let listLiquids = NewListLiquidsCount(newRoutes);
              //--DYNAMIC CLASSES ----------------------------->
              let contractExistenceClass = project.contractExistence ? "good" : "bad"
              console.log(contractExistenceClass)
              return (
                <CSSTransition
                  key={project.id}
                  classNames={"note"}
                  timeout={800}
                >
                  <li
                    key={project.id}
                    className="project-group-item projectInnerLi"
                  >
                    {!project.openProject && (
                      <div key={project.id} className="projectBasis">
                        <div className="d-flex justify-content-between">
                          <table
                            className="projectTable"
                            onClick={() => openCurrentProject(project)}
                          >
                            <tbody>
                              <tr align="center">
                                {windowWidth > 70 + summArray(1, sizeArray) && (
                                  <td width={sizeArray[0]} className="head">
                                    <small>{project.projectNumber}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(2, sizeArray) && (
                                  <td width={sizeArray[1]} className="head">
                                    <small>{`${moment(
                                      project.projectDate
                                    ).format("DD.MM.YY")}`}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(3, sizeArray) && (
                                  <td width={sizeArray[2]}>
                                    <small>{project.contractExistence}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(4, sizeArray) && (
                                  <td width={sizeArray[3]}>
                                    <small>{project.signaturуOfAct}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(5, sizeArray) && (
                                  <td width={sizeArray[4]}>
                                    <small>{project.contractExistence}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(6, sizeArray) && (
                                  <td width={sizeArray[5]}>
                                    <small>{project.signaturуOfAct}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(7, sizeArray) && (
                                  <td width={sizeArray[6]} className="head">
                                    <small>{`${moment(
                                      project.paymentDate
                                    ).format("DD.MM.YY")}`}</small>
                                  </td>
                                )}

                                {windowWidth > 70 + summArray(8, sizeArray) && (
                                  <td width={sizeArray[7]}>
                                    <small>{project.аmountOfPayments}</small>
                                  </td>
                                )}
                                {windowWidth > 70 + summArray(9, sizeArray) && (
                                  <td width={sizeArray[8]}>
                                    <small>{project.amountOfDebt}</small>
                                  </td>
                                )}
                                {windowWidth >
                                  70 + summArray(10, sizeArray) && (
                                    <td width={sizeArray[9]}>
                                      <small>{project.fullCalculation}</small>
                                    </td>
                                  )}
                                {windowWidth >
                                  70 + summArray(11, sizeArray) && (
                                    <td width={sizeArray[10]}>
                                      <small>
                                        {project.responsibleForLandManage}
                                      </small>
                                    </td>
                                  )}
                                {windowWidth >
                                  70 + summArray(12, sizeArray) && (
                                    <td width={sizeArray[11]}>
                                      <small>{project.contractor}</small>
                                    </td>
                                  )}
                                {windowWidth >
                                  70 + summArray(13, sizeArray) && (
                                    <td width={sizeArray[12]}>
                                      <small>{project.termOfPerformance}</small>
                                    </td>
                                  )}
                                {windowWidth >
                                  70 + summArray(14, sizeArray) && (
                                    <td width={sizeArray[13]}>
                                      <small>{project.termOfPerformance}</small>
                                    </td>
                                  )}
                              </tr>
                            </tbody>
                          </table>
                          {!project.openProject &
                            !newRoutes.length &
                            (userInfo.company === userInfo.jointCompany) &
                            (userInfo.owner === client.owner) && (
                              <button
                                id="deleteProjectBtn"
                                type="button"
                                className="btn btn-outline-danger btn-sm deleteProjectBtn"
                                onClick={() => {
                                  setId(project.id);
                                  setFunct("removeList");
                                  setModalText(dataListWarningText);
                                  setModalClass();
                                }}
                              >
                                Х
                              </button>
                            )}
                        </div>
                      </div>
                    )}
                    <div>
                      <div
                        className="clouseProjectBasis"
                        onClick={() => clouseCurrentProject(project)}
                      >
                        {project.openProject && (
                          <table className="clouseProjectForm">
                            <tbody>
                              <tr className="clouseProjectTableButton">
                                <td>Закрити форму проекта</td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                      {project.openProject && (
                        <CreateProject
                          className={openClientTableClass}
                          client={client}
                          project={project}
                          setAlertText={setAlertText}
                          setAlertClass={setAlertClass}
                          newProjects={newProjects}
                          userInfo={userInfo}
                        />
                      )}
                    </div>
                    {/* <RouteComponent
                      car={car}
                      project={project}
                      setId={setId}
                      newRoutes={newRoutes}
                      //newCarRoutes={newCarRoutes}
                      openRoute={openRoute}
                      closeRoute={closeRoute}
                      openNewRoute={openNewRoute}
                      closeNewRoute={closeNewRoute}
                      setFunct={setFunct}
                      setModalClass={setModalClass}
                      setModalText={setModalText}
                      windowWidth={windowWidth}
                      setAlertText={setAlertText}
                      setAlertClass={setAlertClass}
                      listLiquids={listLiquids}
                      changeListRouteTime={changeListRouteTime}
                      modalClass={modalClass}
                      carRoutes={carRoutes}
                      clouseNewList={clouseNewList}
                      userInfo={userInfo}
                    /> */}
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          {/* <div id="countRoutesGroup" className="d-flex justify-content-between">
            {windowWidth > 995 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headStart"> {liquid.balanceStart}</small>
                  </pre>
                );
              })}
            {windowWidth > 512 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headAdd"> {liquid.received}</small>
                  </pre>
                );
              })}
            {windowWidth > 770 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headExpended"> {liquid.expended}</small>
                  </pre>
                );
              })}
            {windowWidth > 335 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquids">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headEnd"> {liquid.balanceFinish}</small>
                  </pre>
                );
              })}
          </div> */}
          <div className="d-flex justify-content-between projectButtonsGrup">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm addProjectBtn"
              onClick={() => openProject(client)}
              style={{ marginRight: 4 }}
            >
              + Проект
            </button>
            <button
              type="button"
              className="btn btn-outline-info btn-sm closeProjectBtn"
              onClick={() => clouseProject(client)}
              style={{ marginRight: 4 }}
            >
              Закрити
            </button>
          </div>
          {client.openProject && (
            <CreateProject
              client={client}
              setAlertText={setAlertText}
              setAlertClass={setAlertClass}
              newProjects={newProjects}
              userInfo={userInfo}
            />
          )}
        </details>
      </form>
    );
  }
);
