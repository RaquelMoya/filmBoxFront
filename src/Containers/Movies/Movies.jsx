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

    const getMovies = async () => {

        try {

            let res = await axios.get("https://backendfilmbox.herokuapp.com/movies");

            setTimeout(()=>{

                setMovies(res.data);
            },1500);

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
                    
                    movies.map(film => {
                      
                        return (
        
                            <div className="film" key={film.id} onClick={()=>chooseMovie(film)}>
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
};


export default connect()(Movies);