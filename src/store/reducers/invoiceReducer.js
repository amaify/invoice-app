import * as actionTypes from "../actions/actionTypes";
// import { deleteInvoice } from "../actions/invoiceControls";

export const initialState = {
	invoice: [],
	filteredInvoice: [],
	singleInvoice: [],
	status: "",
	marked: false,
	filtered: false,
	dropDown: false,
	showModal: false,
	// backdrop: false,

	loading: false,
	markedLoading: false,
	invoiceMarked: false,
	error: false,
	errMessage: "",
	// toggleClicked: true,
};

export const invoiceReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_INVOICE:
			return {
				...state,
				invoice: action.data,
				filtered: false,
				loading: false,
				pendingLoading: false,
				draftLoading: false,
				error: false,
			};

		case actionTypes.GET_SINGLE_INVOICE:
			return {
				...state,
				singleInvoice: action.data,
				loading: false,
			};

		case actionTypes.HIDE_FORM:
			return {
				...state,
				pendingLoading: false,
			};

		case actionTypes.SET_ERROR:
			return {
				...state,
				error: true,
				loading: false,
				errMessage: action.data,
				showModal: true,
				// backdrop: true,
				pendingLoading: false,
				draftLoading: false,
			};

		case actionTypes.REMOVE_ERROR:
			return {
				...state,
				error: false,
				showModal: false,
				backdrop: false,
			};

		case actionTypes.RESET_INVOICE:
			return {
				...state,
				filtered: false,
				loading: false,
				markLoading: false,
				filteredInvoice: (state.filteredInvoice = []),
			};

		case actionTypes.EMPTY_INVOICE_ON_LOGOUT:
			return { ...state, invoice: (state.invoice = []), backdrop: false };

		case actionTypes.TOGGLE_FILTER:
			return { ...state, dropDown: !state.dropDown };

		// case actionTypes.TOGGLE_CLICKED:
		// 	return { ...state, toggleClicked: !state.toggleClicked };

		case actionTypes.FILTER_INVOICE:
			let newInvoice = [...state.invoice];
			newInvoice = newInvoice.filter((invoice) => {
				// console.log(invoice.status);
				return invoice.status.toLowerCase() === action.data.toLowerCase();
			});
			// console.log(newInvoice);
			// console.log(action.data);

			return {
				...state,
				filteredInvoice: newInvoice,
				status: action.data,
				filtered: true,
			};

		case actionTypes.SUBMIT_PENDING:
			// let invoice = [...state.invoice];
			// invoice.push(action.invoiceData);

			// return { ...state, invoice: invoice, pendingLoading: true };
			return { ...state, pendingLoading: true };

		case actionTypes.SUBMIT_DRAFT:
			return { ...state, draftLoading: true };

		case actionTypes.SET_TO_PAID:
			let updatedInvoice = [...state.invoice];
			updatedInvoice.map((invoice) => {
				if (invoice.id === action.data.id) {
					return (invoice.status = "paid");
				}
			});

			return {
				...state,
				invoice: updatedInvoice,
			};

		case actionTypes.MARK_AS_PAID_LOADING:
			return {
				...state,
				markedLoading: true,
			};

		// case actionTypes.MARKED:
		// 	return {
		// 		...state,
		// 		marked: true,
		// 	};

		case actionTypes.INVOICE_MARKED:
			return {
				...state,
				markedLoading: false,
				invoiceMarked: true,
			};

		case actionTypes.DELETE_INVOICE:
			// let deletedInvoice = [...state.invoice];
			// for (let i = 0; i < deletedInvoice.length; i++) {
			// 	if (deletedInvoice[i].id === action.data.id) {
			// 		deletedInvoice.splice(i, 1);
			// 	}
			// }

			return {
				...state,
				// invoice: deletedInvoice,
				confirmDelete: false,
				backdrop: false,
				showModal: false,
			};

		case actionTypes.SHOW_MODAL:
			return {
				...state,
				showModal: true,
				backdrop: true,
			};

		case actionTypes.CANCEL_DELETE:
			return {
				...state,
				confirmDelete: false,
				backdrop: false,
				showModal: false,
			};

		case actionTypes.LOADING:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};
