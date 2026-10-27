import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import { densZones, MAP_CENTER, MAP_ZOOM, medicalCamps } from '../data/mock'
import { useApp } from '../context'
import 'leaflet/dist/leaflet.css'

const campIcon = L.divIcon({
  className: 'kk-camp-icon',
  html: '<span class="kk-camp-pin"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
})

function riskColor(risk) {
  if (risk === 'high') return '#C0392B'
  if (risk === 'med') return '#E07A2F'
  return '#2A9D8F'
}

export default function Heatmap() {
  const { t, lang, offline } = useApp()

  return (
    <section className="screen map-screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">{t.demoBadge}</p>
          <h2>{t.mapTitle}</h2>
          <p className="muted">{t.mapHint}</p>
        </div>
        <div className={`link-pill ${offline ? 'sms' : 'live'}`}>
          {offline ? t.smsMode : t.dataMode}
        </div>
      </header>

      <div className="warn-banner" role="status">
        <span className="warn-dot" />
        <div>
          <strong>{t.earlyWarn}</strong>
          <p>{t.earlyWarnMsg}</p>
        </div>
        <em>~12 min</em>
      </div>

      <div className="map-frame">
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_ZOOM}
          scrollWheelZoom={false}
          className="leaflet-host"
          attributionControl={false}
        >
          <TileLayer
            url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri"
          />
          {densZones.map((z) => (
            <Circle
              key={z.id}
              center={z.center}
              radius={z.radius}
              pathOptions={{
                color: riskColor(z.risk),
                fillColor: riskColor(z.risk),
                fillOpacity: 0.28 + z.density * 0.35,
                weight: 2,
                className: z.risk === 'high' ? 'pulse-risk' : '',
              }}
            >
              <Popup>
                <strong>{lang === 'en' ? z.name : z.nameHi}</strong>
                <br />
                Density {(z.density * 100).toFixed(0)}% · {z.trend}
              </Popup>
            </Circle>
          ))}
          {medicalCamps.map((c) => (
            <Marker key={c.id} position={c.coords} icon={campIcon}>
              <Popup>{c.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
        <div className="map-legend">
          <span>
            <i style={{ background: '#2A9D8F' }} /> {t.riskLow}
          </span>
          <span>
            <i style={{ background: '#E07A2F' }} /> {t.riskMed}
          </span>
          <span>
            <i style={{ background: '#C0392B' }} /> {t.riskHigh}
          </span>
        </div>
      </div>

      <ul className="zone-list">
        {densZones.map((z) => (
          <li key={z.id} className={`zone risk-${z.risk}`}>
            <div>
              <strong>{lang === 'en' ? z.name : z.nameHi}</strong>
              <small>{z.trend}</small>
            </div>
            <div className="meter" aria-hidden>
              <span style={{ width: `${z.density * 100}%` }} />
            </div>
            <em>{(z.density * 100).toFixed(0)}%</em>
          </li>
        ))}
      </ul>
    </section>
  )
}
