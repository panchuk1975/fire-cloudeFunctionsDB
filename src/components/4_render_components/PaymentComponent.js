import React, { memo, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../../context/fiebase/firebaseContext";
import { CreatePayment } from "../5_create_components/CreatePayment";
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
    currentProjectPayments.sort(
      (a, b) => new Date(a.payDate) - new Date(b.payDate)
    );
    return (
      <div className="allPaymentsConteiner">
        <details className="paymentDetails">
          <summary className="d-flex justify-content-start">
            <small className="paymentDetailsSmall">Проплати</small>
          </summary>
          <div className="d-flex justify-content-between">
            <table className="paymentHeadTable">
              <tbody>
                <tr align="center">
                  <td width="51">
                    <small>№</small>
                  </td>
                  {windowWidth > 425 && (
                    <td width="65">
                      <small>Дата</small>
                    </td>
                  )}
                  <td width="45" className="head">
                    <small>Пробіг</small>
                  </td>
                  {windowWidth > 200 && (
                    <td width="38">
                      <small>М/год</small>
                    </td>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
          <TransitionGroup component="ul" className="list-group">
            {currentProjectPayments.map((pay) => {
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
                              <td width="100">
                                <small className="routeHead">
                                  {pay.payNumber}
                                </small>
                              </td>
                              {windowWidth > 425 && (
                                <td width="150">
                                  <small className="routeHead">
                                    {`${moment(pay.payDate).format(
                                      "DD.MM HH:mm"
                                    )}`}
                                  </small>
                                </td>
                              )}
                              {/* <td width="45" className="head">
                                  <small>{pay.routeTotal}</small>
                                </td>
                                {windowWidth > 200 && (
                                  <td width="38">
                                    <small>{pay.routTotalTime}</small>
                                  </td>
                                )}
                                */}
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
                      {pay.openPay && (
                            <div className="clousePaymentBtnTable">
                        <table
                          onClick={() => clousePayment(pay)}
                        >
                          <tbody>
                            <tr className="listTable">
                              <td>Закрити форму</td>
                            </tr>
                          </tbody>
                        </table>
                        </div>
                      )}
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
              className="btn btn-outline-info btn-sm close-list-pay-btn"
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
        </details>
      </div>
    );
  }
);
