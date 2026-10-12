import { type FormEvent, useState } from 'react'

const KEY = 'lite-weight-drop-ok'
const PASS = 'My-Drop-Site'

export function DropPassGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(() => sessionStorage.getItem(KEY) === '1')
  const [value, setValue] = useState('')
  const [err, setErr] = useState(false)

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (value === PASS) {
      sessionStorage.setItem(KEY, '1')
      setOk(true)
      return
    }
    setErr(true)
  }

  if (ok) return children

  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-[1.75rem] bg-white p-6 shadow-sm ring-1 ring-leaf-900/10">
        <p className="text-xs font-extrabold tracking-[0.2em] text-leaf-900 uppercase">Lite Weight</p>
        <h1 className="mt-2 font-display text-3xl font-black text-leaf-900">Enter password</h1>
        <p className="mt-2 text-sm text-ink/70">This preview is for partners only.</p>
        <input
          type="password"
          autoComplete="current-password"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setErr(false)
          }}
          className="mt-5 w-full rounded-full border border-leaf-900/20 px-4 py-3 text-leaf-900 outline-none focus:ring-2 focus:ring-leaf-900"
          placeholder="Password"
        />
        {err && <p className="mt-2 text-sm text-red-700">That password is not right.</p>}
        <button type="submit" className="mt-4 w-full rounded-full bg-leaf-900 py-3 font-bold text-spice-800">
          Open site
        </button>
      </form>
    </main>
  )
}
