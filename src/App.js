import React from 'react';

import AddNote from './components/AddNote';
import Notes from './components/Notes';
import Titlebar from './components/Titlebar';

import './App.css';
import './robotoFont.css';

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
			add: false,
			notes: initState
		};
	};

	componentDidMount() {
		this.setState({
			add: this.state.notes.length === 0 ? true : false
		});
	};

	componentDidUpdate() {
		localStorage.setItem('notes', JSON.stringify(this.state.notes));
	};

	newNote = () => {
		this.setState({add: !this.state.add});
	};

	deleteNote = event => {
		const index = event.target.parentElement.getAttribute('id');
		const {notes} = this.state;
		notes.splice(index, 1);
		this.setState({notes});
		console.log("Удалена запись: " + index);
	};

	addNote = event => {
		event.preventDefault();
		const newNote = JSON.parse(localStorage.getItem('newNote'));

		this.setState({
			add: false,
			notes: this.state.notes.concat(newNote)
		});

		localStorage.setItem('newNote', '');
	};

	cancelNote = () => {
		this.setState({add: false});
		localStorage.setItem('newNote', '');
	};

	render() {
		const {add, notes} = this.state;
		return (
			<div className='App'>
				<Titlebar title={add ? 'Новая заметка' : 'Мои заметки'} />
				{add || notes.length === 0 ? (
					<div className='wrapper'>
						<AddNote add={this.addNote} cancel={this.cancelNote} notes={notes} />
					</div>
				) : (
					<div className='wrapper'>
						<input
							className='Button NewNote'
							onClick={this.newNote}
							type='submit'
							value='Новая запись'
						/>
						<Notes data={notes} delete={this.deleteNote} />
					</div>
				)}
			</div>
		);
	};
}

export default App;
