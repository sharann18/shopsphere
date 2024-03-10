import { create } from 'zustand'
import { productListReducers, productDetailsReducers } from './reducers/productReducers'

export const useProductsStore = create((set) => ({
    products: [],
    product: {},
    loading: true,
    error: "",
    dispatchList: (action) => set((state) => productListReducers(state, action)),
    dispatchDetails: (action) => set((state) => productDetailsReducers(state, action))
}));