import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { GENERATE_ORDER } from '../../redux/types';

import './AdminOrders.css';

const AdminOrders = (props) => {

    //Hooks
    const [orders, setOrders] = useState([]);


      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
      
      


    useEffect(()=>{
        getOrders();
    },[]);

    useEffect(()=>{
        if(props.credentials?.token === "" && props.credentials?.user.rol !== true){
            navigate("/");
        }
    });

    const getOrders = async () => {
     
        try {

            let res = await axios.get(`https://backendfilmbox.herokuapp.com/orders`, config);
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

        await axios.delete(`https://backendfilmbox.herokuapp.com/orders/${id}`,config);

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