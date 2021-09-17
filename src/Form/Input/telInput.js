import React from 'react'
import '../../assets/css/input.scss'

const telInput = (props) => {

	let inputElement = null;

		if(props.elementType === 'telInput'){

			inputElement = <div>
				<h4>{props.elementName}*</h4>
				<input 
				className="InputElement" 
				value={props.value}
                onChange={props.changed}
                type="number"
                />
			</div>

		}
	

	return(
		
	<div className="Input">
		{inputElement}
	</div>

	
	);
};

export default telInput;