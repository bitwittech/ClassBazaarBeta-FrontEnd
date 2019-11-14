import {
    createContext
} from 'react'

const Store = createContext({
    loginModal: false,
    token: null,
    isAuth: null,
    loading: false,
    alerts: []
})

export default Store;