import React, { useEffect, useState } from 'react';

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({ codigo: '', nombre: '', lote: '', vencimiento: '', stock: '', precio: '' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar productos desde el backend
  useEffect(() => {
    fetch('https://botica-backend-j3dy.onrender.com/api/inventario')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, []);

  const agregarProducto = () => {
    const productoFormateado = {
      ...nuevoProducto,
      stock: parseInt(nuevoProducto.stock),
      precio: parseFloat(nuevoProducto.precio),
      vencimiento: nuevoProducto.vencimiento.replace(/-/g, '/')
    };

    fetch('https://botica-backend-j3dy.onrender.com/api/inventario', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productoFormateado)
    })
      .then(res => res.json())
      .then(data => {
        setProductos([...productos, data]);
        setNuevoProducto({ codigo: '', nombre: '', lote: '', vencimiento: '', stock: '', precio: '' });
        setMostrarFormulario(false);
      })
      .catch(err => console.error('Error al agregar producto:', err));
  };

  const eliminarProducto = (id) => {
    fetch(`https://botica-backend-j3dy.onrender.com/api/inventario/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => {
        setProductos(productos.filter(prod => prod._id !== id));
      })
      .catch(err => console.error('Error al eliminar producto:', err));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📦 Inventario - Botica Médico Dental Mónica</h2>

      <button style={styles.btnAgregar} onClick={() => setMostrarFormulario(true)}>➕ Agregar</button>

      {mostrarFormulario && (
        <div style={styles.formulario}>
          <input style={styles.input} placeholder="Código" value={nuevoProducto.codigo} onChange={e => setNuevoProducto({ ...nuevoProducto, codigo: e.target.value })} />
          <input style={styles.input} placeholder="Nombre" value={nuevoProducto.nombre} onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })} />
          <input style={styles.input} placeholder="Lote" value={nuevoProducto.lote} onChange={e => setNuevoProducto({ ...nuevoProducto, lote: e.target.value })} />
          <input style={styles.input} placeholder="Vencimiento (dd/mm/yyyy)" value={nuevoProducto.vencimiento} onChange={e => setNuevoProducto({ ...nuevoProducto, vencimiento: e.target.value })} />
          <input style={styles.input} type="number" placeholder="Stock" value={nuevoProducto.stock} onChange={e => setNuevoProducto({ ...nuevoProducto, stock: e.target.value })} />
          <input style={styles.input} type="number" placeholder="Precio" value={nuevoProducto.precio} onChange={e => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })} />
          <button style={styles.btnAgregar} onClick={agregarProducto}>Guardar</button>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Lote</th>
            <th>Vencimiento</th>
            <th>Stock</th>
            <th>Precio (S/.)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod._id}>
              <td>{prod.codigo}</td>
              <td>{prod.nombre}</td>
              <td>{prod.lote}</td>
              <td>{prod.vencimiento}</td>
              <td>{prod.stock}</td>
              <td>{prod.precio.toFixed(2)}</td>
              <td>
                <button style={styles.btnEliminar} onClick={() => eliminarProducto(prod._id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#fff', padding: 20, borderRadius: 8, maxWidth: 1100, margin: 'auto' },
  title: { textAlign: 'center', marginBottom: 20, color: '#0d47a1' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px', marginBottom: 20 },
  btn: {
    margin: '0 5px',
    padding: '4px 8px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  btnEliminar: {
    padding: '4px 8px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer'
  },
  btnAgregar: {
    padding: '8px 16px',
    marginBottom: 15,
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  input: {
    padding: '6px 10px',
    margin: '5px',
    borderRadius: 4,
    border: '1px solid #ccc',
    fontSize: '14px'
  },
  formulario: {
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 6,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10
  }
};

export default Inventario;
