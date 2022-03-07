import React from 'react';

import{useNavigate} from 'react-router-dom';

import './Header.css';

const Header = () => {

    let navigate= useNavigate();

    return (
        <div className="designHeader">
            <div className="headerButton"></div>
            <div className="headerButton"></div>
            <div className="headerButton"></div>
            <div className="headerButton linksDesign">
                <div className="link">LOGIN</div>
                <div className="link">REGISTER</div>
            </div>

        </div>
    )

}

export default Header;