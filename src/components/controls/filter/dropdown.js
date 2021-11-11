import React from "react";
import { useDispatch, connect } from "react-redux";
import {
	toggleFilter,
	filterInvoice,
	resetInvoice,
} from "../../../store/actions/invoiceAction";

function Dropdown(props) {
	const dispatch = useDispatch();

	const OnSelectFilter = (evt) => {
		const filters = evt.target.parentElement.innerText;

		if (evt.target.checked) {
			dispatch(filterInvoice(filters));
			dispatch(toggleFilter());
			if (evt.target.parentElement.nextElementSibling) {
				evt.target.parentElement.nextElementSibling.control.checked = false;
			}

			if (evt.target.parentElement.previousElementSibling) {
				evt.target.parentElement.previousElementSibling.control.checked = false;
			}
		} else {
			dispatch(resetInvoice());
		}
	};

	return (
		<div className={`control-filter__dropdown ${props.animateDropdown}`}>
			<label className="control-filter__dropdown--container">
				Draft
				<input
					type="checkbox"
					onChange={OnSelectFilter}
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>

			<label className="control-filter__dropdown--container">
				Pending
				<input
					type="checkbox"
					onChange={OnSelectFilter}
					className="filter-checkbox"
				/>
				<span className="checkmark"></span>
			</label>

			<label className="control-filter__dropdown--container">
				Paid
				<input
					type="checkbox"
					onChange={OnSelectFilter}
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
