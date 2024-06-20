import {useQuery, useQueryClient} from "@tanstack/react-query";
import {Product, ProductData} from "../utils/types";
import useProductStore from "../store/product.store";
import AppService from "./BaseService";
import {ProductUrls} from "./urls";
import {t} from "../locale/i18n";


const details_key = (id:string) =>['product_details', id];
export const useProduct = (limit?:number,skip?:number) => {

    const queryClient = useQueryClient();
    const productStore =useProductStore();


    return useQuery<ProductData, Error>(
        {
            queryKey: ['products'], queryFn: async () => {
                let data;
                try {
                    console.log("this is the data",limit)
                    const response = await AppService.getRequest(ProductUrls.GET_ALL_PRODUCT(limit), false)
                    data = await response.json()
                    if ([200, 201].includes(response.status)) {
                        await productStore.setProduct(data.products as Product[])
                        return data
                    }
                } catch (e) {
                    throw new Error(t('translate_key_server_error_message'))

                }
                throw new Error(data?.message || data?.detail || t(''));
            }
        },

    )
}

export const useProductDetails = (id:string) =>{
    const queryClient = useQueryClient();

    return useQuery<Product, Error>(
        {
            queryKey: details_key(id), queryFn: async () => {
                let data;
                try {
                    console.log("this is the data")
                    const response = await AppService.getRequest(ProductUrls.GET_PRODUCT_DETAILS(id), false)
                    data = await response.json()
                    if ([200, 201].includes(response.status)) {
                        return data
                    }
                } catch (e) {
                    throw new Error(t('translate_key_server_error_message'))

                }
                throw new Error(data?.message || data?.detail || t(''));
            }
        },
    )
}