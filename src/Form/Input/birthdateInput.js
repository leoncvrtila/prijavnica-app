import React from 'react'
import '../../assets/css/input.scss'

const birthdateInput = (props) => {

	let inputElement = null;

		if(props.elementType === 'birthdateInput'){

			inputElement = <div>
				<h4>{props.elementName}*</h4>
				<input 
				className="InputElement" 
				value={props.value}
                onChange={props.changed}
				type="date"
				min="1900-01-01"
				max="2005-01-01"
                />
			</div>

		}
	

	return(
		
	<div className="Input">
		{inputElement}
	</div>

	
	);
};

export default birthdateInput;