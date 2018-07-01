import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import Utils from '../utils.js';

import * as Language from '../lang.json';

const NoteItem = props => (
	<li className='NoteItem' id={props.index}>
		<h1 className='NoteTitle'>{props.title}</h1>
		<span className='NoteDate'>{Utils.Time(props.date, props.lang)}</span>
		<p className='NoteText'>{props.text}</p>
		<CopyToClipboard text={`[${Utils.Time(props.date, props.lang)}] ${props.title} \n\n ${props.text}`}>
			<div className='NoteCopy'>{Language[props.lang].button_copy}</div>
		</CopyToClipboard>
		<img alt={Language[props.lang].button_delete} className='NoteDelete' onClick={props.delete} src='/assets/icons/cross.svg' />
	</li>
);

export default NoteItem;
