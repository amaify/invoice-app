import React from "react";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
	cancelDelete,
	deleteInvoice,
	removeError,
} from "../../store/actions/invoiceControls";
import { deleteAnInvoice } from "../../store/util/invoiceUtility";
import Button from "../buttons/buttons";

function Modal(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { data, error, errMessage, draftLoading } = props;

	const onDeleteInvoice = () => {
		// dispatch(deleteInvoice(data));

		return dispatch(deleteAnInvoice(data, history));
	};

	const onCancelDelete = () => {
		return dispatch(cancelDelete());
	};

	const onRemoveError = () => {
		dispatch(removeError());
		return history.push("/");
	};
	return (
		<section className="modal" data-testid="modalID">
			{!error ? (
				<div className="modal-content">
					<div className="modal-content__text">
						<h1>confirm deletion</h1>
						<p>
							Are you sure you want to delete invoice {data ? data.id : ""}?
							This action cannot be undone.
						</p>
					</div>

					<div className="modal-content__btns">
						<Button type="8" text="Cancel" onClick={onCancelDelete} />
						<Button
							type="7"
							text={!draftLoading ? "Delete" : "Deleting..."}
							onClick={onDeleteInvoice}
							dataTestid="confirmDelete"
						/>
					</div>
				</div>
			) : (
				<div className="modal-content modal-content__error">
					<p>{!errMessage ? "An Error Occured!" : errMessage}</p>

					<Button type="7" text="Close" onClick={onRemoveError} />
				</div>
			)}
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		error: state.invoiceReducer.error,
		errMessage: state.invoiceReducer.errMessage,
		draftLoading: state.invoiceReducer.draftLoading,
	};
};

export default connect(mapStateToProps, null)(Modal);
// export default Modal;
