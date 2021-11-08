import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
import GoogleButton from 'react-google-button';

export const LoginPage = ({startLogin}) => (
    <div className="box-layout">
        <div className="box-layout__box">
            <h1 className="box-layout__title">Expensify</h1>
            <p>Get your expenses under control.</p>
            <hr className="box-layout__separator"/>
            <GoogleButton className="login-button" onClick={startLogin}>login</GoogleButton>
        </div>        
    </div>
);


const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);