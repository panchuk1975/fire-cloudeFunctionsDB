import React, { useContext, useEffect, memo } from "react";
import { CreateCar } from "../components/CreateCar";
import { FirebaseContext } from "../context/fiebase/firebaseContext";
import { Loader } from "../components/Loader";
import fire from "../config/Fire";

const CreateNew = memo(() => {
  let email = fire.auth().currentUser.email;
  email = email.split("@")[0];
  const { loading, cars, fetchCars, userInfos, fetchUsersInfo } = useContext(
    FirebaseContext
  );
  var owner = fire.auth().currentUser.uid;
  let userInfo = userInfos.find((info) => info.owner === owner);
  useEffect(() => {
    fetchCars();
    fetchUsersInfo();
    // eslint-disable-next-line
  }, []); 
  return (
    <div>
      <small>{email}</small>
      {loading ? <Loader /> : <CreateCar cars={cars} userInfo={userInfo} />}
    </div>
  );
});

export default CreateNew;
