import React, {useState} from 'react';
import './App.css';
import api from './services/api'

import logo from './assets/logo.svg';


function App() {
const [email, setEmail] = useState('');
  async function handleSubmit(event){
    event.preventDefault();
     const response = await api.post('/sessions', {email}); 
      console.log(response);
      
  }
  return (
    <div className="container">
      <img src={logo} alt=""/>
      <div className="content">
        <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>
        <form onSubmit ={handleSubmit} >
          <label htmlFor="email">E-MAIL *</label>
          <input 
          type="email"
          id="email" 
          placeholder="Digite aqui o seu e-mail"
          value={email}
          onChange ={event => setEmail(event.target.value)}
          />
          <button type="submit" className="btn"> Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
