import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ValidarOtp() {
  const [form, setForm] = useState({
    solicitudId: '',
    token: '',
    otp: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [estado, setEstado] = useState('');
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const mostrarModal = () => {
    const modal = new window.bootstrap.Modal(document.getElementById('confirmModal'));

    modal.show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const resValidarOtp = await axios.post(`${API_BASE}/validar-otp`, form);
      console.log('resValidarOtp ->',resValidarOtp);
      const{status} = resValidarOtp;
      if(status != undefined && status === 200){
        mostrarModal();
        /*const res = await axios.post(`${API_BASE}/aprobar`, form);
        setMensaje('Aprobación exitosa.');
        setEstado('success');*/
      } else {
        setMensaje('Otp invalido');
      }
      
    } catch (err) {
      console.error(err);
      setMensaje('Error al aprobar la solicitud. Verifica OTP o Token.');
      setEstado('error');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Aprobar Solicitud</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>ID de Solicitud</label>
          <input className="form-control" name="solicitudId" value={form.solicitudId} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Token del Aprobador</label>
          <input className="form-control" name="token" value={form.token} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>OTP</label>
          <input className="form-control" name="otp" value={form.otp} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Aprobar</button>
      </form>
      
    <button onClick={mostrarModal} className="btn btn-success">Abrir</button>

      <div className="modal fade" id="confirmModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Acción</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <p>¿Qué deseas hacer con esta solicitud?</p>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-success"
                onClick={() => { setAccion('Aprobar'); confirmarAccion(); }}
                data-bs-dismiss="modal"
              >
                Validar
              </button>
              <button
                className="btn btn-danger"
                onClick={() => { setAccion('Rechazar'); confirmarAccion(); }}
                data-bs-dismiss="modal"
              >
                Rechazar
              </button>
            </div>
          </div>
        </div>
      </div>

      {mensaje && (
        <div className={`alert mt-3 ${estado === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {mensaje}
        </div>
      )}
    </div>
  );
}
