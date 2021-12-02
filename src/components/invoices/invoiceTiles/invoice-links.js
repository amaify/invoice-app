import React from "react";

import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";

import data from "../data.json";
import Modal from "../../modal/modal";
import ArrowRight from "../../../assets/images/icon-arrow-right.svg";
import Skeleton from "../../skeleton/skeleton";
import EmptyInvoice from "../emptyInvoice/emptyInvoice";
import { parseDate } from "../../util/utility";

function InvoiceLinks(props) {
	// let invoiceData;
	let items, classList, invoiceX;

	// console.log(props.invoiceData);

	const { filtered, invoiceArray, filteredInvoice } = props;

	props.filtered
		? (invoiceX = props.filteredInvoice)
		: (invoiceX = props.invoiceData);

	// console.log(invoiceX);

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
					className="invoice-tiles__content"
					key={item.id}
					// to="/details"
					to={{ pathname: `/details/${item.id}`, state: { invoiceItem: item } }}
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

					<p className="invoice-tiles__content--total-amount">
						<span>&#163;</span> {!item.total ? "0" : item.total}
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

	// return (
	// 	<div className="testing invoice">
	// 		{invoiceX
	// 			? invoiceX.map((item) => (
	// 					<Link
	// 						className="invoice-tiles__content"
	// 						key={item.id}
	// 						// to="/details"
	// 						to={{
	// 							pathname: `/details/${item.id}`,
	// 							state: { invoiceItem: item },
	// 						}}
	// 						// onClick={onToggleRoute}
	// 						data-testid="invoices"
	// 					>
	// 						<p className="invoice-tiles__content--id">
	// 							<span>#</span>
	// 							{item.id}
	// 						</p>

	// 						<p className="invoice-tiles__content--payment-due">
	// 							<span>Due</span> {parseDate(item.paymentDue)}
	// 						</p>

	// 						<p className="invoice-tiles__content--client-name">
	// 							{item.clientName === "" ? "No Information" : item.clientName}
	// 						</p>

	// 						<p className="invoice-tiles__content--total-amount">
	// 							<span>&#163;</span> {!item.total ? "0" : item.total}
	// 						</p>

	// 						<div className={classList}>
	// 							<p>
	// 								<span></span>
	// 								<span>{item.status}</span>
	// 							</p>
	// 						</div>

	// 						<img src={ArrowRight} alt="Arrow facing right" />
	// 					</Link>
	// 			  ))
	// 			: null}
	// 	</div>
	// );
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
