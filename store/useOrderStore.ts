import { create } from "zustand";

export type Order = {
  number: string;
  date: string;
  quantity?: number;
  amount: number;
  details: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface OrderStore {
  orders: Order[];
}


const useOrderStore = create<OrderStore>((set) => ({
  orders: [
    {
      number: '123456',
      date: '2021-01-01',
      amount: 120,
      quantity: 2,
      details: 'Black Simple Lamp',
      status: 'pending',
    },
    {
      number: '123457',
      date: '2021-01-02',
      amount: 250,
      quantity: 1,
      details: 'Minimal Stand',
      status: 'completed',
    },
    {
      number: '123458',
      date: '2021-01-03',
      amount: 250,
      quantity: 1,
      details: 'Coffee Chair',
      status: 'cancelled',
    },
    {
      number: '123459',
      date: '2021-01-04',
      amount: 825,
      quantity: 10,
      details: 'Coffee Chair',
      status: 'completed',
    }
  ]
}));

export default useOrderStore;