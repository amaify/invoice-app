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

export const editForm = (data) => {
	return {
		type: actionTypes.EDIT_FORM,
		invoice: data,
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

//	EDITING ACTIONS
export const editListAddItems = () => {
	return {
		type: actionTypes.ADD_ITEM_TO_EDIT_LIST,
	};
};

export const addNewItemToList = () => {
	return {
		type: actionTypes.ADD_NEW_ITEM_TO_LIST,
	};
};

export const editOnChange = (inputs) => {
	return {
		type: actionTypes.EDIT_ON_CHANGE,
		data: inputs,
	};
};

export const listOnChange = (inputs) => {
	return {
		type: actionTypes.LIST_ON_CHANGE,
		data: inputs,
	};
};

export const deleteListItems = (data) => {
	return {
		type: actionTypes.DELETE_LIST_ITEMS,
		data: data,
	};
};

export const editlistDelete = (data) => {
	return {
		type: actionTypes.EDIT_LIST_DELETE,
		data: data,
	};
};

export const setEditPaymentTerms = (data) => {
	return {
		type: actionTypes.SET_EDIT_PAYMENT_TERMS,
		data: data,
	};
};

export const setEditDate = (data) => {
	return {
		type: actionTypes.SET_EDIT_DATE,
		data: data,
	};
};

export const editInput = (data) => {
	return {
		type: actionTypes.EDIT_INPUT,
		data: data,
	};
};

//SUBMITTING ACTIONS
export const submitPending = (data) => {
	return {
		type: actionTypes.SUBMIT_PENDING,
		invoiceData: data,
	};
};

export const submitDraft = () => {
	return {
		type: actionTypes.SUBMIT_DRAFT,
	};
};
