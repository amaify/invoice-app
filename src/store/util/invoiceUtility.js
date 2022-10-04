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

		fetch("https://amaify-invoice-backend.herokuapp.com/invoice/invoice", {
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
				console.log(err.message);
				return dispatch(setError(err.message));
			});
	};
};

export const getOneInvoice = (data, userToken) => {
	console.log(data);
	return (dispatch) => {
		dispatch(loading());

		fetch(
			`https://amaify-invoice-backend.herokuapp.com/invoice/invoice/${data._id}`,
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + userToken,
					"Content-Type": "application/json",
				},
			}
		)
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

export const updateInvoice = (data, history, userToken) => {
	return (dispatch) => {
		dispatch(submitPending());
		fetch(
			`https://amaify-invoice-backend.herokuapp.com/invoice/invoice/${data._id}`,
			{
				method: "PUT",
				headers: {
					authorization: "Bearer " + userToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		)
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					dispatch(hideForm());
					history.push("/");
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

		fetch(
			`https://amaify-invoice-backend.herokuapp.com/invoice/invoice/${data._id}`,
			{
				method: "PUT",
				headers: {
					authorization: "Bearer " + userToken,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedStatusData),
			}
		)
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
		fetch(
			`https://amaify-invoice-backend.herokuapp.com/invoice/invoice/${data._id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: "Bearer " + userToken,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(deleteInvoice());
					history.push("/");
					dispatch(displayInvoice(userToken));
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
