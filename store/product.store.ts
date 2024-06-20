import {create} from "zustand";
import {CardTypes, Product} from "../utils/types";
import {createStore, localPersistStorage} from "./store-utils";


interface ProductState {
    product: Product[],
    cart:CardTypes[],

    setCart:(data:CardTypes[])=>Promise<void>
    setProduct: (data: Product[]) => Promise<void>
    categoriesSelected: string,
    setCategorieSelected: (data: string) => Promise<void>
}

const useProductStore = createStore<ProductState>((set) => ({
    product: [],
    cart:[],
    setCart:async(data:CardTypes[])=>{
        set({cart:data})
    },
    categoriesSelected: 'beauty',
    setCategorieSelected: async (data: string) => {
        set({categoriesSelected: data})
    },
    setProduct: async (data: Product[]) => {
        set({product: data})
    }
}), {
    devtoolsEnabled: true,
    persistOptions: {
        name: 'product-list',
        storage: localPersistStorage,
    },
})
export default useProductStore;