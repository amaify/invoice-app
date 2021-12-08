import * as actionTypes from "./actionTypes";

export const setToPaid = (invoice) => {
	return {
		type: actionTypes.SET_TO_PAID,
		data: invoice,
	};
};

export const markAsPaidLoading = () => {
	return {
		type: actionTypes.MARK_AS_PAID_LOADING,
	};
};

export const invoiceMarked = () => {
	return {
		type: actionTypes.INVOICE_MARKED,
	};
};

export const deleteInvoice = (invoice) => {
	return {
		type: actionTypes.DELETE_INVOICE,
		data: invoice,
	};
};

export const confirmDelete = () => {
	return {
		type: actionTypes.SHOW_MODAL,
	};
};

export const cancelDelete = () => {
	return {
		type: actionTypes.CANCEL_DELETE,
	};
};

export const removeError = () => {
	return {
		type: actionTypes.REMOVE_ERROR,
	};
};
