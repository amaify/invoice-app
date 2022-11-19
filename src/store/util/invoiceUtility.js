import { hideForm, submitDraft, submitPending } from "../actions/formAction";
import {
	getInvoice,
	getSingleInvoice,
	loading,
	resetInvoice,
	setError,
} from "../actions/invoiceAction";
import {
	deleteInvoice,
	invoiceMarked,
	markAsPaidLoading,
} from "../actions/invoiceControls";

export const displayInvoice = (userToken) => {
	return (dispatch) => {
		dispatch(loading());

		fetch("https://invoice-backend.onrender.com/invoice/invoice", {
			method: "GET",
			headers: {
				Authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					dispatch(getInvoice(data.invoice));
				} else {
					dispatch(setError(data.message));
				}
			})
			.catch((err) => {
				return dispatch(setError(err.message));
			});
	};
};

export const getOneInvoice = (data, userToken) => {
	console.log(data);
	return (dispatch) => {
		dispatch(loading());

		fetch(`https://invoice-backend.onrender.com/invoice/invoice/${data._id}`, {
			method: "GET",
			headers: {
				Authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					dispatch(getSingleInvoice(responseData.invoice));
				} else {
					dispatch(setError(responseData.message));
				}
			})
			.catch((error) => {
				return dispatch(setError(error.message));
			});
	};
};

export const updateInvoice = (data, history, userToken) => {
	return (dispatch) => {
		dispatch(submitPending());
		fetch(`https://invoice-backend.onrender.com/invoice/invoice/${data._id}`, {
			method: "PUT",
			headers: {
				authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					history.push("/");
					dispatch(hideForm());
					dispatch(displayInvoice(userToken));
				}

				if (responseData.statusCode === 401) {
					dispatch(setError(responseData.message));
					dispatch(hideForm());
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
				dispatch(hideForm());
			});
	};
};

export const markAsPaid = (data, userToken) => {
	return (dispatch) => {
		dispatch(markAsPaidLoading());

		const updatedStatusData = {
			...data,
			status: "Paid",
		};

		fetch(`https://invoice-backend.onrender.com/invoice/invoice/${data._id}`, {
			method: "PUT",
			headers: {
				authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedStatusData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(resetInvoice());
					data.status = "Paid";
					dispatch(invoiceMarked());
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

export const deleteAnInvoice = (data, history, userToken) => {
	return (dispatch) => {
		dispatch(submitDraft());
		fetch(`https://invoice-backend.onrender.com/invoice/invoice/${data._id}`, {
			method: "DELETE",
			headers: {
				Authorization: "Bearer " + userToken,
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					history.push("/");
					dispatch(deleteInvoice());
					dispatch(displayInvoice(userToken));
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
			});
	};
};
