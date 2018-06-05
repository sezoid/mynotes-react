import React from 'react';

const Titlebar = props => (
	<header className='Header'>
		<h1 className='HeaderTitle'>{props.title}</h1>
	</header>
);

export default Titlebar;
