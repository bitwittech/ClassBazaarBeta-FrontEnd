import {
    LOGIN_MODAL,
    LOADING,
    ALERT,
    REMOVE_ALERT
} from './Types'

export default function reducer(state, action) {

    const {
        type,
        payload
    } = action;

    switch (type) {
        case LOGIN_MODAL:
            return {
                ...state,
                loginModal: payload
            }
            case LOADING:
                return {
                    ...state,
                    loading: payload
                }
                case ALERT:
                    const keyId = Math.random();
                    const finalPayload = {
                        ...payload,
                        id: keyId
                    }
                    return {
                        ...state,
                        alerts: [...state.alerts, finalPayload]
                    }
                    case REMOVE_ALERT:
                        return {
                            ...state,
                            alerts: state.alerts.filter(a => a.id !== payload)
                        }
                        default:
                            return state;
    }

}