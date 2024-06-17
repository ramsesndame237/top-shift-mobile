import { create } from "zustand";

export type Product = {
  id: number;
  src: any;
  title: string;
  price: number;
  quantity?: number;
  selected?: boolean;
}

export type Review = {
  id: number;
  product: Product;
  text?: string;
  date: string;
  rating: number;
}


interface ProductStore {
  products: Product[];
  favorites: Product[];
  reviews: Review[];
  setProducts: (value: ProductStore['products']) => void;
  setFavorites: (value: ProductStore['favorites']) => void;
  setReviews: (value: ProductStore['reviews']) => void;
}


const useProductStore = create<ProductStore>((set) => ({
  favorites: [
    {
      id: 1,
      title: 'Black Simple Lamp',
      price: 12,
      src: require('../assets/images/lamp.png'),
    },
    {
      id: 2,
      title: 'Minimal Stand',
      price: 25,
      src: require('../assets/images/stand.png'),
    },
    {
      id: 3,
      title: 'Coffee Chair',
      price: 25,
      src: require('../assets/images/chair.png'),
    }
  ],
  products: [
    {
      id: 1,
      title: 'Black Simple Lamp',
      price: 12,
      src: require('../assets/images/lamp.png'),
    },
    {
      id: 2,
      title: 'Minimal Stand',
      price: 25,
      src: require('../assets/images/stand.png'),
    },
    {
      id: 3,
      title: 'Coffee Chair',
      price: 25,
      src: require('../assets/images/chair.png'),
    },
    {
      id: 4,
      title: 'Simple Desk',
      price: 25,
      src: require('../assets/images/desk.png'),
    },
  ],
  reviews: [
    {
      id: 1,
      product: {
        id: 1,
        title: 'Black Simple Lamp',
        price: 12,
        src: require('../assets/images/lamp.png'),
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lectus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lectus nec nunc.',
      date: '2021/06/01',
      rating: 4,
    },
    {
      id: 2,
      product: {
        id: 2,
        title: 'Minimal Stand',
        price: 25,
        src: require('../assets/images/stand.png'),
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lectus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lectus nec nunc.',
      date: '2021/06/01',
      rating: 5,
    },
    {
      id: 3,
      product: {
        id: 3,
        title: 'Coffee Chair',
        price: 25,
        src: require('../assets/images/chair.png'),
      },
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lectus nec nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non lectus nec nunc.',
      date: '2021/06/01',
      rating: 3,
    },
  ],
  setProducts: (products) => set(() => ({ products })),
  setFavorites: (favorites) => set(() => ({ favorites })),
  setReviews: (reviews) => set(() => ({ reviews })),
}));

export default useProductStore;