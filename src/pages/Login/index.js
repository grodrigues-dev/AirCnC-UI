import React, { useState } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom';


export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [register, setResgister] = useState('');
    async function handleSubmit(event) {
        event.preventDefault();
        const response = await api.post('/sessions', { email });
        if (!response.data) {
            setResgister('Usuário não cadastrado');
        } else {
            const { _id } = response.data;
            localStorage.setItem('user', _id);
            localStorage.setItem('email', email)
            history.push('/dashboard')
        }
    }
    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa</p>
            <form onSubmit={handleSubmit} >
                <label htmlFor="email">E-MAIL *</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Digite aqui o seu e-mail"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button type="submit" className="btn"> Entrar</button>
            </form>
            <p className="non-register">{register}</p>
            <Link to="/register" className="link">
                <p className="cadastro">Cadastre-se</p>
            </Link>
        </>
    )
}