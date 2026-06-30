import { create } from 'zustand'
import { mockSensorData } from '../mock/sensors'

export const useSensorStore = create((set) => ({
  sensors: mockSensorData,
  loading: false,

  updateSensor: (type, data) => set(state => ({
    sensors: { ...state.sensors, [type]: { ...state.sensors[type], ...data } }
  })),
}))
