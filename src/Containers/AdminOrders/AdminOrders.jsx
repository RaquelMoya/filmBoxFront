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


    const getOrders = async () => {
     
        try {

            let res = await axios.get(`http://localhost:3500/orders`, config);
            console.log(res.data);
                setOrders(res.data);
                setTimeout(()=>{

                    setOrders(res.data);
                     
                    props.dispatch({type:GENERATE_ORDER, payload: orders});
                },1000);
                

        } catch (error) {
            console.log(error);
        }
    };
    const deleteOrder = async (id) => {
        
        try {

        await axios.delete(`http://localhost:3500/orders/${id}`,config);

        getOrders()
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
                                        <p>USER : {order.name} </p>
                                        <p>MOVIE : {order.title} </p>
                                        <div onClick={() => deleteOrder(order.id)} className="button1">Delete</div>
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


export default connect((state)=>({
    credentials: state.credentials,
    order: state.order
}))(AdminOrders);