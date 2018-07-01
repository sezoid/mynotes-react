import React from 'react';

import NoteItem from './NoteItem';

const Notes = props => (
	<ul className='Notes'>
		{props.data.map((note, index) => (
			<NoteItem
				date={note.date}
				delete={props.delete}
				lang={props.lang}
				index={index}
				key={index}
				text={note.text}
				title={note.title}
			/>
		)).reverse()}
	</ul>
);

export default Notes;
