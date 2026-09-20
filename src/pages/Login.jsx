import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/novaorbit-logo.png'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  function handleSubmit(event) {
    event.preventDefault()
    const users = JSON.parse(localStorage.getItem('usuariosNovaOrbit') || '[]')
    const user = users.find((item) => item.correo === correo.trim().toLowerCase() && item.clave === clave)
    if (!user) return setError('Correo o contraseña incorrectos.')
    localStorage.setItem('sesionActiva', user.correo)
    navigate('/dashboard')
  }
  return <main className="space-page"><section className="auth-card"><div className="brand"><img className="brand-logo" src={logo} alt="NovaOrbit Aerospace" /></div><p className="subtitle">Acceso de astronautas</p>{location.state?.message && <p className="notice success">{location.state.message}</p>}{error && <p className="notice" role="alert">{error}</p>}<form className="form" onSubmit={handleSubmit}><label className="field">Correo<input type="email" value={correo} onChange={(event) => setCorreo(event.target.value)} placeholder="correo@novaorbit.com" autoComplete="email" /></label><label className="field">Contraseña<div className="password-wrap"><input type={showPassword ? 'text' : 'password'} value={clave} onChange={(event) => setClave(event.target.value)} placeholder="Tu contraseña" autoComplete="current-password" /><button className="password-toggle" type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Ocultar' : 'Mostrar'}</button></div></label><button className="primary-button" type="submit">Iniciar sesión</button></form><p className="auth-link">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p></section></main>
}
