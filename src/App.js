import React, { useState } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  const handleAddService = () => {
    if (name && description) {
      setServices([...services, { id: Date.now(), name, description }]);
      setName('');
      setDescription('');
    }
  };

  const handleEditService = (id) => {
    const service = services.find(service => service.id === id);
    setName(service.name);
    setDescription(service.description);
    setIsEditing(true);
    setCurrentServiceId(id);
  };

  const handleUpdateService = () => {
    setServices(services.map(service => 
      service.id === currentServiceId ? { ...service, name, description } : service
    ));
    setName('');
    setDescription('');
    setIsEditing(false);
    setCurrentServiceId(null);
  };

  const handleDeleteService = (id) => {
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="App">
      <h1>Gerenciador de Serviços</h1>
      <div className="form">
        <input 
          type="text" 
          placeholder="Nome do Serviço" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Descrição do Serviço" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
        {isEditing ? (
          <button onClick={handleUpdateService}>Atualizar Serviço</button>
        ) : (
          <button onClick={handleAddService}>Adicionar Serviço</button>
        )}
      </div>
      <div className="service-list">
        <h2>Lista de Serviços</h2>
        {services.map(service => (
          <div key={service.id} className="service-item">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <button onClick={() => handleEditService(service.id)}>Editar</button>
            <button onClick={() => handleDeleteService(service.id)}>Excluir</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
