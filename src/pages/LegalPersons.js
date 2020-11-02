import React, { useContext, useEffect, memo } from "react";
import { PersonsComp } from "../components/PersonsComp";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const LegalPersons = memo(({ windowWidth }) => {
    const clientType = "Юрідичний";
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

    projects,
    addProject,
    openProject,
    clouseProject,
    openCurrentProject,
    clouseCurrentProject,
    removeProject,
    fetchProjects,
    //routes,
    
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
    fetchProjects();
    //fetchRoutes();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
        <PersonsComp
          clients={clients}
          dates={dates}
          userInfos={userInfos}
          openClient={openClient}
          clouseClient={clouseClient}
          removeClient={removeClient}
          addProject={addProject}
          openProject={openProject}
          clouseProject={clouseProject}
          removeProject={removeProject}
          clientType={clientType}
          windowWidth={windowWidth}
          projects={projects}
          openCurrentProject={openCurrentProject}
          clouseCurrentProject={clouseCurrentProject}
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
