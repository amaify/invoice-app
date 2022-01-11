import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";

import ArrowLeft from "../../../assets/images/icon-arrow-left.svg";

import InputField from "./components/input-field";

import {
	editInput,
	getDate,
	hideForm,
	paymentTerms,
} from "../../../store/actions/formAction";
import {
	submitFormDraft,
	submitFormPending,
} from "../../../store/util/formUtility";
import { updateInvoice } from "../../../store/util/invoiceUtility";

function Form(props) {
	const history = useHistory();
	const dispatch = useDispatch();
	const { formDetails, editForm } = props;

	const senderItems = localStorage.getItem("senderAddress");

	const addressItems = JSON.parse(senderItems);

	const [senderDetails] = useState({
		senderStreet: addressItems.street,
		senderCity: addressItems.city,
		senderPostCode: addressItems.postCode,
		senderCountry: addressItems.country,
	});

	const [formData, setFormData] = useState({
		clientStreet: "",
		clientCity: "",
		clientPostCode: "",
		clientCountry: "",

		clientName: "",
		clientEmail: "",
		description: "",
		date: "",
		paymentTerms: "",
		status: "",
		listOfItems: [],
	});

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

	const [isError, setIsError] = useState(false);
	const [listError, setListError] = useState(false);
	const [submitPending, setSubmitPending] = useState(false);
	const [submitDraft, setSubmitDraft] = useState(false);
	const [submitEditForm, setSubmitEditForm] = useState(false);

	const [onEditInput, setEditInput] = useState(
		editForm ? formDetails || onEditInput : ""
	);

	let [showDate] = useState(false);
	let [dateContext] = useState(moment());

	const year = () => dateContext.format("Y");
	const month = () => dateContext.format("MMM");
	const currentDate = () => dateContext.get("date");

	let dateElement = `${currentDate()} ${month()} ${year()}`;

	useEffect(() => {
		if (props.showForm) {
			dispatch(getDate(dateElement));
			dispatch(paymentTerms(30));
		}
	}, []);

	const validateEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	};

	const validateForm = () => {
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
		let listItemError = false;

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

		if (!editForm) {
			if (!senderDetails.senderStreet) {
				streetError = "New form Can't be empty";
			}
		} else {
			if (!senderDetails.senderStreet) {
				streetError = "Edit form Can't be empty";
			}
		}

		if (!editForm) {
			if (!senderDetails.senderPostCode) {
				postCodeError = "Can't be empty";
			}
		} else {
			if (!senderDetails.senderPostCode) {
				postCodeError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!senderDetails.senderCity) {
				cityError = "Can't be empty";
			}
		} else {
			if (!senderDetails.senderCity) {
				cityError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!senderDetails.senderCountry) {
				countryError = "Can't be empty";
			}
		} else {
			if (!senderDetails.senderCountry) {
				countryError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!formData.clientStreet) {
				clientStreetError = "Can't be empty";
			}
		} else {
			if (!formDetails.clientStreet) {
				clientStreetError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!formData.clientCity) {
				clientCityError = "Can't be empty";
			}
		} else {
			if (!formDetails.clientCity) {
				clientCityError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!formData.clientPostCode) {
				clientPostCodeError = "Can't be empty";
			}
		} else {
			if (!formDetails.clientPostCode) {
				clientPostCodeError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!formData.clientCountry) {
				clientCountryError = "Can't be empty";
			}
		} else {
			if (!formDetails.clientCountry) {
				clientCountryError = "Can't be empty";
			}
		}

		if (!editForm) {
			if (!formData.description) {
				projectDescriptionError = "Can't be empty";
			}
		} else {
			if (!formDetails.description) {
				projectDescriptionError = "Can't be empty";
			}
		}

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
			if (props.listItems.length > 0) {
				props.listItems.forEach((item) => {
					if (!item.name) itemNameError = "itemName Error";
					if (!item.price) itemPriceError = "itemPrice Error";
					if (!item.quantity) itemQuantityError = "itemQuantity Error";
				});
				setListError(false);
			} else {
				setListError(true);
				listItemError = true;
				// console.log("listError here");
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
				listItemError = true;
				// return false;
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

			setIsError(true);

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

		if (listItemError) {
			setSubmitPending(false);
			setSubmitEditForm(false);
			// console.log("there is an errror here");
			return false;
		}

		setIsError(false);

		return true;
	};

	// console.log(listItemErrors);

	const onHandleBlur = () => {
		if (isError || listError) {
			return validateForm();
		}
	};

	const onDiscardFormInputs = (e) => {
		e.preventDefault();

		// console.log("cleared!!");

		const inputElement = document.querySelectorAll(
			".form-elements__group--client"
		);

		for (let i = 0; i < inputElement.length; i++) {
			inputElement[i].value = "";
		}

		// console.log(inputElement);

		dispatch(getDate(dateElement));
		dispatch(paymentTerms(30));

		props.listItems.length = 0;
	};

	useEffect(() => {
		let paymentTerms = props.paymentTerms;
		let listItems = props.listItems;

		formData.date = props.date;
		formData.paymentTerms = paymentTerms;
		formData.listOfItems = listItems;

		if (submitPending) {
			let isValid = validateForm();
			if (isValid) {
				console.log(formData);

				setSubmitPending(false);

				dispatch(submitFormPending(formData, props.token));
			}
		}
		// console.log(formData);
	}, [submitPending]);

	useEffect(() => {
		let paymentTerms = props.paymentTerms;
		let listItems = props.listItems;

		formData.date = props.date;
		formData.paymentTerms = paymentTerms;
		formData.listOfItems = listItems;

		if (submitDraft) {
			console.log(formData);

			setSubmitDraft(false);

			dispatch(submitFormDraft(formData, props.token));
		}
		// console.log(formData);
	}, [submitDraft]);

	useEffect(() => {
		if (submitEditForm) {
			let isValid = validateForm();
			if (isValid) {
				console.log(formDetails);
				formDetails.status = "Pending";
				setSubmitEditForm(false);

				dispatch(updateInvoice(formDetails, history, props.token));
			}
			// console.log(formDetails);
		}
	}, [submitEditForm]);

	const onSubmitForm = (e) => {
		e.preventDefault();
	};

	const onSendPending = (e) => {
		setFormData((prevState) => ({ ...prevState, status: "Pending" }));

		setSubmitPending(true);

		onSubmitForm(e);

		// console.log(formData);
	};

	const onSaveDraft = (e) => {
		setFormData((prevState) => ({ ...prevState, status: "Draft" }));

		setSubmitDraft(true);

		onSubmitForm(e);
	};

	const onEditFormSave = (e) => {
		e.preventDefault();

		setSubmitEditForm(true);

		return;
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	const editHandleInputChange = (e) => {
		const { name, value } = e.target;

		let updatedInput = { ...formDetails };

		updatedInput[name] = value;

		dispatch(editInput(updatedInput));
		setEditInput(updatedInput);
	};

	const onHideForm = () => {
		return dispatch(hideForm());
	};

	return (
		<section className="form">
			<div className="details-tiles__link form-link" onClick={onHideForm}>
				<picture className="form-link__img">
					<img src={ArrowLeft} alt="Arrow pointing left" />
				</picture>
				<p>Go back</p>
			</div>
			{!props.editForm ? (
				<h2 className="form-heading">new invoice</h2>
			) : (
				<h2 className="form-heading">
					Edit <span>#</span>
					<span>{formDetails.id}</span>
				</h2>
			)}

			<InputField
				onSendPending={onSendPending}
				onSaveDraft={onSaveDraft}
				handleInputChange={handleInputChange}
				formData={formData}
				senderDetails={senderDetails}
				validateForm={validateForm}
				errors={errors}
				isError={isError}
				listError={listError}
				showDate={showDate}
				formDetails={formDetails}
				onEditFormSave={onEditFormSave}
				editHandleInputChange={editHandleInputChange}
				onHandleBlur={onHandleBlur}
				onDiscardFormInputs={onDiscardFormInputs}
			/>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		editForm: state.form.editForm,
		formDetails: state.form.formDetails,
		date: state.form.date,
		paymentTerms: state.form.paymentTerms,
		showForm: state.form.showForm,
		listItems: state.form.listItems,
		token: state.authReducer.token,
	};
};

export default connect(mapStateToProps, null)(Form);
