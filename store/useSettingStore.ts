import { Appearance } from 'react-native';
import { create } from 'zustand';

export type Setting = {
  id: number;
  title: string;
  label: string;
  active?: boolean;
}

export interface SettingStore {
  mode: 'light' | 'dark';
  setMode: (mode: SettingStore['mode']) => void;
  settings: Setting[];
  setSettings: (settings: Setting[]) => void;
}

const useSettingStore = create<SettingStore>((set, get) => ({
  mode: 'light' ?? Appearance.getColorScheme() ?? 'light',
  settings: [
    {
      id: 1,
      title: 'Vibration',
      label: 'Tap to check if on or off',
      active: true,
    },
    {
      id: 2,
      title: 'Push Benachrichtigungen',
      label: 'Tap to check if on or off'
    },
    {
      id: 3,
      title: 'Sound',
      label: 'Tap to check if on or off'
    },
    {
      id: 4,
      title: 'Darkmode',
      label: 'Tap to check if on or off'
    },
    {
      id: 5,
      title: 'Logout',
      label: 'Tap to check if on or off'
    },
    {
      id: 6,
      title: 'Support',
      label: 'Tap to check if on or off'
    },
  ],
  setSettings: (settings) => set(() => ({ settings })),
  setMode: (mode) => set({ mode }),
}));


export default useSettingStore;