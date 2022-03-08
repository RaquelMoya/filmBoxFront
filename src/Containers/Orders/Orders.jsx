import React, {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {GENERATE_ORDER} from '../../redux/types';

import './Orders.css';

const Orders = (props) => {

    let navigate = useNavigate();

    //Hooks
    const [newOrder, setNewOrder] = useState({
       movieId: "", userId: "", rentingDate: "", returnDate: "" 
        
});

    const [msgError, setMsgError] = useState("");

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };


    
    
    //Handler (manejador)
    const inputData = (e) => {
        setNewOrder({...newOrder, 
            [e.target.name]: e.target.value})
    };



    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });


    const registerOrder = async () => {


    let body = {
        movieId: newOrder.movieId,
        userId: newOrder.userId,
        rentingDate: newOrder.rentingDate,
        returnDate: newOrder.returnDate        
    }

    let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    console.log("le llaman BODY", body);
    // envio de axios

    try {
        
        let result = await axios.post("http://localhost:3000/orders", body, config);
        console.log(result);
        if(result){
            //Guardamos en redux
            props.dispatch({type:GENERATE_ORDER, payload: newOrder});
        }
        
    } catch (error) {
        console.log(error);
    }

}

    return (
        <div className="designOrders">
            <div className="cardInput">
                <input type="text" name="movieId" id="movieId" title="movieId" placeholder="ID pelicula:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                <input type="text" name="userId" id="userId" title="userId" placeholder="ID usuario" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                <input type="date" name="rentingDate" id="rentingDate" title="rentingDate" placeholder="Fecha alquiler" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                <input type="date" name="returnDate" id="returnDate" title="returnDate" placeholder="Fecha devolución" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
            </div>
            <div className="bottomCardInput">
                    {msgError}
                    <div className="buttonNewOrder" onClick={()=>registerOrder()}>
                        Realizar pedido
                    </div>
                </div>
            <Button destiny={"Movies"} url={"/movies"}/>
            <Button destiny={"Profile"} url={"/profile"}/>
        </div>
    )

};

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);