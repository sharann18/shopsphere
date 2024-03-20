import { create } from 'zustand'
import zukeeper from 'zukeeper'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

export const useProductsStore = create(zukeeper((set) => ({
    products: [],
    product: {},
    loading: true,
    error: "",
    dispatchList: (action) => set((state) => productListReducer(state, action)),
    dispatchDetails: (action) => set((state) => productDetailsReducer(state, action))
})));

export const useCartStore = create(zukeeper((set) => ({
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    addItem: (addedItem) => set((state) => {
        const item = addedItem
        const existItem = state.cartItems.find((x) => x.product === item.product)

        if (existItem) {
            return {
                ...state,
                cartItems: state.cartItems.map((x) => x.product === existItem.product ? item : x)
            }
        } else {
            return {
                ...state, 
                cartItems:[...state.cartItems, item]
            }
        }
    }),
    removeItem: (removeItemId) => set((state) => {
        return {
            ...state,
            cartItems: state.cartItems.filter(x => x.product !== removeItemId)
        }
    })
})));

export const useUserStore = create(zukeeper((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    loading: false,
    error: "",
    loginWait:() => set((state) => {
        return {
            ...state,
            loading: true
        }
    }),
    login: (userData) => set((state) => {
        return {
            ...state,
            user: userData,
            loading: false
        }
    }),
    loginFail: (errorData) => set((state) => {
        return {
            ...state,
            error: errorData,
            loading: false
        }
    }),
    logout: () => set((state) => ({...state, user: null})
    )
})))


window.store = useUserStore