import React, { Component } from 'react';

import '../css/NotFound.css';

export default class NotFound extends Component {
    render() {
        return (
            <div className="nf-background">
                <div className="nf-container">
                    <h1>404</h1>
                    <h2>NOT FOUND</h2>
                </div>
            </div>
        );
    }
}