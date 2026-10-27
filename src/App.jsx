import { useEffect } from 'react'
import { LANGS } from './i18n'
import { AppProvider, useApp } from './context'
import Home from './components/Home'
import Heatmap from './components/Heatmap'
import SOS from './components/SOS'
import LostFound from './components/LostFound'
import Volunteers from './components/Volunteers'

function Shell() {
  const { t, lang, setLang, tab, setTab, offline, setOffline, toast } = useApp()

  useEffect(() => {
    document.documentElement.lang = lang === 'en' ? 'en' : lang
  }, [lang])

  return (
    <div className={`app ${offline ? 'is-offline' : ''}`}>
      <div className="atmosphere" aria-hidden />

      <header className="topbar">
        <button type="button" className="brand" onClick={() => setTab('home')}>
          <img src="/favicon.svg" alt="" width="28" height="28" />
          <span>{t.brand}</span>
        </button>

        <div className="top-controls">
          <div className="lang-toggle" role="group" aria-label={t.lang}>
            {LANGS.map((l) => (
              <button
                key={l.id}
                type="button"
                className={lang === l.id ? 'active' : ''}
                onClick={() => setLang(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`net-chip ${offline ? 'off' : 'on'}`}
            onClick={() => setOffline((v) => !v)}
            title={t.toggleOffline}
          >
            <span className="dot" />
            {offline ? t.offline : t.online}
          </button>
        </div>
      </header>

      <main className="main">
        {tab === 'home' && <Home />}
        {tab === 'map' && <Heatmap />}
        {tab === 'sos' && <SOS />}
        {tab === 'lost' && <LostFound />}
        {tab === 'vol' && <Volunteers />}
      </main>

      <nav className="bottom-nav" aria-label="Primary">
        {[
          ['home', t.navHome],
          ['map', t.navMap],
          ['sos', t.navSos],
          ['lost', t.navLost],
          ['vol', t.navVol],
        ].map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={tab === id ? 'active' : ''}
            onClick={() => setTab(id)}
          >
            <NavIcon id={id} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  )
}

function NavIcon({ id }) {
  const paths = {
    home: 'M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z',
    map: 'M4 6 L10 4 L14 6 L20 4 V18 L14 20 L10 18 L4 20 Z M10 4 V18 M14 6 V20',
    sos: 'M12 4 A8 8 0 1 1 11.9 4 M12 8 V12 L15 15',
    lost: 'M12 5 A4 4 0 1 1 11.9 5 M6 20 C6 16 9 14 12 14 C15 14 18 16 18 20',
    vol: 'M8 10 A3 3 0 1 1 7.9 10 M16 10 A3 3 0 1 1 15.9 10 M4 20 C4 16 7 14 10 14 M14 14 C17 14 20 16 20 20',
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
      <path
        d={paths[id]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Shell />
    </AppProvider>
  )
}
