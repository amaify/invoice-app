import * as actionTypes from "../actions/actionTypes";
import { retrieveStoredToken } from "../util/authUtility";

const tokenData = retrieveStoredToken();

// console.log(tokenData);
let initialToken;

if (tokenData) {
	initialToken = tokenData.token;
}

export const initialState = {
	isAuth: initialToken || false,
	token: initialToken,
	loading: false,
	error: false,
	errMessage: "",
	successMessage: "",
	forgotPassword: false,
	success: false,
};

export const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.REGISTER:
			return {
				...state,
				registered: true,
				loading: false,
			};

		case actionTypes.LOGIN:
			return {
				...state,
				loading: false,
				error: false,
				isAuth: !!action.data.token,
				token: action.data.token,
				// isAuth: true,
			};

		// case actionTypes.LOGIN_SUCCESS:
		// 	return {
		// 		...state,
		// 		loading: false,
		// 		error: false,
		// 	};

		case actionTypes.AUTH_LOADING:
			return {
				...state,
				loading: true,
			};

		case actionTypes.AUTH_ERROR:
			return {
				...state,
				loading: false,
				error: true,
				errMessage: action.error,
			};

		case actionTypes.RESET_ERROR:
			return {
				...state,
				error: false,
				success: false,
				errMessage: "",
				successMessage: "",
			};

		case actionTypes.LOGOUT:
			return {
				...state,
				isAuth: false,
				errMessage: "",
				token: null,
			};

		case actionTypes.EMAIL_SENT:
			return {
				...state,
				successMessage: action.data.message,
				loading: false,
				error: false,
				success: true,
				// forgotPassword: false,
			};

		case actionTypes.SET_FORGOT_PASSWORD_LINK:
			return {
				...state,
				forgotPassword: true,
			};

		default:
			return state;
	}
};
