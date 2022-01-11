import React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ArrowRight from "../../../assets/images/icon-arrow-right.svg";

import { parseDate } from "../../util/utility";

function InvoiceLinks(props) {
	let classList, invoiceX;

	props.filtered
		? (invoiceX = props.filteredInvoice)
		: (invoiceX = props.invoiceData);

	let tiles;

	if (props.invoiceData) {
		tiles = invoiceX.map((item) => {
			if (item.status.toLowerCase() === "pending") {
				classList =
					"invoice-tiles__content--status invoice-tiles__content--status-pending";
			} else if (item.status.toLowerCase() === "draft") {
				classList =
					"invoice-tiles__content--status invoice-tiles__content--status-draft";
			} else {
				classList =
					"invoice-tiles__content--status invoice-tiles__content--status-paid";
			}

			return (
				<Link
					className="invoice-tiles__content invoice-tiles__content-desktop"
					key={item.id}
					// to="/details"
					to={{
						pathname: `/details/${item.id}`,
						state: { invoiceItem: item },
					}}
					// onClick={onToggleRoute}
					data-testid="invoices"
				>
					<p className="invoice-tiles__content--id">
						<span>#</span>
						{item.id}
					</p>

					<p className="invoice-tiles__content--payment-due">
						<span>Due</span> {parseDate(item.paymentDue)}
					</p>

					<p className="invoice-tiles__content--client-name">
						{item.clientName === "" ? "No Information" : item.clientName}
					</p>

					<p
						className="invoice-tiles__content--total-amount"
						data-testid="totalAmount"
					>
						<span>&#163;</span> {item.total}
					</p>

					<div className={classList}>
						<p>
							<span></span>
							<span>{item.status}</span>
						</p>
					</div>

					<img src={ArrowRight} alt="Arrow facing right" />
				</Link>
			);
		});
	}

	return tiles;
}

const mapStateToProps = (state) => {
	return {
		// invoiceArray: state.invoiceReducer.invoice,
		filteredInvoice: state.invoiceReducer.filteredInvoice,
		filtered: state.invoiceReducer.filtered,
		loading: state.invoiceReducer.loading,
	};
};

export default connect(mapStateToProps, null)(InvoiceLinks);
