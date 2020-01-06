import React, {useState, useEffect} from 'react'; 
import api from '../../services/api'

export default function  Bookings(){
    const [bookings, setBookings] = useState([]);

    useEffect(()=>{
        async function loadBookings(){
            const user_email = localStorage.getItem('email'); 
            const response = await api.get('/bookings/index', {
                headers: {
                    user_email
                }
            });            
            setBookings(response.data); 
        }
        loadBookings()
    }, [])
    return (
       <ul className ="booking">
          {bookings.map(booking =>(
              <li key={booking._id}>
                  <p>O usuário <strong>{booking.user[0].login} </strong>
                  solicitou uma reserva em <strong>{booking.spot[0].company}</strong>  para a data de <strong>{booking.date}</strong> </p>
                  <p>Status: {booking.approved ? <span className="approved">APROVADO</span> : <span className="rejected">REJEITADO</span>} </p>
              </li>
          ))
          } 
       </ul>
        
    )
}