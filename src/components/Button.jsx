import React from 'react';

const Button = props => <div className='Button' onClick={props.action}>{props.title}</div>

export default Button;
