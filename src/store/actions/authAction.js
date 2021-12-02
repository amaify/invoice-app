import * as actionTypes from "./actionTypes";

export const register = (data) => {
	return {
		type: actionTypes.REGISTER,
		data: data,
	};
};

export const login = (data) => {
	return {
		type: actionTypes.LOGIN,
		data: data,
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT,
	};
};

export const authLoading = () => {
	return {
		type: actionTypes.AUTH_LOADING,
	};
};

export const authError = (error) => {
	return {
		type: actionTypes.AUTH_ERROR,
		error: error,
	};
};

export const resetError = () => {
	return {
		type: actionTypes.RESET_ERROR,
	};
};

export const emailSent = (data) => {
	return {
		type: actionTypes.EMAIL_SENT,
		data: data,
	};
};

export const forgotPasswordLink = () => {
	return {
		type: actionTypes.SET_FORGOT_PASSWORD_LINK,
	};
};
