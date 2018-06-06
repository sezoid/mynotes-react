import React from 'react';

import Utils from '../utils.js';

class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: Utils.Time(Date.now()),
			text: '',
			title: ''
		};
	};

	componentDidUpdate() {
		localStorage.setItem('newNote', JSON.stringify(this.state));
	};

	onChange = event => {
		const element = event.target;

		element.className === 'Title' ? (
			this.setState({
				title: element.value
			})
		) : (
			this.setState({
				text: element.value
			})
		)
	};

	render() {
		const notes = this.props.notes;
		const {text, title} = this.state;
		return (
			<div className='AddNote'>
				<form onSubmit={this.props.add}>
					<input
						autoFocus={true}
						autoComplete='off'
						className='Title'
						onChange={this.onChange}
						placeholder='Введите заголовок'
						required
						type='text'
						value={this.state.title}
					/>
					<textarea
						className='Text'
						rows='5'
						onChange={this.onChange}
						placeholder='Введите текст'
						required
						value={this.state.text}
					></textarea>
					<input
						className='Button Submit'
						disabled={text.length === 0 && title.length === 0 ? 'disabled' : null}
						type='submit'
						value='Добавить запись'
					/>
				</form>
				{notes.length !== 0 && notes !== null && notes !== undefined && notes !== [] ? (
					<a className='Back' onClick={this.props.cancel}>
						<img
							alt='Удалить запись'
							className='NoteDelete'
							src='/assets/icons/cross.svg'
							title='Нажмите, чтобы удалить запись'
						/>
					</a>
				) : (
					null
				)}

			</div>
		);
	};
};

export default AddNote;
