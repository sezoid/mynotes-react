import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import NoteDelete from './NoteDelete';

const NoteItem = props => (
	<li className='NoteItem' index={props.index}>
		<h1 className='NoteTitle'>{props.title}</h1>
		<span className='NoteDate'>{props.date}</span>
		<p className='NoteText'>{props.text}</p>
		<CopyToClipboard text={'[' + props.date + '] ' + props.title + '\n\n' + props.text}>
			<div className='NoteCopy' title='Нажмите, чтобы скопировать запись'>Копировать</div>
		</CopyToClipboard>
		<NoteDelete action={props.delete} />
	</li>
);

export default NoteItem;
