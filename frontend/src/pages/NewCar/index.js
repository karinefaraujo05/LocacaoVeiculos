
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logopng from '../../assets/logo.svg';

export default function NewCar() { //criando componente de cadastro
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [value, setValue] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');

  const history = useHistory();
  const locationId = localStorage.getItem('locationId');

  async function handleNewCar(e) {
    e.preventDefault();

    const data = {
      model,
      year,
      value,
      city,
      description
    };

    try { //cadastro do carro na aplicação 

      await api.post('cars', data, {
        headers: {
          Authorization: locationId,
        }
      })
      history.push('/profile')
    } catch (err) {
      alert('Erro no cadastro do carro! Tente Novamente!');
    }
  }

  return (
    <div className="new-car-container">
      <div className="content">
        <section> {/* chamada da função de cadastro */}
          <img src={logopng} alt="Keri - Locadora de Automóveis" />

          <h1> Cadastro de Veículos </h1>
          <p> Cadastre o veículo para que o seu cliente saiba tudo sobre ele! </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#f67828" />
            Voltar para Home
          </Link>
        </section>

        <form onSubmit={handleNewCar}>
          
          <input
            type="model"
            placeholder="CARRO / MODELO"
            onChange={e => setModel(e.target.value)}
          />

          <input
            type="year"
            placeholder="ANO"
            onChange={e => setYear(e.target.value)}
          />

          <input
            type="value"
            placeholder="VALOR DIÁRIA"
            onChange={e => setValue(e.target.value)}
          />

          <input
            type="city"
            placeholder="DISPONÍVEL EM:"
            onChange={e => setCity(e.target.value)}
          />

          <textarea
            type="description"
            placeholder="DESCRIÇÃO:"
            onChange={e => setDescription(e.target.value)}
          />

          <button className="button" type="submit"> Cadastrar </button>

        </form>
      </div>
    </div>


  );
}