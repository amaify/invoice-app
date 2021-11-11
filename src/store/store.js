import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import { themeReducer } from "./reducers/themeReducer";
import {
	themeReducer,
	FormReducer,
	invoiceReducer,
	routeReducer,
} from "./reducers/index";
import thunk from "redux-thunk";

// function saveToLocalStorage(state) {
// 	try {
// 		const serializedState = JSON.stringify(state);
// 		localStorage.setItem("state", serializedState);
// 	} catch (err) {
// 		console.log(err);
// 		return undefined;
// 	}
// }

// function loadStateFromLocalStorage() {
// 	try {
// 		const serializedState = localStorage.getItem("state");
// 		if (serializedState === null) return undefined;
// 		return JSON.parse(serializedState);
// 	} catch (err) {
// 		console.log(err);
// 		return undefined;
// 	}
// }

// const persistState = loadStateFromLocalStorage();

const logger = () => {
	return (next) => {
		return (action) => {
			// console.log("[middleware] Dispatching", action);
			const result = next(action);
			// console.log("[middleware] next state", store.getState());
			return result;
		};
	};
};

const rootReducer = combineReducers({
	themeReducer: themeReducer,
	form: FormReducer,
	invoiceReducer: invoiceReducer,
	routeReducer: routeReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	rootReducer,
	// persistState,
	composeEnhancer(applyMiddleware(logger, thunk))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
