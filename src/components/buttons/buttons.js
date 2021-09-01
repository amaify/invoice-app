import React from "react";

import IconPlus from "../../assets/images/icon-plus.svg";

function Button(props) {
	return (
		<button className={`button button-${props.type}`}>
			<span className="button-image">{props.icon}</span>
			<span className="button-text">{props.text}</span>
		</button>
	);
}

export default Button;
