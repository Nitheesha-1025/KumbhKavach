import { useState } from 'react'
import { matchCandidate, pilgrims } from '../data/mock'
import { useApp } from '../context'

export default function LostFound() {
  const {
    t,
    lostState,
    setLostState,
    voiceState,
    setVoiceState,
    flash,
    offline,
  } = useApp()
  const [person] = useState(pilgrims[0])
  const [name, setName] = useState(person.name)
  const [lastSeen, setLastSeen] = useState(person.lastSeen)

  function recordVoice() {
    if (voiceState === 'recording') return
    setVoiceState('recording')
    window.setTimeout(() => setVoiceState('done'), 1600)
  }

  function submit(e) {
    e.preventDefault()
    setLostState('matching')
    window.setTimeout(() => {
      setLostState('match')
      flash(t.matchFound)
    }, 1800)
  }

  function reunite() {
    setLostState('reunited')
    flash(t.reunited)
  }

  function reset() {
    setLostState('form')
    setVoiceState('idle')
  }

  return (
    <section className="screen lost-screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">{t.demoBadge}</p>
          <h2>{t.lostTitle}</h2>
          <p className="muted">{t.lostHint}</p>
        </div>
        <div className={`link-pill ${offline ? 'sms' : 'live'}`}>
          {offline ? t.smsMode : t.dataMode}
        </div>
      </header>

      {lostState === 'form' && (
        <form className="lost-form" onSubmit={submit}>
          <div className="portrait" style={{ '--hue': person.avatarHue }}>
            <span>{person.name.slice(0, 1)}</span>
            <small>Consent photo · edge only</small>
          </div>

          <label>
            {t.name}
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <label>
            {t.lastSeen}
            <input
              value={lastSeen}
              onChange={(e) => setLastSeen(e.target.value)}
              required
            />
          </label>

          <div className="voice-block">
            <p>{t.voiceNote}</p>
            <button
              type="button"
              className={`voice-btn ${voiceState}`}
              onClick={recordVoice}
            >
              <span className="mic" />
              {voiceState === 'idle' && t.recordVoice}
              {voiceState === 'recording' && t.recording}
              {voiceState === 'done' && t.voiceDone}
            </button>
            {voiceState === 'recording' && <div className="wave" aria-hidden />}
          </div>

          <button type="submit" className="primary-btn">
            {t.submitReport}
          </button>
        </form>
      )}

      {lostState === 'matching' && (
        <div className="match-panel matching">
          <div className="spinner large" />
          <h3>{t.matching}</h3>
          <p className="muted">Privacy by design · consent gate · no cloud face store</p>
        </div>
      )}

      {(lostState === 'match' || lostState === 'reunited') && (
        <div className="match-panel found">
          <p className="match-badge">{t.matchFound}</p>
          <div className="match-card">
            <div className="portrait sm" style={{ '--hue': person.avatarHue }}>
              <span>{person.name.slice(0, 1)}</span>
            </div>
            <div>
              <strong>{name}</strong>
              <p>
                {matchCandidate.shelter}
                <br />
                Found {matchCandidate.foundAt} · by {matchCandidate.volunteer}
              </p>
            </div>
            <em>
              {(matchCandidate.confidence * 100).toFixed(0)}%
              <small>{t.matchScore}</small>
            </em>
          </div>
          <p className="privacy-note">{matchCandidate.note}</p>
          {lostState === 'match' ? (
            <button type="button" className="primary-btn" onClick={reunite}>
              {t.reunite}
            </button>
          ) : (
            <>
              <div className="success-banner">{t.reunited}</div>
              <button type="button" className="ghost-btn" onClick={reset}>
                Reset demo
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}
