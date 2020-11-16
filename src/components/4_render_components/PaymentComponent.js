import React, { memo, useContext, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import { CreatePayment } from "../5_create_components/CreatePayment";
import { ExportReactCSV } from "../../mathfunctions/liquidsFunctions";
import { ShowBox } from "../6_common_help_comp/ShowBox";
import {
  paymentsSizeNameArray,
  paymentDataArray,
  summArray,
} from "../../helpComponents/dataFunctions";
var moment = require("moment");

export const PaymentComponent = memo(
  ({
    clients,
    project,
    currentProjectPayments,
    newCarRoutes,
    openPayment,
    clousePayment,
    openNewPayment,
    clouseNewPayment,
    addPayment,
    windowWidth,
    setAlertText,
    setAlertClass,
    userInfo,
  }) => {
    const firebase = useContext(FirebaseContext);
    //---MODAL------------------------>
    let [modalClass, setClass] = useState("modal");
    let [textModal, setModalText] = useState();
    let [fun, setFunct] = useState();
    //---MW SLASS------------>
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    //---ARRAY OF TABLE SIZES------------------->
    let sizeArray = paymentsSizeNameArray(windowWidth);
    //---EXEL INFO---------------------------->
    let exelPaymentsInfo = [];
    currentProjectPayments.sort(
      (a, b) => new Date(a.payDate) - new Date(b.payDate)
    );
    return (
      <div className="allPaymentsConteiner">
        <details className="paymentDetails">
          <summary className="d-flex justify-content-start">
            <small className="paymentDetailsSmall">Проплати</small>
          </summary>
          <div className="d-flex justify-content-between paymentHeadTableConteiner">
            <table className="paymentProjecgtHeadTable">
              <tbody>
                <tr>
                  {windowWidth > 30 + summArray(1, sizeArray) && (
                    <td
                      width={sizeArray[0].size}
                      onClick={() => {
                        setFunct("showFunction");
                        setModalText(sizeArray[0].fullName);
                        setModalClass();
                      }}
                    >
                      <small>{sizeArray[0].name}</small>
                    </td>
                  )}
                  {windowWidth > 30 + summArray(2, sizeArray) && (
                    <td
                      width={sizeArray[1].size}
                      onClick={() => {
                        setFunct("showFunction");
                        setModalText(sizeArray[1].fullName);
                        setModalClass();
                      }}
                    >
                      <small>{sizeArray[1].name}</small>
                    </td>
                  )}
                  {windowWidth > 30 + summArray(3, sizeArray) && (
                    <td
                      width={sizeArray[2].size}
                      onClick={() => {
                        setFunct("showFunction");
                        setModalText(sizeArray[2].fullName);
                        setModalClass();
                      }}
                    >
                      <small>{sizeArray[2].name}</small>
                    </td>
                  )}
                  {windowWidth > 30 + summArray(4, sizeArray) && (
                    <td
                      width={sizeArray[3].size}
                      onClick={() => {
                        setFunct("showFunction");
                        setModalText(sizeArray[3].fullName);
                        setModalClass();
                      }}
                    >
                      <small>{sizeArray[3].name}</small>
                    </td>
                  )}
                  {windowWidth > 30 + summArray(5, sizeArray) && (
                    <td
                      width={sizeArray[4].size}
                      onClick={() => {
                        setFunct("showFunction");
                        setModalText(sizeArray[4].fullName);
                        setModalClass();
                      }}
                    >
                      <small>{sizeArray[4].name}</small>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <TransitionGroup component="ul" className="list-group">
            {currentProjectPayments.map((pay) => {
              //---GET ARRAY OF PAYMENTS DATA-------->
              let payDataArray = paymentDataArray(pay);
              //---GET PAYMENTS INFO FOR EXEL------------------------------>
              let newExelPay = {
                "Дата проплати": pay.payDate,
                "Сума проплати": pay.paySumm,
                "Номер проекту": pay.payProjectNumber,
                "Клієнт": pay.payClientName,
                "Хто проводив": pay.payResponsible,
              };
              exelPaymentsInfo = exelPaymentsInfo.concat(newExelPay);
              return (
                <CSSTransition key={pay.id} classNames={"note"} timeout={800}>
                  <li key={pay.id} className="list-group-item payments-incomp-background">
                    {!pay.openPay && (
                      <div
                        className="d-flex justify-content-between paymentTableBasis"
                        onClick={() => {
                          openPayment(pay);
                        }}
                      >
                        <table
                          className="paymentComponentTable"
                        >
                          <tbody>
                            <tr align="center">
                              {windowWidth > 30 + summArray(1, sizeArray) && (
                                <td width={sizeArray[0].size - 1}>
                                  <small className="smallProjectDateBold">{`${moment(
                                    payDataArray[0]
                                  ).format("YYYY-MM-DD")}`}</small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(2, sizeArray) && (
                                <td width={sizeArray[1].size}>
                                  <small className="smallProjectDateBold">
                                    {payDataArray[1]}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(3, sizeArray) && (
                                <td width={sizeArray[2].size}>
                                  <small className="smallProjectDateBold">
                                    {payDataArray[2]}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(4, sizeArray) && (
                                <td width={sizeArray[3].size}>
                                  <small className="smallProjectDateBold">
                                    {payDataArray[3]}
                                  </small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(5, sizeArray) && (
                                <td width={sizeArray[4].size}>
                                  <small className="smallProjectDateBold">
                                    {payDataArray[4]}
                                  </small>
                                </td>
                              )}
                            </tr>
                          </tbody>
                        </table>
                        {userInfo.company === userInfo.jointCompany && (
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm deletePaymentBtn"
                            onClick={() => {
                              firebase.removePayment(pay.id);
                              // firebase.removeListRouteTime(
                              //   pay,
                              //   list,
                              //   oldRoutes,
                              //   oldTimes,
                              //   departureListDate,
                              //   arrivalListDate
                              // );
                              // firebase.removeCarRouteTime(
                              //   pay,
                              //   car,
                              //   oldCarRoutes,
                              //   oldCarTimes,
                              //   arrivalCarDate
                              // );
                              // setAlertText(
                              //   "Оплату видалено! Для видалення проекту необхідно видалити всі проплати!"
                              // );
                              // setAlertClass("open");
                              // setTimeout(() => {
                              //   setAlertClass("modal");
                              // }, 1500);
                            }}
                          >
                            Х
                          </button>
                        )}
                      </div>
                    )}
                    {/* {pay.openPay && (
                      <button
                        className="clousePaymentBtnTable"
                        onClick={() => clousePayment(pay)}
                      >
                        Закрити форму
                      </button>
                    )} */}
                    {pay.openPay && (
                      <CreatePayment
                        clients={clients}
                        project={project}
                        pay={pay}
                        addPayment={addPayment}
                        currentProjectPayments={currentProjectPayments}
                        setAlertText={setAlertText}
                        setAlertClass={setAlertClass}
                        userInfo={userInfo}
                      />
                    )}
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
          <div className="d-flex justify-content-between payment-buttons-grup">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm add-pay-btn"
              onClick={() => openNewPayment(project)}
              style={{ marginRight: 4 }}
            >
              +Плата
            </button>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm close-list-pay-btn"
              onClick={() => clouseNewPayment(project)}
              style={{ marginRight: 4 }}
            >
              Закрити
            </button>
          </div>
          {project.openPayment && (
            <CreatePayment
              clients={clients}
              project={project}
              currentProjectPayments={currentProjectPayments}
              newCarRoutes={newCarRoutes}
              setAlertText={setAlertText}
              setAlertClass={setAlertClass}
              userInfo={userInfo}
            />
          )}
          {fun === "showFunction" && (
            <ShowBox
              modalClass={modalClass}
              modalText={textModal}
              modalFunction={setClass}
            />
          )}
          <div className="exportReactCSVConteiner">
            <ExportReactCSV
              csvData={exelPaymentsInfo}
              fileName={"Проплати"}
              textCSV="EXEL"
            />
          </div>
        </details>
      </div>
    );
  }
);
