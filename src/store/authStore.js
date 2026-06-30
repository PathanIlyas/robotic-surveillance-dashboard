import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: {
    id: 'USR-001',
    name: 'Col. Marcus Webb',
    role: 'Commander',
    avatar: null,
    permissions: ['all'],
    lastLogin: new Date().toISOString(),
    unit: '1st Surveillance Battalion',
    clearanceLevel: 'TOP SECRET',
  },
  isAuthenticated: true,
  sidebarCollapsed: false,

  toggleSidebar: () => set(state => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (val) => set({ sidebarCollapsed: val }),
  logout: () => set({ isAuthenticated: false, user: null }),
}))
