import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logopng from '../../assets/logo.svg';


export default function Profile() {

  const [cars, setCars] = useState([]);

  const locationId = localStorage.getItem('locationId');
  const locationName = localStorage.getItem('locationName');

  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: locationId,
      }
    }).then(response => {
      setCars(response.data);
    })

  }, [locationId]);

  async function handleDeleteCar(id) {
    try {
      await api.delete(`cars/${id}`, {
        headers: {
          Authorization: locationId
        }
      });

      setCars(cars.filter(car => car.id !== id));
    } catch (err) {
      alert('Erro ao deletar este carro, tente novamente!');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return ( 
    <div className="profile-container">
      <header>
        <img src={logopng} alt="Keri - Locadora de Automóveis" />
        <span> Bem Vinda Locadora, {locationName} </span>

        <Link className="button" to='/cars/new'> Cadastrar novo carro </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color='#f99988' />
        </button>
      </header>

      <h1> Carros Cadastrados</h1>
      <ul>
        {cars.map(car => (


          <li key={car.id}>
            <p className= "title"> CARRO DISPONÍVEL PARA LOCAÇÃO </p>
            
            <p> MODELO: < label> {car.model} </ label>  </p> 
           
            <p> ANO: < label> {car.year} </ label> </p>
           
            <p> DESCRIÇÃO: < label> {car.description} </ label> </p>
           
            <p> CIDADE: < label> {car.city} </ label> </p>
            
            <p> VALOR: < label> {Intl.NumberFormat('pr-BR', { style: 'currency', currency: 'BRL' }).format(car.value)} </ label> </p>
            
            <button onClick={() => handleDeleteCar(car.id)} type="button">
              <FiTrash2 size={18} color="#a8a8b3" />
            </button>

          </li>

        ))}

      </ul>
    </div>
  )
}