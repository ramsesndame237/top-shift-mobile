import { create } from "zustand";

export type Toast = {
  message: string;
  variant?: 'success' | 'error' | 'info';
}

interface ToastStore {
  state?: Toast,
  toast: (value: ToastStore['state']) => void;
  cancel: () => void;
}


const useToastStore = create<ToastStore>((set) => ({
  state: undefined,
  toast: (state) => set(() => ({ state })),
  cancel: () => set(() => ({ state: undefined })),
}));

export default useToastStore;