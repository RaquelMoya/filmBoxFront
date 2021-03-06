
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import Rent from '../../Components/Rent/Rent';



import './MovieDetail.css';

const MovieDetail = (props) => {

    let navigate = useNavigate();
   

    useEffect(()=> {

        if(props.search?.title === undefined){
            navigate("/");
        }
    });

   
        return(
            <div className='designFilm'>
                <div className="filmDetailHalf">
                    <div className="dataFilm title">{props.search?.title}</div>
                    <div className="dataFilm">{props.search?.synopsis}</div>
                    <div className="dataFilm">
                        {
                            props.credentials.token && <Rent id={props.search.id} token={props.credentials.token} userId={props.credentials.user.id}/>
                        }
                    </div>
                </div>
                <div className="filmDetailHalf image">
                    <img src={props.search.image} alt={props.search.title}/></div>    
            </div>
        )
   
}

export default connect((state) => ({
    credentials: state.credentials,
    search : state.search.film
}))(MovieDetail);