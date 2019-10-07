import React, { Component } from 'react';
import '../css/User.css';


export default class User extends Component {

    getLogo() {
        return this.props.name[0].toUpperCase()
    }

    onClick = () => {
        let email = this.props.email;
        this.props.login(email.substring(0, email.indexOf('@')));
    }
    
    remove = (e) => {
        e.stopPropagation();

        this.props.remove(this.props.email);
    }

    render() {
        return (
            <div className="account-item" onClick={this.onClick}>
                <div className="logo">
                    <span>{this.getLogo()}</span>
                </div>
                <div className="content">
                    <p className="user">{this.props.name}</p>
                    <p className="email">{this.props.email}</p>
                </div>
                <button onClick={this.remove} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored remove-user">
                    <p>+</p>
                </button>
            </div>
        )
    }
}