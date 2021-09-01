import React from "react";

import ArrowDown from "../../../assets/images/icon-arrow-down.svg";

function Filter() {
	return (
		<div className="control-filter">
			<p className="control-filter__title">
				<span className="control-filter__title--text">Filter by status</span>
				<span className="control-filter__title--img">
					<img src={ArrowDown} alt="Directional Arrow" />
				</span>
			</p>
		</div>
	);
}

export default Filter;
