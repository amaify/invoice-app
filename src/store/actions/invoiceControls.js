import * as actionTypes from "./actionTypes";

export const setToPaid = (invoice) => {
	return {
		type: actionTypes.SET_TO_PAID,
		data: invoice,
	};
};

export const deleteInvoice = (invoice) => {
	return {
		type: actionTypes.DELETE_INVOICE,
		data: invoice,
	};
};
