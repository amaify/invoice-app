import * as actionTypes from "../actions/actionTypes";

const initialState = {
	showForm: false,
	backdrop: false,
	editForm: false,

	date: "",
	paymentTerms: 30,
	listItems: [],
};

export const FormReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SHOW_FORM:
			return { ...state, showForm: true, backdrop: true };

		case actionTypes.HIDE_FORM:
			return {
				...state,
				showForm: false,
				editForm: false,
				backdrop: false,
				listItems: [],
			};

		case actionTypes.EDIT_FORM:
			return { ...state, editForm: true, formDetails: action.invoice };

		case actionTypes.GET_DATE:
			return { ...state, date: action.data };

		case actionTypes.GET_PAYMENT_TERMS:
			return { ...state, paymentTerms: action.paymentTerms };

		case actionTypes.GET_LIST_ITEMS:
			return { ...state, listItems: action.listItems };

		case actionTypes.ADD_ITEM_TO_EDIT_LIST:
			let newFormDetails = { ...state.formDetails };
			newFormDetails.items.push({
				name: "",
				quantity: "",
				price: "",
				total: "",
			});

			return { ...state, formDetails: newFormDetails };

		case actionTypes.ADD_NEW_ITEM_TO_LIST:
			let newItems = [...state.listItems];
			newItems.push({ name: "", quantity: "", price: "", total: "" });

			return { ...state, listItems: newItems };

		case actionTypes.DELETE_LIST_ITEMS:
			let itemList = [...state.listItems];

			for (let i = 0; i < itemList.length; i++) {
				if (i === action.data) {
					itemList.splice(i, 1);
				}
			}

			return {
				...state,
				listItems: itemList,
			};

		case actionTypes.EDIT_LIST_DELETE:
			let editList = [...state.formDetails.items];

			for (let i = 0; i < editList.length; i++) {
				if (i === action.data) {
					editList.splice(i, 1);
				}
			}

			return {
				...state,
				formDetails: { ...state.formDetails, items: editList },
			};

		case actionTypes.SET_EDIT_PAYMENT_TERMS:
			return {
				...state,
				formDetails: {
					...state.formDetails,
					paymentTerms: action.data,
				},
			};

		case actionTypes.SET_EDIT_DATE:
			return {
				...state,
				formDetails: {
					...state.formDetails,
					createdAt: action.data,
				},
			};

		case actionTypes.EDIT_INPUT:
			return {
				...state,
				formDetails: action.data,
			};

		default:
			return state;
	}
};
