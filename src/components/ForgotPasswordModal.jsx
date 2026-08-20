import React, { useState } from 'react'
import { Mail, X, ArrowRight, CheckCircle2, Loader2, KeyRound } from 'lucide-react'

export function ForgotPasswordModal({ isOpen, onClose, defaultEmail = '', onSent }) {
  const [email, setEmail] = useState(defaultEmail)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    setError('')
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      if (onSent) onSent(email)
    }, 1200)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setError('')
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close dialog">
          <X size={20} />
        </button>

        {!isSubmitted ? (
          <>
            <div className="modal-icon-badge">
              <KeyRound size={26} />
            </div>
            <h2 id="modal-title" className="modal-title">Reset password</h2>
            <p className="modal-desc">
              Enter your email and we'll send you instructions to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className={`input-group ${error ? 'has-error' : ''}`}>
                <label htmlFor="reset-email" className="input-label">Email address</label>
                <div className="input-wrapper">
                  <div className="input-icon-left">
                    <Mail size={18} />
                  </div>
                  <input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (error) setError('')
                    }}
                    placeholder="name@company.com"
                    required
                    className="input-field with-left-icon"
                    autoFocus
                  />
                </div>
                {error && <p className="input-error-msg">{error}</p>}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary modal-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spinner" />
                      <span>Sending link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send reset link</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="modal-success-state">
            <div className="modal-icon-badge success">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="modal-title">Check your inbox</h2>
            <p className="modal-desc">
              We've sent a password reset link to <strong className="highlight-text">{email}</strong>. Please follow the instructions in the email.
            </p>
            <div className="modal-actions full-width">
              <button type="button" className="btn-primary full-width" onClick={handleClose}>
                Back to Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
