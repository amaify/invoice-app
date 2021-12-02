import {
	authError,
	authLoading,
	emailSent,
	login,
	loginSuccess,
	logout,
	register,
	resetError,
} from "../actions/authAction";
import { emptyInvoiceOnLogout } from "../actions/invoiceAction";
import { displayInvoice } from "./invoiceUtility";

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjustedExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjustedExpirationTime - currentTime;

	return remainingDuration;
};

export const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem("token");
	const storedExpirationTime = localStorage.getItem("expirationTime");

	let remainingTime;

	if (storedExpirationTime) {
		remainingTime = calculateRemainingTime(storedExpirationTime);
	}

	if (remainingTime <= 60000) {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
	};
};

export const logoutUser = () => {
	return (dispatch) => {
		dispatch(logout());
		dispatch(emptyInvoiceOnLogout());
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		localStorage.removeItem("senderAddress");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	};
};

export const newUser = (data, history) => {
	return (dispatch) => {
		dispatch(authLoading());

		fetch("http://localhost:8080/authentication/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 201) {
					console.log(responseData);
					dispatch(register());

					history.push("/login");
				} else {
					console.log(responseData);
					dispatch(authError(responseData.message));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(authError(error.message));
			});
	};
};

export const UserLogin = (data, history) => {
	return (dispatch) => {
		dispatch(authLoading());

		fetch("http://localhost:8080/authentication/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(login(responseData));
					// dispatch(loginSuccess());
					localStorage.setItem("token", responseData.token);
					localStorage.setItem(
						"senderAddress",
						JSON.stringify(responseData.senderAddress)
					);

					history.push("/");
					dispatch(displayInvoice());

					const expirationTime = new Date(
						new Date().getTime() + +"3600" * 1000
					).toISOString();

					localStorage.setItem("expirationTime", expirationTime);

					const remainingTime = calculateRemainingTime(expirationTime);

					console.log(remainingTime);

					logoutTimer = setTimeout(() => {
						dispatch(logoutUser());
					}, remainingTime);
				} else {
					console.log(responseData);
					dispatch(authError(responseData.message));
				}
			})
			.catch((error) => {
				dispatch(authError(error.message));
			});
	};
};

export const userForgotPassword = (data) => {
	return (dispatch) => {
		dispatch(authLoading());

		fetch("http://localhost:8080/authentication/forgot-password", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(emailSent(responseData));
				} else {
					console.log(responseData);
					dispatch(authError(responseData.message));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(authError(error.message));
			});
	};
};

export const userResetPassword = (token, data, history) => {
	return (dispatch) => {
		dispatch(authLoading());

		const requestedData = {
			password: data.password,
			resetLink: token,
		};

		fetch("http://localhost:8080/authentication/reset-password", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestedData),
		})
			.then((response) => response.json())
			.then((responseData) => {
				if (responseData.statusCode === 200) {
					console.log(responseData);
					dispatch(emailSent(responseData));
					history.push("/login");
				} else {
					console.log(responseData);
					dispatch(authError(responseData.message));
				}
			})
			.catch((error) => {
				console.log(error);
				dispatch(authError(error.message));
			});
	};
};
