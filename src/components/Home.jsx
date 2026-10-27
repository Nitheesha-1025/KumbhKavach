import { useApp } from '../context'

const pillars = [
  ['pillarCrowd', 'map'],
  ['pillarSos', 'sos'],
  ['pillarLost', 'lost'],
  ['pillarVol', 'vol'],
  ['pillarVoice', 'lost'],
  ['pillarOffline', 'sos'],
]

export default function Home() {
  const { t, setTab, offline, setOffline } = useApp()

  return (
    <section className="screen home-screen">
      <div className="hero">
        <div className="hero-glow" aria-hidden />
        <p className="brand-mark">{t.brand}</p>
        <h1>{t.tagline}</h1>
        <p className="lede">{t.subtitle}</p>
        <div className="hero-actions">
          <button type="button" className="primary-btn" onClick={() => setTab('map')}>
            {t.startDemo}
          </button>
          <button
            type="button"
            className={`ghost-btn ${offline ? 'on' : ''}`}
            onClick={() => setOffline((v) => !v)}
          >
            {t.toggleOffline}
          </button>
        </div>
      </div>

      <div className="quick-grid">
        <button type="button" onClick={() => setTab('map')}>
          {t.homeCtaMap}
        </button>
        <button type="button" onClick={() => setTab('sos')}>
          {t.homeCtaSos}
        </button>
        <button type="button" onClick={() => setTab('lost')}>
          {t.homeCtaLost}
        </button>
        <button type="button" onClick={() => setTab('vol')}>
          {t.homeCtaVol}
        </button>
      </div>

      <ul className="pillars">
        {pillars.map(([key, tab]) => (
          <li key={key}>
            <button type="button" onClick={() => setTab(tab)}>
              {t[key]}
            </button>
          </li>
        ))}
      </ul>

      <p className="foot-note">{t.demoBadge} · Nashik-Trimbakeshwar Simhastha</p>
    </section>
  )
}
