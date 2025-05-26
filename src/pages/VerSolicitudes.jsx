import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function VerSolicitudes() {
  const [email, setEmail] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const handleBuscar = async () => {
    if (!email) return;
    try {
      const res = await axios.get(`${API_BASE}/solicitudes?solicitante=${email}`);
      setSolicitudes(res.data);
      setMensaje('');
    } catch (err) {
      console.error(err);
      setMensaje('Error al obtener solicitudes');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Solicitudes por Solicitante</h2>
      <div className="input-group mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Correo del solicitante"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleBuscar}>Buscar</button>
      </div>

      {mensaje && <div className="alert alert-danger">{mensaje}</div>}

      {solicitudes.map((s) => (
        <div key={s.solicitudId} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{s.titulo}</h5>
            <p className="card-text">
              <strong>Id Solicitud:</strong> {s.solicitudId}<br />
              <strong>Descripción:</strong> {s.descripcion}<br />
              <strong>Monto:</strong> ${s.monto}<br />
              <strong>Solicitante:</strong> {s.solicitante}<br />
              <strong>Estado:</strong> {s.estado}<br />
              <strong>Fecha:</strong> {new Date(s.fechaCreacion).toLocaleString()}
            </p>
            <h6>Aprobadores</h6>
            <ul>
              {s.aprobadores.map((a, i) => (
                <li key={i}>
                  <strong>{a.correo}</strong> | Estado: {a.estado} | OTP: {a.otp} | Token: {a.token}
                </li>
              ))}
            </ul>
            <a
              className="btn btn-outline-secondary btn-sm"
              href={`${API_BASE}/solicitudes/${s.solicitudId}/evidencia.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver evidencia PDF
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
