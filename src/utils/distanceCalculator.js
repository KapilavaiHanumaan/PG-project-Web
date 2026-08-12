// Key landmark locations in Hyderabad with coordinates
export const HYDERABAD_LANDMARKS = [
  { id: 'mindspace', name: 'Mindspace IT Park', category: 'it_park', lat: 17.4435, lng: 78.3772 },
  { id: 'dlf', name: 'DLF Cybercity Gachibowli', category: 'it_park', lat: 17.4401, lng: 78.3489 },
  { id: 'cybertowers', name: 'Cyber Towers HITECH City', category: 'it_park', lat: 17.4504, lng: 78.3811 },
  { id: 'financial_district', name: 'Financial District Nanakramguda', category: 'it_park', lat: 17.4184, lng: 78.3421 },
  { id: 'iiit', name: 'IIIT Hyderabad', category: 'college', lat: 17.4452, lng: 78.3489 },
  { id: 'jntu', name: 'JNTU Kukatpally', category: 'college', lat: 17.4933, lng: 78.3914 },
  { id: 'isb', name: 'ISB Gachibowli', category: 'college', lat: 17.4262, lng: 78.3432 },
  { id: 'raidurg_metro', name: 'Raidurg Metro Station', category: 'metro', lat: 17.4408, lng: 78.3742 },
  { id: 'hitech_metro', name: 'HITECH City Metro Station', category: 'metro', lat: 17.4496, lng: 78.3846 },
  { id: 'ameerpet_metro', name: 'Ameerpet Metro Interchange', category: 'metro', lat: 17.4375, lng: 78.4482 },
]

// Haversine distance formula calculation in kilometers
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c // Distance in km
  return Math.round(d * 10) / 10
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

// Estimate travel times based on distance
export function getTravelEstimates(distanceKm) {
  const walkMins = Math.round((distanceKm / 4.5) * 60) // avg walking speed 4.5 km/h
  const metroMins = Math.round((distanceKm / 30) * 60) + 4 // metro speed + wait
  const driveMins = Math.round((distanceKm / 20) * 60) + 3 // city traffic speed

  return {
    walk: walkMins <= 60 ? `${walkMins} mins walk` : `${(walkMins / 60).toFixed(1)} hrs walk`,
    metro: metroMins <= 45 ? `${metroMins} mins metro` : `${(metroMins / 60).toFixed(1)} hrs`,
    drive: `${driveMins} mins drive`,
  }
}

// Find nearest landmark to coordinates
export function getNearestLandmarks(pgLat, pgLng) {
  return HYDERABAD_LANDMARKS.map((landmark) => {
    const dist = calculateDistanceKm(pgLat, pgLng, landmark.lat, landmark.lng)
    return {
      ...landmark,
      distanceKm: dist,
      estimates: getTravelEstimates(dist),
    }
  }).sort((a, b) => a.distanceKm - b.distanceKm)
}
