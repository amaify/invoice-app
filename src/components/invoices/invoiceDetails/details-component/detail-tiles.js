import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";

import { Link } from "react-router-dom";
import ArrowLeft from "../../../../assets/images/icon-arrow-left.svg";
import { editForm, showForm } from "../../../../store/actions/formAction";
import {
	deleteInvoice,
	setToPaid,
} from "../../../../store/actions/invoiceControls";
import { toggleRoute } from "../../../../store/actions/routeAction";
import Button from "../../../buttons/buttons";

function DetailsTiles(props) {
	const dispatch = useDispatch();

	const { data, invoice } = props;
	const [paid, setPaid] = useState(data.status);

	const onRouteToggle = () => {
		return dispatch(toggleRoute());
	};

	const setInvoiceToPaid = () => {
		return invoice.map((inv) => {
			if (inv.id === data.id) {
				inv.status = "paid";
				setPaid(inv.status);
				dispatch(setToPaid(data));
			}
		});
	};

	const onDeleteInvoice = () => {
		return dispatch(deleteInvoice(data));
	};

	const onEditInvoice = () => {
		dispatch(editForm(data));
		dispatch(showForm());
	};

	let statusClass;

	if (data.status === "pending") {
		statusClass =
			"details-tiles__tile--status-status details-tiles__tile--status-status__pending";
	} else if (data.status === "draft") {
		statusClass =
			"details-tiles__tile--status-status details-tiles__tile--status-status__draft";
	} else {
		statusClass =
			"details-tiles__tile--status-status details-tiles__tile--status-status__paid";
	}

	return (
		<div className="details-tiles">
			<div className="details-tiles__link" onClick={onRouteToggle}>
				<img src={ArrowLeft} alt="Arrow pointing left" />
				<Link to="/">Go back</Link>
			</div>

			<div className="details-tiles__tile">
				<div className="details-tiles__tile--status">
					<p className="details-tiles__tile--status-text">status</p>
					<div className={statusClass}>
						<p>
							<span></span>
							<span>{paid}</span>
						</p>
					</div>
				</div>

				<div className="details-tiles__tile--buttons">
					<Button type="8" text="Edit" onClick={onEditInvoice} />
					<Button type="7" text="Delete" onClick={onDeleteInvoice} />
					{paid !== "paid" ? (
						<Button type="2" text="Mark as Paid" onClick={setInvoiceToPaid} />
					) : (
						""
					)}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		toggled: state.routeReducer.routeToggled,
		invoice: state.invoiceReducer.invoice,
	};
};

export default connect(mapStateToProps, null)(DetailsTiles);
