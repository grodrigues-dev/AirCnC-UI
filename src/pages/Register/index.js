import React, { useState } from 'react';
import api from '../../services/api'
import {Link} from 'react-router-dom';

export default function Register({ history }) {
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [created, setCreated] = useState('');

    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/register', {
            email, login
        })
        if (!response.data) {
            setCreated("Usuário Já Cadastrado")
        } else {
            setCreated(
                <span className="access">
                    Cadastrado realizado com sucesso! <Link to="/" className="access">Acesse</Link>
                 </span>)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Digite aqui o seu e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="login">Login *</label>
                <input
                    type="text"
                    id="login"
                    placeholder="Digite aqui o seu login"
                    value={login}
                    onChange={event => setLogin(event.target.value)}
                />
                <button type="submit" className="btn"> Cadastrar</button>
            </form>
            <p className="created">{created}</p>
            <Link to="/" className="link">
                <p className="logout"> voltar</p>
            </Link>
        </>
    )
}