import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GENERATE_ORDER, MOVIE_DETAIL } from '../../redux/types';

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

            let res = await axios.get(`http://localhost:3000/orders/${props.credentials.user.id}`,config);
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

     
        try {

        await axios.delete(`http://localhost:3000/orders/deleteAll/${props.credentials.user.id}`, config);

        window.location.reload();

        }catch (error){
            console.log(error);
        }
    };


    if(props.credentials?.user.rol === true){
       
        return (
            <div className="field">
                <div className="data"> {
                    
                        orders.map(order => {
                            return(
                                <div className="delete"key={order.id}>
                                        <p>USER ID : {order.userId} </p>
                                        <p>MOVIE : {order.title} </p>
                                        <p>MOVIE ID : {order.movieId} </p>
                                </div>)     
                        
                        })
                        
                }</div>  
                <div onClick={() => deleteOrder()} className="button1">Delete</div>
            </div>
        )}
    
 };




export default connect((state)=>({
    credentials: state.credentials
}))(AdminOrders);