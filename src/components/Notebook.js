import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import CreateNote from './CreateNote';
import HandlerButton from './HandlerButton';
import Note from './Note';
import Header from './Header';
import Footer from './Footer';

import { Constants } from '../constants/constants';

import '../css/Notebook.css';

export default class App extends Component {

	constructor() {
		super();

		this.user = localStorage.getItem(Constants.localStorageKey);

		this.state = {
			userData: {
				notes: []
			}
		}
	}

	componentDidMount() {
		if (this.user === null) {
			return;
		}
		this.loadUserData();

		window.addEventListener("beforeunload", this.saveUserData)

		window.componentHandler.upgradeDom();
	}

	componentWillUnMount() {
		this.props.history.push({
			user: this.user
		});
		window.removeEventListener("beforeunload", this.saveUserData)
	}

	updateNote = (id, fieldName, fieldValue) => {
		let userData = this.state.userData;
		let notes = userData.notes;
		for (var i in notes) {
			if (notes[i].id === id) {
				notes[i][fieldName] = fieldValue;
				break;
			}
		}
		this.setState({ userData });
	}

	addNote = (note) => {
		let userData = this.state.userData;
		userData.notes.push(note);

		this.setState({ userData });
	}

	removeNote = (id) => {
		let userData = this.state.userData;
		userData.notes = userData.notes.filter(note => note.id !== id);
		this.setState({ userData });
	}

	clearNotes = () => {
		let userData = this.state.userData;
		userData.notes = [];

		this.setState({ userData });
	}

	saveUserData = () => {
		fetch(Constants.host + Constants.apiSaveUserData, {
			method: 'POST',
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userData: this.state.userData
			})
		})
	}

	loadUserData = () => {
		fetch(Constants.host + Constants.apiLoadUserData + this.user, {
			method: 'GET'
		}).then((response) => {
			response.json().then(data => {
				this.setState({ userData: data });
			});
		});
	}

	logout = () => {
		this.saveUserData();
		localStorage.removeItem(Constants.localStorageKey)
		this.props.history.push('/');
	}

	render() {
		if (this.user !== null) {
			return (
				<div>
					<Header />

					<section className="note-creation mdl-layout">
						<h3>Create new note here</h3>
						<CreateNote handleSubmit={this.addNote} />
					</section>

					<section className="controls mdl-layout">
						<HandlerButton id="clear-notes-button" content="Clear" onClick={this.clearNotes} />
						<HandlerButton id="logout-button" content="Logout" onClick={this.logout} />
					</section>

					<section className="notebook mdl-layout">
						<h3>Your notes</h3>
						<div className="notebook-container" id="notebook-container">
							{this.state.userData.notes.map(
								(note) => {
									return <Note key={note.id} id={note.id} title={note.title} content={note.content} onClick={this.removeNote} updateNote={this.updateNote} />
								}
							)}
						</div>
					</section>

					<Footer />

					<script src="../libs/material/material.min.js"></script>
				</div>
			);
		} else {
			return <Redirect to="/not-found" />
		}

	}
}