import React, { useContext, useEffect, memo } from "react";
import { LegalPersonsComp } from "../components/LegalPersonsComp";
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
    clouseClient,
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
        <LegalPersonsComp
          clients={clients}
          dates={dates}
          userInfos={userInfos}
          openClient={openClient}
          clouseClient={clouseClient}
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
