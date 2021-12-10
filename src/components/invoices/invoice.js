import React from "react";
import { connect } from "react-redux";

// import EmptyInvoice from "./emptyInvoice/emptyInvoice";
import Controls from "../controls/control";
import InvoiceTiles from "./invoiceTiles/invoice-tiles";

function Invoices() {
	// const { invoice } = props;
	// console.log(invoice);
	return (
		<section className="invoice">
			{/* {invoice.length < 1 ? <EmptyInvoice /> : <InvoiceTiles />} */}
			<Controls />
			<InvoiceTiles />
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		invoice: state.invoiceReducer.invoice,
	};
};

export default connect(mapStateToProps, null)(Invoices);
