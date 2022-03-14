import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {checkError} from '../../utilities';
import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    
    //Hooks

    const [dataUser, setDataUser] = useState({
            name: "", surname: "", age: "",phone: "", adress: "", email: "", 
            password: "", password2: "", nickname:"" 
            
    });

    const [msgError, setMsgError] = useState("");

    //useEffect

    useEffect(()=>{
        //se ejecuta la primera vez que se ejecuta tan solamente
    },[]);

    useEffect(()=>{
        //se ejecuta cada vez que se actualiza CUALQUIER HOOK  
    })

    // useEffect(()=>{
    //     //useEffect observable que sólo se ejecutará cuando
    //     //datosUsuario mute
    // },
    // [datosUsuario])
    

    //Handler (manejador)
    const inputData = (e) => {
            setDataUser({...dataUser, 
                [e.target.name]: e.target.value})
    };


    //Funciones locales del componente

    const registerme = async () => {

        //Array de distintos campos

        setMsgError("");
        let error = "";

        let arrayFields = Object.entries(dataUser);
        
        // //1 comprobación de errores antes de enviar al backend

        if(dataUser.password !== dataUser.password2){

            return (setMsgError("Los dos password deben de coincidir"));

        }else{
            setMsgError("");
        }

        for(let element of arrayFields){
            error = checkError(element[0],element[1]);

            if(error !== "ok"){
                setMsgError(error);
                return;
            };
        };

        console.log("todo ha ido bien")

        //2construimos el body

        let body = {
            name: dataUser.name,
            surname: dataUser.surname,
            age: dataUser.age,
            phone: parseInt(dataUser.phone),
            adress: dataUser.adress,
            email: dataUser.email,
            password: dataUser.password,
            nickname: dataUser.nickname
            
        }

        console.log("le llaman BODY", body);
        //3 envio de axios

        try {
            
            let resultado = await axios.post("http://localhost:3000/users", body);
            console.log(resultado);
            
                setTimeout(()=>{
                    navigate("/login");
                },1000);
            
            
            
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div className='designRegister'>
             
            <div className="cardRegister">
                <div className="upCardRegister">Formulario de Registro</div>
                {<pre>{JSON.stringify(dataUser, null,2)}</pre>}
                <div className="middleCardRegister">
                    <input type="text" name="name" id="name" title="name" placeholder="Nombre:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="surname" id="surname" title="surname" placeholder="Apellido:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="age" id="age" title="age" placeholder="Edad:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="phone" id="phone" title="phone" placeholder="Telefono" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="adress" id="adress" title="adress" placeholder="Dirección:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="email" name="email" id="email" title="email" placeholder="Correo Electrónico:" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="password" name="password" id="password" title="password" placeholder="Contraseña" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="password" name="password2" id="password2" title="password2" placeholder="Repite contraseña" autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                    <input type="text" name="nickname" id="nickname" title="nickname" placeholder="Nickname: " autoComplete="off" onChange={(e)=>{inputData(e)}}/>
                </div>
                <div className="bottomCardRegister">
                    {msgError}
                    <div className="buttonRegister" onClick={()=>registerme()}>
                        Register me!
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Register;