import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { LOGIN } from '../../redux/types';

import './AdminUsers.css';

const AdminUsers = (props) => {

    return (
        <div className="field">
            
           
        </div>
    )
};

export default connect((state)=>({
    credentials: state.credentials
}))(AdminUsers);
