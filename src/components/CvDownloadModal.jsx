import { useState } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function CvDownloadModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!EMAIL_PATTERN.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setError('Email notifications are not configured yet.')
      return
    }

    setStatus('sending')
    setError('')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { visitor_email: email },
        { publicKey: PUBLIC_KEY },
      )

      const link = document.createElement('a')
      link.href = '/cv.pdf'
      link.download = ''
      document.body.appendChild(link)
      link.click()
      link.remove()

      onClose()
    } catch {
      setStatus('error')
      setError('Something went wrong sending that. Please try again.')
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-lg border border-white/10 bg-[#16171d] p-6 text-left"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="m-0 text-lg font-semibold text-white">
          Before you download
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Leave your email so I know who's checking out my CV.
        </p>

        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            required
            autoFocus
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-white/15 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-white/40"
          />

          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Download CV'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CvDownloadModal
