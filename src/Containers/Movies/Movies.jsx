import React, {useState, useEffect} from 'react';
import Button from '../../Components/Button/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { connect } from 'react-redux';
import { MOVIE_DETAIL } from '../../redux/types';

import './Movies.css';

const Movies = (props) => {

    let navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    

    useEffect(()=>{
        getMovies();
    },[]);

    //useEffect custom para el hook films

    useEffect(()=>{
        console.log("vaya, , movies ha cambiado, ", movies);
    },[movies]);

    const getMovies = async () => {

        try {

            let res = await axios.get("http://localhost:3000/movies");

            setTimeout(()=>{

                setMovies(res.data);
            },2000);

        } catch (error) {
            console.log(error);
        }
    };

    const chooseMovie = (film) => {
        console.log(film);
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:MOVIE_DETAIL, payload: film});

        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }
 
    if(movies[0]?.id !== undefined){
        return(
            <div className="designRooster">

                {
                    //Voy a mapear las películas
                    movies.map(film => {
                        //a cada elemento que voy a mapear
                        //le brindo un KEY (obligatorio) que lo distinguirá de
                        //el resto de elementos
                        return (
                            //Al mapear, cada elemento que se itera del array (en este caso pelicula es ese elemento),
                            //si le hacemos propiedad onclick y pasamos el elemento como argumento,
                            //a esa funcion le va a llegar el objeto que hayamos clickado entero
                            <div key={film.id} onClick={()=>chooseMovie(film)}>
                                <img src={film.image} alt={film.title}/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designMovies'>
                <div className="marginLoader">
                    <Button destiny={"Profile"} url={"/profile"}/>
                    <Button destiny={"Orders"} url={"/orders"}/>
                </div>
            </div>
        )
    }
}
    /*Para mostrar caratulas de peliculas en unas cards, hacer función trae imagen de pelicula por ID para acceder con un onclick
    , añadir endpoint en backend y base de datos desde the movie db. */

    /*Los endpoints de ver todas las pelis, ver las imagenes y ver una breve descripcion, sin auth ni admin. 
    Vista detalles de pelicula y orders solo con auth */

    /*Vista orders por id usuario, con auth. Vista all Orders con admin */

    /*Para añadir imagenes, echar abajo mi DB, añadir atributo poster en modelo, seeder y migration, en poster poner la url de una imagen en internet */



export default connect()(Movies);