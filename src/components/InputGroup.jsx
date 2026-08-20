import React, { useState } from 'react'
import { Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react'

export function InputGroup({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  isValid,
  required = false,
  autoComplete,
  disabled = false,
  showPasswordToggle = false,
  helperText,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

  return (
    <div className={`input-group ${error ? 'has-error' : ''} ${isValid ? 'is-valid' : ''} ${isFocused ? 'is-focused' : ''}`}>
      <div className="input-header">
        <label htmlFor={id} className="input-label">
          {label}
          {required && <span className="required-star">*</span>}
        </label>
        {helperText && <span className="helper-text">{helperText}</span>}
      </div>

      <div className="input-wrapper">
        {Icon && (
          <div className="input-icon-left" aria-hidden="true">
            <Icon size={18} />
          </div>
        )}

        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          className={`input-field ${Icon ? 'with-left-icon' : ''} ${showPasswordToggle || error || isValid ? 'with-right-icon' : ''}`}
        />

        <div className="input-actions-right">
          {showPasswordToggle && (
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {!showPasswordToggle && isValid && (
            <span className="status-icon success-icon" title="Valid input">
              <CheckCircle2 size={16} />
            </span>
          )}

          {!showPasswordToggle && error && (
            <span className="status-icon error-icon" title={error}>
              <AlertCircle size={16} />
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="input-error-msg" id={`${id}-error`} role="alert">
          <AlertCircle size={13} />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}
