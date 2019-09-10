import React, { Component } from 'react'

export default class Note extends Component {
    render() {
        return (
            <div class="note-instance" id={this.props.id}>
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored remove-note">
                    <p>+</p>
                </button>
                <span class="note-title">{this.props.title}</span>
                <span class="note-content">{this.props.content}</span>
            </div>
        )
    }
}
