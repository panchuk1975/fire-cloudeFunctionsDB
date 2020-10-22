import React, { memo, useContext, useEffect } from "react";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { CommonLiquidsCount } from "../mathfunctions/liquidsFunctions";
import { LiquidsComponent } from "../components/LiquidsComponent";
import fire from "../config/Fire";
import { Loader } from "../components/Loader";
import "../CSS/LiqCompStyle.scss";


const Liquids = memo(() => {
    let contentWidthNumber =
    7.2096691 * Math.pow(10, -14) * Math.pow(window.innerWidth, 5) -
    3.8875191 * Math.pow(10, -10) * Math.pow(window.innerWidth, 4) +
    7.5708477 * Math.pow(10, -7) * Math.pow(window.innerWidth, 3) -
    6.0702864 * Math.pow(10, -4) * Math.pow(window.innerWidth, 2) +
    0.1046586 * window.innerWidth +
    106.6952733;
  let liquidWidth = `${contentWidthNumber + 4}%`;
  let email = fire.auth().currentUser.email;
  email = email.split("@")[0];
  const {
    loading,
    dates,
    fetchDates,
    lists,
    fetchLists,
    routes,
    fetchRoutes,
    cars,
    fetchCars,
  } = useContext(FirebaseContext);
  let owner = fire.auth().currentUser.uid;
  let ownerDates = dates.find((date) => date.owner === owner);
  let ownerAllRoutes = routes.filter((route) => route.owner === owner);
  let ownerAllLists = lists.filter((list) => list.owner === owner);
  if (!ownerDates) {
    ownerDates = {
      dateStart: "1950.01.01",
      dateOfEnd: 36,
      dateFinish: "2080.01.01",
    };
  }
  let ownerRoutes = ownerAllRoutes.filter(
    (route) => route.routDate >= ownerDates.dateStart
  );
  ownerRoutes = ownerRoutes.filter(
    (route) => route.routDate <= ownerDates.dateFinish
  );
  let listLiquids = CommonLiquidsCount(ownerRoutes, cars);
 // console.log(ownerAllRoutes)
  listLiquids = listLiquids.sort((a, b) => a.name - b.name);
  useEffect(() => {
    fetchDates();
    fetchLists();
    fetchRoutes();
    fetchCars();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
        <LiquidsComponent
          ownerRoutes={ownerRoutes}
          listLiquids={listLiquids}
          ownerDates={ownerDates}
          liquidWidth={liquidWidth}
          ownerAllRoutes={ownerAllRoutes}
          ownerAllLists={ownerAllLists}
        />
      )}
    </div>
  );
});

export default Liquids;
