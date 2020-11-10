import React, { memo, useState, useContext } from "react";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import { ModalBox } from "../6_common_help_comp/ModalBox";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import { ExportReactCSV } from "../../mathfunctions/liquidsFunctions";
import { CreatePayment } from "../5_create_components/CreatePayment";

var moment = require("moment");

export const PaymentsRend = memo(
  ({
    ownerDates,
    ownerAllPayments,
    ownerAllProjects,
    userInfo,
    openPayment,
    clousePayment,
  }) => {
    const dataWarningText = "Ви намагаетеся безповоротно видалити дані!!!"
    const firebase = useContext(FirebaseContext);
    let [modalClass, setClass] = useState("modal");
    let [textModal, setModalText] = useState();
    let [fun, setFunct] = useState();
    let [Id, setId] = useState();
    let setModalClass = () => {
      if ((modalClass = "modal")) {
        setClass("open");
      } else {
        setClass("modal");
      }
    };
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");

    return (
      <div>
        <div
          className="d-flex flex-wrap  payments-conteiner"
        >
          <div className="createPaymentsHeadBasis">
            <table className="allPaymentTable">
              <tbody>
                <tr>
                  <td>
                    <small className="paymentNumber">№</small>
                  </td>
                  <td>
                    <small className="paymentData">Дата</small>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {ownerAllPayments.map((pay) => {
            let project = (ownerAllProjects.filter((proj) => proj.id === pay.paymentOwner))[0];
            return (
              <div key={pay.id} className="commonPaymentRender">
                <div>
                  {!pay.openPay && (
                    <div
                      className="d-flex justify-content-between paymentTableBasis"
                    >
                      <table
                        className="paymentCommonTable"
                        onClick={() => {
                          openPayment(pay);
                        }}
                      >
                        <tbody>
                          <tr align="center">
                            <td width="100">
                              <small className="routeHead">
                                {pay.payNumber}
                              </small>
                            </td>
                            <td width="150">
                              <small className="routeHead">
                                {`${moment(pay.payDate).format(
                                  "DD.MM HH:mm"
                                )}`}
                              </small>
                            </td>
                            {/* <td width="45" className="head">
                                  <small>{pay.routeTotal}</small>
                                </td>
                                {windowWidth > 200 && (
                                  <td width="38">
                                    <small>{pay.routTotalTime}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="70" className="routeHead">
                                    <small>{`${moment(pay.routArrival).format(
                                      "DD.MM HH:mm"
                                    )}`}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="42">
                                    <small>{pay.typeOfPavement}</small>
                                  </td>
                                )}
                                {windowWidth > 490 && (
                                  <td width="65" className="head">
                                    <small>{pay.liquidName}</small>
                                  </td>
                                )}
                               */}
                          </tr>
                        </tbody>
                      </table>
                      {userInfo.company === userInfo.jointCompany && (
                        <div>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm deletePaymentBtn"
                            onClick={() => {
                              setId(pay.id);
                              setFunct("removeCar");
                              setModalText(dataWarningText);
                              setModalClass();
                            }}
                          >
                            &times;
                         </button>
                          {/* <button
                            type="button"
                            className="btn btn-outline-danger btn-sm deleteRouteBtn"
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
                          </button> */}
                        </div>


                      )}
                    </div>
                  )}
                  <div className="clouseListFormBasis">
                    {pay.openPay && (
                      <table
                        className="clouseListForm"
                        onClick={() => clousePayment(pay)}
                      >
                        <tbody>
                          <tr className="listTable">
                            <td>Закрити форму</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                  {pay.openPay && (
                    <CreatePayment
                      project={project}
                      pay={pay}
                      currentProjectPayments={ownerAllPayments}
                      setAlertText={setAlertText}
                      setAlertClass={setAlertClass}
                      userInfo={userInfo}
                      openPayment={openPayment}
                    />
                  )}
                </div>
              </div>

            );

          })}
        </div>

        <ExportReactCSV
          csvData={ownerAllPayments}
          fileName={"Проплати"}
          textCSV="EXEL"
        />
        {fun === "removeCar" && (
          <ModalBox
            modalClass={modalClass}
            modalText={textModal}
            modalFunction={setClass}
            Id={Id}
            innerFunction={firebase.removePayment}
          />
        )}
        <AlertBox
          modalClass={alertClass}
          modalText={alertText}
          modalFunction={setAlertClass}
        />
      </div>
    );
  }
);
