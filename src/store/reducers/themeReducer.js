import * as actionTypes from "../actions/actionTypes";

const initialState = {
	theme: { mode: "light" },
};

export const themeReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_THEME_TO_DARK:
			return { ...state, theme: { mode: "dark" } };

		case actionTypes.SET_THEME_TO_LIGHT:
			return { ...state, theme: { mode: "light" } };
		default:
			return state;
	}
};
