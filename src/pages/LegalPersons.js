import React, { useContext, useEffect, memo } from "react";
import { PersonsComp } from "../components/PersonsComp";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const LegalPersons = memo(({ windowWidth }) => {
  const clientType = "Юрідичний";
  let email = "";
  if (fire.auth.currentUser) {
    email = fire.auth.currentUser.email;
    email = email.split("@")[0];
  }
  const {
    clients,
    projects,
    payments,
    dates,
    userInfos,

    loading,
    fetchClients,
    fetchDates,
    fetchUsersInfo,

    openClient,
    clouseClient,
    removeClient,

    addProject,
    openProject,
    clouseProject,
    openCurrentProject,
    clouseCurrentProject,
    removeProject,
    fetchProjects,

    addPayment,
    openPayment,
    openNewPayment,
    clouseNewPayment,
    clousePayment,
    fetchPayments,
    //routes,
    //fetchRoutes,
    // openList,
    // closeList,
    // openRoute,
    // closeRoute,
    // openNewList,

    // closeNewRoute,
    // clouseNewList, 
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchClients();
    fetchDates();
    fetchUsersInfo();
    fetchPayments();
    fetchProjects();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
          <PersonsComp
            dates={dates}
            clients={clients}
            projects={projects}
            payments={payments}
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
            openCurrentProject={openCurrentProject}
            clouseCurrentProject={clouseCurrentProject}
            addPayment={addPayment}
            openPayment={openPayment}
            clousePayment={clousePayment}
            openNewPayment={openNewPayment}
            clouseNewPayment={clouseNewPayment}
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
