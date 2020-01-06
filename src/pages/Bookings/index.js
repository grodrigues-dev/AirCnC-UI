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
            console.log(response.data);
            
            setBookings(response.data); 
        }
        
        loadBookings()
    }, [])
    return (
       <ul>
          {bookings.map(booking =>(
              <li key={booking._id}>
                  <p>O usuário {booking.user[0].login} solicitou uma reserva em {booking.spot[0].company} para a data de {booking.date} </p>
                  <p>Deseja alterar o status da solicitação?</p>
              </li>
          ))
          } 
       </ul>
        
    )
}