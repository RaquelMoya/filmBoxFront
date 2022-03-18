
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { LOGOUT, MOVIES_TITLE, MOVIES_GENRE } from '../../redux/types';
import {connect} from 'react-redux';
import axios from 'axios';
import 'antd/dist/antd.css';
import {
    Input,
    Button
} from 'antd';

import './Header.css';

const Header = (props) => {

    let navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [genero, setGenero] = useState("");


    const navegar = (lugar) => {

        setTimeout(()=> {
            navigate(lugar);
        }, 200);

    }

    const logOut = () => {
        //Borrar de RDX las credenciales
        props.dispatch({type:LOGOUT});

        setTimeout(()=>{
            navigate("/");
        },1000);
    }
    const handler = (ev) => {
        setGenero(ev.target.value);
    }
    const manejador = (ev) => {
        setTitulo(ev.target.value);
    }

    const busquedaPorGenero = async () => {


        try {
            let resultados = await axios.get(`http://localhost:3500/genreMovie/genre/${genero}`);

            props.dispatch({type: MOVIES_GENRE, payload: resultados.data});

            setTimeout(()=>{
                navigate("/genrefilter");
            },500);


        } catch (error) {
            console.log(error);
        }
    }
    const busquedaPorTitulo = async () => {


        try {
            let resultados = await axios.get(`http://localhost:3500/movies/title/${titulo}`);

            props.dispatch({type: MOVIES_TITLE, payload: resultados.data});

            setTimeout(()=>{
                navigate("/searchresults");
            },500);


        } catch (error) {
            console.log(error);
        }
    }
    if(!props.credentials?.token){
        return (
            <div className='designHeader'>
                <div className="headerSpace genreDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una película por título" onChange={(ev)=>handler(ev)}/>
                        <Button onClick={()=>busquedaPorGenero()} type="primary">Go!</Button>
                    </Input.Group>
                </div>  
                <div className="headerSpace searchDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una película por título" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>busquedaPorTitulo()} type="primary">Go!</Button>
                    </Input.Group>
                </div>
                <div className="headerSpace"></div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={()=>navegar("/login")}>Login</div>
                    <div className="link" onClick={()=>navegar("/register")}>Register</div>   
                    <div className="link"onClick={()=>navegar("/movies")}>Movies</div> 
                </div>
            </div>
        )
    }else {
        return (
            <div className='designHeader'>
                  <div className="headerSpace genreDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una película por título" onChange={(ev)=>handler(ev)}/>
                        <Button onClick={()=>busquedaPorGenero()} type="primary">Go!</Button>
                    </Input.Group>
                </div>  
                <div className="headerSpace searchDesign">
                <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} placeholder="Busca una película por título" onChange={(ev)=>manejador(ev)}/>
                        <Button onClick={()=>busquedaPorTitulo()} type="primary">Go!</Button>
                    </Input.Group>
                </div>
                <div className="headerSpace"></div>
                <div className="headerSpace linksDesign">
                    <div className="link" onClick={()=>navegar("/profile")}>{props.credentials?.user.name}</div>
                    <div className="link" onClick={()=>logOut()}>Logout</div>  
                    <div className="link"onClick={()=>navegar("/orders")}>Orders</div>   
                </div>
            </div>
        )
    }

    

}

export default connect((state)=>({
    credentials: state.credentials
}))(Header);