export interface Categories {
    slug: string;
    name: string;
    url:  string;
}
export interface ProductData {
    products: Product[];
    total:    number;
    skip:     number;
    limit:    number;
}

export interface Product {
    id:                   number;
    title:                string;
    description:          string;
    category:             string;
    price:                number;
    discountPercentage:   number;
    rating:               number;
    stock:                number;
    tags:                 string[];
    brand:                string;
    sku:                  string;
    weight:               number;
    dimensions:           Dimensions;
    warrantyInformation:  string;
    shippingInformation:  string;
    availabilityStatus:   string;
    reviews:              Review[];
    returnPolicy:         string;
    minimumOrderQuantity: number;
    meta:                 Meta;
    thumbnail:            string;
    images:               string[];
}

export interface Dimensions {
    width:  number;
    height: number;
    depth:  number;
}

export interface Meta {
    createdAt: Date;
    updatedAt: Date;
    barcode:   string;
    qrCode:    string;
}

export interface Review {
    rating:        number;
    comment:       string;
    date:          Date;
    reviewerName:  string;
    reviewerEmail: string;
}
export interface CardTypes{
    quantity:number,
    product:Product,
    priceTotal:number
}
export interface User {
    id:           number;
    username:     string;
    email:        string;
    firstName:    string;
    lastName:     string;
    gender:       string;
    image:        string;
    token:        string;
    refreshToken: string;
}
export interface CartInterface{
    userId:number,
    products:{id:number,quantity:number}[]
}