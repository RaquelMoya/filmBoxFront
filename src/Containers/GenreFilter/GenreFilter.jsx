import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';



import './GenreFilter.css';

const GenreFilter = (props) => {

    let navigate = useNavigate();

    useEffect(()=>{
       
        console.log(props.generos);
  
    },[]);

    
    if(props.generos[0]?.name !== ""){
        
        return(
            
            <div className="designRooster">

                {

                    props.generos.map(genero => {
                        
                        return (
                            <div className="container">
                                <div className="Card" key={genero.id}>
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