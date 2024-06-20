
export const prefixer ='https://dummyjson.com/'
export const CategoryUrls = {
    GET_ALL_PRODUCT_CATEGORIES: `${prefixer}products/categories`,
    GET_ALL_PRODUCT_CATEGORIES_LIST: `${prefixer}products/category-list`,
}

export const ProductUrls = {
    GET_ALL_PRODUCT:(limit?:number,perPages?:number) =>`${prefixer}products${ limit !== undefined ? `?limit=${limit}` : ''}${perPages ? `?skip=${perPages}`: ''}`,
    GET_PRODUCT_DETAILS:(id:string,limit?:number,perPages?:number) =>`${prefixer}products/${id}`,
}
export const AuthUrls = {
    AUTH_URL_LOGIN: `${prefixer}auth/login`,
    AUTH_URL_REGISTER: `${prefixer}users/add`,
}

export const CartUlrs = {
    CART_ADD_URL: `${prefixer}carts/add`,
}