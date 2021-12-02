import React, { useState } from "react";

import { connect } from "react-redux";

function Validate(formDetails, editForm, senderDetails, formData, addedItems) {
	// const { formDetails, editForm, senderDetails, formData } = props;
	const [errors, setErrors] = useState({
		emailError: "",
		inputError: "",
		cityError: "",
		streetError: "",
		countryError: "",
		postCodeError: "",
		projectDescriptionError: "",
		clientNameError: "",

		itemNameError: "",
		itemPriceError: "",
		itemQuantityError: "",

		clientStreetError: "",
		clientCityError: "",
		clientPostCodeError: "",
		clientCountryError: "",
		listItemError: false,
	});

	const [submitPending, setSubmitPending] = useState(false);
	const [submitDraft, setSubmitDraft] = useState(false);
	const [submitEditForm, setSubmitEditForm] = useState(false);

	const [isError, setIsError] = useState(false);
	const [listError, setListError] = useState(false);
	const [listItemError, setListItemError] = useState(false);

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	let emailError = "";
	let cityError = "";
	let streetError = "";
	let postCodeError = "";
	let countryError = "";
	let projectDescriptionError = "";
	let clientNameError = "";
	let clientStreetError = "";
	let clientCityError = "";
	let clientPostCodeError = "";
	let clientCountryError = "";

	let itemNameError = "";
	let itemPriceError = "";
	let itemQuantityError = "";

	// let listItemError = false;

	if (!editForm) {
		if (formData.clientEmail === "") {
			emailError = "Can't be empty";
		} else if (!validateEmail(formData.clientEmail)) {
			emailError = "Invalid email";
		}
	} else {
		if (formDetails.clientEmail === "") {
			emailError = "Can't be empty";
		} else if (!validateEmail(formDetails.clientEmail)) {
			emailError = "Invalid email";
		}
	}
	// if (formData.clientEmail === "") {
	// 	emailError = "Can't be empty";
	// } else if (!validateEmail(formData.clientEmail)) {
	// 	emailError = "Invalid email";
	// }

	// if (!formData.senderStreet) streetError = "Can't be empty";

	if (!editForm) {
		if (!senderDetails.senderStreet) {
			streetError = "New form Can't be empty";
		}
	} else {
		if (!senderDetails.senderStreet) {
			streetError = "Edit form Can't be empty";
		}
	}

	// if (!formData.senderPostCode) postCodeError = "Can't be empty";

	if (!editForm) {
		if (!senderDetails.senderPostCode) {
			postCodeError = "Can't be empty";
		}
	} else {
		if (!senderDetails.senderPostCode) {
			postCodeError = "Can't be empty";
		}
	}

	// if (!formData.senderCity) cityError = "Can't be empty";

	if (!editForm) {
		if (!senderDetails.senderCity) {
			cityError = "Can't be empty";
		}
	} else {
		if (!senderDetails.senderCity) {
			cityError = "Can't be empty";
		}
	}

	// if (!formData.senderCountry) countryError = "Can't be empty";

	if (!editForm) {
		if (!senderDetails.senderCountry) {
			countryError = "Can't be empty";
		}
	} else {
		if (!senderDetails.senderCountry) {
			countryError = "Can't be empty";
		}
	}

	// if (!formData.clientStreet) clientCountryError = "Can't be empty";

	if (!editForm) {
		if (!formData.clientStreet) {
			clientStreetError = "Can't be empty";
		}
	} else {
		if (!formDetails.clientStreet) {
			clientStreetError = "Can't be empty";
		}
	}

	// if (!formData.clientCity) clientCityError = "Can't be empty";

	if (!editForm) {
		if (!formData.clientCity) {
			clientCityError = "Can't be empty";
		}
	} else {
		if (!formDetails.clientCity) {
			clientCityError = "Can't be empty";
		}
	}

	// if (!formData.clientPostCode) clientPostCodeError = "Can't be empty";

	if (!editForm) {
		if (!formData.clientPostCode) {
			clientPostCodeError = "Can't be empty";
		}
	} else {
		if (!formDetails.clientPostCode) {
			clientPostCodeError = "Can't be empty";
		}
	}

	// if (!formData.clientCountry) clientCountryError = "Can't be empty";

	if (!editForm) {
		if (!formData.clientCountry) {
			clientCountryError = "Can't be empty";
		}
	} else {
		if (!formDetails.clientCountry) {
			clientCountryError = "Can't be empty";
		}
	}

	// if (!formData.clientStreet) clientStreetError = "Can't be empty";

	// if (!editForm) {
	// 	if (!formData.clientStreet) {
	// 		streetError = "Can't be empty";
	// 	}
	// } else {
	// 	if (!formDetails.clientStreet) {
	// 		streetError = "Can't be empty";
	// 	}
	// }

	// if (!formData.description) projectDescriptionError = "Can't be empty";

	if (!editForm) {
		if (!formData.description) {
			projectDescriptionError = "Can't be empty";
		}
	} else {
		if (!formDetails.description) {
			projectDescriptionError = "Can't be empty";
		}
	}

	// if (!formData.clientName) clientNameError = "Can't be empty";

	if (!editForm) {
		if (!formData.clientName) {
			clientNameError = "Can't be empty";
		}
	} else {
		if (!formDetails.clientName) {
			clientNameError = "Can't be empty";
		}
	}

	if (!editForm) {
		if (addedItems.length > 0) {
			addedItems.forEach((item) => {
				// if (!item.itemName || !item.itemPrice || !item.total) {
				// 	setListItemError(true);
				// 	console.log("it is not empty");
				// } else {
				// 	setListItemError(false);
				// }
				if (!item.name) itemNameError = "itemName Error";
				if (!item.price) itemPriceError = "itemPrice Error";
				if (!item.quantity) itemQuantityError = "itemQuantity Error";
			});
			setListError(false);
		} else {
			setListError(true);
			console.log("listError here");
		}
	} else {
		if (formDetails.items.length > 0) {
			formDetails.items.forEach((item) => {
				if (!item.name) itemNameError = "itemName Error";
				if (!item.price) itemPriceError = "itemPrice Error";
				if (!item.quantity) itemQuantityError = "itemQuantity Error";
			});
			setListError(false);
		} else {
			setListError(true);
		}
	}

	if (
		emailError ||
		cityError ||
		streetError ||
		countryError ||
		postCodeError ||
		projectDescriptionError ||
		clientNameError ||
		clientCountryError ||
		clientStreetError ||
		clientPostCodeError ||
		clientCityError ||
		itemNameError ||
		itemQuantityError ||
		itemPriceError
	) {
		setErrors({
			emailError: emailError,
			cityError: cityError,
			streetError: streetError,
			countryError: countryError,
			postCodeError: postCodeError,
			projectDescriptionError: projectDescriptionError,
			clientNameError: clientNameError,
			clientStreetError: clientStreetError,
			clientCityError: clientCityError,
			clientPostCodeError: clientPostCodeError,
			clientCountryError: clientCountryError,
			listItemError: listItemError,
			itemNameError: itemNameError,
			itemPriceError: itemPriceError,
			itemQuantityError: itemQuantityError,
		});
		setSubmitPending(false);
		setSubmitEditForm(false);
		// setListItemError(true);
		// setSubmitDraft(false);
		setIsError(true);
		console.log(isError);
		console.log("Error occured here!");
		return false;
	} else {
		setErrors({
			emailError: "",
			cityError: "",
			streetError: "",
			postCodeError: "",
			countryError: "",
			clientStreetError: "",
			clientCityError: "",
			clientPostCodeError: "",
			clientCountryError: "",
			projectDescriptionError: "",
			clientNameError: "",
			itemNameError: "",
			itemPriceError: "",
			itemQuantityError: "",
		});
		setIsError(false);
	}

	// if (props.listItems.length < 1) {
	// 	setSubmitPending(false);
	// 	setListError(true);
	// 	console.log("it is empty");
	// 	return false;
	// } else {
	// 	setListError(false);

	// 	if (itemNameError || itemQuantityError || itemPriceError) {
	// 		setSubmitPending(false);
	// 		setIsError(true);
	// 		console.log("list item error");
	// 		return false;
	// 	}
	// }

	// if (!editForm) {
	// 	if (props.listItems.length < 1) {
	// 		setSubmitPending(false);
	// 		setListError(true);
	// 		console.log("it is empty");
	// 		return false;
	// 	} else {
	// 		setListError(false);

	// 		if (itemNameError || itemQuantityError || itemPriceError) {
	// 			setSubmitPending(false);
	// 			setIsError(true);
	// 			console.log("list item error");
	// 			return false;
	// 		}
	// 	}
	// } else {
	// 	if (formDetails.items.length < 1) {
	// 		setSubmitEditForm(false);
	// 		setListError(true);
	// 		console.log("it is empty");
	// 		return false;
	// 	} else {
	// 		setListError(false);
	// 		if (itemNameError || itemQuantityError || itemPriceError) {
	// 			setSubmitEditForm(false);
	// 			setIsError(true);
	// 			console.log("list item error");
	// 			return false;
	// 		}
	// 	}
	// }

	// if (itemNameError || itemPriceError || itemQuantityError) {
	// 	setSubmitPending(false);
	// 	setIsError(true);
	// 	// return false;
	// } else {
	// 	setIsError(false);
	// }

	if (listError) {
		setSubmitPending(false);
		setSubmitEditForm(false);
		return false;
	}

	setIsError(false);

	return true;
}

// const mapStateToProps = (state) => {
// 	return {
// 		editForm: state.form.editForm,
// 		formDetails: state.form.formDetails,
// 		date: state.form.date,
// 		paymentTerms: state.form.paymentTerms,
// 		showForm: state.form.showForm,
// 		listItems: state.form.listItems,
// 	};
// };

export default Validate;
