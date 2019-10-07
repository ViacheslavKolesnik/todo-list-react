import React, { Component } from 'react'

export default class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            content: props.content
        };
    }

    updateValue = (e) => {
        let target = e.target;
        let pattern = new RegExp(/^(?!\s*$).+/);
        let isValid = pattern.test(target.value)

        if (isValid) {
            this.setState({
                [target.name]: target.value
            });

            this.props.updateNote(this.props.id, target.name, target.value);
        }
    }

    remove = () => {
        this.props.onClick(this.props.id);
    }

    render() {
        return (
            <div className="note-instance" id={this.props.id}>
                <button onClick={this.remove} className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored remove-note">
                    <p>+</p>
                </button>
                <input className="note-title" name="title" type="text" value={this.state.title} onChange={this.updateValue} required="required" />
                <textarea name="content" id="content_input" rows="5" onChange={this.updateValue} className="note-content"
                    type="text" required="required" value={this.state.content}></textarea>
            </div>
        )
    }
}
