import React, { memo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { NewListLiquidsCount } from "../mathfunctions/listFunctions";
import { CreateProject } from "./CreateProject";
import { RouteComponent } from "./RouteComponent";
import fire from "../config/Fire";
//import "../CSS/ListCompStyle.scss";
var moment = require("moment");

export const ListComponent = memo(
  ({
    client,
    dates,
    userInfo,
    addProject,


    windowWidth,
    setAlertClass,
    setAlertText,
    setFunct,
    setModalText,
    setModalClass,
    setId,
    modalClass,





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
    newProjects,
    changeListRouteTime,
    //listCarLiquids,
  }) => {
    let dataListWarningText =
      "Видалення листа! Для видалення авто необхідно видалити всі листи!!!";
    let owner = fire.auth.currentUser.uid;
    let ownerDates = dates.find((date) => date.owner === owner);
    if (!ownerDates) {
      ownerDates = { 
          dateStart: "1970-01-01T00:00", 
          dateFinish: "2070-01-01T00:00" };
    }
    let listCarLiquids = [];
    // newProjects = newProjects.filter((project) => project.progecgtDate >= ownerDates.dateStart);
    // newProjects = newProjects.filter(
    //   (project) => project.listDate <= ownerDates.dateFinish
    // );
    // let newCarRoutes = routes.filter((route) => route.listOwner === car.id);
    return (
      <form>
        <details>
          <summary id="summary">
            <div
              id="summaryConteiner"
              className="d-flex justify-content-between"
            >
              <small id="small">Листи</small>
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
                    <td width="51">
                      <small>№</small>
                    </td>
                    <td width="58">
                      <small>Дата</small>
                    </td>
                    {windowWidth > 995 && (
                      <td width="52">
                        <small>Км</small>
                      </td>
                    )}
                    {windowWidth > 226 && (
                      <td width="52">
                        <small>Км+</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="52">
                        <small>Год</small>
                      </td>
                    )}
                    {windowWidth > 280 && (
                      <td width="52">
                        <small>Год+</small>
                      </td>
                    )}
                    {windowWidth > 333 && (
                      <td width="52">
                        <small>Пробіг</small>
                      </td>
                    )}
                    {windowWidth > 383 && (
                      <td width="52">
                        <small>М/год</small>
                      </td>
                    )}
                    {windowWidth > 490 && (
                      <td width="107">
                        <small>Водій</small>
                      </td>
                    )}
                    {windowWidth > 767 && (
                      <td width="107">
                        <small>Старший</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="103">
                        <small>Звідки</small>
                      </td>
                    )}
                    {windowWidth > 767 && (
                      <td width="103">
                        <small>Куди</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="102">
                        <small>Вибув</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="102">
                        <small>Прибув</small>
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
              let listLiquids = NewListLiquidsCount(newRoutes);
              return (
                <CSSTransition key={project.id} classNames={"note"} timeout={800}>
                  <li id="innerLi" key={project.id} className="project-group-item">
                    {!project.openList && (
                      <div key={project.id} className="listBasis">
                        <div className="d-flex justify-content-between">
                            <table
                              className="listTable"
                              onClick={() => openList(project)}
                            >
                              <tbody>
                                <tr align="center">
                                  <td width="50" className="head">
                                    <small>{project.listNumber}</small>
                                  </td>
                                  <td width="58" className="head">
                                    {/* <small>{`${moment(project.projectNumber).format(
                                      "DD.MM.YY"
                                    )}`}</small> */}
                                  </td>
                                  {windowWidth > 295 && (
                                    <td width="52">
                                      <small>{project.id}</small>
                                    </td>
                                  )}
                                  {windowWidth > 226 && (
                                    <td width="52">
                                      <small>{project.projectNumber}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="52">
                                      <small>{project.timeListFirst}</small>
                                    </td>
                                  )}
                                  {windowWidth > 280 && (
                                    <td width="52">
                                      <small>{project.timeListLast}</small>
                                    </td>
                                  )}
                                  {windowWidth > 333 && (
                                    <td width="52">
                                      <small>{project.totalListMileage}</small>
                                    </td>
                                  )}
                                  {windowWidth > 383 && (
                                    <td width="52">
                                      <small>{project.timeListTotal}</small>
                                    </td>
                                  )}
                                  {windowWidth > 490 && (
                                    <td width="107">
                                      <small>{project.driverName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 767 && (
                                    <td width="107">
                                      <small>{project.seniorName}</small>
                                    </td>
                                  )}
                                  {windowWidth > 995 && (
                                    <td width="103">
                                      <small>{project.listRouteFrom}</small>
                                    </td>
                                  )}
                                  {windowWidth > 767 && (
                                    <td width="103">
                                      <small>{project.listRouteTo}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="102">
                                      <small>{`${moment(project.departure).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                  {windowWidth > 1205 && (
                                    <td width="102">
                                      <small>{`${moment(project.arrival).format(
                                        "DD.MM.YY HH.mm"
                                      )}`}</small>
                                    </td>
                                  )}
                                </tr>
                              </tbody>
                            </table>
                          {!project.openList &
                            !newRoutes.length &
                            (userInfo.company === userInfo.jointCompany) &
                            (userInfo.owner === client.owner) && (
                            <button
                              id="deleteListBtn"
                              type="button"
                              className="btn btn-outline-danger btn-sm"
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
                      <div className="clouseListFormBasis">
                        {project.openList && (
                          <table
                            className="clouseListForm"
                            onClick={() => closeList(project)}
                          >
                            <tbody>
                              <tr className="listTable">
                                <td>Закрити форму листа</td>
                              </tr>
                            </tbody>
                          </table>
                        )}
                      </div>
                      {project.openProject && (
                        <CreateProject
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
          <div id="countRoutesGroup" className="d-flex justify-content-between">
            {windowWidth > 995 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headStart"> {liquid.balanceStart}</small>
                  </pre>
                );
              })}
            {windowWidth > 512 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headAdd"> {liquid.received}</small>
                  </pre>
                );
              })}
            {windowWidth > 770 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headExpended"> {liquid.expended}</small>
                  </pre>
                );
              })}
            {windowWidth > 335 &&
              listCarLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headEnd"> {liquid.balanceFinish}</small>
                  </pre>
                );
              })}
          </div>
          <div id="listButtonsGrup" className="d-flex justify-content-between">
            <button
              type="button"
              id="addListBtn"
              className="btn btn-outline-primary btn-sm"
              onClick={() => addProject(client)}
              style={{ marginRight: 4 }}
            >
              + Проект
            </button>
            <button
              type="button"
              id="closeListFormBtn"
              className="btn btn-outline-info btn-sm"
              onClick={() => clouseNewList(client)}
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
