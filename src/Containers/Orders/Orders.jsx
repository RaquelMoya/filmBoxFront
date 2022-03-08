import React, {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import {checkError} from '../../utilities';
import {connect} from 'react-redux';

import './Orders.css';

const Orders = (props) => {

    const [newOrder, setNewOrder] = useState({
       movieId: "", userId: "", rentingDate: "", returnDate: "" 
        
});

    const [msgError, setMsgError] = useState("");
    
    
    //Handler (manejador)
    const inputData = (e) => {
        setNewOrder({...newOrder, 
            [e.target.name]: e.target.value})
};
const registerOrder = async () => {

    //Array de distintos campos

 //   setMsgError("");
 //   let error = "";
//
 //   let arrayFields = Object.entries(newOrder);
//
 //   for(let element of arrayFields){
 //       error = checkError(element[0],element[1]);
//
 //       if(error !== "ok"){
 //           setMsgError(error);
 //           return;
 //       };
 //   };

    //2construimos el body

    let body = {
        movieId: newOrder.movieId,
        userId: newOrder.userId,
        rentingDate: newOrder.rentingDate,
        returnDate: newOrder.returnDate        
    }

    console.log("le llaman BODY", body);
    //3 envio de axios

    try {
        
        let result = await axios.post("http://localhost:3000/orders", body);
        console.log(result);
        
        
    } catch (error) {
        console.log(error);
    }

}

    if(!props.credentials?.token){
    return (
        <div className="designOrders">
            <div className="cardInput">
                <input type="text" name="movieId" id="movieId" title="movieId" placeholder="ID pelicula:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                <input type="text" name="userId" id="userId" title="userId" placeholder="ID usuario:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
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

    }else{
        <div className="designOrders">
            Debes loguearte primero</div>
    }
}

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);