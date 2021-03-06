import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api'
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client'
import './style.css'


export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    const [requests, setRequest] = useState([]);

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3001', {
        query: {
            user_id
        }
    }), [user_id]);

    useEffect(() => {
        socket.on('bookingRequest', data => {
            setRequest([...requests, data]);
        })
    }, [requests, socket]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: { user_id }
            });
            setSpots(response.data)
        }
        loadSpots();
    }, []);

    async function handleAcceept(id) {
        await api.post(`/bookings/${id}/approvals`);
        setRequest(requests.filter(request => request._id != id));
    }

    async function handleReject(id) {
        await api.post(`/bookings/${id}/rejections`);
        setRequest(requests.filter(request => request._id != id));
    }

    return (
        <>
            <ul className="notifications">
                {requests.map(request => (
                    <li key={request._id}>
                        <p>
                            <strong>{request.user.email}</strong> está solicitando uma reserva em <strong>{request.spot.company}</strong> para a data: <strong> {request.date}</strong>
                            <button className="accept" onClick={() => handleAcceept(request._id)}>ACEITAR</button>
                            <button className="reject" onClick={() => handleReject(request._id)}> REJEITAR</button>
                        </p>
                    </li>
                ))}
            </ul>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{(spot.price || spot.price > 0) ? `R$${spot.price}` : 'GRATUITO'}</span>
                    </li>
                ))}
            </ul>
            <Link to="/new">
                <button className="btn">
                    Cadastrar novo spot
                </button>
            </Link>
            <Link to="/bookings">
                <button className="btn btn2">
                    Gerenciar reservas
                </button>
            </Link>
            <Link to="/" className="link">
                <p className="logout"> sair</p>
            </Link>
        </>
    )

}