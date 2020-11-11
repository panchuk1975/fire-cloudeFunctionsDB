import React, { memo, useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { PaymentsRend } from "../components/4_render_components/PaymentsRend";
import fire from "../config/Fire";
import { Loader } from "../components/6_common_help_comp/Loader";

const Payments = memo(({ windowWidth }) => {
  const [search, setSearch] = useState("");
  let email = "";
  if (fire.auth.currentUser) {
    email = fire.auth.currentUser.email;
    email = email.split("@")[0];
  }
  const {
    loading,
    dates,
    fetchDates,
    projects,
    fetchProjects,
    payments,
    fetchPayments,
    fetchClients,
    openPayment,
    clousePayment,
    removePayment,
    userInfos,
    fetchUsersInfo,
  } = useContext(FirebaseContext);
    //---Render-------------------------------------->
    useEffect(() => {
      fetchDates();
      fetchProjects();
      fetchPayments();
      fetchClients();
      fetchUsersInfo();
      // eslint-disable-next-line
    }, []);
  //--Create user data----------------------->
  var owner = fire.auth.currentUser.uid;
  let userInfo = userInfos.find((info) => info.owner === owner);
  if (!userInfo) {
    return null;
  }
  //--CREATE USER DATES------------------------------------->
  let ownerDates = dates.find((date) => date.owner === owner);
  let ownerAllPayments = payments.filter((pay) => pay.owner === owner);
  let ownerAllProjects = projects.filter((project) => project.owner === owner);
  if (!ownerDates) {
    ownerDates = {
      dateStart: "1950.01.01",
      dateOfEnd: 36,
      dateFinish: "2080.01.01",
    };
  }
  //let datePayments = ownerAllPayments;
  let dateProjects = ownerAllProjects;
  // let datePayments = ownerAllPayments.filter(
  //   (pay) => Date.parse(new Date(pay.payDate)) > Date.parse(ownerDates.dateStart)
  // );
  // datePayments = datePayments.filter(
  //   (pay) => Date.parse(pay.payDate) <= Date.parse(ownerDates.dateFinish)
  // );
  // let dateProjects = ownerAllProjects.filter(
  //   (pay) => Date.parse(pay.projectDate) > Date.parse(ownerDates.dateStart)
  // );
  // dateProjects = dateProjects.filter(
  //   (pay) => Date.parse(pay.projectDate) <= Date.parse(ownerDates.dateFinish)
  // );
  //datePayments = datePayments.sort((a, b) => a.payDate - b.payDate);
  //---SEARCH FUNCTION-------------->
  const changeHandler = (event) => {
    setSearch(event.target.value);
  };
  //---SORT FUNCTION------------------------->
  const sortBySearch = (payments, search, property) => {
    //console.log(search)
    //--Sort by client property-------->
    let newPayments = payments.filter((pay) => {
      if (pay[property].toLowerCase().indexOf(search.toLowerCase()) > -1) {
        return pay;
      }
      return null;
    })
    return newPayments;
  }

  //---USE SORT FUNCTION--------------------------->
  let payProjectNumberPayments = sortBySearch(ownerAllPayments, search, 'payProjectNumber');
  let dateArrayPayments = sortBySearch(ownerAllPayments, search, 'payDate');
//console.log(numberArrayPayments, dateArrayPayments)
let visiblePayments = payments;
if (search){
  visiblePayments =[
    ...payProjectNumberPayments,
    ...dateArrayPayments,
  ];
}
//---SIZE ARRAYS------------------------------------>
  return (
    <div >
      <div className="d-flex  flex-wrap justify-content-between searchConteiner">
        <div>
          <small>{email}</small>
        </div>
        <div >
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={search}
              name="search"
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
          <PaymentsRend
            ownerDates={ownerDates}
            ownerAllPayments={visiblePayments}
            ownerAllProjects={dateProjects}
            openPayment={openPayment}
            clousePayment={clousePayment}
            removePayment={removePayment}
            userInfo={userInfo}
            windowWidth={windowWidth}
          />
        )}
    </div>
  );
});

export default Payments;
