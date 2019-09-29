import React, { Component } from 'react';
import '../css/App.css';
import CreateNote from './CreateNote';
import HandlerButton from './HandlerButton';
import Note from './Note';

class App extends Component {

	host = "http://localhost:3002/"
	apiSaveNotes = "save-notes";
	apiLoadNotes = "get-notes?user=";
	user = "defaultUser";

	state = {
		notes: []
	}

	componentDidMount() {
		this.loadNotes();
		window.addEventListener("beforeunload", this.saveNotes)
	}

	componentWillUnMount() {
		window.removeEventListener("beforeunload", this.saveNotes)
	}

	addNote = (note) => {
		let notes = this.state.notes;
		notes.push(note);

		this.setState({ notes });
	}

	removeNote = (id) => {
		let notes = this.state.notes.filter(note => note.id !== id);
		this.setState({ notes });
	}

	clearNotes = () => {
		this.setState({ notes: [] });
	}

	saveNotes = () => {
		fetch(this.host + this.apiSaveNotes, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				user: this.user,
				data: this.state.notes
			})
		})
	}

	loadNotes = () => {
		fetch(this.host + this.apiLoadNotes + this.user, {
			method: 'GET'
		}).then((response) => {
			response.json().then(data => {
				this.setState({ notes: data });
			})
		});
	}

	render() {
		return (
			<div>
				<header className="mdl-layout__header">
					<h2>Best notebook ever!</h2>
				</header>

				<section className="note-creation mdl-layout">
					<h3>Create new note here.</h3>
					<CreateNote handleSubmit={this.addNote} />
				</section>

				<section className="controls mdl-layout">
					<HandlerButton id="clear-notes-button" content="Clear" onClick={this.clearNotes} />
				</section>

				<section className="notebook mdl-layout">
					<h3>Your notes.</h3>
					<div className="notebook-container" id="notebook-container">
						{this.state.notes.map(
							(note) => {
								return <Note key={note.id} id={note.id} title={note.title} content={note.content} onClick={this.removeNote} />
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
