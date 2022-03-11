import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { MOVIE_DETAIL} from '../../redux/types';
import axios from 'axios';

import './SearchResults.css';

const SearchResults = (props) => {

    let navigate = useNavigate();

    useEffect(()=>{
        console.log(props.pelis);
  
    },[]);

      
    const escogePelicula = (pelicula) => {
        
        console.log(pelicula, "he escogido esta....");
        //Guardamos la pelicula escogida en redux
        props.dispatch({type:MOVIE_DETAIL, payload: pelicula});


        //Redirigimos a movieDetail con navigate
        navigate("/moviedetail");
    }
 
    
    
    if(props.pelis[0]?.id !== undefined){
        
        return(
            
            <div className="designRooster">

                {
                    //Voy a mapear las películas
                    
                    props.pelis.map(pelicula => {
                        
                        return (
                            
                            <div key={pelicula.id} onClick={()=>escogePelicula(pelicula)}>
                                <img className='cartel' src={pelicula.image} alt={pelicula.title}/>
                            </div>
                        )
                    })
                }
                
            </div>
        )
    }else{
        return (
            <div className='designHome'>
                <div className="marginLoader">
                    Estoy cargando
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    pelis: state.search.peliculas
}))(SearchResults);