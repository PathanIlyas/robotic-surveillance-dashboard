import { create } from 'zustand'
import { mockAlerts } from '../mock/alerts'

export const useAlertStore = create((set, get) => ({
  alerts: mockAlerts,
  unreadCount: mockAlerts.filter(a => !a.acknowledged).length,

  acknowledgeAlert: (id) => set(state => {
    const alerts = state.alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a)
    return { alerts, unreadCount: alerts.filter(a => !a.acknowledged).length }
  }),

  resolveAlert: (id) => set(state => {
    const alerts = state.alerts.map(a => a.id === id ? { ...a, status: 'resolved', acknowledged: true } : a)
    return { alerts, unreadCount: alerts.filter(a => !a.acknowledged).length }
  }),

  addAlert: (alert) => set(state => ({
    alerts: [{ ...alert, id: `ALT-${Date.now()}`, timestamp: new Date().toISOString() }, ...state.alerts],
    unreadCount: state.unreadCount + 1,
  })),

  getActiveAlerts: () => get().alerts.filter(a => a.status === 'active'),
  getCriticalAlerts: () => get().alerts.filter(a => a.severity === 'critical' && a.status === 'active'),
}))
