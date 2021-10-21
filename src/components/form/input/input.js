import React from "react";

const Input = (props) => {
	return (
		<div className="form-elements__group" id={props.itemId}>
			{props.group && (
				<p className="form-elements__group--heading">{props.group}</p>
			)}
			{/* {props.label && <label htmlFor={props.id}>{props.label}</label>} */}
			{props.label && (
				<label
					htmlFor={props.id}
					className={props.error === "" ? "" : "label-error"}
				>
					{props.label}
				</label>
			)}
			{/* <div className="form-elements__group--main"> */}
			{/* <p className="form-elements__group--main-error">Can't be empty</p> */}
			<input
				type={props.type}
				defaultValue={props.value}
				name={props.name}
				placeholder={props.placeholder}
				onChange={props.onChange}
				onBlur={props.onBlur}
				className={props.className}
			/>
			{/* </div> */}
		</div>
	);
};

export default Input;
