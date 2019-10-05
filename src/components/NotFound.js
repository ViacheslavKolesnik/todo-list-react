import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import HandlerButton from './HandlerButton';

import '../css/NotFound.css';

export default class NotFound extends Component {

    constructor () {
        super();
        this.goBakcToLoginPage = false;
    }

    goBackToLoginPage = () => {
        this.goBakcToLoginPage = true;
        this.setState({});
    }

    render() {
        if(!this.goBakcToLoginPage) {
        return (
            <div className="nf-background">
                <div className="nf-container">
                    <h1>404</h1>
                    <h2>NOT FOUND</h2>
                    <HandlerButton id="back-to-login-page-button" content="Go to login page" onClick={this.goBackToLoginPage} />
                </div>
            </div>
        );
        } else {
            return <Redirect to="/" />
        }
    }
}