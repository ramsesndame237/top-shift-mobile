import React, { Fragment } from 'react';
import Header from '../../components/Headers/Header';
import CartIcon from '../../assets/icons/cart_icon.svg';
import CategoryList from '../../components/Home/CategoryList';
import ProductList from '../../components/Home/ProductList';


export default function HomeScreen() {

  return (
      <Fragment>
        <Header
            searchButton
            searchType={'products'}
            searchPlaceholder={'Typing to search products'}
            RightContent={CartIcon}
            subtitle={'Make home'}
            title={'BEAUTIFUL'}
        />
        <CategoryList
            categories={[]}
        />
        <ProductList
            products={[]}
        />
      </Fragment>
  );
}