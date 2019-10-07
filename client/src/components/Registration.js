import React, { Component } from 'react';
import HandlerButton from './HandlerButton';

import '../css/Registration.css';

import { Constants } from '../constants/constants';


export default class Registration extends Component {

    constructor() {
        super();

        this.state = {
            name: "",
            email: ""
        }
    }

    componentDidMount() {
        window.componentHandler.upgradeDom();
    }

    onChange = (e) => {
        let target = e.target;
        let isValid = true

        if (target.name === "email") {
            isValid = target.value.includes('@');

            target.setCustomValidity(isValid ? "" : "Email must contain '@' character.");

            isValid ?
                target.parentElement.classList.remove(window.MaterialTextfield.prototype.CssClasses_.IS_INVALID) :
                target.parentElement.classList.add(window.MaterialTextfield.prototype.CssClasses_.IS_INVALID);

        }

        this.setState({
            [target.name]: target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.saveUser();
    }

    saveUser = () => {
        fetch(Constants.host + Constants.apiSaveUser, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: {
                    name: this.state.name,
                    email: this.state.email
                }
            })
        }).then(() => this.props.history.push("/"))
            .catch(err => console.log(err));


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
                        <p className="choose-account">Заполните форму</p>
                        <form onSubmit={this.handleSubmit} className="register-form">
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input name="name" id="name_input" onChange={this.onChange} className="mdl-textfield__input"
                                    type="text" required="required" pattern="^(?!\s*$).+"></input>
                                <label className="mdl-textfield__label" htmlFor="name_input">Name</label>
                            </div>
                            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                                <input name="email" id="email_input" onChange={this.onChange} className="mdl-textfield__input"
                                    type="text" required="required" pattern="^(?!\s*$).+"></input>
                                <label className="mdl-textfield__label" htmlFor="email_input">Email</label>
                            </div>
                            <input id="register-button" type="submit" value="Register"
                                className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" />
                        </form>
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