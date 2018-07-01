import React from 'react';

import AddNote from './components/AddNote';
import Notes from './components/Notes';
import Settings from './components/Settings';
import Titlebar from './components/Titlebar';

import * as Language from './lang.json';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		const savedNotes = JSON.parse(localStorage.getItem('notes'));
		let notes = [];
		if (savedNotes !== null && savedNotes !== undefined) {
			notes = savedNotes;
		} else {
			notes = [];
		};

		this.state = {
			activity: 'settings',
			lang: 'en',
			notes: notes
		};
	};

	componentDidMount() {
		const {notes} = this.state;
		this.setState({
			activity: notes.length === 0 ? 'addNote' : 'default'
		});
	};

	componentDidUpdate() {
		const {notes} = this.state;
		localStorage.setItem('notes', JSON.stringify(notes));
	};

	newNote = () => {
		this.setState({activity: 'addNote'});
	};

	deleteNote = event => {
		const index = event.target.parentElement.getAttribute('id');
		const {notes} = this.state;
		notes.splice(index, 1);
		this.setState({notes});
	};

	addNote = event => {
		event.preventDefault();
		const {notes} = this.state;

		const newNote = JSON.parse(localStorage.getItem('newNote'));
		newNote['date'] = Date.now();

		this.setState({
			activity: 'default',
			notes: [...notes, newNote]
		});

		localStorage.setItem('newNote', '');
	};

	cancelNote = () => {
		this.setState({activity: 'default'});
		localStorage.setItem('newNote', '');
	};

	render() {
		const {activity, lang, notes} = this.state;
		return (
			<div className='App'>
				<Titlebar title={
					activity === 'addNote' ?
						Language[this.state.lang].title_add :
						(activity === 'settings' ?
							Language[this.state.lang].title_settings :
							Language[this.state.lang].title
						)
					} />
				{activity === 'addNote' || notes.length === 0 ? (
					<div className='wrapper'>
						<AddNote add={this.addNote} cancel={this.cancelNote} lang={lang} notes={notes} />
					</div>
				) : (activity === 'settings' ? (
					<div className='wrapper'>
						<Settings />
					</div>
				) : (
					<div className='wrapper'>
						<Notes data={notes} delete={this.deleteNote} lang={lang} />
						<input
							className='Button NewNote'
							onClick={this.newNote}
							type='submit'
							value={Language[this.state.lang].button_new}
						/>
					</div>
				))}
			</div>
		);
	};
}

export default App;
