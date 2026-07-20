import { useState } from 'react'
import './login.css'

function LoginPage({ onBack, onLoginSuccess, onSignUp }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    console.log('Logging in with:', { email, password })
    onLoginSuccess()
  }

  return (
    <section id="login">
      <div className="login-card">
        <button onClick={onBack} className="back-button-home">
          ← Back to Home
        </button>
        <h1>Welcome back</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="login-button">
            Log In
          </button>
        </form>

        <p className="signup-link">
          New? <a href="#" onClick={(e) => { e.preventDefault(); onSignUp(); }}>Click me to start building a profile</a>
        </p>
      </div>
    </section>
  )
}

export default LoginPage