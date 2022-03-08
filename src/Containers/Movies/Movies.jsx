import React from 'react';
import Button from '../../Components/Button/Button';

import './Movies.css';

const Movies = () => {

    return (
        <div className="designMovies">
            <Button destiny={"Profile"} url={"/profile"}/>
            <Button destiny={"Orders"} url={"/orders"}/>
        </div>
    )

}

export default Movies;