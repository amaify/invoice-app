import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import {
	toggleFilter,
	filterInvoice,
	resetInvoice,
} from "../../../store/actions/invoiceAction";

function Dropdown(props) {
	const dispatch = useDispatch();

	const deselectableRadios = (rootElement) => {
		if (!rootElement) rootElement = document;
		if (!window.radioChecked) window.radioChecked = {};
		window.radioClick = function (e) {
			const filters = e.target.parentElement.innerText;
			const obj = e.target,
				name = obj.name || "unnamed";

			if (e.keyCode) {
				return (obj.checked = e.keyCode !== 32);
			}

			if (obj.checked) {
				dispatch(filterInvoice(filters));
			}

			obj.checked = window.radioChecked[name] !== obj;

			if (!obj.checked) {
				dispatch(resetInvoice());
				dispatch(toggleFilter());
			}
			window.radioChecked[name] = obj.checked ? obj : null;
		};
		rootElement.querySelectorAll("input[type='radio']").forEach((radio) => {
			radio.setAttribute("onclick", "radioClick(event)");
			radio.setAttribute("onkeyup", "radioClick(event)");
		});
	};

	useEffect(() => {
		deselectableRadios();
		// testFunction();
	}, []);

	const OnSelectFilter = (evt) => {
		// const filters = evt.target.parentElement.innerText;
		// console.log(filters);
		// const radioBtns = document.querySelectorAll(".filter-checkbox");
		// deselectableRadios();
		// radioBtns.forEach(function (btns) {
		// 	btns.addEventListener("click", function () {
		// 		if (this.checked) {
		// 			this.onclick = () => (evt.target.checked = false);
		// 		} else {
		// 			this.onclick = null;
		// 		}
		// 	});
		// });
		// radioBtns.forEach((btns) => {
		// 	btns.addEventListener("mousedown", () => {
		// 		if (this.checked) {
		// 			this.onclick = () => {
		// 				this.checked = false;
		// 			};
		// 		} else {
		// 			this.onclick = null;
		// 		}
		// 	});
		// });
		// if (evt.target.checked) {
		// 	dispatch(filterInvoice(filters));
		// 	// dispatch(toggleFilter());
		// 	if (evt.target.parentElement.nextElementSibling) {
		// 		evt.target.parentElement.nextElementSibling.control.checked = false;
		// 	}
		// 	if (evt.target.parentElement.previousElementSibling) {
		// 		evt.target.parentElement.previousElementSibling.control.checked = false;
		// 	}
		// } else {
		// 	dispatch(resetInvoice());
		// }
	};

	// const test = () => {
	// 	const radioBtns = document.querySelectorAll(".filter-checkbox");

	// 	// console.log("this is the mousedown event listener");

	// 	for (let x = 0; x < radioBtns.length; x++) {
	// 		radioBtns[x].addEventListener("mousedown", () => {
	// 			console.log("this is mousedown event");
	// 			console.log("clicked");
	// 		});
	// 	}
	// };

	return (
		<div className={`control-filter__dropdown ${props.animateDropdown}`}>
			<label
				className="control-filter__dropdown--container"
				// onMouseDown={() => console.log("hello world")}
				onChange={OnSelectFilter}
			>
				Draft
				<input
					type="radio"
					name="radio"
					value="Draft"
					id="draft"
					// onMouseDown={() => console.log("hello world")}
					// onChange={OnSelectFilter}
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>

			<label
				className="control-filter__dropdown--container"
				onChange={OnSelectFilter}
			>
				Pending
				<input
					type="radio"
					name="radio"
					value="Pending"
					id="pending"
					// onChange={OnSelectFilter}
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>

			<label
				className="control-filter__dropdown--container"
				onChange={OnSelectFilter}
			>
				Paid
				<input
					type="radio"
					name="radio"
					value="Paid"
					id="paid"
					// onChange={OnSelectFilter}
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		filtered: state.invoiceReducer.filtered,
		filterToggled: state.invoiceReducer.dropDown,
	};
};

export default connect(mapStateToProps, null)(Dropdown);
