import {
    LOGIN_MODAL
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
            default:
                return state;
    }

}