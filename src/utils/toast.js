import { useNotificationStore } from '../store/useNotificationStore'

export const toast = {
  success: (message, description = '', duration = 4000) => {
    return useNotificationStore.getState().addNotification({
      type: 'success',
      message,
      description,
      duration,
    })
  },
  error: (message, description = '', duration = 5000) => {
    return useNotificationStore.getState().addNotification({
      type: 'error',
      message,
      description,
      duration,
    })
  },
  warning: (message, description = '', duration = 4500) => {
    return useNotificationStore.getState().addNotification({
      type: 'warning',
      message,
      description,
      duration,
    })
  },
  info: (message, description = '', duration = 4000) => {
    return useNotificationStore.getState().addNotification({
      type: 'info',
      message,
      description,
      duration,
    })
  },
}
