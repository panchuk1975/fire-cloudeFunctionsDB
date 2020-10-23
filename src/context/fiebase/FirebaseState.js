import React, { useReducer } from "react";
import axios from "axios";
import fire from "../../config/Fire";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import {
  CHANGE_DATES,
  FETCHED_DATES,
  SHOW_LOADER,
  REMOVE_CAR,
  REMOVE_LIST,
  REMOVE_ROUTE,
  REMOVE_DATES,
  REMOVE_USERINFOS,
  ADD_CAR,
  ADD_LIST,
  ADD_ROUTE,
  ADD_DATES,
  ADD_USERINFO,
  CHANGE_USERINFO,
  CHANGE_INFO,
  FETCHED_USERINFO,
  FETCHED_CARS,
  FETCHED_LISTS,
  FETCHED_ROUTES,
  CHANGE_CREATE,
  CHANGE_LIST,
  CHANGE_ROUTE,
  OPEN_CAR,
  OPEN_ROUTE,
} from "../types";

//const url = "https://tehsupport-react-firebase.firebaseio.com";
const url = "https://fire-cloudefunctionsdb.firebaseio.com";

export const FirebaseState = ({ children }) => {
  //-----------------------Get Car Owner ID = userID-----------------------//
  if (fire.auth().currentUser) {
    var owner = fire.auth().currentUser.uid;
  }
  //-------------------------------Init State------------------------------//
  const initialState = {
    cars: [],
    lists: [],
    routes: [],
    dates: [],
    userInfos: [],
    loading: false,
    create: false,
    writeInfo: false,
  };
  const [state, dispatch] = useReducer(firebaseReducer, initialState);
  //---------------------------Common Functions----------------------------//
  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const changeCreate = () => dispatch({ type: CHANGE_CREATE });
  //---------------------------------Date----------------------------------//
  const addDates = async (newDates) => {
    const dates = {
      ...newDates,
      owner,
    };
    try {
      const res = await axios.post(`${url}/dates.json`, dates);
      const payload = {
        ...dates,
        id: res.data.name,
      };
      dispatch({
        type: ADD_DATES,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //---------------------------------Date----------------------------------//
  const changeDates = async (newDates) => {
    const dates = {
      ...newDates,
      owner,
    };
    try {
      const res = await axios.patch(`${url}/dates/${dates.owner}.json`, dates);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_DATES,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const removeDates = async (id) => {
    await axios.delete(`${url}/dates/${id}.json`);
    dispatch({
      type: REMOVE_DATES,
      payload: id,
    });
  };
  //------------------------------------------------------------------------//
  const fetchDates = async () => {
    showLoader();
    const res = await axios.get(`${url}/dates.json`);
    if (!res.data) {
      res.data = {};
    }
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    dispatch({
      type: FETCHED_DATES,
      payload,
    });
  };
  //-----------------------------Car functions-----------------------------//
  const addCar = async (newCar) => {
    const car = {
      ...newCar,
      owner,
    };
    try {
      const res = await axios.post(`${url}/cars.json`, car);
      const payload = {
        ...car,
        id: res.data.name,
      };
      dispatch({
        type: ADD_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const openCar = async (car) => {
    car = {
      ...car,
      openCar: true,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const closeCar = async (car) => {
    car = {
      ...car,
      openCar: false,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const removeCar = async (id) => {
    await axios.delete(`${url}/cars/${id}.json`);
    dispatch({
      type: REMOVE_CAR,
      payload: id,
    });
  };
  //------------------------------------------------------------------------//
  const fetchCars = async () => {
    showLoader();
    const res = await axios.get(`${url}/cars.json`);
    if (!res.data) {
      res.data = {};
    }
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    dispatch({
      type: FETCHED_CARS,
      payload,
    });
  };
  //-----------------------------Lists functions----------------------------//
  const openNewList = async (car) => {
    car = {
      ...car,
      openList: true,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const clouseNewList = async (car) => {
    car = {
      ...car,
      openList: false,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const addList = async (newList, car) => {
    const list = {
      ...newList,
      owner: car.owner,
      listOwner: car.id,
    };
    try {
      const res = await axios.post(`${url}/lists.json`, list);
      const payload = {
        ...list,
        id: res.data.name,
      };
      dispatch({
        type: ADD_LIST,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const removeList = async (id) => {
    await axios.delete(`${url}/lists/${id}.json`);
    dispatch({
      type: REMOVE_LIST,
      payload: id,
    });
  };
  //------------------------------------------------------------------------//
  const openList = async (list) => {
    list = {
      ...list,
      openList: true,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_LIST,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const closeList = async (list) => {
    list = {
      ...list,
      openList: false,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_LIST,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const changeListRouteTime = async (
    form,
    list,
    routeTotal,
    routeTotalTime,
    departureListDate,
    arrivalListDate
  ) => {
    routeTotal =
      parseInt((routeTotal + Number(form.routeTotal)) * 100, 10) / 100;
    routeTotalTime =
      Math.round((routeTotalTime + Number(form.routTotalTime)) * 100) / 100;
    list = {
      ...list,
      departure: departureListDate,
      arrival: arrivalListDate,
      indicatorListFinish:
        parseInt((Number(list.indicatorListStart) + routeTotal) * 100, 10) /
        100,
      timeListLast:
        Math.round((Number(list.timeListFirst) + routeTotalTime) * 100) / 100,
      totalListMileage: routeTotal,
      timeListTotal: routeTotalTime,
      openRoute: false,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_LIST,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const removeListRouteTime = async (
    form,
    list,
    routeTotal,
    routeTotalTime,
    departureListDate,
    arrivalListDate
  ) => {
    routeTotal = routeTotal - Number(form.routeTotal);
    routeTotalTime =
      Math.round((routeTotalTime - Number(form.routTotalTime)) * 100) / 100;
    list = {
      ...list,
      departure: departureListDate,
      arrival: arrivalListDate,
      indicatorListFinish:
        parseInt((Number(list.indicatorListStart) + routeTotal) * 100, 10) /
        100,
      timeListLast:
        Math.round((Number(list.timeListFirst) + routeTotalTime) * 100) / 100,
      totalListMileage: parseInt(routeTotal * 100) / 100,
      timeListTotal: Math.round(routeTotalTime * 100) / 100,
      openRoute: false,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_LIST,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const rewriteListRouteTime = async (
    form,
    route,
    list,
    routeTotal,
    routeTotalTime,
    departureListDate,
    arrivalListDate
  ) => {
    routeTotal =
      routeTotal - Number(route.routeTotal) + Number(form.routeTotal);
    routeTotalTime =
      Math.round(
        (routeTotalTime -
          Number(route.routTotalTime) +
          Number(form.routTotalTime)) *
          100
      ) / 100;
    list = {
      ...list,
      departure: departureListDate,
      arrival: arrivalListDate,
      indicatorListFinish:
        parseInt((Number(list.indicatorListStart) + routeTotal) * 100, 10) /
        100,
      timeListLast:
        Math.round((Number(list.timeListFirst) + routeTotalTime) * 100) / 100,
      totalListMileage: parseInt(routeTotal * 100) / 100,
      timeListTotal: Math.round(routeTotalTime * 100) / 100,
      openRoute: false,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_LIST,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const addCarRouteTime = async (
    form,
    car,
    routeTotal,
    routeTotalTime,
    arrivalCarDate
  ) => {
    routeTotal = routeTotal + Number(form.routeTotal);
    routeTotalTime =
      Math.round((routeTotalTime + Number(form.routTotalTime)) * 100) / 100;
    car = {
      ...car,
      dateOfRegistration: arrivalCarDate,
      carIndicatorLast:
        parseInt((Number(car.carIndicatorFirst) + routeTotal) * 100) / 100,
      carTimeFinish:
        Math.round((Number(car.carTimeStart) + routeTotalTime) * 100) / 100,
      totalCarMileage: parseInt(routeTotal * 100) / 100,
      carTimeTotal: Math.round(routeTotalTime * 100) / 100,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const removeCarRouteTime = async (
    form,
    car,
    routeTotal,
    routeTotalTime,
    arrivalCarDate
  ) => {
    routeTotal = routeTotal - Number(form.routeTotal);
    routeTotalTime =
      Math.round((routeTotalTime - Number(form.routTotalTime)) * 100) / 100;
    car = {
      ...car,
      dateOfRegistration: arrivalCarDate,
      carIndicatorLast:
        parseInt((Number(car.carIndicatorFirst) + routeTotal) * 100) / 100,
      carTimeFinish:
        Math.round((Number(car.carTimeStart) + routeTotalTime) * 100) / 100,
      totalCarMileage: parseInt(routeTotal * 100) / 100,
      carTimeTotal: parseInt(routeTotalTime * 100) / 100,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const rewriteCarRouteTime = async (
    form,
    route,
    car,
    routeTotal,
    routeTotalTime,
    arrivalCarDate
  ) => {
    routeTotal =
      routeTotal - Number(route.routeTotal) + Number(form.routeTotal);
    routeTotalTime =
      Math.round(
        (routeTotalTime -
          Number(route.routTotalTime) +
          Number(form.routTotalTime)) *
          100
      ) / 100;
    car = {
      ...car,
      dateOfRegistration: arrivalCarDate,
      carIndicatorLast:
        parseInt((Number(car.carIndicatorFirst) + routeTotal) * 100) / 100,
      carTimeFinish:
        Math.round((Number(car.carTimeStart) + routeTotalTime) * 100) / 100,
      totalCarMileage: parseInt(routeTotal * 100) / 100,
      carTimeTotal: Math.round(routeTotalTime * 100) / 100,
    };
    try {
      const res = await axios.patch(`${url}/cars/${car.id}.json`, car);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_CAR,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const fetchLists = async () => {
    showLoader();
    const res = await axios.get(`${url}/lists.json`);
    if (!res.data) {
      res.data = {};
    }
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    dispatch({
      type: FETCHED_LISTS,
      payload,
    });
  };
  //-----------------------------Routes functions----------------------------//
  const openNewRoute = async (list) => {
    list = {
      ...list,
      openRoute: true,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_ROUTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const fetchRoutes = async () => {
    showLoader();
    const res = await axios.get(`${url}/routes.json`);
    if (!res.data) {
      res.data = {};
    }
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    dispatch({
      type: FETCHED_ROUTES,
      payload,
    });
  };
  //------------------------------------------------------------------------//
  const addRoute = async (newRoute, car, list) => {
    const route = {
      ...newRoute,
      owner: car.owner,
      listOwner: car.id,
      routeOwner: list.id,
    };
    try {
      const res = await axios.post(`${url}/routes.json`, route);
      const payload = {
        ...route,
        id: res.data.name,
      };
      dispatch({
        type: ADD_ROUTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const closeNewRoute = async (list) => {
    list = {
      ...list,
      openRoute: false,
    };
    try {
      const res = await axios.patch(`${url}/lists/${list.id}.json`, list);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: OPEN_ROUTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const removeRoute = async (id) => {
    await axios.delete(`${url}/routes/${id}.json`);
    dispatch({
      type: REMOVE_ROUTE,
      payload: id,
    });
  };
  //------------------------------------------------------------------------//
  const openRoute = async (route) => {
    route = {
      ...route,
      openRoute: true,
    };
    try {
      const res = await axios.patch(`${url}/routes/${route.id}.json`, route);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_ROUTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const closeRoute = async (route) => {
    route = {
      ...route,
      openRoute: false,
    };
    try {
      const res = await axios.patch(`${url}/routes/${route.id}.json`, route);
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_ROUTE,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //-------------------------Userinfo functions---------------------------//
  const addUserInfo = async (newInfo) => {
    const userInfo = {
      ...newInfo,
    };
    try {
      const res = await axios.post(`${url}/userInfos.json`, userInfo);
      const payload = {
        ...newInfo,
        id: res.data.name,
      };
      dispatch({
        type: ADD_USERINFO,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const changeUserInfo = async (newUserInfo) => {
    const userInfo = {
      ...newUserInfo,
      owner,
    };
    try {
      const res = await axios.patch(
        `${url}/userInfos/${userInfo.id}.json`,
        userInfo
      );
      const payload = {
        ...res.data,
      };
      dispatch({
        type: CHANGE_USERINFO,
        payload,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  };
  //------------------------------------------------------------------------//
  const fetchUsersInfo = async () => {
    showLoader();
    const res = await axios.get(`${url}/userInfos.json`);
    if (!res.data) {
      res.data = {};
    }
    const payload = Object.keys(res.data).map((key) => {
      return {
        ...res.data[key],
        id: key,
      };
    });
    dispatch({
      type: FETCHED_USERINFO,
      payload,
    });
  };
  //-----------------------------------------------------------------------//
  const removeUserInfos = async (id) => {
    await axios.delete(`${url}/userInfos/${id}.json`);
    dispatch({
      type: REMOVE_USERINFOS,
      payload: id,
    });
  };
  //------------------------------------------------------------------------//
  const changeInfo = (payload) => dispatch({ type: CHANGE_INFO, payload });
  //------------------------------------------------------------------------//
  return (
    <FirebaseContext.Provider
      value={{
        showLoader,
        addCar,
        addList,
        addRoute,
        addDates,
        openNewList,
        openNewRoute,
        closeNewRoute,
        clouseNewList,
        changeListRouteTime,
        removeListRouteTime,
        rewriteListRouteTime,
        addCarRouteTime,
        removeCarRouteTime,
        rewriteCarRouteTime,
        openCar,
        openList,
        openRoute,
        closeList,
        closeRoute,
        closeCar,
        removeCar,
        removeList,
        removeRoute,
        fetchCars,
        fetchLists,
        fetchRoutes,
        changeCreate,
        changeDates,
        fetchDates,
        addUserInfo,
        fetchUsersInfo,
        changeUserInfo,
        changeInfo,
        removeDates,
        removeUserInfos,
        loading: state.loading,
        cars: state.cars,
        lists: state.lists,
        routes: state.routes,
        dates: state.dates,
        userInfos: state.userInfos,
        create: state.create,
        writeInfo: state.writeInfo,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};