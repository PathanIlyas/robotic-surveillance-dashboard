import { create } from 'zustand'
import { mockMissions } from '../mock/missions'

export const useMissionStore = create((set, get) => ({
  missions: mockMissions,
  selectedMission: null,

  setSelectedMission: (mission) => set({ selectedMission: mission }),

  getActiveMissions: () => get().missions.filter(m => m.status === 'active'),
  getScheduledMissions: () => get().missions.filter(m => m.status === 'scheduled'),
  getCompletedMissions: () => get().missions.filter(m => m.status === 'completed'),

  updateMissionProgress: (id, progress) => set(state => ({
    missions: state.missions.map(m => m.id === id ? { ...m, progress } : m)
  })),
}))
