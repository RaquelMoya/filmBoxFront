import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { MODIFY_CREDENTIALS } from '../../redux/types';

import './AdminUsers.css';

const AdminUsers = (props) => {

    //Hooks
    const [users, setUsers] = useState([]);

      //CREAMOS LA CONFIGURACIÓN DEL HEADER QUE SE VA A MANDAR
      let config = {
        headers: { Authorization: `Bearer ${props.credentials.token}` }
    };
      
      


    useEffect(()=>{
        getUsers();
    },[]);


    const getUsers = async () => {
     
        try {

            let res = await axios.get(`http://localhost:3500/users`, config);
            console.log(res.data);

                    setUsers(res.data);

        } catch (error) {
            console.log(error);
        }
    };
    const deleteUser = async (id) => {
        
        try {

        await axios.delete(`http://localhost:3500/users/delete/${id}`,config);

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