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
	marked,
} from "../actions/invoiceControls";

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

export const getOneInvoice = (data) => {
	return (dispatch) => {
		dispatch(loading());

		fetch(`http://localhost:8080/invoice/invoice/${data._id}`, {
			method: "GET",
		})
			.then((response) => response.json())
			.then((responseData) => {
				// passed = responseData.invoice;
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(getSingleInvoice(responseData.invoice));
				} else {
					dispatch(setError(responseData.message));
				}
			})
			.catch((error) => {
				// console.log(err.message);
				return dispatch(setError(error.message));
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
		// dispatch(loading());
		dispatch(markAsPaidLoading());
		// const invoiceStatus = data.status = "Paid";
		// data.status = "Paid";
		// console.log(data);

		const updatedStatusData = {
			...data,
			status: "Paid",
		};

		// console.log(updatedStatusData);

		fetch(`http://localhost:8080/invoice/invoice/${data._id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedStatusData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(resetInvoice());
					// dispatch(marked());
					data.status = "Paid";
					dispatch(invoiceMarked());
					// dispatch(displayInvoice());
				} else {
					dispatch(hideForm());
					dispatch(setError(responseData.message));
					console.log(responseData);
				}
			})
			.catch((error) => {
				dispatch(setError(error.message));
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
