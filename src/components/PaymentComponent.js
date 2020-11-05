import React, { memo, useContext } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { CreatePayment } from "./CreatePayment";
var moment = require("moment");

export const PaymentComponent = memo(
  ({
    client,
    project,
    currentProjectPayments,
    newCarRoutes,
    openPayment,
    clousePayment,
    openNewPayment,
    clouseNewPayment,
    addPayment,
    closeNewRoute,
    windowWidth,
    setAlertText,
    setAlertClass,
    listLiquids,
    carRoutes,
    userInfo,
  }) => {
    console.log(client)
    const firebase = useContext(FirebaseContext);
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
                    {windowWidth > 769 && (
                      <td width="70">
                        <small>Прибув</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="42">
                        <small>К/шлях.</small>
                      </td>
                    )}
                    {windowWidth > 490 && (
                      <td width="65" className="head">
                        <small>Тип ПММ</small>
                      </td>
                    )}
                    {windowWidth > 320 && (
                      <td width="38" className="headStart">
                        <small>Було</small>
                      </td>
                    )}
                    {windowWidth > 280 && (
                      <td width="38" className="headAdd">
                        <small>Отрим.</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="38">
                        <small>К/витр.</small>
                      </td>
                    )}
                    {windowWidth >= 360 && (
                      <td width="40" className="headExpended">
                        <small>Витрач.</small>
                      </td>
                    )}
                    {windowWidth > 240 && (
                      <td width="40" className="headEnd">
                        <small>Залиш.</small>
                      </td>
                    )}
                    {windowWidth > 769 && (
                      <td width="43">
                        <small>З вант.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="48">
                        <small>Без вант</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="43">
                        <small>З прич.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="43">
                        <small>На букс.</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="38">
                        <small>Г/місці</small>
                      </td>
                    )}
                    {windowWidth > 995 && (
                      <td width="38">
                        <small>Г/русі</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="38">
                        <small>Прич,т</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="38">
                        <small>Вант,т</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="95">
                        <small>Куди</small>
                      </td>
                    )}
                    {windowWidth > 1205 && (
                      <td width="65">
                        <small>Вантаж</small>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
          <TransitionGroup component="ul" className="list-group">
            {currentProjectPayments.map((pay) => {
              currentProjectPayments.sort(
                (a, b) => new Date(a.payDate) - new Date(b.payDate)
              );
              return (
                <CSSTransition key={pay.id} classNames={"note"} timeout={800}>
                  <li  key={pay.id} className="list-group-item payments-groupe">
                    {!pay.openPay && (
                      <div
                        className="d-flex justify-content-between paymentTableBasis"
                      >
                          <table
                            className="paymentTable"
                            onClick={() => {
                              openPayment(pay);
                            }}
                          >
                            <tbody>
                              <tr align="center">
                                <td width="50">
                                  <small className="routeHead">
                                    {pay.payNumber}
                                  </small>
                                </td>
                                {windowWidth > 425 && (
                                  <td width="64">
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
                                {windowWidth > 320 && (
                                  <td width="38" className="headStart">
                                    <small>{pay.balanceStart}</small>
                                  </td>
                                )}
                                {windowWidth > 280 && (
                                  <td width="38" className="headAdd">
                                    <small>{pay.received}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="38">
                                    <small>{pay.costCoefficient}</small>
                                  </td>
                                )}
                                {windowWidth >= 360 && (
                                  <td width="40" className="headExpended">
                                    <small>{pay.expended}</small>
                                  </td>
                                )}
                                {windowWidth > 240 && (
                                  <td width="40" className="headEnd">
                                    <small>{pay.balanceFinish}</small>
                                  </td>
                                )}
                                {windowWidth > 769 && (
                                  <td width="43">
                                    <small>{pay.routeWithCargo}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="48">
                                    <small>{pay.routeWithoutCargo}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="43">
                                    <small>{pay.routeWithTrailer}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="43">
                                    <small>{pay.routeInaTow}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="38">
                                    <small>{pay.timeOnSite}</small>
                                  </td>
                                )}
                                {windowWidth > 995 && (
                                  <td width="38">
                                    <small>{pay.timeInaMotion}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="38">
                                    <small>{pay.trailerWeight}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="38">
                                    <small>{pay.cargoWeight}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="95">
                                    <small>{pay.routeTo}</small>
                                  </td>
                                )}
                                {windowWidth > 1205 && (
                                  <td width="65">
                                    <small>{pay.cargoName}</small>
                                  </td>
                                )} */}
                              </tr>
                            </tbody>
                          </table>
                        {userInfo.company === userInfo.jointCompany && (
                          <button
                            id="deleteRouteBtn"
                            type="button"
                            className="btn btn-outline-danger btn-sm"
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
                              //   "Маршрут видалено! Для видалення листа необхідно видалити всі маршрути!"
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
                        client={client}
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
          {/* <div id="countRoutesGroup" className="d-flex justify-content-between">
            {windowWidth > 995 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headStart"> {liquid.balanceStart}</small>
                  </pre>
                );
              })}
            {windowWidth > 512 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headAdd"> {liquid.received}</small>
                  </pre>
                );
              })}
            {windowWidth > 770 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headExpended"> {liquid.expended}</small>
                  </pre>
                );
              })}
            {windowWidth > 335 &&
              listLiquids.map((liquid) => {
                return (
                  <pre key={liquid.name} className="listLiquidв">
                    {" "}
                    <small className="liquidValue"> {liquid.name}</small>
                    <small className="headEnd"> {liquid.balanceFinish}</small>
                  </pre>
                );
              })}
          </div> */}
          <div  className="d-flex justify-content-between payment-buttons-grup">
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
              id=""
              className="btn btn-outline-info btn-sm close-list-pay-btn"
              onClick={() => clouseNewPayment(project)}
              style={{ marginRight: 4 }}
            >
              Закрити
            </button>
          </div>
          {project.openPayment && (
            <CreatePayment
              client={client}
              project={project}
              currentProjectPayments={currentProjectPayments}
              newCarRoutes={newCarRoutes}
              setAlertText={setAlertText}
              setAlertClass={setAlertClass}
              //oldCarRoutes={oldCarRoutes}
              //oldCarTimes={oldCarTimes}
              userInfo={userInfo}
            />
          )}
        </details>
      </div>
    );
  }
);
