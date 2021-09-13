import * as actionTypes from "./actionTypes";

export const showForm = () => {
	return {
		type: actionTypes.SHOW_FORM,
	};
};

export const hideForm = () => {
	return {
		type: actionTypes.HIDE_FORM,
	};
};

export const editForm = () => {
	return {
		type: actionTypes.EDIT_FORM,
	};
};
