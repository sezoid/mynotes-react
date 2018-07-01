import React from 'react';

import AddNote from './components/AddNote';
import Notes from './components/Notes';
import Settings from './components/Settings';
import Titlebar from './components/Titlebar';

import Utils from './utils.js';

import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		const notes = JSON.parse(localStorage.getItem('notes'));
		let initState = [];
		if (notes !== null && notes !== undefined) {
			initState = notes;
		} else {
			initState = [];
		};

		this.state = {
			activity: 'settings',
			notes: initState
		};
	};

	componentDidMount() {
		const {notes} = this.state;
		this.setState({
			activity: notes.length === 0 ? 'addNote' : 'default'
		});
	};

	componentDidUpdate() {
		localStorage.setItem('notes', JSON.stringify(this.state.notes));
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

		newNote['date'] = Utils.Time(Date.now());

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
		const {activity, notes} = this.state;
		return (
			<div className='App'>
				<Titlebar title={activity === 'default' ? 'Мои заметки' : (activity === 'settings' ? 'Настройки' : 'Мои заметки')} />
				{activity === 'addNote' || notes.length === 0 ? (
					<div className='wrapper'>
						<AddNote add={this.addNote} cancel={this.cancelNote} notes={notes} />
					</div>
				) : (activity === 'settings' ? (
					<div className='wrapper'>
						<Settings />
					</div>
				) : (
					<div className='wrapper'>
						<Notes data={notes} delete={this.deleteNote} />
						<input
							className='Button NewNote'
							onClick={this.newNote}
							type='submit'
							value='Новая запись'
						/>
					</div>
				))}
			</div>
		);
	};
}

export default App;
