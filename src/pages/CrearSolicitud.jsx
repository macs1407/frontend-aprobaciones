import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function CrearSolicitud() {
  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    monto: '',
    solicitante: '',
    aprobadores: ['']
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (name === 'aprobadores') {
      const nuevos = [...form.aprobadores];
      nuevos[index] = value;
      setForm({ ...form, aprobadores: nuevos });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const agregarAprobador = () => {
    setForm({ ...form, aprobadores: [...form.aprobadores, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        monto: parseFloat(form.monto),
        solicitante: form.solicitante,
        aprobadores: form.aprobadores.filter(email => email.trim() !== '')
      };
      const res = await axios.post(`${API_BASE}/solicitudes`, payload);
      setMensaje(`Solicitud creada con ID: ${res.data.solicitudId}`);
    } catch (err) {
      console.error(err);
      setMensaje('Error al crear solicitud');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input className="form-control" name="titulo" value={form.titulo} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Monto</label>
          <input type="number" className="form-control" name="monto" value={form.monto} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Solicitante</label>
          <input type="email" className="form-control" name="solicitante" value={form.solicitante} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Aprobadores</label>
          {form.aprobadores.map((aprobador, i) => (
            <input key={i} type="email" className="form-control mb-2" name="aprobadores" value={aprobador} onChange={(e) => handleChange(e, i)} required />
          ))}
          <button type="button" className="btn btn-sm btn-secondary" onClick={agregarAprobador}>+ Aprobador</button>
        </div>

        <button type="submit" className="btn btn-primary">Crear Solicitud</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
}
