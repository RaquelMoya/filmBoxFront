import React from 'react';
import Button from '../../Components/Button/Button';

import './Profile.css';

const Profile = () => {

    return (
        <div className="designProfile">
            <Button destiny={"Movies"} url={"/movies"}/>
            <Button destiny={"Orders"} url={"/orders"}/>
        </div>
    )

}

export default Profile;