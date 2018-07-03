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
		const input = event.target;
		input.className === 'Title' ? this.setState({title: input.value}) : this.setState({text: input.value})
	};

	render() {
		const {actions, lang} = this.props,
			{text, title} = this.state;
		return (
			<div className='AddNote'>
				<form onSubmit={actions[0]}>
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
					/>
					<input
						className='Button Submit'
						disabled={text.length === 0 || title.length === 0 ? 'disabled' : null}
						type='submit'
						value={Language[lang].button_add}
					/>
				</form>
				<a className='Back' onClick={actions[1]}>
					<img alt={Language[lang].button_back} src='/assets/icons/back.svg' />
				</a>
			</div>
		);
	};
};

export default AddNote;
