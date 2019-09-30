import React, { Component } from 'react';
import '../css/Login.css';


export default class Login extends Component {

    render() {
        return (
            <div className="login-bg">
                <div className="login-form">
                    <p className="title">
                        <span className="blue">S</span>
                        <span className="red">l</span>
                        <span className="yellow">a</span>
                        <span className="blue">v</span>
                        <span className="green">i</span>
                        <span className="red">k</span>
                    </p>
                    <p className="choose-account">Выберите аккаунт</p>
                    <div className="account-item-container">
                        <div className="account-item">
                            <div className="logo">
                                <span>V</span>
                            </div>
                            <div className="content">
                                <p className="user">Viacheslav Viacheslavovich</p>
                                <p className="email">viacheslav@gmail.com</p>
                            </div>
                        </div>
                        <div className="account-item">
                            <div className="logo">
                                <span>S</span>
                            </div>
                            <div className="content">
                                <p className="user">Slavik Slavikovich</p>
                                <p className="email">slavik@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <footer>

                </footer> */}
            </div>
        );
    }
}