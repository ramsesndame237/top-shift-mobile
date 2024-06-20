

import {useQuery, useQueryClient} from "@tanstack/react-query";
import AppService from "../services/BaseService";
import {CategoryUrls} from "../services/urls";
import {t} from "../locale/i18n";


export let useCategory = () => {

    const queryClient = useQueryClient();


    return useQuery<string[], Error>(
        {
            queryKey: ['categories'], queryFn: async () => {
                let data;
                try {
                    console.log("this is the data")
                    const response = await AppService.getRequest(CategoryUrls.GET_ALL_PRODUCT_CATEGORIES_LIST,false)
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

