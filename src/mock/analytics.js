export const threatAnalytics = [
  { time: '00:00', human: 2, vehicle: 1, animal: 5, intrusion: 0, fire: 0 },
  { time: '02:00', human: 1, vehicle: 0, animal: 3, intrusion: 0, fire: 0 },
  { time: '04:00', human: 0, vehicle: 0, animal: 2, intrusion: 0, fire: 0 },
  { time: '06:00', human: 3, vehicle: 2, animal: 4, intrusion: 1, fire: 0 },
  { time: '08:00', human: 7, vehicle: 5, animal: 3, intrusion: 2, fire: 0 },
  { time: '10:00', human: 9, vehicle: 8, animal: 2, intrusion: 1, fire: 1 },
  { time: '12:00', human: 12, vehicle: 10, animal: 1, intrusion: 3, fire: 1 },
  { time: '14:00', human: 11, vehicle: 9, animal: 2, intrusion: 2, fire: 0 },
  { time: '16:00', human: 8, vehicle: 7, animal: 4, intrusion: 1, fire: 0 },
  { time: '18:00', human: 6, vehicle: 5, animal: 6, intrusion: 1, fire: 0 },
  { time: '20:00', human: 4, vehicle: 3, animal: 7, intrusion: 2, fire: 0 },
  { time: '22:00', human: 3, vehicle: 2, animal: 5, intrusion: 1, fire: 0 },
]

export const batteryAnalytics = [
  { time: '00:00', avg: 82, min: 34, max: 100 },
  { time: '04:00', avg: 78, min: 28, max: 100 },
  { time: '08:00', avg: 71, min: 22, max: 98 },
  { time: '12:00', avg: 63, min: 15, max: 95 },
  { time: '16:00', avg: 58, min: 12, max: 90 },
  { time: '20:00', avg: 52, min: 8, max: 87 },
  { time: '24:00', avg: 48, min: 5, max: 85 },
]

export const detectionDistribution = [
  { name: 'Human', value: 38, color: '#ff3131' },
  { name: 'Vehicle', value: 28, color: '#ffb800' },
  { name: 'Animal', value: 22, color: '#00ff41' },
  { name: 'Fire', value: 5, color: '#ff6b35' },
  { name: 'Unknown', value: 7, color: '#00d4ff' },
]

export const networkStats = [
  { time: '10:00', speed4g: 45, speed5g: 180, lora: 8, satellite: 12 },
  { time: '11:00', speed4g: 52, speed5g: 210, lora: 7, satellite: 11 },
  { time: '12:00', speed4g: 38, speed5g: 195, lora: 9, satellite: 13 },
  { time: '13:00', speed4g: 61, speed5g: 230, lora: 8, satellite: 12 },
  { time: '14:00', speed4g: 55, speed5g: 220, lora: 6, satellite: 10 },
  { time: '15:00', speed4g: 48, speed5g: 205, lora: 8, satellite: 14 },
]

export const aiDetectionLog = [
  { id: 'DET-001', type: 'human', confidence: 97.3, robot: 'RVL-001', zone: 'Sector Alpha', time: '14:32:18', status: 'threat', action: 'Alert Sent' },
  { id: 'DET-002', type: 'vehicle', confidence: 92.1, robot: 'RVL-004', zone: 'Sector Delta', time: '14:28:45', status: 'monitoring', action: 'Recording' },
  { id: 'DET-003', type: 'animal', confidence: 88.7, robot: 'RVL-006', zone: 'Sector Foxtrot', time: '14:25:12', status: 'cleared', action: 'Logged' },
  { id: 'DET-004', type: 'fire', confidence: 99.1, robot: 'RVL-002', zone: 'Sector Bravo', time: '14:19:33', status: 'threat', action: 'Emergency Alert' },
  { id: 'DET-005', type: 'human', confidence: 85.4, robot: 'RVL-001', zone: 'Sector Alpha', time: '14:15:07', status: 'cleared', action: 'False Positive' },
  { id: 'DET-006', type: 'vehicle', confidence: 94.8, robot: 'RVL-004', zone: 'Sector Delta', time: '14:10:22', status: 'monitoring', action: 'License Scan' },
  { id: 'DET-007', type: 'intrusion', confidence: 96.2, robot: 'RVL-002', zone: 'Sector Bravo', time: '14:05:55', status: 'threat', action: 'Alert Sent' },
  { id: 'DET-008', type: 'animal', confidence: 91.3, robot: 'RVL-006', zone: 'Sector Foxtrot', time: '13:58:41', status: 'cleared', action: 'Logged' },
]
