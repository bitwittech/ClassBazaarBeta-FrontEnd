import {
    LOGIN_MODAL,
    LOADING,
    ALERT
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
                    return {
                        ...state,
                        alerts: state.alerts.push(payload)
                    }
                    default:
                        return state;
    }

}