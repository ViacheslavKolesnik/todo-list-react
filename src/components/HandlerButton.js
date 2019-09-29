import React, { Component } from 'react'

export default class HandlerButton extends Component {
    render() {
        return (
			<button id={this.props.id} onClick={this.props.onClick} className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
				{this.props.content}
			</button>
        )
    }
}
