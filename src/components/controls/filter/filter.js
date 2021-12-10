import React from "react";
import { useDispatch, connect } from "react-redux";
import Dropdown from "./dropdown";

import ArrowDown from "../../../assets/images/icon-arrow-down.svg";
import { toggleFilter } from "../../../store/actions/invoiceAction";

function Filter(props) {
	const dispatch = useDispatch();
	// let [dropDown, setDropdown] = useState(false);

	const setDropdownVisibility = () => {
		// dropDown ? setDropdown(false) : setDropdown(true);
		dispatch(toggleFilter());
	};

	let imgClass;
	props.dropDown ? (imgClass = "rotate") : (imgClass = "default");

	let slide;
	props.dropDown ? (slide = "slide-down") : (slide = "slide-up");

	return (
		<div className="control-filter">
			<p className="control-filter__title" onClick={setDropdownVisibility}>
				<span className="control-filter__title--text control-filter__title--text-mobile">
					Filter
				</span>
				<span className="control-filter__title--text control-filter__title--text-desktop">
					Filter by status
				</span>
				{/* <span className="control-filter__title--img">
					<img src={ArrowDown} alt="Directional Arrow" className={imgClass} />
				</span> */}
			</p>
			<picture className="control-filter__title--img">
				<img src={ArrowDown} alt="Directional Arrow" className={imgClass} />
			</picture>

			{/* {props.dropDown ? <Dropdown animateDropdown={slide} /> : ""} */}
			<Dropdown animateDropdown={slide} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		dropDown: state.invoiceReducer.dropDown,
	};
};

export default connect(mapStateToProps, null)(Filter);
