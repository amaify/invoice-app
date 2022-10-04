import React from "react";
import { useDispatch, connect } from "react-redux";

import { Link } from "react-router-dom";
import ArrowLeft from "../../../../assets/images/icon-arrow-left.svg";
import { editForm, showForm } from "../../../../store/actions/formAction";
import { confirmDelete } from "../../../../store/actions/invoiceControls";
import { markAsPaid } from "../../../../store/util/invoiceUtility";
import Button from "../../../buttons/buttons";

function DetailsTiles(props) {
	const dispatch = useDispatch();

	const { data, invoice, markedLoading, token } = props;

	const setInvoiceToPaid = () => {
		// eslint-disable-next-line array-callback-return
		return invoice.map((inv) => {
			if (inv.id === data.id) {
				return dispatch(markAsPaid(data, token));
			}
		});
	};

	const onDeleteInvoice = () => {
		return dispatch(confirmDelete());
	};

	const onEditInvoice = () => {
		dispatch(editForm(data));
		dispatch(showForm());
	};

	let statusClass;

	if (data.status.toLowerCase() === "pending") {
		statusClass =
			"details-tiles__tile--status-status details-tiles__tile--status-status__pending";
	} else if (data.status.toLowerCase() === "draft") {
		statusClass =
			"details-tiles__tile--status-status details-tiles__tile--status-status__draft";
	} else {
		statusClass =
			"details-tiles__tile--status-status details-tiles__tile--status-status__paid";
	}

	return (
		<div className="details-tiles">
			<div className="details-tiles__link">
				<img src={ArrowLeft} alt="Arrow pointing left" />
				<Link to="/">Go back</Link>
			</div>

			<div className="details-tiles__tile">
				<div className="details-tiles__tile--status">
					<p className="details-tiles__tile--status-text">status</p>
					<div className={statusClass}>
						<p>
							<span></span>
							<span>{data.status}</span>
						</p>
					</div>
				</div>

				<div className="details-tiles__tile--buttons details-tiles__tile--buttons-desktop">
					<Button type="8" text="Edit" onClick={onEditInvoice} />
					<Button type="7" text="Delete" onClick={onDeleteInvoice} />
					{data.status === "Pending" ? (
						<Button
							type="2"
							text={!markedLoading ? "Mark as Paid" : "Marking...."}
							onClick={setInvoiceToPaid}
							dataTestid="markAsPaid"
						/>
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
		loading: state.invoiceReducer.loading,
		markedLoading: state.invoiceReducer.markedLoading,
		invoiceMarked: state.invoiceReducer.invoiceMarked,
		markedData: state.invoiceReducer.markedData,
		token: state.authReducer.token,
	};
};

export default connect(mapStateToProps, null)(DetailsTiles);
