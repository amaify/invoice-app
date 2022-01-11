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
				// dispatch(toggleFilter());
			}

			obj.checked = window.radioChecked[name] !== obj;

			if (!obj.checked) {
				dispatch(resetInvoice());
				// dispatch(toggleFilter());
			}
			window.radioChecked[name] = obj.checked ? obj : null;
			dispatch(toggleFilter());
		};
		rootElement.querySelectorAll("input[type='radio']").forEach((radio) => {
			radio.setAttribute("onclick", "radioClick(event)");
			radio.setAttribute("onkeyup", "radioClick(event)");
		});
	};

	useEffect(() => {
		deselectableRadios();
	}, []);

	return (
		<div className={`control-filter__dropdown ${props.animateDropdown}`}>
			<label
				className="control-filter__dropdown--container"
				// onChange={OnSelectFilter}
			>
				Draft
				<input
					type="radio"
					name="radio"
					value="Draft"
					id="draft"
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>

			<label
				className="control-filter__dropdown--container"
				// onChange={OnSelectFilter}
			>
				Pending
				<input
					type="radio"
					name="radio"
					value="Pending"
					id="pending"
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>

			<label
				className="control-filter__dropdown--container"
				// onChange={OnSelectFilter}
			>
				Paid
				<input
					type="radio"
					name="radio"
					value="Paid"
					id="paid"
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
