
import React from 'react';
import Button from '../../Components/Button/Button';

import './Home.css';

const Home = () => {

    return (
        <div className="designHome">
            <Button destiny={"Login"} url={"/login"}/>
            <Button destiny={"Register"} url={"/register"}/>
        </div>
    )

}

export default Home;