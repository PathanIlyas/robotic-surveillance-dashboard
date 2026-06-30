import { create } from 'zustand'
import { mockRobots } from '../mock/robots'

export const useRobotStore = create((set, get) => ({
  robots: mockRobots,
  selectedRobot: null,
  filter: 'all',
  loading: false,

  setSelectedRobot: (robot) => set({ selectedRobot: robot }),
  setFilter: (filter) => set({ filter }),

  getActiveRobots: () => get().robots.filter(r => r.status === 'active'),
  getOfflineRobots: () => get().robots.filter(r => r.status === 'offline'),
  getIdleRobots: () => get().robots.filter(r => r.status === 'idle'),

  updateRobotBattery: (id, battery) => set(state => ({
    robots: state.robots.map(r => r.id === id ? { ...r, battery } : r)
  })),

  updateRobotStatus: (id, status) => set(state => ({
    robots: state.robots.map(r => r.id === id ? { ...r, status } : r)
  })),
}))
