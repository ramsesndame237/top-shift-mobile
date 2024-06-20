import { create } from "zustand";

interface AuthStore {
  auth: any | null;
  setAuth: (authSession: AuthStore['auth']) => void;
}


const useAuthStore = create<AuthStore>((set) => ({
  auth: null,
  setAuth: (auth) => set(() => ({ auth }))
}))


export default useAuthStore;