/** Nashik Ramkund / Godavari ghat area — approximate demo coords */
export const MAP_CENTER = [19.9975, 73.7898]
export const MAP_ZOOM = 15

export const densZones = [
  {
    id: 'z1',
    name: 'Ramkund North',
    nameHi: 'रामकुंड उत्तर',
    center: [19.9991, 73.7902],
    radius: 90,
    density: 0.92,
    risk: 'high',
    trend: '+18%/10m',
  },
  {
    id: 'z2',
    name: 'Ganga Ghat Bridge',
    nameHi: 'गंगा घाट पूल',
    center: [19.9968, 73.7884],
    radius: 70,
    density: 0.64,
    risk: 'med',
    trend: '+7%/10m',
  },
  {
    id: 'z3',
    name: 'Trimbak Road Entry',
    nameHi: 'त्र्यंबक रोड प्रवेश',
    center: [19.9954, 73.7918],
    radius: 80,
    density: 0.38,
    risk: 'low',
    trend: 'stable',
  },
  {
    id: 'z4',
    name: 'Medical Camp B',
    nameHi: 'मेडिकल कैंप B',
    center: [19.9982, 73.7872],
    radius: 55,
    density: 0.28,
    risk: 'low',
    trend: 'stable',
  },
  {
    id: 'z5',
    name: 'Sita Gufa Approach',
    nameHi: 'सीता गुफा मार्ग',
    center: [19.9979, 73.7926],
    radius: 65,
    density: 0.71,
    risk: 'med',
    trend: '+11%/10m',
  },
]

export const medicalCamps = [
  {
    id: 'mc1',
    name: 'Medical Camp A · Ramkund',
    coords: [19.9986, 73.7891],
    etaMin: 2,
    phone: '+91-108-DEMO',
  },
  {
    id: 'mc2',
    name: 'Medical Camp B · Bridge',
    coords: [19.9962, 73.7878],
    etaMin: 4,
    phone: '+91-108-DEMO',
  },
]

export const pilgrims = [
  {
    id: 'p1',
    name: 'Kamala Devi',
    age: 72,
    lastSeen: 'Ramkund North · 07:42',
    description: 'Saffron saree, silver bangles, soft-spoken Marathi',
    consent: true,
    avatarHue: 28,
  },
  {
    id: 'p2',
    name: 'Arjun Patil',
    age: 9,
    lastSeen: 'Ganga Ghat Bridge · 08:05',
    description: 'Blue school bag, wristband KK-2041',
    consent: true,
    avatarHue: 195,
  },
]

export const matchCandidate = {
  id: 'm1',
  shelter: 'Family Reunion Desk · Camp A',
  foundAt: '08:18',
  volunteer: 'Priya Kulkarni',
  confidence: 0.91,
  note: 'Consent verified · edge match only · auto-delete in 24h',
}

export const volunteers = [
  {
    id: 'v1',
    name: 'Priya Kulkarni',
    skills: ['First aid', 'Marathi', 'Guide'],
    distanceM: 180,
    status: 'idle',
    myBharatId: 'MB-NSK-1142',
  },
  {
    id: 'v2',
    name: 'Rohan Deshmukh',
    skills: ['Crowd guide', 'Hindi', 'SMS relay'],
    distanceM: 320,
    status: 'idle',
    myBharatId: 'MB-NSK-2208',
  },
  {
    id: 'v3',
    name: 'Ananya Sharma',
    skills: ['Medical assist', 'Tamil', 'Hindi'],
    distanceM: 540,
    status: 'busy',
    myBharatId: 'MB-NSK-3310',
  },
]

export const openTasks = [
  {
    id: 't1',
    type: 'SOS escort',
    where: 'Ramkund North → Camp A',
    priority: 'high',
  },
  {
    id: 't2',
    type: 'Lost child guide',
    where: 'Bridge → Reunion Desk',
    priority: 'med',
  },
  {
    id: 't3',
    type: 'Crowd diversion',
    where: 'North gate → East flow',
    priority: 'high',
  },
]
