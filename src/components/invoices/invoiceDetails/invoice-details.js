import React, { useEffect, useState } from "react";
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
	// let data;
	// var passed;

	// const [passedData, setPassedData] = useState([]);

	let data = location.state.invoiceItem;

	const dataFromStore = props.singleInvoice;

	const { showModal, loading, error, markedLoading, invoice } = props;

	useEffect(() => {
		return dispatch(getOneInvoice(data));
	}, []);

	const setInvoiceToPaid = () => {
		return invoice.map((inv) => {
			if (inv.id === data.id) {
				// inv.status = "paid";
				// setPaid(inv.status);
				// dispatch(setToPaid(data));
				// data.status = "Paid";
				// dispatch(markAsPaid(dataFromStore[0]));
				dispatch(markAsPaid(dataFromStore[0]));
			}
		});
	};

	const onDeleteInvoice = () => {
		// return dispatch(deleteInvoice(data));
		// return dispatch(confirmDelete());
		return dispatch(confirmDelete());
	};

	const onEditInvoice = () => {
		// dispatch(editForm(dataFromStore[0]));
		// dispatch(showForm());

		dispatch(editForm(dataFromStore[0]));
		dispatch(showForm());
	};

	// console.log(passedData);
	// console.log(passed);

	console.log(dataFromStore[0]);

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
										{dataFromStore[0].status !== "Paid" ? (
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
					{/* <DetailsTiles data={data} />
					<div className="details-body__wrapper">
						<DetailsBody data={data} />
						<DetailItems data={data} />
					</div> */}
					{showModal && <Modal data={data} />}
				</>
			) : (
				<SkeletonDetails />
			)}
			{/* <DetailsTiles data={data} />
			<div className="details-body__wrapper">
				<DetailsBody data={data} />
				<DetailItems data={data} />
			</div>
			{showModal && <Modal data={data} />}
			<SkeletonDetails /> */}
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
	};
};

export default connect(mapStateToProps, null)(InvoiceDetails);
