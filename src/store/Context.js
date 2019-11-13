import {
    createContext
} from 'react'

const Store = createContext({
    loginModal: false,
    token: null,
    isAuth: null
})

export default Store;