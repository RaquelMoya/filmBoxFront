
import React from 'react';
import Button from '../../Components/Button/Button';

import './Home.css';

const Home = () => {

    return (
        <div className="designHome">
            <p>¡Bienvenid@ a Filmbox!</p>
            <Button destiny={"Login"} url={"/login"}/>
            <Button destiny={"Register"} url={"/register"}/>
        </div>
    )

}

export default Home;