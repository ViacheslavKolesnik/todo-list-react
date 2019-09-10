import React, { Component } from 'react';
import '../css/App.css';
import CreateNote from './CreateNote';
import HandlerButton from './HandlerButton';
import Note from './Note';

class App extends Component {
	state = {
		notes: [],
		createNoteTitle: '',
		createNoteContent: ''
	}

	componentWillMount() {

	}

	componentWillUnMount() {

	}

	addNote = () => {
		let notes = this.state.notes;
		notes.push({
			title: this.state.createNoteTitle,
			content: this.state.createNoteContent
		})

		this.setState({notes})
	}

	createNoteTitleChange = (title) => {
		this.setState({
			createNoteTitle: title
		})
	}

	createNoteContentChange = (content) => {
		this.setState({
			createNoteContent: content
		})
	}

	generateUUID() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g,
            (c, r) => (
                'x' == c ? (r = Math.random() * 16 | 0) : (r & 0x3 | 0x8)
            ).toString(16)
        );
	}

	render() {
		return (
			<div>
				<header className="mdl-layout__header">
					<h2>Best notebook ever!</h2>
				</header>

				<section className="note-creation mdl-layout">
					<h3>Create new note here.</h3>
					<CreateNote onTitleChange={this.createNoteTitleChange} onContentChange={this.createNoteContentChange} />
				</section>

				<section className="controls mdl-layout">
					<HandlerButton id="add-note-button" content="Add" onClick={this.addNote}/>
					<HandlerButton id="clear-notes-button" content="Clear" />
				</section>

				<section className="notebook mdl-layout">
					<h3>Your notes.</h3>
					<div className="notebook-container" id="notebook-container">
						{this.state.notes.map(
							(note) => {
								return <Note title={note.title} content={note.content}/>
							}
						)}
					</div>
				</section>

				<footer className="mdl-mega-footer">
					<p className="rights">2019 © All rights reserved.</p>
				</footer>
			</div>
		);
	}
}

export default App;
