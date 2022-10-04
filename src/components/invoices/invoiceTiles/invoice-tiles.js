/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import Modal from "../../modal/modal";
import Skeleton from "../../skeleton/skeleton";
import EmptyInvoice from "../emptyInvoice/emptyInvoice";
import InvoiceLinks from "./invoice-links";
import InvoiceMobileLinks from "./invoice-links-mobile";

import { displayInvoice } from "../../../store/util/invoiceUtility";

function InvoiceTiles({
	invoiceData,

	loading,
	isAuth,
	showModal,
	token,
}) {
	const dispatch = useDispatch();

	useEffect(() => {
		return isAuth ? dispatch(displayInvoice(token)) : null;
	}, []);

	return (
		<>
			<div className="invoice-tiles">
				{!loading ? (
					isAuth ? (
						invoiceData.length !== 0 ? (
							<div>
								<InvoiceLinks invoiceData={invoiceData} />
								<InvoiceMobileLinks invoiceData={invoiceData} />
							</div>
						) : (
							<EmptyInvoice />
						)
					) : (
						<EmptyInvoice />
					)
				) : (
					<Skeleton />
				)}
			</div>
			{showModal && <Modal />}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		invoiceData: state.invoiceReducer.invoice,
		filteredInvoice: state.invoiceReducer.filteredInvoice,
		filtered: state.invoiceReducer.filtered,
		loading: state.invoiceReducer.loading,
		showModal: state.invoiceReducer.showModal,
		isAuth: state.authReducer.isAuth,
		token: state.authReducer.token,
	};
};

export default connect(mapStateToProps, null)(InvoiceTiles);
