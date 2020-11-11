import React, { memo, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ModalBox } from "../6_common_help_comp/ModalBox";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import { ShowBox } from "../6_common_help_comp/ShowBox";
import { ExportReactCSV } from "../../mathfunctions/liquidsFunctions";
import { CreatePayment } from "../5_create_components/CreatePayment";
import { paymentsSizeNameArray, paymentDataArray, summArray } from "../../helpComponents/dataFunctions";

var moment = require("moment");

export const PaymentsRend = memo(
  ({
    ownerDates,
    ownerAllPayments,
    ownerAllProjects,
    userInfo,
    openPayment,
    clousePayment,
    removePayment,
    windowWidth,
  }) => {
    const dataWarningText = "Видалені дані відновити буде не можливо!!!";
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
    let sizeArray = paymentsSizeNameArray(windowWidth);
    ownerAllPayments = ownerAllPayments.filter((pay) => pay.payDate >= ownerDates.dateStart);
    ownerAllPayments = ownerAllPayments.filter(
      (pay) => pay.payDate <= ownerDates.dateFinish
    );
    ownerAllPayments.sort(
      (a, b) => new Date(b.payDate) - new Date(a.payDate)
    );
    return (
      <div className="allPaymentsConteiner">
        <div
          className="d-flex flex-wrap payments-conteiner"
        >
          <div className="createPaymentsHeadBasis">
            <table className="allPaymentTable">
              <tbody>
                <tr>
                  {windowWidth > 30 + summArray(1, sizeArray) && (
                    <td width={sizeArray[0].size}
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
                    <td width={sizeArray[1].size}
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
                    <td width={sizeArray[2].size}
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
                    <td width={sizeArray[3].size}
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
                    <td width={sizeArray[4].size}
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
            {ownerAllPayments.map((pay) => {
              let payDataArray = paymentDataArray(pay);
              let project = (ownerAllProjects.filter((proj) => proj.id === pay.paymentOwner))[0];
              return (
                <CSSTransition key={pay.id} classNames={"note"} timeout={800}>
                  <li key={pay.id} className="list-group-item paymentsBackgroundSize"
                    style={{ width: windowWidth - 10 }}>
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
                              {windowWidth > 30 + summArray(1, sizeArray) && (
                                <td width={sizeArray[0].size - 1}>
                                  <small className="smallProjectDateBold"
                                  >{`${moment(
                                    payDataArray[0]
                                  ).format("YYYY-MM-DD")}`}</small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(2, sizeArray) && (
                                <td width={sizeArray[1].size}>
                                  <small
                                    className="smallProjectDateBold"
                                  >{payDataArray[1]}</small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(3, sizeArray) && (
                                <td width={sizeArray[2].size}>
                                  <small
                                    className="smallProjectDateBold"
                                  >{payDataArray[2]}</small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(4, sizeArray) && (
                                <td width={sizeArray[3].size}>
                                  <small
                                    className="smallProjectDateBold"
                                  >{payDataArray[3]}</small>
                                </td>
                              )}
                              {windowWidth > 30 + summArray(5, sizeArray) && (
                                <td width={sizeArray[4].size}>
                                  <small
                                    className="smallProjectDateBold"
                                  >{payDataArray[4]}</small>
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
                              setId(pay.id);
                              setFunct("removePayment");
                              setModalText(dataWarningText);
                              setModalClass();
                            }}
                          >
                            &times;
                          </button>
                        )}
                      </div>
                    )}
                    {pay.openPay && (
                      <div>
                        <button
                          className="clousePaymentBtnTable"
                          onClick={() => clousePayment(pay)}
                        >
                          Закрити форму
                       </button>
                        <CreatePayment
                          project={project}
                          pay={pay}
                          currentProjectPayments={ownerAllPayments}
                          setAlertText={setAlertText}
                          setAlertClass={setAlertClass}
                          userInfo={userInfo}
                          openPayment={openPayment}
                        />
                      </div>
                    )}
                  </li>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
        <ExportReactCSV
          csvData={ownerAllPayments}
          fileName={"Проплати"}
          textCSV="EXEL"
        />
        {fun === "removePayment" && (
          <ModalBox
            modalClass={modalClass}
            modalText={textModal}
            modalFunction={setClass}
            Id={Id}
            innerFunction={removePayment}
          />
        )}
        {fun === "showFunction" && (
          <ShowBox
            modalClass={modalClass}
            modalText={textModal}
            modalFunction={setClass}
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