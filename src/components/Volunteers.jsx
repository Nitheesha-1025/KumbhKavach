import { openTasks, volunteers } from '../data/mock'
import { useApp } from '../context'

export default function Volunteers() {
  const { t, assignedVol, setAssignedVol, flash, offline, setTab } = useApp()

  function assign() {
    const next = volunteers.find((v) => v.status === 'idle')
    if (!next) return
    setAssignedVol(next)
    flash(`${t.assigned}: ${next.name}`)
  }

  return (
    <section className="screen vol-screen">
      <header className="screen-head">
        <div>
          <p className="eyebrow">MyBharat · {t.demoBadge}</p>
          <h2>{t.volTitle}</h2>
          <p className="muted">{t.volHint}</p>
        </div>
        <div className={`link-pill ${offline ? 'sms' : 'live'}`}>
          {offline ? t.smsMode : t.dataMode}
        </div>
      </header>

      <div className="task-strip">
        <h3>{t.openTasks}</h3>
        <ul>
          {openTasks.map((task) => (
            <li key={task.id} className={`prio-${task.priority}`}>
              <strong>{task.type}</strong>
              <span>{task.where}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="vol-list">
        {volunteers.map((v) => {
          const active = assignedVol?.id === v.id
          return (
            <li key={v.id} className={active ? 'active' : ''}>
              <div className="vol-avatar">{v.name.slice(0, 1)}</div>
              <div className="vol-body">
                <strong>{v.name}</strong>
                <small>
                  {v.myBharatId} · {v.distanceM}m {t.distance.toLowerCase()}
                </small>
                <p>
                  {t.skills}: {v.skills.join(' · ')}
                </p>
              </div>
              <span className={`status ${active ? 'busy' : v.status}`}>
                {active ? t.assigned : v.status === 'idle' ? t.statusIdle : t.statusBusy}
              </span>
            </li>
          )
        })}
      </ul>

      {!assignedVol ? (
        <button type="button" className="primary-btn" onClick={assign}>
          {t.assignNearest}
        </button>
      ) : (
        <div className="dispatch-card">
          <h3>{t.assigned}</h3>
          <p>
            <strong>{assignedVol.name}</strong> → SOS escort · Ramkund North
          </p>
          <p className="muted">
            Dual-path notify: {offline ? 'SMS packet' : 'App push'} + command desk
          </p>
          <div className="row-actions">
            <button type="button" className="ghost-btn" onClick={() => setTab('sos')}>
              View SOS
            </button>
            <button
              type="button"
              className="ghost-btn"
              onClick={() => setAssignedVol(null)}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
