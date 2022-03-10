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
    const [orders, setOrders] = useState([]);

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };

    useEffect(()=>{
        getOrders();
    },[]);

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });

    useEffect(()=>{
        console.log("vaya, , orders ha cambiado, ", orders);
    },[orders]);

    const getOrders = async () => {

        let id = props.credentials.user.id

        try {

            let res = await axios.get(`http://localhost:3000/orders/usuario/${id}`, config);

            setTimeout(()=>{

                setOrders(res.data);
                 //Guardamos la pelicula escogida en redux
                props.dispatch({type:GENERATE_ORDER, payload: orders});
            },1500);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="designOrders">
            <div className="data">
                <div className="title"> {
                    //Voy a mapear las películas
                    orders.map(order => {
                        
                        return (
                           
                            <div key={order.id}>
                                {order.title }
                            </div>
                        )
                    })
                }</div>
            </div>
            <Button destiny={"Movies"} url={"/movies"}/>
            <Button destiny={"Profile"} url={"/profile"}/>
        </div>
    )

};

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);