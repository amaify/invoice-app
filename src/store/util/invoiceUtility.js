import { getInvoice } from "../actions/invoiceAction";

export const displayInvoice = (data) => {
	return (dispatch) => {
		dispatch(getInvoice(data));
	};
};
