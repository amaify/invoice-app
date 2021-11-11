import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";

import data from "../data.json";
import ArrowRight from "../../../assets/images/icon-arrow-right.svg";
import { parseDate } from "../../util/utility";
import { getInvoice } from "../../../store/actions/invoiceAction";
import { toggleRoute } from "../../../store/actions/routeAction";

function InvoiceTiles(props) {
	const dispatch = useDispatch();
	// const { invoiceData } = props;
	let invoiceData;

	// const [invoice, setInvoice] = useState([]);

	useEffect(() => {
		// setInvoice(data);
		dispatch(getInvoice(data));
	}, []);

	const onToggleRoute = () => {
		return dispatch(toggleRoute());
	};

	props.filtered
		? (invoiceData = props.filteredInvoice)
		: (invoiceData = props.invoiceData);

	// console.log(invoice);

	const items = invoiceData.map((item) => {
		let classList;

		if (item.status === "pending") {
			classList =
				"invoice-tiles__content--status invoice-tiles__content--status-pending";
		} else if (item.status === "draft") {
			classList =
				"invoice-tiles__content--status invoice-tiles__content--status-draft";
		} else {
			classList =
				"invoice-tiles__content--status invoice-tiles__content--status-paid";
		}

		// console.log(classList);
		return (
			<Link
				className="invoice-tiles__content"
				key={item.id}
				// to="/details"
				to={{ pathname: `/details/${item.id}`, state: { invoiceItem: item } }}
				onClick={onToggleRoute}
			>
				<p className="invoice-tiles__content--id">
					<span>#</span>
					{item.id}
				</p>

				<p className="invoice-tiles__content--payment-due">
					<span>Due</span> {parseDate(item.paymentDue)}
				</p>

				<p className="invoice-tiles__content--client-name">{item.clientName}</p>

				<p className="invoice-tiles__content--total-amount">
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

	return <div className="invoice-tiles">{items}</div>;
}

const mapStateToProps = (state) => {
	return {
		invoiceData: state.invoiceReducer.invoice,
		filteredInvoice: state.invoiceReducer.filteredInvoice,
		filtered: state.invoiceReducer.filtered,
	};
};

export default connect(mapStateToProps, null)(InvoiceTiles);
