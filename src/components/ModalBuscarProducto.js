import React, { useEffect, useState } from 'react';

const ModalBuscarProducto = ({ onAgregarProducto, onClose }) => {
  const [productosDisponibles, setProductosDisponibles] = useState([]);

  useEffect(() => {
    fetch('https://botica-backend-j3dy.onrender.com/api/inventario')
      .then(res => res.json())
      .then(data => {
        setProductosDisponibles(data);
      })
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>🔍 Buscar Producto</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Agregar</th>
            </tr>
          </thead>
          <tbody>
            {productosDisponibles.map(producto => (
              <tr key={producto._id}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.stock}</td>
                <td>S/. {producto.precio.toFixed(2)}</td>
                <td>
                  <button style={styles.btnAgregar} onClick={() => onAgregarProducto(producto)}>➕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={styles.btnCerrar} onClick={onClose}>❌ Cerrar</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  modal: {
    backgroundColor: 'white', padding: 20, borderRadius: 8,
    width: '90%', maxWidth: 800, maxHeight: '80vh', overflowY: 'auto'
  },
  title: { textAlign: 'center', marginBottom: 15 },
  table: {
    width: '100%', borderCollapse: 'collapse', marginBottom: 20,
    fontSize: '14px'
  },
  btnAgregar: {
    padding: '4px 8px', backgroundColor: '#28a745', color: 'white',
    border: 'none', borderRadius: 4, cursor: 'pointer'
  },
  btnCerrar: {
    padding: '8px 16px', backgroundColor: '#dc3545', color: 'white',
    border: 'none', borderRadius: 4, cursor: 'pointer'
  }
};

export default ModalBuscarProducto;
