import React, { Component } from 'react'

export default class CreateNote extends Component {
    onTitleChange = (e) => {
        this.props.onTitleChange(e.target.value)
    }

    onContentChange = (e) => {
        this.props.onContentChange(e.target.value)
    }

    render() {
        return (
            <div className="note-instance">
                <div className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className = "mdl-textfield__input" type = "text" required="required" id = "title_input" onChange={this.onTitleChange}></input>
                    <label className = "mdl-textfield__label" for = "title_input">Title</label>
                </div>
                <div className = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <textarea className = "mdl-textfield__input" type = "text" required="required" id = "content_input" rows="5" onChange={this.onContentChange}></textarea>
                    <label className = "mdl-textfield__label" for = "content_input">Content</label>
                </div>
            </div>
        )
    }
}
