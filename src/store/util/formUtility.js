import {
	showForm,
	getDate,
	paymentTerms,
	getListItems,
	hideForm,
	submitPending,
	submitDraft,
} from "../actions/formAction";
import { setError } from "../actions/invoiceAction";
import { displayInvoice } from "./invoiceUtility";

export const showFormAction = () => {
	return (dispatch) => {
		dispatch(showForm());
	};
};

export const getDateFromForm = () => {
	return (dispatch) => {
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

export const submitFormPending = (formData, userToken) => {
	return (dispatch) => {
		dispatch(submitPending());

		fetch("https://invoice-backend.onrender.com/invoice/new-invoice", {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					dispatch(hideForm());
					dispatch(displayInvoice(userToken));
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error));
				dispatch(hideForm());
			});
	};
};

export const submitFormDraft = (formData, userToken) => {
	return (dispatch) => {
		dispatch(submitDraft());

		fetch("https://invoice-backend.onrender.com/invoice/new-invoice", {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					dispatch(hideForm());
					dispatch(displayInvoice(userToken));
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
				dispatch(hideForm());
			});
	};
};
