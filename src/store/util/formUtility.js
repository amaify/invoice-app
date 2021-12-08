import {
	showForm,
	getDate,
	paymentTerms,
	getListItems,
	hideForm,
	submitPending,
	submitDraft,
} from "../actions/formAction";
import { getInvoice, loading, setError } from "../actions/invoiceAction";
import { displayInvoice } from "./invoiceUtility";

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

export const submitFormPending = (formData) => {
	return (dispatch) => {
		// dispatch(loading());
		dispatch(submitPending());

		fetch("http://localhost:8080/invoice/new-invoice", {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					dispatch(hideForm());
					dispatch(displayInvoice());
					// console.log(responseData);
					// dispatch(getInvoice());
					// history.replace("/");
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
					console.log(responseData);
				}
			})
			.catch((error) => {
				dispatch(setError(error));
				dispatch(hideForm());
			});
	};
};

export const submitFormDraft = (formData) => {
	return (dispatch) => {
		// dispatch(loading());
		dispatch(submitDraft());

		fetch("http://localhost:8080/invoice/new-invoice", {
			method: "POST",
			body: JSON.stringify(formData),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					dispatch(hideForm());
					dispatch(displayInvoice());
					// dispatch(getInvoice());
					// history.replace("/");
					console.log(responseData);
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
					console.log(responseData);
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
				dispatch(hideForm());
			});
	};
};
