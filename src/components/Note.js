import React, { Component } from 'react'

export default class Note extends Component {

    remove = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="note-instance" id={this.props.id}>
                <button onClick={this.remove} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored remove-note">
                    <p>+</p>
                </button>
                <span className="note-title">{this.props.title}</span>
                <span className="note-content">{this.props.content}</span>
            </div>
        )
    }
}
