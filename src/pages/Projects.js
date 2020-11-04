import React, { useContext, useEffect, memo } from "react";
import { AllProjects } from "../components/AllProjects";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const Projects = memo(({ windowWidth }) => {
  const clientType = "Юрідичний";
  let email = fire.auth.currentUser.email;
  email = email.split("@")[0];
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
  } = useContext(FirebaseContext);
  useEffect(() => {
    fetchClients();
    fetchDates();
    fetchUsersInfo();
    fetchProjects();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <small>{email}</small>
      {loading ? (
        <Loader />
      ) : (
        <AllProjects
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
      />
      )}
    </div>
  );
});

export default Projects;
