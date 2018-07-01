import React from 'react';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			theme: 'default'
		};
	};

	componentDidUpdate() {
		localStorage.setItem('settings', JSON.stringify(this.state));
	};

	render() {
		return (
			<div className='Settings'>
				<label htmlFor='lang'>Язык интерфейса: </label>
				<select name='lang'>
					<option defaultValue value='en'>English</option>
					<option value='ru'>Русский</option>
				</select>
				<br />
				<label htmlFor='theme'>Тема: </label>
				<select name='theme'>
					<option defaultValue value='default'>Светлая</option>
					<option value='dark'>Темная</option>
				</select>
			</div>
		);
	};
};

export default Settings;
