import React, {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';



import './Profile.css';

const Profile = (props) => {

    let navigate = useNavigate();

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });


    if(props.credentials?.user.id) {
        return (
            <div className="designProfile">
                  <p>NOMBRE : {props.credentials?.user.name} </p>
                  <p>APELLIDO : {props.credentials?.user.surname} </p>
                  <p>EDAD : {props.credentials?.user.age} </p>
                  <p>EMAIL : {props.credentials?.user.email} </p>
                  <p>TELEFONO : {props.credentials?.user.phone}</p>
                  <p>DIRECCION : {props.credentials?.user.adress}</p>
                  <p>NICKNAME : {props.credentials?.user.nickname}</p>
                <Button destiny={"Movies"} url={"/movies"}/>
                <Button destiny={"Orders"} url={"/orders"}/>
            </div>
        )

    
}};



export default connect((state)=>({
    credentials: state.credentials
}))(Profile);