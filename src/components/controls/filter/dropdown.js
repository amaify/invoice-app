import React from "react";

function Dropdown({ animateDropdown }) {
	return (
		<div className={`control-filter__dropdown ${animateDropdown}`}>
			<label className="control-filter__dropdown--container">
				Draft
				<input type="checkbox" />
				<span className="checkmark"></span>
			</label>

			<label className="control-filter__dropdown--container">
				Pending
				<input type="checkbox" />
				<span className="checkmark"></span>
			</label>

			<label className="control-filter__dropdown--container">
				Paid
				<input type="checkbox" />
				<span className="checkmark"></span>
			</label>
		</div>
	);
}

export default Dropdown;
