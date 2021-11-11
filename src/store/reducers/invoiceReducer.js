import * as actionTypes from "../actions/actionTypes";
import { deleteInvoice } from "../actions/invoiceControls";

const initialState = {
	invoice: [],
	status: "",
	filtered: false,
	dropDown: false,
	// toggleClicked: true,
};

export const invoiceReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_INVOICE:
			return { ...state, invoice: action.data, filtered: false };

		case actionTypes.RESET_INVOICE:
			return { ...state, filtered: false, status: "" };

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
			let invoice = [...state.invoice];
			invoice.push(action.invoiceData);

			return { ...state, invoice: invoice };

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

		case actionTypes.DELETE_INVOICE:
			let deletedInvoice = [...state.invoice];
			for (let i = 0; i < deletedInvoice.length; i++) {
				if (deletedInvoice[i].id === action.data.id) {
					deletedInvoice.splice(i, 1);
				}
			}

			return {
				...state,
				invoice: deletedInvoice,
			};

		default:
			return state;
	}
};
