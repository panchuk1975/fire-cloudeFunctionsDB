import React, { useContext, useEffect, memo } from "react";
import { CreateComponent } from "../components/CreateComponent";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const CreateNew = memo(() => {
  let email = fire.auth.currentUser.email;
  email = email.split("@")[0];
  const { loading, clients, fetchClients, userInfos, fetchUsersInfo } = useContext(
    FirebaseContext
  );
  var owner = fire.auth.currentUser.uid;
  let userInfo = userInfos.find((info) => info.owner === owner);
  useEffect(() => {
    fetchClients();
    fetchUsersInfo();
    // eslint-disable-next-line
  }, []); 
  return (
    <div>
      <small>{email}</small>
      {loading ? <Loader /> : <CreateComponent clients={clients} userInfo={userInfo} />}
    </div>
  );
});

export default CreateNew;
