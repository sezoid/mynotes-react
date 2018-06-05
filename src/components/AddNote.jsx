import React from 'react';

import Utils from '../utils.js';

class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: this.props.notes,
			date: Utils.Time(Date.now()),
			text: '',
			title: ''
		};
	};

	componentDidUpdate() {
		const {date, text, title} = this.state;
		localStorage.setItem('newNote', JSON.stringify({date, text, title}));
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
		const {notes, text, title} = this.state;
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
						className='Submit'
						disabled={text.length === 0 && title.length === 0 ? 'disabled' : null}
						required
						type='submit'
						value='Добавить запись'
					/>
				</form>
				{notes.length !== 0 && notes !== null && notes !== undefined && notes !== [] ? (
					<a className='Back' onClick={this.props.cancel}>
						<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
							<path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'/>
							<path d='M0 0h24v24H0z' fill='none'/>
						</svg>
					</a>
				) : (
					null
				)}

			</div>
		);
	};
};

export default AddNote;
