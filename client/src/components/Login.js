import React, { Component } from 'react';
import '../css/Login.css';
import User from './User';

import { Constants } from '../constants/constants';


export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            users: []
        }
    }


    componentDidMount() {
        this.loadUsers();
    }

    loadUsers = () => {
        fetch(Constants.host + Constants.apiGetUsers, {
            method: 'GET'
        }).then((response) => {
            response.json().then(data => {
                this.setState({ users: data });
            })
        });
    }

    login = (user) => {
        this.user = localStorage.setItem(Constants.localStorageKey, user);
        this.props.history.push('/notebook');
    }

    render() {
        return (
            <div className="login-bg">
                <div className="login-form-wrapper">
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
                            {this.state.users.map(user =>
                                <User
                                    key={user.email}
                                    name={user.name}
                                    email={user.email}
                                    login={this.login}
                                />
                            )}
                        </div>
                    </div>
                    <footer className="login-footer">
                        <p className="language">Русский</p>
                        <ul>
                            <li><span>Справка</span></li>
                            <li><span>Конфидециальность</span></li>
                            <li><span>Условия</span></li>
                        </ul>
                    </footer>
                </div>
            </div>
        );
    }
}