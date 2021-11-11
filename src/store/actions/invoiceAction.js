import * as actionTypes from "./actionTypes";

export const getInvoice = (invoice) => {
	return {
		type: actionTypes.GET_INVOICE,
		data: invoice,
	};
};

export const resetInvoice = () => {
	return {
		type: actionTypes.RESET_INVOICE,
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
