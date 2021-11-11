import { act } from "react-dom/test-utils";
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

export const submitPending = (data) => {
	return {
		type: actionTypes.SUBMIT_PENDING,
		invoiceData: data,
	};
};

//	EDITING ACTIONS
export const editListAddItems = () => {
	return {
		type: actionTypes.ADD_ITEM_TO_LIST,
	};
};

export const editOnChange = (inputs) => {
	return {
		type: actionTypes.EDIT_ON_CHANGE,
		data: inputs,
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
