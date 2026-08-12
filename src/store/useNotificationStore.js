import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],
  addNotification: (notification) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5)
    const newNotification = {
      id,
      type: notification.type || 'info', // 'success' | 'error' | 'warning' | 'info'
      message: notification.message,
      description: notification.description || '',
      duration: notification.duration || 4500,
    }

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }))

    if (newNotification.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }))
      }, newNotification.duration)
    }

    return id
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }))
  },
  clearAll: () => set({ notifications: [] }),
}))
