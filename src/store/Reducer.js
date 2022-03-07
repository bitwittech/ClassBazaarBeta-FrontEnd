import {
    LOGIN_MODAL,
    LOADING,
    ALERT,
    REMOVE_ALERT,
    LOGIN,
    LOGOUT,
    FETCH_USER,
    Pre_LOG_Box,
    UPDATE_BOOKMARK,
    REMOVE_TOKEN,
    EdubukFrom
} from './Types';
import {
    store
} from '../App'
export default function reducer(state, action) {
    const {
        type,
        payload
    } = action;

    switch (type) {
        case LOGIN:
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
                    isAuth: true,
            };
        case LOGOUT:
        case REMOVE_TOKEN:
            localStorage.removeItem('cbtoken');
            store.clear().then(res => {
                console.log("LOGOUT", res)
            })

            return {
                ...state,
                isAuth: false,
                    token: null,
                    user: null,
            };


        case LOGIN_MODAL:
            console.log("call", payload)
            return {
                ...state,
                loginModal: payload
            };
        case Pre_LOG_Box:
            console.log("call", payload)
            return {
                ...state,
                preLogBox: payload
            };
        case EdubukFrom:
            console.log("call", payload)
            return {
                ...state,
                edubukFrom: payload
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
        case UPDATE_BOOKMARK:
            return {
                ...state,
                user: {
                    ...state.user,
                    data: {
                        ...state.user.data,
                        bookmarks: payload
                    }

                }
            }
            case REMOVE_ALERT:
                return {
                    ...state,
                    alerts: state.alerts.filter(a => a.id !== payload),
                };
            default:
                return state;
    }
}
