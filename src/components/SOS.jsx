import { useEffect, useRef, useState } from 'react'
import { medicalCamps } from '../data/mock'
import { useApp } from '../context'

export default function SOS() {
  const { t, offline, sosState, setSosState, flash } = useApp()
  const [hold, setHold] = useState(0)
  const timer = useRef(null)
  const camp = medicalCamps[0]
  const channel = offline ? 'SMS · MSG91 (sim)' : 'PWA push + SMS copy'

  useEffect(() => () => window.clearInterval(timer.current), [])

  function startHold() {
    if (sosState !== 'idle') return
    setHold(0)
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setHold((h) => {
        const next = h + 5
        if (next >= 100) {
          window.clearInterval(timer.current)
          // Defer so React state updates land before unmounting the button
          window.setTimeout(() => send(), 0)
          return 100
        }
        return next
      })
    }, 35)
  }

  function endHold() {
    window.clearInterval(timer.current)
    setHold((h) => {
      if (h > 0 && h < 100 && sosState === 'idle') return 0
      return h
    })
  }

  function send() {
    window.clearInterval(timer.current)
    setHold(100)
    setSosState('sending')
    window.setTimeout(() => {
      setSosState('sent')
      flash(offline ? `${t.sosSent} · SMS` : t.sosSent)
    }, 1100)
  }

  function reset() {
    setSosState('idle')
    setHold(0)
  }

  return (
    <section className="screen sos-screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">{t.demoBadge}</p>
          <h2>{t.sosTitle}</h2>
          <p className="muted">{t.sosHint}</p>
        </div>
        <div className={`link-pill ${offline ? 'sms' : 'live'}`}>
          {offline ? t.smsMode : t.dataMode}
        </div>
      </header>

      <div className="sos-stage">
        <div className="sos-rings" data-state={sosState}>
          <span />
          <span />
          <span />
        </div>

        {sosState === 'idle' && (
          <button
            type="button"
            className="sos-btn"
            style={{ '--hold': `${hold}%` }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture?.(e.pointerId)
              startHold()
            }}
            onPointerUp={endHold}
            onPointerCancel={endHold}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                send()
              }
            }}
            aria-label={t.sosTap}
          >
            <strong>SOS</strong>
            <small>{t.sosTap}</small>
          </button>
        )}

        {sosState === 'sending' && (
          <div className="sos-status sending">
            <div className="spinner" />
            <p>{t.sosSending}</p>
            <small>
              {t.sosVia}: {channel}
            </small>
          </div>
        )}

        {sosState === 'sent' && (
          <div className="sos-status sent">
            <div className="check">✓</div>
            <h3>{t.sosSent}</h3>
            <dl className="sos-meta">
              <div>
                <dt>{t.sosVia}</dt>
                <dd>{channel}</dd>
              </div>
              <div>
                <dt>{t.sosNearest}</dt>
                <dd>{camp.name}</dd>
              </div>
              <div>
                <dt>{t.sosEta}</dt>
                <dd>~{camp.etaMin} min</dd>
              </div>
              <div>
                <dt>{t.sosPhone}</dt>
                <dd>{camp.phone}</dd>
              </div>
              <div>
                <dt>GPS</dt>
                <dd>19.9991° N, 73.7902° E</dd>
              </div>
            </dl>
            <button type="button" className="ghost-btn" onClick={reset}>
              Reset demo
            </button>
          </div>
        )}
      </div>

      <ol className="flow-steps">
        <li className={sosState !== 'idle' ? 'done' : ''}>Tap held · location locked</li>
        <li className={sosState === 'sending' || sosState === 'sent' ? 'done' : ''}>
          {offline ? 'SMS packet queued' : 'Push + SMS dual-path'}
        </li>
        <li className={sosState === 'sent' ? 'done' : ''}>Nearest camp / 108 notified</li>
      </ol>
    </section>
  )
}
