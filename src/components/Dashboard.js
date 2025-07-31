import React, { useState } from 'react';
import './Dashboard.css';
import Ventas from './Ventas';
import Inventario from './Inventario';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('ventas');

  const renderContent = () => {
    switch (activeTab) {
      case 'ventas':
        return <Ventas />;
      case 'inventario':
        return <Inventario />;
      case 'clientes':
        return <div className="tab-content">Contenido de Clientes</div>;
      case 'proveedores':
        return <div className="tab-content">Contenido de Proveedores</div>;
      case 'reportes':
        return <div className="tab-content">Contenido de Reportes</div>;
      case 'usuarios':
        return <div className="tab-content">Contenido de Usuarios</div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="tab-bar">
          <button className={activeTab === 'ventas' ? 'active' : ''} onClick={() => setActiveTab('ventas')}>Ventas</button>
          <button className={activeTab === 'inventario' ? 'active' : ''} onClick={() => setActiveTab('inventario')}>Inventario</button>
          <button className={activeTab === 'clientes' ? 'active' : ''} onClick={() => setActiveTab('clientes')}>Clientes</button>
          <button className={activeTab === 'proveedores' ? 'active' : ''} onClick={() => setActiveTab('proveedores')}>Proveedores</button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}>Reportes</button>
          <button className={activeTab === 'usuarios' ? 'active' : ''} onClick={() => setActiveTab('usuarios')}>Usuarios</button>
        </div>
        <button className="logout-btn" onClick={onLogout}>Cerrar sesión</button>
      </div>

      <div className="dashboard-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
