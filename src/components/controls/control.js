import React from "react";
import PropTypes from "prop-types";
import { useDispatch, connect } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import Filter from "./filter/filter";
import Button from "../buttons/buttons";

import IconPlus from "../../assets/images/icon-plus.svg";
import { showForm } from "../../store/actions/formAction";
import { logoutUser } from "../../store/util/authUtility";

function Controls(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { invoiceData, invoiceStatus, filteredInvoice, filtered, isAuth } =
		props;

	const openForm = () => {
		return isAuth ? dispatch(showForm()) : history.push("/login");
		// if (isAuth) {
		// 	dispatch(showForm());
		// } else {
		// 	<Redirect to="/login" />;
		// }

		// return dispatch(showForm());
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

	if (invoiceData) {
		invoiceData.length < 2
			? (invoiceText = "invoice")
			: (invoiceText = "invoices");
	}

	if (invoiceData) {
		invoiceData.length < 2 ? (pluralText = "is") : (pluralText = "are");
	}

	if (filtered) {
		filteredInvoice.length < 2
			? (invoiceText = "invoice")
			: (invoiceText = "invoices");

		filteredInvoice.length < 2 ? (pluralText = "is") : (pluralText = "are");
	}

	const logoutHandler = () => {
		return dispatch(logoutUser());
	};

	return (
		<header className="control">
			<div className="control-header">
				<h1 className="control-header__title">Invoices</h1>
				<p className="control-header__text">
					{/* {!filtered
						? invoiceData.length < 1
							? "No Invoice"
							: `There ${pluralText} ${invoiceData.length} total ${invoiceText}`
						: `There ${pluralText} ${filteredInvoice.length} ${status} ${invoiceText}`} */}

					{isAuth
						? !filtered
							? invoiceData.length < 1
								? "No Invoice"
								: `There ${pluralText} ${invoiceData.length} total ${invoiceText}`
							: `There ${pluralText} ${filteredInvoice.length} ${status} ${invoiceText}`
						: "No Invoice"}
				</p>
			</div>

			{isAuth && <Button type="2" text="Logout" onClick={logoutHandler} />}

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
		isAuth: state.authReducer.isAuth,
	};
};

Controls.prototype = {
	invoiceData: PropTypes.array,
};

export default connect(mapStateToProps, null)(Controls);
