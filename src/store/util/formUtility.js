import {
	showForm,
	getDate,
	paymentTerms,
	getListItems,
} from "../actions/formAction";

export const showFormAction = () => {
	return (dispatch) => {
		console.log("clicked");
		dispatch(showForm());
	};
};

export const getDateFromForm = () => {
	return (dispatch) => {
		console.log("gotten date");
		dispatch(getDate());
	};
};

export const getPaymentTerms = () => {
	return (dispatch) => {
		dispatch(paymentTerms());
	};
};

export const dispatchListItems = () => {
	return (dispatch) => {
		dispatch(getListItems());
	};
};
