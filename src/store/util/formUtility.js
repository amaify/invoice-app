import { showForm } from "../actions/formAction";

export const showFormAction = () => {
	return (dispatch) => {
		console.log("clicked");
		dispatch(showForm());
	};
};
