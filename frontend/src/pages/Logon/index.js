import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

import carpng from '../../assets/car.png';
import logopng from '../../assets/logo.svg';

export default function Logon() { //criando componente de logon
  const [id, setId] = useState('');
  const history = useHistory();


  async function handleLogin(e) { //função de login
    e.preventDefault();

    try { //login na aplicação 
      const response = await api.post('session', { id })

      localStorage.setItem('locationId', id);
      localStorage.setItem('locationName', response.data.name);

      history.push('/profile');

    } catch (err) {
      alert('Falha no Login, tente novamente!')
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logopng} alt="Keri - Locadora de Automóveis" />

        <form onSubmit= {handleLogin}> {/* chamada da função de login */}
          <h1> Faça o seu Login! </h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)} 
          /> {/* onChange -> coloca dentro de SetId o valor do input */}

          <button className='button' type='submit'> Entrar </button> 

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color='#f67828' />
            Não tenho cadastro!
          </Link>

        </form> </section>

      <img src={carpng} alt="Cars"/> 
    </div>
  );
}