import React, { useState, useEffect } from 'react';
import ModalBuscarProducto from './ModalBuscarProducto';
import html2pdf from 'html2pdf.js';
import clientesIniciales from '../data/clientes.json';

const Ventas = () => {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState('');
  const [dni, setDni] = useState('');
  const [producto, setProducto] = useState('');
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setClientes(clientesIniciales);
  }, []);

  useEffect(() => {
    const encontrado = clientes.find(c => c.dni === dni);
    if (encontrado) {
      setCliente(encontrado.nombre);
    } else {
      setCliente('');
    }
  }, [dni, clientes]);

  const handleAgregar = () => {
    if (!producto.trim() || cantidad <= 0) return;
    const subtotal = precio * cantidad;
    const nuevo = { id: productos.length + 1, nombre: producto, precio, cantidad, subtotal };
    const actualizados = [...productos, nuevo];
    setProductos(actualizados);
    calcularTotal(actualizados);
    setProducto(''); setPrecio(0); setCantidad(1);
  };

  const eliminarProducto = (id) => {
    const filtrados = productos.filter(p => p.id !== id);
    setProductos(filtrados);
    calcularTotal(filtrados);
  };

  const calcularTotal = (lista) => {
    const suma = lista.reduce((acc, p) => acc + p.subtotal, 0);
    setTotal(suma.toFixed(2));
  };

  const finalizarVenta = () => {
    if (productos.length === 0) return alert('No hay productos en la venta.');
    if (!cliente || !dni) return alert('DNI o nombre del cliente incompleto.');

    const existe = clientes.find(c => c.dni === dni);
    if (!existe) {
      const nuevoCliente = { dni, nombre: cliente };
      setClientes([...clientes, nuevoCliente]);
      console.log('Nuevo cliente guardado:', nuevoCliente);
    }

    const element = document.getElementById('boletaPDF');
    html2pdf().from(element).set({
      margin: 10,
      filename: `Boleta-${cliente}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).save();

    setCliente(''); setDni('');
    setProducto(''); setPrecio(0); setCantidad(1);
    setProductos([]); setTotal(0);
  };

  const seleccionarProducto = (prod) => {
    setProducto(prod.nombre);
    setPrecio(prod.precio);
    setShowModal(false);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Punto de Venta - Botica Médico Dental Mónica</h2>

      <div style={styles.row}>
        <label>DNI Cliente:</label>
        <input
          style={styles.input}
          type="text"
          value={dni}
          placeholder="DNI"
          onChange={(e) => setDni(e.target.value)}
        />
        <label>Cliente:</label>
        <input
          style={styles.input}
          type="text"
          value={cliente}
          placeholder="Nombre del cliente"
          onChange={(e) => setCliente(e.target.value)}
        />
      </div>

      <div style={styles.row}>
        <label>Producto:</label>
        <input
          style={styles.input}
          type="text"
          value={producto}
          placeholder="Código o nombre"
          readOnly
        />
        <label>Cantidad:</label>
        <input
          style={{ ...styles.input, width: '60px' }}
          type="number"
          value={cantidad}
          min="1"
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
        <button style={styles.addBtn} onClick={() => setShowModal(true)}>🔍 Buscar</button>
        <button style={styles.addBtn} onClick={handleAgregar}>➕ Agregar</button>
      </div>

      <div id="boletaPDF" style={styles.boleta}>
        <h3 style={{ textAlign: 'center' }}>🧾 Boleta de Venta - Botica Médico Dental Mónica</h3>
        <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
        <p><strong>DNI:</strong> {dni || '---'} | <strong>Cliente:</strong> {cliente || '---'}</p>

        <table style={styles.table}>
          <thead>
            <tr><th>#</th><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>S/. {p.precio.toFixed(2)}</td>
                <td>{p.cantidad}</td>
                <td>S/. {p.subtotal.toFixed(2)}</td>
                <td>
                  <button style={styles.btnEliminar} onClick={() => eliminarProducto(p.id)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p><strong>Método de Pago:</strong> {metodoPago}</p>
        <h4>Total: S/. {total}</h4>
        <p style={{ textAlign: 'center', fontStyle: 'italic' }}>¡Gracias por su compra!</p>
      </div>

      <div style={styles.row}>
        <label>Método de Pago:</label>
        <select
          style={styles.select}
          value={metodoPago}
          onChange={(e) => setMetodoPago(e.target.value)}
        >
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Yape">Yape</option>
          <option value="Plin">Plin</option>
        </select>
      </div>

      <div style={styles.row}>
        <h3>Total: S/. {total}</h3>
        <button style={styles.finishBtn} onClick={finalizarVenta}>💾 Descargar Boleta PDF</button>
      </div>

      {showModal && (
        <ModalBuscarProducto onSelect={seleccionarProducto} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#fff', padding: 20, borderRadius: 8, maxWidth: 900, margin: 'auto' },
  title: { textAlign: 'center', marginBottom: 20, color: '#1e3a8a' },
  row: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 15, flexWrap: 'wrap' },
  input: { padding: 8, fontSize: 14, borderRadius: 4, border: '1px solid #ccc', minWidth: 180 },
  select: { padding: 8, fontSize: 14, borderRadius: 4, border: '1px solid #ccc', minWidth: 180 },
  addBtn: { padding: 8, backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  finishBtn: { padding: 10, backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', margin: '15px 0', fontSize: '14px' },
  boleta: { backgroundColor: '#f8f9fa', padding: 15, borderRadius: 6, marginTop: 20, boxShadow: '0 0 5px rgba(0,0,0,0.1)' },
  btnEliminar: {
    padding: '4px 8px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  }
};

export default Ventas;
