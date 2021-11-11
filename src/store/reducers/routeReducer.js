import * as actionTypes from "../actions/actionTypes";

const initialState = {
	routeToggled: false,
};

export const routeReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.TOGGLE_ROUTE:
			return { ...state, routeToggled: !state.routeToggled };
		default:
			return state;
	}
};
