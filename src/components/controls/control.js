import React from "react";
import { useDispatch, connect } from "react-redux";

import Filter from "./filter/filter";
import Button from "../buttons/buttons";

import IconPlus from "../../assets/images/icon-plus.svg";
import { showForm } from "../../store/actions/formAction";

function Controls(props) {
	const dispatch = useDispatch();
	const { invoiceData, invoiceStatus, filteredInvoice, filtered } = props;
	const openForm = () => {
		return dispatch(showForm());
	};

	let status, invoiceText, pluralText;

	if (invoiceStatus !== "") {
		if (invoiceStatus === "Draft") {
			status = "Draft";
		}

		if (invoiceStatus === "Pending") {
			status = "Pending";
		}

		if (invoiceStatus === "Paid") {
			status = "Paid";
		}
	}

	invoiceData.length < 2
		? (invoiceText = "invoice")
		: (invoiceText = "invoices");

	invoiceData.length < 2 ? (pluralText = "is") : (pluralText = "are");

	if (filtered) {
		filteredInvoice.length < 2
			? (invoiceText = "invoice")
			: (invoiceText = "invoices");

		filteredInvoice.length < 2 ? (pluralText = "is") : (pluralText = "are");
	}

	return (
		<header className="control">
			<div className="control-header">
				<h1 className="control-header__title">Invoices</h1>
				<p className="control-header__text">
					{!filtered
						? invoiceData.length < 1
							? "No Invoice"
							: `There ${pluralText} ${invoiceData.length} total ${invoiceText}`
						: `There ${pluralText} ${filteredInvoice.length} ${status} ${invoiceText}`}
				</p>
			</div>

			<Filter />
			<Button
				type="1"
				text="New Invoice"
				icon={<img src={IconPlus} alt="Plus Icon" />}
				onClick={openForm}
			/>
		</header>
	);
}

const mapStateToProps = (state) => {
	return {
		invoiceData: state.invoiceReducer.invoice,
		invoiceStatus: state.invoiceReducer.status,
		filteredInvoice: state.invoiceReducer.filteredInvoice,
		filtered: state.invoiceReducer.filtered,
	};
};

export default connect(mapStateToProps, null)(Controls);
