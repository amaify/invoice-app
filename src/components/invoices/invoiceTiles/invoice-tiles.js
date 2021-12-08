import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { Link } from "react-router-dom";

import data from "../data.json";
import Modal from "../../modal/modal";
import ArrowRight from "../../../assets/images/icon-arrow-right.svg";
import Skeleton from "../../skeleton/skeleton";
import EmptyInvoice from "../emptyInvoice/emptyInvoice";
import InvoiceLinks from "./invoice-links";
import InvoiceMobileLinks from "./invoice-links-mobile";
import { parseDate } from "../../util/utility";
import { getInvoice } from "../../../store/actions/invoiceAction";
import { toggleRoute } from "../../../store/actions/routeAction";
import { displayInvoice } from "../../../store/util/invoiceUtility";

function InvoiceTiles({
	invoiceData,
	filteredInvoice,
	filtered,
	loading,
	isAuth,
	showModal,
}) {
	const dispatch = useDispatch();
	// const { invoiceData } = props;
	let invoiceX;

	useEffect(() => {
		// dispatch(getInvoice(data));
		// fetch("http://localhost:8080/invoice/invoice", {
		// 	method: "GET",
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		if (data.statusCode === 200) {
		// 			dispatch(getInvoice(data.invoice));
		// 			console.log(data);
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
		return isAuth ? dispatch(displayInvoice()) : null;
	}, []);

	// const [invoice, setInvoice] = useState([]);

	// useEffect(() => {
	// 	// setInvoice(data);
	// 	// dispatch(getInvoice(data));
	// 	dispatch(displayInvoice());
	// }, []);

	// const onToggleRoute = () => {
	// 	return dispatch(toggleRoute());
	// };

	// filtered ? (invoiceX = filteredInvoice) : (invoiceX = invoiceData);

	// const items = invoiceData.map((item) => {
	// 	let classList;

	// 	if (item.status.toLowerCase() === "pending") {
	// 		classList =
	// 			"invoice-tiles__content--status invoice-tiles__content--status-pending";
	// 	} else if (item.status.toLowerCase() === "draft") {
	// 		classList =
	// 			"invoice-tiles__content--status invoice-tiles__content--status-draft";
	// 	} else {
	// 		classList =
	// 			"invoice-tiles__content--status invoice-tiles__content--status-paid";
	// 	}

	// 	// console.log(classList);
	// 	return (
	// 		<Link
	// 			className="invoice-tiles__content"
	// 			key={item.id}
	// 			// to="/details"
	// 			to={{ pathname: `/details/${item.id}`, state: { invoiceItem: item } }}
	// 			// onClick={onToggleRoute}
	// 		>
	// 			<p className="invoice-tiles__content--id">
	// 				<span>#</span>
	// 				{item.id}
	// 			</p>

	// 			<p className="invoice-tiles__content--payment-due">
	// 				<span>Due</span> {parseDate(item.paymentDue)}
	// 			</p>

	// 			<p className="invoice-tiles__content--client-name">
	// 				{item.clientName === "" ? "No Information" : item.clientName}
	// 			</p>

	// 			<p className="invoice-tiles__content--total-amount">
	// 				<span>&#163;</span> {!item.total ? "0" : item.total.toFixed(2)}
	// 			</p>

	// 			<div className={classList}>
	// 				<p>
	// 					<span></span>
	// 					<span>{item.status}</span>
	// 				</p>
	// 			</div>

	// 			<img src={ArrowRight} alt="Arrow facing right" />
	// 		</Link>
	// 	);
	// });

	// console.log(invoiceData);

	return (
		// <div className="invoice-tiles">{!props.loading ? items : <Skeleton />}</div>
		<div className="invoice-tiles">
			{/* {!props.loading ? (
				invoiceData.length !== 0 ? (
					<InvoiceLinks />
				) : (
					<EmptyInvoice />
				)
			) : (
				<Skeleton />
			)} */}

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

			{/* {invoiceItems} */}

			{showModal && <Modal />}
		</div>
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
	};
};

// export { InvoiceTiles as InvoiceTilesUnwrapped };

export default connect(mapStateToProps, null)(InvoiceTiles);
