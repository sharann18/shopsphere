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
    })
})));


window.store = useCartStore