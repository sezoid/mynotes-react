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

		const savedSettings = JSON.parse(localStorage.getItem('settings'));
		let settings = [{'lang': 'en', 'theme': 'default'}];
		if (savedSettings !== null && savedSettings !== undefined) {
			settings = savedSettings;
		} else {
			settings = [{'lang': 'en', 'theme': 'default'}];
		};

		this.state = {
			activity: 'default',
			lang: settings[0].lang,
			notes: notes,
			theme: settings[0].theme
		};
	};

	componentDidUpdate() {
		const {notes} = this.state;
		localStorage.setItem('notes', JSON.stringify(notes));
	};

	newNote = () => {
		this.setState({activity: 'addNote'});
	};

	settings = () => {
		this.setState({activity: 'settings'});
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

	setLanguage = event => {
		const {theme} = this.state;
		localStorage.setItem('settings', JSON.stringify([{'lang': event.target.value, 'theme': theme}]));

		this.setState({lang: event.target.value});
	};

	setTheme = event => {
		const {lang} = this.state;
		localStorage.setItem('settings', JSON.stringify([{'lang': lang, 'theme': event.target.value}]));

		this.setState({theme: event.target.value});
	};

	onUpdateSettings = () => {
		const {lang, theme} = this.state;
		console.log(JSON.stringify({'lang': lang, 'theme': theme}));
		localStorage.setItem('settings', JSON.stringify([{'lang': lang, 'theme': theme}]));
	};

	render() {
		const {activity, lang, notes, theme} = this.state;
		return (
			<div className='App' data-theme={theme}>
				<Titlebar title={
					activity === 'addNote' ?
						Language[this.state.lang].title_add :
						(activity === 'settings' ?
							Language[this.state.lang].title_settings :
							Language[this.state.lang].title
						)
					} />
				{activity === 'addNote' ? (
					<div className='wrapper'>
						<AddNote
							add={this.addNote}
							cancel={this.cancelNote}
							lang={lang} notes={notes}
						/>
					</div>
				) : (activity === 'settings' ? (
					<div className='wrapper'>
						<Settings
							actions={[this.setLanguage, this.setTheme, this.onUpdateSettings]}
							cancel={this.cancelNote}
							lang={lang}
							theme={theme}
						/>
					</div>
				) : (
					<div className='wrapper'>
						<Notes
							data={notes}
							delete={this.deleteNote}
							lang={lang}
						/>
						<input
							className='Button NewNote'
							onClick={this.newNote}
							type='submit'
							value={Language[this.state.lang].button_new}
						/>
					</div>
				))}
				{activity !== 'settings' ?
					<img
						alt={Language[lang].button_settings}
						className='Preferences'
						onClick={this.settings}
						src='/assets/icons/settings.svg'
					/> : null
				}
			</div>
		);
	};
}

export default App;
