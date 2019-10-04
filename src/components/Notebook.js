import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import CreateNote from './CreateNote';
import HandlerButton from './HandlerButton';
import Note from './Note';
import Header from './Header';
import Footer from './Footer';

import '../css/Notebook.css';

export default class App extends Component {


	host = "http://localhost:3002/"
	apiSaveUserData = "save-user-data";
	apiLoadUserData = "get-user-data?user=";
	apiCheckUserData = "check-user-data-exists?user=";
	user = "defaultUser";

	state = {
		userData: {
			notes: []
		}
	}

	componentDidMount() {
		this.loadUserData();
		window.addEventListener("beforeunload", this.saveUserData);
		window.componentHandler.upgradeDom();
	}

	componentWillUnMount() {
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
		fetch(this.host + this.apiSaveUserData, {
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
		fetch(this.host + this.apiLoadUserData + this.user, {
			method: 'GET'
		}).then((response) => {
			response.json().then(data => {
				this.setState({ userData: data });
			});
		});
	}

	checkUserData = () => {
		let userDataExists = false;

		fetch(this.host + this.apiCheckUserData + this.user, {
			method: 'GET'
		}).then((response) => {
			userDataExists = response.status === 200
		});

		return userDataExists;
	}

	logout = () => {
		this.saveUserData();
		this.props.history.push('/');
	}

	render() {
		const { params } = this.props.match;
		this.user = params.user;

		if (this.checkUserData()) {
			return (
				<div>
					<Header />

					<section className="note-creation mdl-layout">
						<h3>Create new note here.</h3>
						<CreateNote handleSubmit={this.addNote} />
					</section>

					<section className="controls mdl-layout">
						<HandlerButton id="clear-notes-button" content="Clear" onClick={this.clearNotes} />
						<HandlerButton id="logout-button" content="Logout" onClick={this.logout} />
					</section>

					<section className="notebook mdl-layout">
						<h3>Your notes.</h3>
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
			return(<Redirect to="/not-found"/>);
		}
	}
}