import React, { useEffect, useState, Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Star, MapPin, ShieldCheck, ArrowRight, X, AlertTriangle, Compass } from 'lucide-react'
import { EXPANDED_PGS } from '../../data/mockDiscoveryData'
import { useDiscoveryStore } from '../../store/useDiscoveryStore'

// Fix Leaflet default marker icons issue in Vite production build
try {
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
} catch (e) {
  console.warn('Leaflet icon initialization notice:', e)
}

// Custom Pin Marker Icon Generator
const createCustomIcon = (price, isSelected) => {
  const bgClass = isSelected
    ? 'bg-blue-600 border-white text-white font-extrabold scale-110 shadow-xl'
    : 'bg-slate-900 border-blue-500 text-blue-400 font-bold hover:scale-105'

  const numPrice = typeof price === 'number' ? price : 0
  const priceDisplay = (numPrice / 1000).toFixed(1)

  const html = `
    <div class="flex items-center justify-center px-2 py-1 rounded-xl border ${bgClass} text-[11px] shadow-lg transition-all font-sans whitespace-nowrap cursor-pointer">
      <span>₹${priceDisplay}k</span>
    </div>
  `
  return L.divIcon({
    html,
    className: 'custom-leaflet-marker',
    iconSize: [50, 24],
    iconAnchor: [25, 12],
  })
}

// Helper component to re-center map dynamically when selected PG changes
function MapRecenter({ center }) {
  const map = useMap()
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      try {
        map.flyTo(center, 14, { duration: 1 })
      } catch (e) {
        console.warn('Map flyTo failed:', e)
      }
    }
  }, [center, map])
  return null
}

// Internal Error Boundary for Map Component
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('InteractiveMap Error caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-[550px] lg:h-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-white">Interactive Map Mode</h4>
          <p className="text-xs text-slate-400 max-w-xs">
            Map tiles loading in text list view. Click on any PG card to view exact GPS location and commute intelligence.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

function InnerInteractiveMap({ pgs = EXPANDED_PGS, onSelectPG }) {
  const { setSelectedPGForModal } = useDiscoveryStore()
  const [selectedMapPG, setSelectedMapPG] = useState(null)

  const defaultCenter = [17.4435, 78.3772] // HITECH City / Madhapur center

  const validPGs = Array.isArray(pgs)
    ? pgs.filter((p) => p && typeof p.lat === 'number' && typeof p.lng === 'number')
    : EXPANDED_PGS

  const centerPos =
    selectedMapPG && typeof selectedMapPG.lat === 'number' && typeof selectedMapPG.lng === 'number'
      ? [selectedMapPG.lat, selectedMapPG.lng]
      : defaultCenter

  return (
    <div className="relative w-full h-[550px] lg:h-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl z-10">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full rounded-3xl bg-slate-950"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapRecenter center={centerPos} />

        {validPGs.map((pg) => {
          const isSelected = selectedMapPG?.id === pg.id
          const priceVal = typeof pg.price === 'number' ? pg.price : 0

          return (
            <Marker
              key={pg.id}
              position={[pg.lat, pg.lng]}
              icon={createCustomIcon(priceVal, isSelected)}
              eventHandlers={{
                click: () => setSelectedMapPG(pg),
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="p-1 max-w-[200px] text-slate-900 font-sans">
                  <img
                    src={pg.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80'}
                    alt={pg.name || 'PG'}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h4 className="font-bold text-xs leading-tight mb-1">{pg.name}</h4>
                  <p className="text-[10px] text-slate-600 mb-1">{pg.locality}, Hyderabad</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-200">
                    <span className="font-black text-xs text-blue-600">₹{priceVal.toLocaleString()}/mo</span>
                    <button
                      onClick={() => onSelectPG(pg)}
                      className="px-2 py-1 bg-blue-600 text-white rounded-md text-[10px] font-bold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Floating Card Preview at bottom on Mobile / Map view */}
      {selectedMapPG && (
        <div className="absolute bottom-4 left-4 right-4 z-[400] bg-slate-900/95 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl flex items-center gap-3">
          <img
            src={selectedMapPG.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80'}
            alt={selectedMapPG.name || 'PG'}
            className="w-16 h-16 rounded-xl object-cover"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white truncate">{selectedMapPG.name}</h4>
            <p className="text-[11px] text-slate-400">{selectedMapPG.locality}, Hyderabad</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-extrabold text-emerald-400">
                ₹{(selectedMapPG.price || 0).toLocaleString()}/mo
              </span>
              <span className="text-[10px] text-amber-400 font-bold">★ {selectedMapPG.rating || 4.5}</span>
            </div>
          </div>
          <button
            onClick={() => onSelectPG(selectedMapPG)}
            className="px-3.5 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-md shrink-0"
          >
            View
          </button>
          <button
            onClick={() => setSelectedMapPG(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function InteractiveMap(props) {
  return (
    <MapErrorBoundary>
      <InnerInteractiveMap {...props} />
    </MapErrorBoundary>
  )
}
