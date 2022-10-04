import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import Button from "../../buttons/buttons";

import DetailsTiles from "./details-component/detail-tiles";
import DetailsBody from "./details-component/detail-body";
import DetailItems from "./details-component/detail-items";
import DetailMobileItems from "./details-component/detail-item-mobile";
import SkeletonDetails from "../../skeleton/skeleton-details";
import Modal from "../../modal/modal";
import { getOneInvoice, markAsPaid } from "../../../store/util/invoiceUtility";
import { confirmDelete } from "../../../store/actions/invoiceControls";
import { editForm, showForm } from "../../../store/actions/formAction";

function InvoiceDetails(props) {
	const location = useLocation();
	const dispatch = useDispatch();

	let data = location.state.invoiceItem;

	const dataFromStore = props.singleInvoice;

	const { showModal, loading, error, markedLoading, invoice, token } = props;

	useEffect(() => {
		return dispatch(getOneInvoice(data, token));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setInvoiceToPaid = () => {
		// eslint-disable-next-line array-callback-return
		return invoice.map((inv) => {
			if (inv.id === data.id) {
				return dispatch(markAsPaid(dataFromStore[0], token));
			}
		});
	};

	const onDeleteInvoice = () => {
		return dispatch(confirmDelete());
	};

	const onEditInvoice = () => {
		dispatch(editForm(dataFromStore[0]));
		dispatch(showForm());
	};

	return (
		<section className="details">
			{!loading ? (
				<>
					{!error ? (
						<>
							{dataFromStore.length > 0 ? (
								<>
									<DetailsTiles data={dataFromStore[0]} />
									<div className="details-body__wrapper">
										<DetailsBody data={dataFromStore[0]} />
										<>
											<DetailMobileItems data={dataFromStore[0]} />
											<DetailItems data={dataFromStore[0]} />
										</>
									</div>

									<div className="details-tiles__tile--buttons details-tiles__tile--buttons-mobile">
										<Button type="8" text="Edit" onClick={onEditInvoice} />
										<Button type="7" text="Delete" onClick={onDeleteInvoice} />
										{dataFromStore[0].status === "Pending" ? (
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
								</>
							) : (
								""
							)}
						</>
					) : (
						showModal && <Modal data={data} />
					)}

					{showModal && <Modal data={data} />}
				</>
			) : (
				<SkeletonDetails />
			)}
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		showModal: state.invoiceReducer.showModal,
		loading: state.invoiceReducer.loading,
		error: state.invoiceReducer.error,
		singleInvoice: state.invoiceReducer.singleInvoice,
		markedLoading: state.invoiceReducer.markedLoading,
		invoice: state.invoiceReducer.invoice,
		token: state.authReducer.token,
	};
};

export default connect(mapStateToProps, null)(InvoiceDetails);
