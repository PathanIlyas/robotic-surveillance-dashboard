import { create } from 'zustand'

export const useMapStore = create((set) => ({
  center: [34.0522, -118.2437],
  zoom: 13,
  showGeofence: true,
  showRoutes: true,
  showRobots: true,
  showZones: true,
  selectedLayer: 'satellite',

  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),
  toggleGeofence: () => set(state => ({ showGeofence: !state.showGeofence })),
  toggleRoutes: () => set(state => ({ showRoutes: !state.showRoutes })),
  toggleRobots: () => set(state => ({ showRobots: !state.showRobots })),
  toggleZones: () => set(state => ({ showZones: !state.showZones })),
  setLayer: (layer) => set({ selectedLayer: layer }),
}))
