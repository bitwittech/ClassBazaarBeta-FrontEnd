import {
  LOGIN_MODAL,
  LOADING,
  ALERT,
  REMOVE_ALERT,
  LOGIN,
  FETCH_USER,
} from './Types';

export default function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      console.log('reducerddd');
      localStorage.setItem('cbtoken', payload.token);
      return {
        ...state,
        isAuth: true,
        token: payload.token,
        user: payload.user,
      };
    case FETCH_USER:
      return {
        ...state,
        user: payload,
      };
    case LOGIN_MODAL:
      return {
        ...state,
        loginModal: payload,
      };
    case LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ALERT:
      const keyId = Math.random();
      const finalPayload = {
        ...payload,
        id: keyId,
      };
      return {
        ...state,
        alerts: [...state.alerts, finalPayload],
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alerts: state.alerts.filter(a => a.id !== payload),
      };
    default:
      return state;
  }
}
