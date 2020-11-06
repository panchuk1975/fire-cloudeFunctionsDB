import React, { useContext, useEffect, memo } from "react";
import { PersonsComp } from "../components/2_conteiners/PersonsComp";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/6_common_help_comp/Loader";
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
    fetchDates,
    fetchUsersInfo,
    fetchClients,
   
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
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchClients();
    fetchDates();
    fetchUsersInfo();
    fetchPayments();
    fetchProjects();
    // eslint-disable-next-line
  }, []);
  console.log(userInfos)
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
            openCurrentProject={openCurrentProject}
            clouseCurrentProject={clouseCurrentProject}
            clouseProject={clouseProject}
            removeProject={removeProject}
            addPayment={addPayment}
            openPayment={openPayment}
            clousePayment={clousePayment}
            openNewPayment={openNewPayment}
            clouseNewPayment={clouseNewPayment}
            clientType={clientType}
            windowWidth={windowWidth}
          />
        )}
    </div>
  );
});

export default LegalPersons;
