import { useNavigate } from 'react-router-dom'

const Icon = ({ name, size = 18 }) => {
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    orbit: <><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)"/><path d="M18.7 5.3 20 4"/></>,
    rocket: <><path d="M14 4c3.4 1.1 5.2 3.8 5.7 7.8L14 17.5l-6.1-1.3L6.5 10 12.2 4.3C12.8 4.2 13.4 4.1 14 4Z"/><path d="m8 16-3 3m6.8-2.8L9 19m6-9.5h.01"/></>,
    activity: <><path d="M3 12h4l2.2-6 4.2 12 2.3-6H21"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.1 2.1-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-3v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1-2.1-2.1.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H5.3v-3h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.1-2.1.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h3v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.1 2.1-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2v3h-.2a1.7 1.7 0 0 0-1.4 1Z"/></>,
    bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="19" cy="12" r="1" fill="currentColor"/></>,
  }
  return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const missions = [
  { name: 'Nova Atlas-04', code: 'OBSERVACIÓN TERRESTRE', status: 'En órbita', tone: 'success', progress: 82, date: '28 Sep 2026' },
  { name: 'Lumen Relay', code: 'COMUNICACIONES', status: 'Preparación', tone: 'warning', progress: 46, date: '02 Oct 2026' },
  { name: 'Asteria Probe', code: 'ESPACIO PROFUNDO', status: 'Planificación', tone: 'neutral', progress: 18, date: '15 Oct 2026' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const correo = localStorage.getItem('sesionActiva')
  const usuario = JSON.parse(localStorage.getItem('usuariosNovaOrbit') || '[]').find((item) => item.correo === correo)
  const nombre = usuario?.nombre || 'Comandante'
  function logout() { localStorage.removeItem('sesionActiva'); navigate('/login') }
  function deleteAccount() {
    if (!window.confirm('¿Eliminar tu cuenta de NovaOrbit? Esta acción no se puede deshacer.')) return
    const users = JSON.parse(localStorage.getItem('usuariosNovaOrbit') || '[]').filter((item) => item.correo !== correo)
    localStorage.setItem('usuariosNovaOrbit', JSON.stringify(users))
    logout()
  }

  return <main className="mission-control">
    <aside className="sidebar">
      <div className="wordmark"><span className="wordmark-mark">✦</span><span>NOVA<span>ORBIT</span></span></div>
      <div className="sidebar-label">CENTRO DE CONTROL</div>
      <nav className="sidebar-nav" aria-label="Navegación principal">
        <a className="nav-item active" href="#resumen"><Icon name="grid" />Resumen</a>
        <a className="nav-item" href="#misiones"><Icon name="rocket" />Misiones <span className="nav-badge">3</span></a>
        <a className="nav-item" href="#flota"><Icon name="orbit" />Flota</a>
        <a className="nav-item" href="#actividad"><Icon name="activity" />Actividad</a>
        <a className="nav-item" href="#calendario"><Icon name="calendar" />Calendario</a>
      </nav>
      <div className="sidebar-bottom"><a className="nav-item" href="#configuracion"><Icon name="settings" />Configuración</a><button className="profile-card" type="button" onClick={logout}><span className="avatar">{nombre.slice(0, 1).toUpperCase()}</span><span><strong>{nombre}</strong><small>Operador principal</small></span><Icon name="more" /></button></div>
    </aside>
    <section className="dashboard-shell" id="resumen">
      <header className="topbar"><div className="mobile-brand">✦ NOVAORBIT</div><div className="topbar-status"><span className="live-dot" />Sistemas operativos</div><div className="topbar-actions"><button className="icon-button" aria-label="Notificaciones"><Icon name="bell" /></button><button className="user-email" type="button" onClick={logout}>{correo || 'demo@novaorbit.space'}</button></div></header>
      <div className="dashboard-content">
        <section className="page-intro"><div><p className="eyebrow">OPERACIONES · 13 SEPT 2026</p><h1>Buenos días, {nombre}.</h1><p>Este es el estado de la operación NovaOrbit hoy.</p></div><button className="new-mission" type="button"><span>+</span>Nueva misión</button></section>
        <section className="kpi-grid" aria-label="Indicadores principales">
          <article className="metric-card"><div className="metric-head"><span>Misiones activas</span><span className="metric-icon blue"><Icon name="rocket" /></span></div><strong>03</strong><p><b>+1</b> desde el último mes</p></article>
          <article className="metric-card"><div className="metric-head"><span>Satélites en órbita</span><span className="metric-icon violet"><Icon name="orbit" /></span></div><strong>12</strong><p><b>100%</b> operativos</p></article>
          <article className="metric-card"><div className="metric-head"><span>Datos procesados</span><span className="metric-icon cyan"><Icon name="activity" /></span></div><strong>8.4 <em>TB</em></strong><p><b>+18.6%</b> vs. agosto</p></article>
          <article className="metric-card"><div className="metric-head"><span>Próximo hito</span><span className="metric-icon amber"><Icon name="calendar" /></span></div><strong className="date-metric">28 <em>SEP</em></strong><p>Despliegue Atlas-04</p></article>
        </section>
        <section className="dashboard-grid">
          <article className="panel mission-panel" id="misiones"><div className="panel-heading"><div><h2>Misiones en curso</h2><p>Seguimiento de operaciones activas</p></div><button className="link-button">Ver todas <Icon name="chevron" size={16} /></button></div><div className="mission-list">{missions.map((mission) => <div className="mission-row" key={mission.name}><div className="mission-symbol"><Icon name={mission.name === 'Lumen Relay' ? 'activity' : 'rocket'} /></div><div className="mission-data"><div className="mission-title"><strong>{mission.name}</strong><span className={`status ${mission.tone}`}>{mission.status}</span></div><small>{mission.code}</small><div className="progress-line"><span style={{ width: `${mission.progress}%` }} /></div></div><div className="mission-meta"><strong>{mission.progress}%</strong><small>{mission.date}</small></div></div>)}</div></article>
          <article className="panel fleet-panel" id="flota"><div className="panel-heading"><div><h2>Estado de la flota</h2><p>Telemetría de las últimas 24 h</p></div><button className="panel-more" aria-label="Más opciones"><Icon name="more" /></button></div><div className="orbit-visual"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="earth-glow"/><div className="earth">◒</div><span className="satellite sat-one">✦</span><span className="satellite sat-two">◆</span></div><div className="fleet-legend"><span><i className="dot online" />12 Nominal</span><span><i className="dot alert" />1 En revisión</span><button>Ver flota <Icon name="chevron" size={14} /></button></div></article>
          <article className="panel activity-panel" id="actividad"><div className="panel-heading"><div><h2>Actividad reciente</h2><p>Eventos de la operación</p></div><button className="link-button">Ver registro <Icon name="chevron" size={16} /></button></div><div className="activity-list"><div className="activity-row"><span className="activity-dot blue"/><div><strong>Atlas-04 completó el pase orbital 8,142</strong><p>Hace 18 min · Telemetría recibida</p></div></div><div className="activity-row"><span className="activity-dot purple"/><div><strong>Informe de análisis superficial disponible</strong><p>Hace 1 h · Sector Pacífico sur</p></div></div><div className="activity-row"><span className="activity-dot green"/><div><strong>Ventana de lanzamiento confirmada</strong><p>Hace 3 h · Lumen Relay</p></div></div></div></article>
          <article className="panel readiness-panel" id="calendario"><div className="panel-heading"><div><h2>Preparación de misión</h2><p>Lumen Relay · lanzamiento estimado</p></div><strong className="readiness-value">46%</strong></div><div className="readiness-bar"><span /></div><div className="readiness-grid"><div><small>INTEGRACIÓN</small><strong>Completada</strong></div><div><small>PRUEBAS</small><strong>En curso</strong></div><div><small>PRÓXIMA REVISIÓN</small><strong>18 Sep</strong></div></div></article>
        </section>
        <p className="demo-note">Panel de demostración · Datos ficticios para visualización</p><button className="delete-link" type="button" onClick={deleteAccount}>Eliminar mi cuenta</button>
      </div>
    </section>
  </main>
}
