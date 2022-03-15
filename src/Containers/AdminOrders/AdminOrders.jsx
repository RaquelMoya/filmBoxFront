import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { GENERATE_ORDER } from '../../redux/types';

import './AdminOrders.css';

const AdminOrders = (props) => {

    //Hooks
    const [orders, setOrders] = useState([]);

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
      
      


    useEffect(()=>{
        getOrders();
    },[]);

    useEffect(()=>{
        console.log("estos son los pedidos", orders);
    },[orders]);


    const getOrders = async () => {
     
        try {

            let res = await axios.get(`http://localhost:3500/orders`, config);
            console.log(res.data);
                setOrders(res.data);
                setTimeout(()=>{

                    setOrders(res.data);
                     
                    props.dispatch({type:GENERATE_ORDER, payload: orders});
                },1500);
                

        } catch (error) {
            console.log(error);
        }
    };
    const deleteOrder = async () => {
        let id = orders.id;
        let body = { id : props.credentials.user.id}

     
        try {

        await axios.delete(`http://localhost:3500/orders/${id}`,config);


        }catch (error){
            console.log(error);
        }
    };


    if(props.credentials?.user.rol === true){
       
        return (
            <div className="field">
                <div className="data"> {
                    
                        orders.map((order, index)=> {
                            return(
                                <div className="delete"key={index}>
                                        <p>USER ID : {order.userId} </p>
                                        <p>MOVIE : {order.title} </p>
                                        <p>MOVIE ID : {order.movieId} </p>
                                        <div onClick={() => deleteOrder()} className="button1">Delete</div>
                                </div>)     
                        
                        })
                        
                }</div>  
               
            </div>
        )}else{
            return(
                <div>Error 401</div>
            )
        }
    
 };

/*1.- Cómo mostrar titulo de la pelicula pedida en return del map linea 73 AdminOrders
2.- Cómo hacer logout con perfil admin y que redirija a Home despues de entrar en Orders
3.- Cómo entrar en perfil admin sin necesidad de params en la url, para evitar los problemas con urls/:id como deleteById 
4.- Cómo hacer el searchResults mapeando por cada ev*/


export default connect((state)=>({
    credentials: state.credentials
}))(AdminOrders);