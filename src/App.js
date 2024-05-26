/*
Disciplina: DESENVOLVIMENTO DE APLICAÇÕES MÓVEIS 2024/1
Código da Turma: 121
Nome e Matrícula: José Douglas Lopes de Souza - 2021200606
*/

import React, { useState } from 'react';
import './App.css';

function App() {
  const [services, setServices] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filteredSuggestions = services.filter(service =>
        service.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
    setSuggestions([]);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="App">
        <div className="header">
          <h1>Gerenciador de Serviços</h1>
          <div className="search-icon" onClick={() => setIsSearchVisible(!isSearchVisible)}>🔍</div>
        </div>
        {isSearchVisible && (
          <div className="search-container">
            <input
              type="text"
              placeholder="Pesquisar Serviço"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
            {suggestions.length > 0 && (
              <div className="suggestions-container">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="form-container">
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
        </div>
        <div className="service-list-container">
          <h2>Lista de Serviços</h2>
          <div className="service-list">
            {filteredServices.length === 0 ? (
              <p className="empty-message">Nenhum serviço cadastrado.</p>
            ) : (
              filteredServices.map(service => (
                <div key={service.id} className="service-item">
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <button className="edit-button" onClick={() => handleEditService(service.id)}>Editar</button>
                  <button className="delete-button" onClick={() => handleDeleteService(service.id)}>Excluir</button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
