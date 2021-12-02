import React from "react";

function Button(props) {
	return (
		<button
			className={`button button-${props.type}`}
			onClick={props.onClick}
			data-testid={props.dataTestid}
		>
			{props.icon && <span className="button-image">{props.icon}</span>}
			<span className="button-text">{props.text}</span>
		</button>
	);
}

export default Button;
