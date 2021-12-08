import * as actionTypes from "./actionTypes";

export const getInvoice = (invoice) => {
	return {
		type: actionTypes.GET_INVOICE,
		data: invoice,
	};
};

export const getSingleInvoice = (singleInvoice) => {
	return {
		type: actionTypes.GET_SINGLE_INVOICE,
		data: singleInvoice,
	};
};

export const resetInvoice = () => {
	return {
		type: actionTypes.RESET_INVOICE,
	};
};

export const emptyInvoiceOnLogout = () => {
	return {
		type: actionTypes.EMPTY_INVOICE_ON_LOGOUT,
	};
};

export const toggleFilter = () => {
	return {
		type: actionTypes.TOGGLE_FILTER,
	};
};

// export const toggleClicked = () => {
// 	return {
// 		type: actionTypes.TOGGLE_CLICKED,
// 	};
// };

export const filterInvoice = (status) => {
	return {
		type: actionTypes.FILTER_INVOICE,
		data: status,
	};
};

export const loading = () => {
	return {
		type: actionTypes.LOADING,
	};
};

export const setError = (data) => {
	return {
		type: actionTypes.SET_ERROR,
		data: data,
	};
};
