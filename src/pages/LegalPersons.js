import React, { useContext, useEffect, memo } from "react";
import { CarsComponent } from "../components/LegalPersons";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const LegalPersons = memo(({ windowWidth }) => {
    let email = "";
    if(fire.auth.currentUser){
        email = fire.auth.currentUser.email;
        email = email.split("@")[0];
    } 
  const {
    clients,
    dates,
    userInfos,

    loading,
    fetchClients,
    fetchDates,
    fetchUsersInfo,

    openClient,
    closeClient,
    removeClient,
    //lists,
    //routes,
    //fetchLists,
    //fetchRoutes,
    // openList,
    // closeList,
    // openRoute,
    // closeRoute,
    // openNewList,
    // openNewRoute,
    // closeNewRoute,
    // clouseNewList, 
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchClients();
    fetchDates();
    fetchUsersInfo();
    //fetchLists();
    //fetchRoutes();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
        <CarsComponent
          clients={clients}
          dates={dates}
          userInfos={userInfos}
          openClient={openClient}
          closeClient={closeClient}
          removeClient={removeClient}
          
          windowWidth={windowWidth}
          //lists={lists}
          //routes={routes}
          //openList={openList}
          //closeList={closeList}
          //openRoute={openRoute}
          //closeRoute={closeRoute}
          //openNewList={openNewList}
          //clouseNewList={clouseNewList}
          //openNewRoute={openNewRoute}
          //closeNewRoute={closeNewRoute}
         
        />
      )}
    </div>
  );
});

export default LegalPersons;
