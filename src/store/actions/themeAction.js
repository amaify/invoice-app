import * as actionType from "./actionTypes";

export const setThemeToDark = () => {
	return {
		type: actionType.SET_THEME_TO_DARK,
	};
};

export const setThemeToLight = () => {
	return {
		type: actionType.SET_THEME_TO_LIGHT,
	};
};
