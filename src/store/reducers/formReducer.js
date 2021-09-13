import * as actionTypes from "../actions/actionTypes";

const initialState = {
	showForm: false,
	backdrop: false,
	editForm: false,
};

export const FormReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SHOW_FORM:
			return { ...state, showForm: true, backdrop: true };

		case actionTypes.HIDE_FORM:
			return { ...state, showForm: false, editForm: false, backdrop: false };

		case actionTypes.EDIT_FORM:
			return { ...state, editForm: true, backdrop: true };

		default:
			return state;
	}
};
