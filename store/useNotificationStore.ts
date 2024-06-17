import { create } from "zustand";

type Notification = {
  id: number;
  src?: any;
  title: string;
  text: string;
  type?: 'new' | 'priority';
}

interface NotificationStore {
  notifications: Notification[];
  setNotifications: (value: NotificationStore['notifications']) => void;
  removeNotification: (id: number) => void;
}


const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: 1,
      title: 'Your order #123456789 has been confirmed',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ',
      src: require('../assets/images/lamp.png'),
      type: 'new'
    },
    {
      id: 2,
      title: 'Discover hot sale furnitures this week.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ',
      src: require('../assets/images/stand.png'),
    },
    {
      id: 3,
      title: 'Coffee Chair',
      text: 'Please help us to confirm and rate your order to get 10% discount code for next order.',
      src: require('../assets/images/chair.png'),
      type: 'priority'
    },
    {
      id: 4,
      title: 'Discover hot sale furnitures this week.',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ',
    },
    {
      id: 5,
      title: 'Your order #123456789 has been shipped successfully',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ',
      src: require('../assets/images/desk.png'),
    },
    {
      id: 6,
      title: 'Your order #123456789 has been shipped successfully',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Turpis pretium et in arcu adipiscing nec. Turpis pretium et in arcu adipiscing nec. ',
    },
  ],
  removeNotification: (id: number) => set(({ notifications }) => ({
    notifications: notifications.filter((notification) => notification.id !== id)
  })),
  setNotifications: (notifications) => set(() => ({ notifications })),
}));

export default useNotificationStore;