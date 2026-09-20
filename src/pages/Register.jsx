import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/novaorbit-logo.png'

const readUsers = () => JSON.parse(localStorage.getItem('usuariosNovaOrbit') || '[]')

export default function Register() {
  const [form, setForm] = useState({ nombre: '', correo: '', clave: '', confirmarClave: '' })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [registered, setRegistered] = useState(false)
  const navigate = useNavigate()

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  async function handleSubmit(event) {
    event.preventDefault()
    const { nombre, correo, clave, confirmarClave } = form
    if (!nombre.trim() || !correo.trim() || !clave || !confirmarClave) return setError('Completa todos los campos.')
    if (clave.length < 6) return setError('La contraseña debe tener al menos 6 caracteres.')
    if (clave !== confirmarClave) return setError('Las contraseñas no coinciden.')
    const users = readUsers()
    if (users.some((user) => user.correo.toLowerCase() === correo.trim().toLowerCase())) return setError('Ese correo ya está registrado.')

    setAnimating(true)
    await new Promise((r) => setTimeout(r, 800))

    users.push({ nombre: nombre.trim(), correo: correo.trim().toLowerCase(), clave })
    localStorage.setItem('usuariosNovaOrbit', JSON.stringify(users))
    setRegistered(true)

    await new Promise((r) => setTimeout(r, 1500))
    navigate('/login', { state: { message: 'Cuenta creada. Ya puedes iniciar sesión.' } })
  }

  return (
    <main className="space-page">
      <div className="register-container">
        <section className={`auth-card ${animating ? 'slide-out' : ''} ${registered ? 'hidden' : ''}`}>
          <div className="brand">
            <img className="brand-logo" src={logo} alt="NovaOrbit Aerospace" />
          </div>
          <p className="subtitle">Registro de nuevo astronauta</p>
          {error && <p className="notice" role="alert">{error}</p>}
          <form className="form" onSubmit={handleSubmit}>
            <label className="field">
              Nombre completo
              <input name="nombre" value={form.nombre} onChange={update} placeholder="Ej. Elena Vargas" autoComplete="name" disabled={animating} />
            </label>
            <label className="field">
              Correo
              <input name="correo" type="email" value={form.correo} onChange={update} placeholder="correo@novaorbit.com" autoComplete="email" disabled={animating} />
            </label>
            <label className="field">
              Contraseña
              <div className="password-wrap">
                <input name="clave" type={showPassword ? 'text' : 'password'} value={form.clave} onChange={update} placeholder="Mínimo 6 caracteres" autoComplete="new-password" disabled={animating} />
                <button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)} disabled={animating}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </label>
            <label className="field">
              Confirmar contraseña
              <div className="password-wrap">
                <input name="confirmarClave" type={showPassword ? 'text' : 'password'} value={form.confirmarClave} onChange={update} placeholder="Repite tu contraseña" autoComplete="new-password" disabled={animating} />
              </div>
            </label>
            <button className="primary-button" type="submit" disabled={animating}>
              {animating ? 'Preparando lanzamiento...' : 'Crear cuenta'}
            </button>
          </form>
          <p className="auth-link">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
        </section>

        <section className={`inspiration-panel ${animating ? 'slide-in' : ''} ${registered ? 'visible' : ''}`}>
          <div className="inspiration-content">
            <span className="inspiration-badge">MISIÓN CONFIRMADA</span>
            <h1 className="inspiration-title">Las estrellas no son el límite, son el destino</h1>
            <p className="inspiration-text">
              Cada gran viaje comienza con un solo impulso.<br />
              Tu entrenamiento empieza ahora. La órbita te espera.
            </p>
            <div className="inspiration-stats">
              <div className="stat">
                <strong>∞</strong>
                <span>Posibilidades</span>
              </div>
              <div className="stat">
                <strong>0</strong>
                <span>Gravedad</span>
              </div>
              <div className="stat">
                <strong>1</strong>
                <span>Misión</span>
              </div>
            </div>
            <button className="primary-button continue-btn" onClick={() => navigate('/login', { state: { message: 'Cuenta creada. Ya puedes iniciar sesión.' } })}>
              Continuar al centro de control
            </button>
          </div>
          <div className="rocket-silhouette" aria-hidden="true">
            <svg viewBox="0 0 120 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="rocketGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8"/>
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4"/>
                </linearGradient>
                <radialGradient id="flameGradient" cx="50%" cy="100%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="1"/>
                  <stop offset="50%" stopColor="#f97316" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0"/>
                </radialGradient>
              </defs>
              <g className="rocket-body">
                <path d="M60 20 L30 100 L30 240 Q30 260 60 260 Q90 260 90 240 L90 100 Z" stroke="url(#rocketGradient)" strokeWidth="2" fill="url(#rocketGradient)" fillOpacity="0.15"/>
                <ellipse cx="60" cy="65" rx="25" ry="15" stroke="url(#rocketGradient)" strokeWidth="1.5" fill="none" strokeDasharray="5 5"/>
                <rect x="40" y="80" width="40" height="100" fill="url(#rocketGradient)" fillOpacity="0.1" rx="2"/>
                <path d="M30 180 L10 250 L30 250 Z" fill="url(#rocketGradient)" fillOpacity="0.2"/>
                <path d="M90 180 L110 250 L90 250 Z" fill="url(#rocketGradient)" fillOpacity="0.2"/>
              </g>
              <g className="flame">
                <path d="M60 260 Q50 290 60 300 Q70 290 60 260" fill="url(#flameGradient)" filter="blur(2px)"/>
                <path d="M60 260 Q55 285 60 295 Q65 285 60 260" fill="#fbbf24" fillOpacity="0.7"/>
              </g>
            </svg>
          </div>
          <div className="stars-bg" aria-hidden="true">
            <div className="star" style={{ top: '10%', left: '15%', animationDelay: '0s' }}></div>
            <div className="star" style={{ top: '25%', left: '80%', animationDelay: '0.5s' }}></div>
            <div className="star" style={{ top: '45%', left: '10%', animationDelay: '1s' }}></div>
            <div className="star" style={{ top: '65%', left: '85%', animationDelay: '1.5s' }}></div>
            <div className="star" style={{ top: '80%', left: '20%', animationDelay: '2s' }}></div>
            <div className="star" style={{ top: '15%', left: '60%', animationDelay: '2.5s' }}></div>
            <div className="star" style={{ top: '55%', left: '40%', animationDelay: '3s' }}></div>
            <div className="star" style={{ top: '90%', left: '70%', animationDelay: '3.5s' }}></div>
          </div>
        </section>
      </div>
    </main>
  )
}