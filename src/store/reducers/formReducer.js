import * as actionTypes from "../actions/actionTypes";

const initialState = {
	showForm: false,
	backdrop: false,
	editForm: false,

	date: "",
	paymentTerms: 30,
	listItems: [],
};

export const FormReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SHOW_FORM:
			return { ...state, showForm: true, backdrop: true };

		case actionTypes.HIDE_FORM:
			return { ...state, showForm: false, editForm: false, backdrop: false };

		case actionTypes.EDIT_FORM:
			return { ...state, editForm: true, backdrop: true };

		case actionTypes.GET_DATE:
			return { ...state, date: action.data };

		case actionTypes.GET_PAYMENT_TERMS:
			return { ...state, paymentTerms: action.paymentTerms };

		case actionTypes.GET_LIST_ITEMS:
			return { ...state, listItems: action.listItems };

		default:
			return state;
	}
};
