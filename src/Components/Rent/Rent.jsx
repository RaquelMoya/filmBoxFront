
import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import './Rent.css';

const Rent = (props) => {

    let navigate = useNavigate();

    const alquilar = async () => {
        
        let body = {
            //este body corresponde al body de pedido de postman
            movieId: props.id,
            userId: props.userId,
            rentingDate: new Date,
            returnDate: new Date
        }

        let config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };

        try {

            let res = await axios.post("http://localhost:3000/orders",body,config);

            if(res){
                console.log(res);
                navigate("/");
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="designRent" onClick={()=>alquilar()}>Alquilar</div>
    )
}

export default Rent;