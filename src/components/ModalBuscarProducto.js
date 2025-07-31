import React from 'react';

const productosSimulados = [
  { codigo: 'PD001', nombre: 'Anestesia Dental Lidocaína', stock: 20, precio: 25.0 },
  { codigo: 'PD002', nombre: 'Fórceps Adulto Superior', stock: 10, precio: 80.0 },
  { codigo: 'PD003', nombre: 'Eugenol USP', stock: 15, precio: 15.5 },
  { codigo: 'PD004', nombre: 'Fresa Dental Carburo FG', stock: 30, precio: 4.5 },
  { codigo: 'PD005', nombre: 'Guantes de Nitrilo (Caja x100)', stock: 50, precio: 38.0 }
];

const ModalBuscarProducto = ({ onSelect, onClose }) => {
  return (
    <div style={styles.modal}>
      <div style={styles.content}>
        <h3 style={{ marginBottom: 10 }}>🦷 Buscar Producto Odontológico</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Stock</th>
              <th>Precio (S/.)</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {productosSimulados.map((prod, index) => (
              <tr key={index}>
                <td>{prod.codigo}</td>
                <td>{prod.nombre}</td>
                <td>{prod.stock}</td>
                <td>{prod.precio.toFixed(2)}</td>
                <td>
                  <button
                    style={styles.btn}
                    onClick={() => onSelect({ nombre: prod.nombre, precio: prod.precio })}
                  >
                    ➕ Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button style={styles.closeBtn} onClick={onClose}>❌ Cerrar</button>
      </div>
    </div>
  );
};

const styles = {
  modal: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
    alignItems: 'center', justifyContent: 'center', zIndex: 999
  },
  content: {
    backgroundColor: '#fff', padding: 20, borderRadius: 8,
    boxShadow: '0 0 15px rgba(0,0,0,0.2)', width: '80%', maxHeight: '80%',
    overflowY: 'auto'
  },
  table: {
    width: '100%', borderCollapse: 'collapse', marginBottom: 20,
    fontSize: 14
  },
  btn: {
    padding: '6px 10px', backgroundColor: '#007bff', color: 'white',
    border: 'none', borderRadius: 4, cursor: 'pointer'
  },
  closeBtn: {
    padding: '8px 16px', backgroundColor: '#dc3545', color: 'white',
    border: 'none', borderRadius: 4, cursor: 'pointer'
  }
};

export default ModalBuscarProducto;
