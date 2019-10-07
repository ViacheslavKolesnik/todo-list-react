import '../libs/material/material.min.css';
import '../libs/material/material.min.js';
import React, { Component } from 'react'

export default class CreateNote extends Component {

    state = {
        id: [],
        title: '',
        content: ''
    }

    onChange = (e) => {
        let target = e.target;
        this.setState({
            [target.name]: target.value
        });
    }

    onTextAreaChange = (e) => {
        let textarea = e.target;
        let pattern = new RegExp(/^(?!\s*$).+/);
        let isValid = pattern.test(textarea.value)

        textarea.setCustomValidity(isValid ? "" : "Please match the requested format.");

        isValid ?
            textarea.parentElement.classList.remove(window.MaterialTextfield.prototype.CssClasses_.IS_INVALID) :
            textarea.parentElement.classList.add(window.MaterialTextfield.prototype.CssClasses_.IS_INVALID);

        this.setState({
            [textarea.name]: textarea.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.handleSubmit(
            {
                id: this.generateUUID(),
                title: this.state.title,
                content: this.state.content
            }
        );
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
            .replace(/[xy]/g,
                (c, r) => (
                    'x' === c ? (r = Math.random() * 16 | 0) : ((r & 0x3) | 0x8)
                ).toString(16)
            );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="note-instance">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input name="title" id="title_input" onChange={this.onChange} className="mdl-textfield__input"
                        type="text" required="required" pattern="^(?!\s*$).+"></input>
                    <label className="mdl-textfield__label" htmlFor="title_input">Title</label>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <textarea name="content" id="content_input" rows="5" onChange={this.onTextAreaChange} className="mdl-textfield__input"
                        type="text" required="required" ></textarea>
                    <label className="mdl-textfield__label" htmlFor="content_input">Content</label>
                </div>
                <input id="add-note-button" type="submit" value="Add"
                    className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" />
            </form>
        )
    }
}
