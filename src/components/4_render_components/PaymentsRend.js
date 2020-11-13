import React, { memo, useState } from "react";
//import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ModalBox } from "../6_common_help_comp/ModalBox";
import { AlertBox } from "../6_common_help_comp/AlertBox";
import { ShowBox } from "../6_common_help_comp/ShowBox";
import { ExportReactCSV } from "../../mathfunctions/liquidsFunctions";
import { CreatePayment } from "../5_create_components/CreatePayment";
import {
  paymentsSizeNameArray,
  paymentDataArray,
  summArray,
} from "../../helpComponents/dataFunctions";

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
    //---MODAL WINDOWS STATE------->
    const dataWarningText = "Видалені дані відновити буде не можливо!!!";
    let [alertClass, setAlertClass] = useState("modal");
    let [alertText, setAlertText] = useState("");
    let [modalClass, setClass] = useState("modal");
    let [textModal, setModalText] = useState();
    let [fun, setFunct] = useState();
    let [Id, setId] = useState();
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
    //---CUT PAYMENTS ARRAY BY DATE PERIOD----------->
    ownerAllPayments = ownerAllPayments.filter(
      (pay) => pay.payDate >= ownerDates.dateStart
    );
    ownerAllPayments = ownerAllPayments.filter(
      (pay) => pay.payDate <= ownerDates.dateFinish
    );
    //---SORT PAYMENTS BY DATE------------------------->
    ownerAllPayments.sort((a, b) => new Date(b.payDate) - new Date(a.payDate));
    //---PAGINATION BLOCK----------------------------------------->
    let [pageName, setNewPageName] = useState(1);
    let [pageSize, setNewPageSize] = useState(15);
    const changeHandler = (event) => {
      setNewPageSize(15);
      if (!event.target.value) {
        setNewPageSize(15);
      } else setNewPageSize(event.target.value);
    };
    const pagesCount = Math.ceil(ownerAllPayments.length / pageSize);
    let pagesArray = [];
    let sliceNumber = 0;
    for (let i = 1; i <= pagesCount; i++) {
      let page = {
        pageNumber: i,
        pageCount: Number(sliceNumber) + Number(pageSize),
      };
      pagesArray.push(page);
      sliceNumber = Number(sliceNumber) + Number(pageSize);
    }
    let allPayments = ownerAllPayments.slice(
      pageSize * (pageName - 1),
      pageSize * pageName
    );
    let newPagesArray = pagesArray.slice(0, 8);
    let firstNumber = pageName - 4;
    let secondNumber = pageName + 4;
    if (secondNumber > pagesArray.length - 2) {
      secondNumber = pagesArray.length;
      firstNumber = pagesArray.length - 8;
    } else if (pageName < 0) {
      firstNumber = 0;
      secondNumber = 8;
    } else if (pagesArray.length < 8) {
      firstNumber = 0;
      secondNumber = pagesArray.length;
    }
    if (firstNumber < 3) {
      firstNumber = 0;
      secondNumber = 8;
    } else if (pagesArray.length < 8) {
      firstNumber = 0;
      secondNumber = pagesArray.length;
    }
    newPagesArray = pagesArray.slice(firstNumber, secondNumber);
    //---EXEL INFO---------------------------->
    let exelPaymentsInfo = [];
    //---RENDER PAYMENTS TABLE HEADER---------------------------------------------->
    return (
      <div className="allPaymentsConteiner">
        <div className="d-flex justify-content-center paginationConteiner">
          {newPagesArray.map((page) => {
            return (
              <button
                key={page.pageNumber}
                className="paginationBtn"
                onClick={() => {
                  setNewPageName(page.pageNumber);
                }}
              >
                {page.pageNumber}
              </button>
            );
          })}
          <div className="form-group newPageForm">
            <input
              type="number"
              className="form-control newPageForm"
              defaultValue={pageSize}
              name="pageSize"
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="d-flex flex-wrap payments-conteiner">
          <div className="createPaymentsHeadBasis">
            <table className="allPaymentTable">
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

          {/* <TransitionGroup component="ul" className="list-group"> */}
          {allPayments.map((pay) => {
            //---GET ARRAY OF PAYMENTS DATA-------->
            let payDataArray = paymentDataArray(pay);
            //---GET CURRENT PAYMENT PROJECT-------------------->
            let project = ownerAllProjects.filter(
              (proj) => proj.id === pay.paymentOwner
            )[0];
            //---GET PAYMENTS INFO FOR EXEL------------------------------>
             
            let newExelPay = {
              "Дата проплати": pay.payDate,
              "Сума проплати": pay.paySumm,
              "Номер проекту": pay.payProjectNumber,
              "Клієнт": pay.payClientName,
              "Хто проводив": pay.payResponsible,
            };
            exelPaymentsInfo = exelPaymentsInfo.concat(newExelPay);
            //---RENDER PAYMENTS ARRAY------------------------------------------------>
            return (
              //<CSSTransition key={pay.id} classNames={"note"} timeout={50}>
              <div
                key={pay.id}
                className="list-group-item paymentsBackgroundSize"
                style={{ width: windowWidth - 10 }}
              >
                {!pay.openPay && (
                  <div className="d-flex justify-content-between paymentTableBasis">
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
              </div>
              //</CSSTransition>
            );
          })}
          {/* </TransitionGroup> */}
        </div>
        <ExportReactCSV
          csvData={exelPaymentsInfo}
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
