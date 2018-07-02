import React from 'react';

import * as Language from '../lang.json';

class AddNote extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			date: '',
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
		const {cancel, lang, notes} = this.props;
		const {text, title} = this.state;
		return (
			<div className='AddNote'>
				<form onSubmit={this.props.add}>
					<input
						autoFocus={true}
						autoComplete='off'
						className='Title'
						onChange={this.onChange}
						placeholder={Language[lang].label_title}
						required
						type='text'
						value={title}
					/>
					<textarea
						className='Text'
						rows='5'
						onChange={this.onChange}
						placeholder={Language[lang].label_text}
						required
						value={text}
					></textarea>
					<input
						className='Button Submit'
						disabled={text.length === 0 || title.length === 0 ? 'disabled' : null}
						type='submit'
						value={Language[lang].button_add}
					/>
				</form>
				{notes.length !== 0 && notes !== null && notes !== undefined && notes !== [] ? (
					<a className='Back' onClick={cancel}>
						<img alt={Language[lang].button_back} src='/assets/icons/back.svg' />
					</a>
				) : (
					null
				)}

			</div>
		);
	};
};

export default AddNote;
