import React, { useContext, useEffect, useState, memo } from "react";
import { AllProjects } from "../components/2_conteiners/AllProjects";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/6_common_help_comp/Loader";
import fire from "../config/Fire";

const Projects = memo(({ windowWidth }) => {
  const [search, setSearch] = useState("");
  const [filterItem, setFilter] = useState("all");
  const clientType = "Юрідичний";
  let email = fire.auth.currentUser.email;
  email = email.split("@")[0];
  const {
    projects,
    payments,
    dates,
    userInfos,

    loading,
    fetchClients,
    fetchDates,
    fetchUsersInfo,

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
  //---SEARCH FUNCTION-------------->
  const changeHandler = (event) => {
    setSearch(event.target.value);
  };
  //---SORT FUNCTION------------------------->
  const sortBySearch = (projects, search, property) => {
    //--Sort by client property-------->
    let newProjects = projects.filter((project) => {
      if (String(project[property]).toLowerCase().indexOf(search.toLowerCase()) > -1) {
        return project;
      }
      return null;
    })
    return newProjects;
  }
  //---FILTER FUNCTIONS---------------------------->
  const sortByFilter = (projects, filter) => {
    //--Sort by client property-------->
    switch (filter) {
      case 'all': return projects;
      case 'active': return projects.filter((project) => project.contractExistence === "Так");
      case 'done': return projects.filter((project) => project.negotiationsResult === "Так");
      case 'inprocess': return projects.filter((project) => project.signaturуOfAct === "Так");
      default: return projects;
    }
  }
  const onFilterChange = (name) => {
    setFilter(name);
  }
  //---USE SORT FUNCTION--------------------------->
  let projectNumberProjects = sortBySearch(projects, search, 'projectNumber');
  let projectDateProjects = sortBySearch(projects, search, 'projectDate');
  let typesOfLandWorksProjects = sortBySearch(projects, search, 'typesOfLandWorks')
  let projectCostProjects = sortBySearch(projects, search, 'projectCost')
  let responsibleForLandManageProjects = sortBySearch(projects, search, 'responsibleForLandManage')
  let contractorProjects = sortBySearch(projects, search, 'contractor')
  let visibleProjects = sortByFilter([
    ...projectNumberProjects,
    ...projectDateProjects,
    ...typesOfLandWorksProjects,
    ...projectCostProjects,
    ...responsibleForLandManageProjects,
    ...contractorProjects,
  ], filterItem);
  //---BUTTONS ARRAY----------------------->
  let buttonsArray = [
    { name: 'all', label: 'Всі', shortLabel: '∑' },
    { name: 'active', label: 'Активовані', shortLabel: "\u2705" },
    { name: 'inprocess', label: 'В процесі', shortLabel: "\u23F3" },
    { name: 'done', label: 'Домовлено', shortLabel: "\u2B50" },
  ];
  const buttonsBlock = buttonsArray.map(({ name, label, shortLabel }) => {
    const isActive = filterItem === name;
    const buttonClass = isActive ? 'btn-dark' : "btn-outline-secondary";
    return (
      <button
        key={name}
        type="radio"
        className={`btn caseOfBtn ${buttonClass}`}
        value={filterItem}
        name="filterItem"
        onClick={() => onFilterChange(name)}
      >
        {windowWidth < 870 && `${shortLabel}`}
        {windowWidth >= 870 && `${label}`}
      </button>
    )
  })
  return (
    <div >
      <div className="d-flex  flex-wrap justify-content-between searchConteiner">
        <div>
          <small>{email}</small>
        </div>
        <div className="d-flex  flex-wrap justify-content-between buttonsConteiner">
          {buttonsBlock}
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
          <AllProjects
            dates={dates}
            //clients={visibleProjects}
            projects={visibleProjects}
            payments={payments}
            userInfos={userInfos}
            removeProject={removeProject}
            clientType={clientType}
            windowWidth={windowWidth}
            openCurrentProject={openCurrentProject}
            clouseCurrentProject={clouseCurrentProject}
            fetchPayments={fetchPayments}
            addPayment={addPayment}
            openPayment={openPayment}
            clousePayment={clousePayment}
            openNewPayment={openNewPayment}
            clouseNewPayment={clouseNewPayment}
          />
        )}
    </div>
  );
});

export default Projects;
