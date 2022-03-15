import React, {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {MODIFY_CREDENTIALS} from '../../redux/types';
import axios from 'axios';


import './Profile.css';

const Profile = (props) => {

    let navigate = useNavigate();

    //Hooks
    const [dataUser, setDataUser] = useState({
        id:props.credentials.user.id, name: props.credentials.user.name, surname: props.credentials.user.surname, age: props.credentials.user.age, email: props.credentials.user.email, 
        adress: props.credentials.user.adress,  phone: props.credentials.user.phone, 
        nickname: props.credentials.user.nickname, rol: props.credentials.user.rol
    });


      //Handler (manejador)
      const inputData = (e) => {
        setDataUser({...dataUser, 
            [e.target.name]: e.target.value})
    };

    useEffect(()=>{
        if(props.credentials.token === ""){
            navigate("/");
        }
    });

    
    const updateUser = async () => {

        let body = {
            name: dataUser.name,
            surname: dataUser.surname,
            email: dataUser.email,
            phone: parseInt(dataUser.phone),
            adress: dataUser.adress,
            nickname: dataUser.nickname
        }

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`http://localhost:3500/users/${props.credentials.user.id}`,body, config);

            
            
            
            if(res){
                //Guardamos en redux
                props.dispatch({type:MODIFY_CREDENTIALS, payload: dataUser});
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="designProfile">
            <div className="designProfileHalf profileLeft">
                <div className="profileField"><b>Nombre:<input type="text" name="name" id="name" title="name" placeholder={props.credentials.user.name} autoComplete="off" onChange={(e) => { inputData(e) }} />
                </b></div>
                <div className="profileField"><b>Apellidos:</b><input type="text" name="surname" id="surname" title="surname" placeholder={props.credentials.user.surname} autoComplete="off" onChange={(e) => { inputData(e) }} />
                </div>
                <div className="profileField"><b>Email:</b><input type="email" name="email" id="email" title="email" placeholder={props.credentials.user.email} autoComplete="off" onChange={(e) => { inputData(e) }} /></div>
                <div className="profileField"><b>Teléfono:</b><input type="text" name="phone" id="phone" title="phone" placeholder={props.credentials.user.phone} autoComplete="off" onChange={(e) => { inputData(e) }} />
                </div>
                <div className="profileField"><b>Direccion:</b><input type="text" name="adress" id="adress" title="adress" placeholder={props.credentials.user.adress} autoComplete="off" onChange={(e) => { inputData(e) }} /></div>
                <div className="profileField"><b>Nickname:</b><input type="text" name="nickname" id="nickname" title="nickname" placeholder={props.credentials.user.nickname} autoComplete="off" onChange={(e) => { inputData(e) }} />
                </div> 
                <div className="updateButton" onClick={()=>updateUser()}>Update</div>
            </div>
             
            <div className="designProfileHalf profileRight">
                
                <Button destiny={"Movies"} url={"/movies"}/>
                <Button destiny={"Orders"} url={"/orders"}/>
            </div>
           
        </div>
    )


}               



export default connect((state)=>({
    credentials: state.credentials
}))(Profile);