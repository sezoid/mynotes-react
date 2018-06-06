import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const NoteItem = props => (
	<li className='NoteItem' id={props.index}>
		<h1 className='NoteTitle'>{props.title}</h1>
		<span className='NoteDate'>{props.date}</span>
		<p className='NoteText'>{props.text}</p>
		<CopyToClipboard text={'[' + props.date + '] ' + props.title + '\n\n' + props.text}>
			<div className='NoteCopy' title='Нажмите, чтобы скопировать запись'>Копировать</div>
		</CopyToClipboard>
		<img
			alt='Удалить запись'
			className='NoteDelete'
			onClick={props.delete}
			src='/assets/icons/cross.svg'
			title='Нажмите, чтобы удалить запись'
		/>
	</li>
);

export default NoteItem;
