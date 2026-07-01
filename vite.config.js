import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main:              path.resolve(__dirname, 'index.html'),
        dashboard:         path.resolve(__dirname, 'dashboard.html'),
        landSurveillance:  path.resolve(__dirname, 'land-surveillance.html'),
        droneSurveillance: path.resolve(__dirname, 'drone-surveillance.html'),
        waterSurveillance: path.resolve(__dirname, 'water-surveillance.html'),
        missionControl:    path.resolve(__dirname, 'mission-control.html'),
        alerts:            path.resolve(__dirname, 'alerts.html'),
        reports:           path.resolve(__dirname, 'reports.html'),
        settings:          path.resolve(__dirname, 'settings.html'),
      },
    },
  },
})
