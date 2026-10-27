import { createContext, useContext, useMemo, useState } from 'react'
import { strings } from './i18n'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('en')
  const [offline, setOffline] = useState(false)
  const [tab, setTab] = useState('home')
  const [sosState, setSosState] = useState('idle') // idle | sending | sent
  const [lostState, setLostState] = useState('form') // form | matching | match | reunited
  const [assignedVol, setAssignedVol] = useState(null)
  const [voiceState, setVoiceState] = useState('idle') // idle | recording | done
  const [toast, setToast] = useState(null)

  const t = strings[lang] || strings.en

  const value = useMemo(
    () => ({
      lang,
      setLang,
      offline,
      setOffline,
      tab,
      setTab,
      t,
      sosState,
      setSosState,
      lostState,
      setLostState,
      assignedVol,
      setAssignedVol,
      voiceState,
      setVoiceState,
      toast,
      setToast,
      flash(msg) {
        setToast(msg)
        window.clearTimeout(flash._id)
        flash._id = window.setTimeout(() => setToast(null), 2800)
      },
    }),
    [
      lang,
      offline,
      tab,
      t,
      sosState,
      lostState,
      assignedVol,
      voiceState,
      toast,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp outside provider')
  return ctx
}
