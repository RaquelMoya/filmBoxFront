import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MOVIE_DETAIL} from '../../redux/types';
import axios from 'axios';


import './GenreFilter.css';

const GenreFilter = (props) => {

    const [genres, setGenres] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{
       
        console.log(props.generos);
  
    },[]);

 
      
    const escogePelicula = (pelicula) => {
   
        props.dispatch({type:MOVIE_DETAIL, payload: pelicula});

        navigate("/searchresults");
    }
    
    if(props.generos[0]?.name !== ""){
        
        return(
            
            <div className="designRooster">

                {

                    props.generos.map(genero => {
                        
                        return (
                            <div className="container">
                                <div className="Card" key={genero.id} onClick={()=>escogePelicula(genero)}>
                                    <p>Genero: {genero.name}</p>
                                    <p>Pelicula: {genero.title}</p>
                                </div>
                            </div>
                        )
                    })
                }
                
            </div>
        )}else{
        return (
            <div className='designHome'>
               LOADING
            </div>
        )
    };
}

export default connect((state) => ({
    pelis: state.search.peliculas,
    generos: state.search.genero
}))(GenreFilter);