import {
  ADD_CLIENT,
  CHANGE_CLIENT,
  OPEN_CLIENT,
  CLOUSE_CLIENT,
  FETCH_CLIENTS,
  REMOVE_CLIENT,


  SHOW_LOADER,
  ADD_DATES,
  REMOVE_LIST,
  REMOVE_ROUTE,
  CHANGE_CREATE,
  CHANGE_DATES,
  CHANGE_LIST,
  ADD_LIST,
  FETCHED_LISTS,
  FETCHED_ROUTES,
  FETCHED_DATES,
  ADD_ROUTE,
  CHANGE_ROUTE,
  OPEN_ROUTE,
  OPEN_DENSITY,
  ADD_DENSITY,
  FETCHED_DENSITIES,
  FETCHED_USERINFO,
  CHANGE_INFO,
  ADD_USERINFO,
  CHANGE_USERINFO,
  REMOVE_DATES,
  REMOVE_USERINFOS,
} from "../types";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),

  //---CLIENTS STATE
  [ADD_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: [...state.clients, payload],
    //loading: false,
  }),
  [CHANGE_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: state.clients.filter((client) => client.id !== payload.id).concat([payload]),
    loading: false,
  }),
  [OPEN_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: state.clients.filter((client) => client.id !== payload.id).concat([payload]),
    loading: false,
  }),
  [CLOUSE_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: state.clients.filter((client) => client.id !== payload.id).concat([payload]),
    loading: false,
  }),
  [FETCH_CLIENTS]: (state, { payload }) => ({
    ...state,
    clients: payload,
    loading: false,
  }),
  [REMOVE_CLIENT]: (state, { payload }) => ({
    ...state,
    clients: state.clients.filter((client) => client.id !== payload),
    loading: false,
  }),







  [CHANGE_CREATE]: (state) => ({ ...state, create: !state.create }),

  [OPEN_DENSITY]: (state, { payload }) => ({
    ...state,
    cars: state.densities
      .filter((den) => den.id !== payload.id)
      .concat([payload]),
  }),
  [ADD_DENSITY]: (state, { payload }) => ({
    ...state,
    densities: [...state.densities, payload],
  }),
  [FETCHED_DENSITIES]: (state, { payload }) => ({
    ...state,
    densities: payload,
  }),
  
  [ADD_DATES]: (state, { payload }) => ({
    ...state,
    dates: [...state.dates, payload],
  }),
  [CHANGE_DATES]: (state, { payload }) => ({
    ...state,
    dates: state.dates
      .filter((date) => date.owner !== payload.owner)
      .concat([payload]),
  }),
  [FETCHED_DATES]: (state, { payload }) => ({
    ...state,
    dates: payload,
  }),
  [REMOVE_DATES]: (state, { payload }) => ({
    ...state,
    dates: state.dates.filter((date) => date.id !== payload),
  }),
 
  [REMOVE_LIST]: (state, { payload }) => ({
    ...state,
    lists: state.lists.filter((list) => list.id !== payload),
  }),
  
  [ADD_LIST]: (state, { payload }) => ({
    ...state,
    lists: [...state.lists, payload],
  }),
  [CHANGE_LIST]: (state, { payload }) => ({
    ...state,
    lists: state.lists
      .filter((list) => list.id !== payload.id)
      .concat([payload]),
  }),
  [FETCHED_LISTS]: (state, { payload }) => ({
    ...state,
    lists: payload,
    loading: false,
  }),
  [OPEN_ROUTE]: (state, { payload }) => ({
    ...state,
    lists: state.lists
      .filter((list) => list.id !== payload.id)
      .concat([payload]),
  }),
  [ADD_ROUTE]: (state, { payload }) => ({
    ...state,
    routes: [...state.routes, payload],
  }),
  [FETCHED_ROUTES]: (state, { payload }) => ({
    ...state,
    routes: payload,
    loading: false,
  }),
  [REMOVE_ROUTE]: (state, { payload }) => ({
    ...state,
    routes: state.routes.filter((route) => route.id !== payload),
  }),
  [CHANGE_ROUTE]: (state, { payload }) => ({
    ...state,
    routes: state.routes
      .filter((route) => route.id !== payload.id)
      .concat([payload]),
  }),
  [CHANGE_INFO]: (state, { payload }) => ({ ...state, writeInfo: payload }),
  [FETCHED_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: payload,
  }),
  [ADD_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: [...state.routes, payload],
  }),
  [REMOVE_USERINFOS]: (state, { payload }) => ({
    ...state,
    userInfos: state.userInfos.filter((info) => info.id !== payload),
  }),
  [CHANGE_USERINFO]: (state, { payload }) => ({
    ...state,
    userInfos: state.userInfos
      .filter((info) => info.id !== payload.id)
      .concat([payload]),
  }),
  DEFAULT: (state) => state,
};

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
