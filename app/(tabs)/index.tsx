import React, {Fragment, useCallback} from 'react';
import Header from '../../components/Headers/Header';
import CartIcon from '../../assets/icons/cart_icon.svg';
import CategoryList from '../../components/Home/CategoryList';
import ProductList from '../../components/Home/ProductList';
import {useProduct} from "../../services/productHooks";
import useProductStore from "../../store/product.store";
import {t} from "../../locale/i18n";
import {View,Text} from "react-native";


export default function HomeScreen() {

    const {data, isLoading} = useProduct(0)
    const {setProduct, categoriesSelected} = useProductStore()
    console.log("this is the product list", data?.products.filter(x => x.category === categoriesSelected))
    const produits = useCallback(async () => {
        setProduct(data?.products ?? [])
    }, [data])
    return (
        <Fragment>
            <Header
                searchButton
                searchType={'products'}
                searchPlaceholder={'Typing to search products'}
                RightContent={CartIcon}
            />


            <CategoryList
                categories={[]}
            />
            <ProductList
                products={data?.products.filter(x => x.category === categoriesSelected) ?? []}
            />
        </Fragment>
    );
}