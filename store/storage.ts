import { MMKV } from "react-native-mmkv";
import { StateStorage } from 'zustand/middleware'

const mmkvStorage = new MMKV()

const storage: StateStorage = {
  setItem: (name, value) => {
    return mmkvStorage.set(name, value)
  },
  getItem: (name) => {
    const value = mmkvStorage.getString(name)
    return value ?? null
  },
  removeItem: (name) => {
    return mmkvStorage.delete(name)
  },
}

export default storage;