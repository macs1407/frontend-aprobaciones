import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import CrearSolicitud from './pages/CrearSolicitud'
import VerSolicitudes from './pages/VerSolicitudes'
import ValidarOtp from './pages/ValidarOtp'

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Flujo Aprobaciones</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/crear">Crear Solicitud</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/solicitudes">Ver Solicitudes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/aprobar">Aprobar Solicitud</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<CrearSolicitud />} />
          <Route path="/crear" element={<CrearSolicitud />} />
          <Route path="/solicitudes" element={<VerSolicitudes />} />
          <Route path="/aprobar" element={<ValidarOtp />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
