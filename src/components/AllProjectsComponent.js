import React, { memo } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { PaymentComponent } from "./PaymentComponent";
import { CreateProject } from "./CreateProject";
import { ProjectDataArray } from "../helpComponents/dataFunctions";
import fire from "../config/Fire";
var moment = require("moment");

export const AllProjectsComponent = memo(
  ({
    dates,
    client,
    payments,
    userInfo,
    newProjects,
    sizeArray,
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
    
    addPayment,
    openPayment,
    openNewPayment,
    clouseNewPayment,
    clousePayment,
  }) => {
    console.log(client)
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
    const summArray = (numb, sizeArray) => {
      let i = 0;
      let summ = 0;
      while (i < numb) {
        summ = summ + sizeArray[i].size;
        i++;
      }
      return summ;
    };
    //-----------------------RENDER----------------->
    return (
      <form>
        <TransitionGroup component="ul" className="project-group">
          {newProjects.map((project) => {
            let newRoutes = [];
            // let newRoutes = routes.filter(
            //   (route) => route.routeOwner === project.id
            // );
            //newRoutes.sort((a, b) => a.routNumber - b.routNumber);
            //let listLiquids = NewListLiquidsCount(newRoutes);

            //--PROJECTS DATA ARRAY-------------------------->
            const projectDataArray = ProjectDataArray(project);
            let currentProjectPayments = payments.filter((pay) => pay.paymentOwner === project.id);

            //--DYNAMIC CLASSES ----------------------------->
            let projectReadinessDateClass = (moment(new Date(project.projectReadinessDate))
              .format("YYYY-MM-DD") >= moment(new Date())
                .format("YYYY-MM-DD")) ? "goodTime" : "badTime";
            let signaturуOfActClass = (project.signaturуOfAct === "Так") ? "good" : "bad";
            let poketExistenceClass = (project.poketExistence === "Так") ? "good" : "bad";
            let contractExistenceClass = (project.contractExistence === "Так") ? "good" : "bad";
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
                              {windowWidth > 75 + summArray(1, sizeArray) && (
                                <td width={sizeArray[0].size} className="head">
                                  <small className="projectName"
                                  >{projectDataArray[0]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(2, sizeArray) && (
                                <td width={sizeArray[1].size}
                                  className={`head ${projectReadinessDateClass}`}>
                                  <small className="smallProjectDateBold"
                                  >{`${moment(
                                    projectDataArray[1]
                                  ).format("DD.MM.YY")}`}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(3, sizeArray) && (
                                <td width={sizeArray[2].size}>
                                  <small
                                    className={contractExistenceClass}
                                  >{projectDataArray[2]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(4, sizeArray) && (
                                <td width={sizeArray[3].size}>
                                  <small
                                    className={signaturуOfActClass
                                    }>{projectDataArray[3]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(5, sizeArray) && (
                                <td width={sizeArray[4].size}>
                                  <small
                                    className={poketExistenceClass}
                                  >{projectDataArray[4]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(6, sizeArray) && (
                                <td width={sizeArray[5].size}>
                                  <small>{projectDataArray[5]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(7, sizeArray) && (
                                <td width={sizeArray[6].size}>
                                  <small>{projectDataArray[6]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(8, sizeArray) && (
                                <td width={sizeArray[7].size}>
                                  <small>{projectDataArray[7]}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(9, sizeArray) && (
                                <td width={sizeArray[8].size} className="head">
                                  <small>{`${moment(
                                    projectDataArray[8]
                                  ).format("DD.MM.YY")}`}</small>
                                </td>
                              )}
                              {windowWidth > 75 + summArray(10, sizeArray) && (
                                <td width={sizeArray[9].size}>
                                  <small>{projectDataArray[9]}</small>
                                </td>
                              )}
                              {windowWidth >
                                75 + summArray(11, sizeArray) && (
                                  <td width={sizeArray[10].size}>
                                    <small>{projectDataArray[10]}</small>
                                  </td>
                                )}
                              {windowWidth >
                                75 + summArray(12, sizeArray) && (
                                  <td width={sizeArray[11].size}>
                                    <small>
                                      {projectDataArray[11]}
                                    </small>
                                  </td>
                                )}
                              {windowWidth >
                                75 + summArray(13, sizeArray) && (
                                  <td width={sizeArray[12].size}>
                                    <small>{projectDataArray[12]}</small>
                                  </td>
                                )}
                              {windowWidth >
                                75 + summArray(14, sizeArray) && (
                                  <td width={sizeArray[13].size}>
                                    <small>{projectDataArray[13]}</small>
                                  </td>
                                )}
                            </tr>
                          </tbody>
                        </table>
                        {!project.openProject &
                          !newRoutes.length &
                          (userInfo.company === userInfo.jointCompany)
                          //& (userInfo.owner === client.owner) 
                          && (
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
                    {/* {project.openProject && (
                      <CreateProject
                        className={openClientTableClass}
                        client={client}
                        project={project}
                        setAlertText={setAlertText}
                        setAlertClass={setAlertClass}
                        newProjects={newProjects}
                        userInfo={userInfo}
                      />
                    )} */}
                  </div>
                  <PaymentComponent
                      client={client}
                      payments={payments}
                      project={project}
                      setId={setId}
                      currentProjectPayments={currentProjectPayments}
                      //newCarRoutes={newCarRoutes}
                      openPayment={openPayment}
                      clousePayment={clousePayment}
                      openNewPayment={openNewPayment}
                      clouseNewPayment={clouseNewPayment}
                      addPayment={addPayment}
                      //closeNewRoute={closeNewRoute}
                      setFunct={setFunct}
                      setModalClass={setModalClass}
                      setModalText={setModalText}
                      windowWidth={windowWidth}
                      setAlertText={setAlertText}
                      setAlertClass={setAlertClass}
                      //listLiquids={listLiquids}
                      //changeListRouteTime={changeListRouteTime}
                      modalClass={modalClass}
                      //carRoutes={carRoutes}
                      //clouseNewList={clouseNewList}
                      userInfo={userInfo}
                    />
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        {/* <div className="d-flex justify-content-between projectButtonsGrup">
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
          </div> */}
        {/* {client.openProject && (
          <CreateProject
            client={client}
            setAlertText={setAlertText}
            setAlertClass={setAlertClass}
            newProjects={newProjects}
            userInfo={userInfo}
          />
        )} */}
      </form>
    );
  }
);
