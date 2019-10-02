import React, { Component } from 'react';
import '../css/Login.css';


export default class User extends Component {

    getLogo() {
        return this.props.name[0].toUpperCase()
    }

    onClick = () => {
        console.log("Clicked user.")
        this.props.login(this.props.email);
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
            </div>
        )
    }
}