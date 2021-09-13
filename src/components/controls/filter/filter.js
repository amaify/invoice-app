import React, { useState } from "react";

import Dropdown from "./dropdown";

import ArrowDown from "../../../assets/images/icon-arrow-down.svg";

function Filter() {
	let [dropDown, setDropdown] = useState(false);

	const setDropdownVisibility = () => {
		dropDown ? setDropdown(false) : setDropdown(true);
	};

	let imgClass;
	dropDown ? (imgClass = "rotate") : (imgClass = "default");

	let slide;
	dropDown ? (slide = "slide-down") : (slide = "slide-up");

	return (
		<div className="control-filter">
			<p className="control-filter__title" onClick={setDropdownVisibility}>
				<span className="control-filter__title--text">Filter by status</span>
				<span className="control-filter__title--img">
					<img src={ArrowDown} alt="Directional Arrow" className={imgClass} />
				</span>
			</p>

			{dropDown ? <Dropdown animateDropdown={slide} /> : ""}
		</div>
	);
}

export default Filter;
