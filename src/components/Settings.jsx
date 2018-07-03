import React from 'react';

import * as Language from '../lang.json';

const Settings = props => (
	<div className='Settings'>
		<ul className='card'>
			<li>
				<label htmlFor='lang'>{Language[props.lang].settings_lang}</label>
				<select name='lang' onChange={props.actions[0]} value={props.lang}>
					<option value='en'>English</option>
					<option value='ru'>Русский</option>
				</select>
			</li>
			<li>
				<label htmlFor='theme'>{Language[props.lang].settings_theme}</label>
				<select name='theme' onChange={props.actions[1]} value={props.theme}>
					<option value='default'>{Language[props.lang].settings_themes[0]}</option>
					<option value='dark'>{Language[props.lang].settings_themes[1]}</option>
				</select>
			</li>
		</ul>
		<a className='Back' onClick={props.actions[2]}>
			<img alt={Language[props.lang].button_back} src='/assets/icons/back.svg' />
		</a>
	</div>
);

export default Settings;
