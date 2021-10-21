import * as actionTypes from "./actionTypes";

export const showForm = () => {
	return {
		type: actionTypes.SHOW_FORM,
	};
};

export const hideForm = () => {
	return {
		type: actionTypes.HIDE_FORM,
	};
};

export const editForm = () => {
	return {
		type: actionTypes.EDIT_FORM,
	};
};

export const getDate = (date) => {
	return {
		data: date,
		type: actionTypes.GET_DATE,
	};
};

export const paymentTerms = (data) => {
	return {
		paymentTerms: data,
		type: actionTypes.GET_PAYMENT_TERMS,
	};
};

export const getListItems = (data) => {
	return {
		listItems: data,
		type: actionTypes.GET_LIST_ITEMS,
	};
};
