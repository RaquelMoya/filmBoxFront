import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './AdminUsers.css';

const AdminUsers = (props) => {

    let navigate = useNavigate();
    //Hooks
    const [users, setUsers] = useState([]);

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
      
      


    useEffect(()=>{
        getUsers();
    },[]);
    useEffect(()=>{
        if(props.credentials?.token === "" && props.credentials?.user.rol !== true){
            navigate("/");
        }
    });


    const getUsers = async () => {
     
        try {

            let res = await axios.get(`https://backendfilmbox.herokuapp.com/users`, config);
            console.log(res.data);

                    setUsers(res.data);

        } catch (error) {
            console.log(error);
        }
    };
    const deleteUser = async (id) => {
        
        try {

        await axios.delete(`https://backendfilmbox.herokuapp.com/users/delete/${id}`,config);

        getUsers()
        }catch (error){
            console.log(error);
        }
    };


    if(props.credentials?.user.rol === true){
       
        return (
            <div className="field">
                <div className="data"> {
                    
                        users.map((user, index)=> {
                            return(
                                <div className="delete"key={index}>
                                        <p>USER : {user.name} </p>
                                        <p>EMAIL : {user.email} </p>
                                        <div onClick={() => deleteUser(user.id)} className="button1">Delete</div>
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
    credentials: state.credentials
}))(AdminUsers);