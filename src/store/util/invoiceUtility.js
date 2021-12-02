import { hideForm, submitDraft, submitPending } from "../actions/formAction";
import {
	getInvoice,
	loading,
	resetInvoice,
	setError,
} from "../actions/invoiceAction";
import { deleteInvoice } from "../actions/invoiceControls";

export const displayInvoice = () => {
	return (dispatch) => {
		dispatch(loading());

		// setTimeout(() => {
		// 	return fetch("http://localhost:8080/invoice/invoice", {
		// 		method: "GET",
		// 	})
		// 		.then((res) => res.json())
		// 		.then((data) => {
		// 			if (data.statusCode === 200) {
		// 				dispatch(getInvoice(data.invoice));
		// 				console.log(data);
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			dispatch(setError(err));
		// 		});
		// }, 2000);

		fetch("http://localhost:8080/invoice/invoice", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.statusCode === 200) {
					dispatch(getInvoice(data.invoice));
					console.log(data);
				} else {
					dispatch(setError(data.message));
				}
			})
			.catch((err) => {
				console.log(err.message);
				return dispatch(setError(err.message));
			});
	};
};

export const updateInvoice = (data, history) => {
	return (dispatch) => {
		dispatch(submitPending());
		fetch(`http://localhost:8080/invoice/invoice/${data._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					dispatch(hideForm());
					history.push("/");
					dispatch(displayInvoice());
				}

				if (responseData.statusCode === 401) {
					dispatch(setError(responseData.message));
					dispatch(hideForm());
				}
			})
			.catch((error) => {
				dispatch(setError(error));
				dispatch(hideForm());
			});
	};
};

export const markAsPaid = (data) => {
	return (dispatch) => {
		dispatch(loading());
		data.status = "Paid";
		fetch(`http://localhost:8080/invoice/invoice/${data._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(resetInvoice());
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
					console.log(responseData);
				}
			})
			.catch((error) => {
				dispatch(setError(error));
			});
	};
};

export const deleteAnInvoice = (data, history) => {
	return (dispatch) => {
		dispatch(submitDraft());
		fetch(`http://localhost:8080/invoice/invoice/${data._id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(deleteInvoice());
					history.push("/");
					dispatch(displayInvoice());
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
					console.log(responseData);
				}
			})
			.catch((error) => console.log(error));
	};
};
