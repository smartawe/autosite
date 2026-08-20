import React, { useEffect } from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

export function Toast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      onDismiss()
    }, toast.duration || 4000)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={20} className="toast-icon text-emerald-400" />
      case 'error':
        return <AlertTriangle size={20} className="toast-icon text-rose-400" />
      case 'info':
      default:
        return <Info size={20} className="toast-icon text-indigo-400" />
    }
  }

  return (
    <div className={`toast-container ${toast.type || 'info'}`} role="status" aria-live="polite">
      <div className="toast-content">
        <div className="toast-icon-wrap">{getIcon()}</div>
        <div className="toast-text-wrap">
          <div className="toast-title">{toast.title}</div>
          {toast.message && <div className="toast-message">{toast.message}</div>}
        </div>
      </div>
      <button className="toast-close" onClick={onDismiss} aria-label="Dismiss notification">
        <X size={16} />
      </button>
      <div className="toast-progress" style={{ animationDuration: `${toast.duration || 4000}ms` }} />
    </div>
  )
}
