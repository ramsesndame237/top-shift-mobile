import {useMutation} from "@tanstack/react-query";
import {CartInterface} from "../utils/types";
import AppService from "../services/BaseService";
import {CartUlrs} from "../services/urls";

export const useCartAddMutation  = (setLoading:(value:boolean)=>void)=>{

    return useMutation(
        {
            mutationFn:async (payload:CartInterface) =>{
                setLoading(true)
                return await AppService.postRequest(CartUlrs.CART_ADD_URL,payload,true);

            }
        }
    )
}