import React, { useState, useEffect } from 'react'
import { 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Sun, 
  Moon, 
  Key, 
  Loader2, 
  Star,
  Zap,
  Globe
} from 'lucide-react'
import { SocialButton } from './components/SocialButton'
import { InputGroup } from './components/InputGroup'
import { ForgotPasswordModal } from './components/ForgotPasswordModal'
import { Toast } from './components/Toast'
import './App.css'

function App() {
  const [authMode, setAuthMode] = useState('signin') // 'signin' | 'signup'
  const [theme, setTheme] = useState('dark')
  
  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  
  // Interaction State
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false)
  const [toast, setToast] = useState(null)
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
  }

  const showToast = (title, message, type = 'info', duration = 4000) => {
    setToast({ title, message, type, duration })
  }

  // Calculate password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: '', class: '' }
    let score = 0
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 1) return { score: 1, label: 'Weak', class: 'weak' }
    if (score <= 3) return { score: 2, label: 'Medium', class: 'medium' }
    return { score: 4, label: 'Strong', class: 'strong' }
  }

  const passwordStrength = getPasswordStrength(password)

  // Validate form
  const validate = () => {
    const newErrors = {}
    
    if (authMode === 'signup' && !name.trim()) {
      newErrors.name = 'Full name is required'
    }

    if (!email) {
      newErrors.email = 'Email address is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (authMode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsLoading(true)
    
    // Simulate network authentication request
    setTimeout(() => {
      setIsLoading(false)
      if (authMode === 'signin') {
        showToast(
          'Signed in successfully!',
          `Welcome back, ${email.split('@')[0]}! Redirecting to your dashboard...`,
          'success'
        )
      } else {
        showToast(
          'Account created!',
          `Welcome aboard, ${name || 'User'}! Please check ${email} for confirmation.`,
          'success'
        )
      }
    }, 1500)
  }

  // Handle Social Login Click
  const handleSocialLogin = (providerName) => {
    showToast(
      `Connecting to ${providerName}...`,
      `Simulating single sign-on authentication via ${providerName}.`,
      'info',
      3000
    )
  }

  // Quick-fill demo account credentials
  const handleDemoFill = () => {
    setEmail('alex.smith@example.com')
    setPassword('SuperSecure123!')
    setErrors({})
    showToast('Demo Credentials Filled', 'Ready to sign in with test credentials.', 'info', 2500)
  }

  return (
    <div className="auth-page-wrapper">
      {/* Dynamic Ambient Glow Mesh */}
      <div className="auth-mesh-bg" aria-hidden="true">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
        <div className="glow-orb orb-3" />
        <div className="grid-pattern" />
      </div>

      {/* Top Navigation / Brand Header */}
      <header className="auth-top-nav">
        <a href="#home" className="brand-logo-wrap" aria-label="NexusAuth Home">
          <div className="brand-logo-icon">
            <Sparkles size={20} />
          </div>
          <span className="brand-name">NexusAuth</span>
        </a>

        <div className="nav-actions">
          <button 
            type="button" 
            className="demo-pill-btn" 
            onClick={handleDemoFill}
            title="Auto-fill test credentials"
          >
            <Zap size={14} />
            <span>Auto Fill Demo</span>
          </button>

          <button 
            type="button" 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="auth-main-container">
        {/* Left Side: Product Showcase & Testimonials */}
        <section className="auth-showcase-panel" aria-label="Product Showcase">
          <div>
            <div className="showcase-badge">
              <ShieldCheck size={14} />
              <span>Enterprise-Grade Security</span>
            </div>

            <h1 className="showcase-headline">
              One seamless login for <span className="headline-gradient">all your digital workspace</span>
            </h1>

            <p className="showcase-description">
              Experience lightning fast authentication, biometric-ready single sign-on, and end-to-end encryption trusted by over 50,000+ teams worldwide.
            </p>

            <div className="showcase-features">
              <div className="showcase-feature-item">
                <div className="feature-check-icon">
                  <Check size={15} />
                </div>
                <span>Zero-friction social login with 1-click OAuth 2.0</span>
              </div>
              <div className="showcase-feature-item">
                <div className="feature-check-icon">
                  <Check size={15} />
                </div>
                <span>Multi-factor biometric authentication & Passkey support</span>
              </div>
              <div className="showcase-feature-item">
                <div className="feature-check-icon">
                  <Check size={15} />
                </div>
                <span>99.99% uptime SLA with real-time anomaly detection</span>
              </div>
            </div>
          </div>

          <div className="showcase-testimonial">
            <div className="testimonial-quote">
              "NexusAuth cut down our customer onboarding friction by 64%. The quickest and cleanest auth experience we've ever integrated."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">SC</div>
              <div className="author-info">
                <span className="author-name">Sarah Chen</span>
                <span className="author-role">Lead Product Engineer at Vertex</span>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side: Authentication Card */}
        <section className="auth-card" aria-label="Authentication Form">
          {/* Mode Switch Tabs (Sign In / Sign Up) */}
          <div className="auth-mode-switch" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={authMode === 'signin'}
              className={`mode-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('signin')
                setErrors({})
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={authMode === 'signup'}
              className={`mode-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
              onClick={() => {
                setAuthMode('signup')
                setErrors({})
              }}
            >
              Create Account
            </button>
          </div>

          <div className="auth-card-header">
            <h2 className="auth-title">
              {authMode === 'signin' ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="auth-subtitle">
              {authMode === 'signin'
                ? 'Enter your credentials to access your account'
                : 'Join thousands of builders scaling with NexusAuth'}
            </p>
          </div>

          {/* Branded Social Login Buttons */}
          <div className="social-buttons-grid">
            <SocialButton
              provider="google"
              name="Google"
              onClick={() => handleSocialLogin('Google')}
              isLoading={isLoading}
            />
            <SocialButton
              provider="github"
              name="GitHub"
              onClick={() => handleSocialLogin('GitHub')}
              isLoading={isLoading}
            />
            <SocialButton
              provider="apple"
              name="Apple"
              onClick={() => handleSocialLogin('Apple')}
              isLoading={isLoading}
            />
          </div>

          {/* Divider */}
          <div className="auth-divider">
            <span className="divider-text">Or continue with email</span>
          </div>

          {/* Login / Registration Form */}
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            {authMode === 'signup' && (
              <InputGroup
                id="name"
                label="Full Name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors(prev => ({ ...prev, name: null }))
                }}
                placeholder="Alex Smith"
                icon={User}
                error={errors.name}
                isValid={name.trim().length > 2}
                required
                autoComplete="name"
                disabled={isLoading}
              />
            )}

            <InputGroup
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors(prev => ({ ...prev, email: null }))
              }}
              placeholder="alex.smith@example.com"
              icon={Mail}
              error={errors.email}
              isValid={/\S+@\S+\.\S+/.test(email)}
              required
              autoComplete="email"
              disabled={isLoading}
            />

            <InputGroup
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors(prev => ({ ...prev, password: null }))
              }}
              placeholder="••••••••••••"
              icon={Lock}
              error={errors.password}
              showPasswordToggle
              required
              autoComplete={authMode === 'signin' ? 'current-password' : 'new-password'}
              disabled={isLoading}
            />

            {/* Password Strength Indicator (on Signup mode or when typing) */}
            {password.length > 0 && authMode === 'signup' && (
              <div className="password-strength-wrap">
                <div className="strength-bar-track">
                  <div className={`strength-bar-step ${passwordStrength.score >= 1 ? `active ${passwordStrength.class}` : ''}`} />
                  <div className={`strength-bar-step ${passwordStrength.score >= 2 ? `active ${passwordStrength.class}` : ''}`} />
                  <div className={`strength-bar-step ${passwordStrength.score >= 3 ? `active ${passwordStrength.class}` : ''}`} />
                  <div className={`strength-bar-step ${passwordStrength.score >= 4 ? `active ${passwordStrength.class}` : ''}`} />
                </div>
                <div className="strength-label-text">
                  <span>Password strength:</span>
                  <strong>{passwordStrength.label}</strong>
                </div>
              </div>
            )}

            {authMode === 'signup' && (
              <InputGroup
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: null }))
                }}
                placeholder="••••••••••••"
                icon={Lock}
                error={errors.confirmPassword}
                isValid={confirmPassword.length > 0 && confirmPassword === password}
                showPasswordToggle
                required
                autoComplete="new-password"
                disabled={isLoading}
              />
            )}

            {/* Remember Me & Forgot Password Row */}
            {authMode === 'signin' && (
              <div className="form-options-row">
                <label className="remember-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="custom-checkbox">
                    {rememberMe && <Check size={12} strokeWidth={3} />}
                  </span>
                  <span>Remember this device</span>
                </label>

                <button
                  type="button"
                  className="forgot-link-btn"
                  onClick={() => setIsForgotModalOpen(true)}
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Sign In CTA Button */}
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
              id="submit-auth-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="spinner" />
                  <span>{authMode === 'signin' ? 'Authenticating...' : 'Creating Account...'}</span>
                </>
              ) : (
                <>
                  <span>{authMode === 'signin' ? 'Sign In to Account' : 'Create Free Account'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Legal / Terms footer */}
          <p className="auth-footer-terms">
            By continuing, you agree to our{' '}
            <a href="#terms" className="terms-link">Terms of Service</a> and{' '}
            <a href="#privacy" className="terms-link">Privacy Policy</a>.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="auth-page-footer">
        <div>&copy; {new Date().getFullYear()} NexusAuth Inc. All rights reserved.</div>
        <div className="footer-links">
          <a href="#privacy" className="footer-link">Privacy</a>
          <a href="#terms" className="footer-link">Terms</a>
          <a href="#support" className="footer-link">Support & FAQ</a>
          <a href="#status" className="footer-link">System Status</a>
        </div>
      </footer>

      {/* Interactive Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        defaultEmail={email}
        onSent={(resetEmail) => {
          showToast(
            'Reset link sent',
            `Check inbox at ${resetEmail} for recovery link.`,
            'success',
            5000
          )
        }}
      />

      {/* Toast Notifications */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  )
}

export default App
