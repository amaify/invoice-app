import React from "react";

const Input = (props) => {
	return (
		<div className="form-elements__group" id={props.itemId}>
			{props.group && (
				<p className="form-elements__group--heading">{props.group}</p>
			)}
			{props.label && <label htmlFor={props.id}>{props.label}</label>}
			<input
				type={props.type}
				value={props.value}
				name={props.name}
				placeholder={props.placeholder}
				onChange={props.onChange}
				className={props.className}
			/>
		</div>
	);
};

export default Input;
