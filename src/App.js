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

		const savedNotes = JSON.parse(localStorage.getItem('notes')),
			savedSettings = JSON.parse(localStorage.getItem('settings')),
			defaultNotes = [],
			defaultSettings = [{'lang': 'en', 'theme': 'default'}];

		let notes = defaultNotes,
			settings = defaultSettings;

		savedNotes !== null && savedNotes !== undefined ? notes = savedNotes : notes = defaultNotes
		savedSettings !== null && savedSettings !== undefined ? settings = savedSettings : settings = defaultSettings

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
	cancel = () => {
		this.setState({activity: 'default'});
		localStorage.setItem('newNote', '');
	};

	addNote = event => {
		event.preventDefault();
		const {notes} = this.state,
			newNote = JSON.parse(localStorage.getItem('newNote'));
		newNote['date'] = Date.now();

		this.setState({
			activity: 'default',
			notes: [...notes, newNote]
		});
		localStorage.setItem('newNote', '');
	};
	deleteNote = event => {
		const index = event.target.parentElement.getAttribute('id'),
			{notes} = this.state;
		notes.splice(index, 1);
		this.setState({notes});
	};

	setLanguage = event => {
		const {theme} = this.state;
		this.setState({lang: event.target.value});
		localStorage.setItem('settings', JSON.stringify([{'lang': event.target.value, 'theme': theme}]));
	};
	setTheme = event => {
		const {lang} = this.state;
		this.setState({theme: event.target.value});
		localStorage.setItem('settings', JSON.stringify([{'lang': lang, 'theme': event.target.value}]));
	};

	render() {
		const {activity, lang, notes, theme} = this.state;
		return (
			<div className='App' data-theme={theme}>
				<Titlebar title={activity === 'addNote' ?
					Language[lang].title_add : activity === 'settings' ?
						Language[lang].title_settings : Language[lang].title
				} />

				{activity === 'addNote' ? (
					<div className='wrapper'>
						<AddNote actions={[this.addNote, this.cancel]} lang={lang} />
					</div>
				) : (activity === 'settings' ? (
					<div className='wrapper'>
						<Settings actions={[this.setLanguage, this.setTheme, this.cancel]} lang={lang} theme={theme} />
					</div>
				) : (
					<div className='wrapper'>
						<Notes data={notes} delete={this.deleteNote} lang={lang} />
						<input className='Button NewNote' onClick={this.newNote} type='submit' value={Language[lang].button_new} />
					</div>
				))}

				{activity !== 'settings' ?
					<img alt={Language[lang].button_settings} className='Preferences' onClick={this.settings} src='/assets/icons/settings.svg' /> : null
				}
			</div>
		);
	};
};

export default App;
