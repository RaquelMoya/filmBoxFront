
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';

import './Rent.css';

const Rent = (props) => {

    let navigate = useNavigate();
    //Hooks
    const [newOrder, setNewOrder] = useState({
        movieId: props.id, userId: props.userId, rentingDate: "", returnDate: ""
    });

    useEffect(()=>{
       
    },[]);

    useEffect((props)=>{
        console.log("vaya, , orders ha cambiado, ", newOrder);
    },[newOrder]);

    //Handler (manejador)
    const inputData = (e) => {
        setNewOrder({...newOrder, 
            [e.target.name]: e.target.value})
    };

    const alquilar = async () => {
        
        let body = {
            //este body corresponde al body de pedido de postman
            movieId: props.id,
            userId: props.userId,
            rentingDate: newOrder.rentingDate,
            returnDate: newOrder.returnDate
        }

        let config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };

        try {

            let res = await axios.post("http://localhost:3000/orders",body,config);

            if(res){
                console.log(res);
        
                navigate("/orders");
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="renting">
            <div className="input">
                 <input type="date" name="rentingDate" id="rentingDate" title="rentingDate" placeholder="Fecha alquiler" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                 <input type="date" name="returnDate" id="returnDate" title="returnDate" placeholder="Fecha devolución" autoComplete="off" onChange={(e)=>{inputData(e)}}/>

            </div>
            <div className="designRent" onClick={()=>alquilar()}>Alquilar</div>
        </div>

    )
};

export default connect((state)=>({
    credentials: state.credentials
}))(Rent);