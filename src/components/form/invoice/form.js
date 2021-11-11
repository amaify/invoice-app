import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import moment from "moment";

import Input from "../input/input";
import Delete from "../../../assets/images/icon-delete.svg";
import Button from "../../buttons/buttons";

import PaymentTerms from "./components/payment-terms";
import Calendar from "../../calendar/calendar";
import ListItems from "./components/list-items";
import InputField from "./components/input-field";

import ArrowDown from "../../../assets/images/icon-arrow-down.svg";
import CalendarImage from "../../../assets/images/icon-calendar.svg";
import {
	getDate,
	paymentTerms,
	submitPending,
} from "../../../store/actions/formAction";

function Form(props) {
	// let selectedDate, paymentTerms;
	// let paymentTerms
	let visibleDate = useSelector((state) => state.form.date);
	const dispatch = useDispatch();

	// const [listItems, setListItems] = useState([
	// 	{
	// 		itemName: "",
	// 		itemQuantity: "",
	// 		itemPrice: "",
	// 		total: "",
	// 	},
	// ]);

	// let [listData, setListData] = useState([]);

	const [formData, setFormData] = useState({
		// senderAddress: {
		// 	street: "",
		// 	city: "",
		// 	postCode: "",
		// 	country: "",
		// },

		// clientAddress: {
		// 	street: "",
		// 	city: "",
		// 	postCode: "",
		// 	country: "",
		// },

		// street: "",
		// city: "",
		// postCode: "",
		// country: "",
		senderStreet: "",
		senderCity: "",
		senderPostCode: "",
		senderCountry: "",

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
	const [listItemError, setListItemError] = useState(false);
	const [submitPending, setSubmitPending] = useState(false);
	const [submitDraft, setSubmitDraft] = useState(false);

	// const [senderAddress, setSenderAddress] = useState({
	// 	street: "",
	// 	city: "",
	// 	postCode: "",
	// 	country: "",
	// });

	// const [clientAddress, setClientAddress] = useState({
	// 	street: "",
	// 	city: "",
	// 	postCode: "",
	// 	country: "",
	// });

	// const [clientName, setClientName] = useState({ clientName: "" });
	// const [clientEmail, setClientEmail] = useState({ clientEmail: "" });
	// const [projectDescription, setProjectDescription] = useState({
	// 	projectDescription: "",
	// });

	// let [itemList, setItemList] = useState([]);
	let [showCalendar, setShowCalendar] = useState(false);
	let [showDate, setShowDate] = useState(false);
	// let [selectedDate, setSelectedDate] = useState("");
	let [dateContext, setDateContext] = useState(moment());

	const { formDetails } = props;

	const year = () => dateContext.format("Y");
	const month = () => dateContext.format("MMM");
	const currentDate = () => dateContext.get("date");

	let dateElement = `${currentDate()} ${month()} ${year()}`;

	// props.showForm ? dispatch(getDateData(dateElement)) : null;

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

		// let listItemError = false;

		if (formData.clientEmail === "") {
			emailError = "Can't be empty";
		} else if (!validateEmail(formData.clientEmail)) {
			emailError = "Invalid email";
		}

		if (!formData.senderStreet) streetError = "Can't be empty";

		if (!formData.senderPostCode) postCodeError = "Can't be empty";

		if (!formData.senderCity) cityError = "Can't be empty";

		if (!formData.senderCountry) countryError = "Can't be empty";

		if (!formData.clientStreet) clientCountryError = "Can't be empty";

		if (!formData.clientCity) clientCityError = "Can't be empty";

		if (!formData.clientPostCode) clientPostCodeError = "Can't be empty";

		if (!formData.clientCountry) clientCountryError = "Can't be empty";

		if (!formData.clientStreet) clientStreetError = "Can't be empty";

		if (!formData.description) projectDescriptionError = "Can't be empty";

		if (!formData.clientName) clientNameError = "Can't be empty";

		if (props.listItems.length > 0) {
			props.listItems.forEach((item) => {
				// if (!item.itemName || !item.itemPrice || !item.total) {
				// 	setListItemError(true);
				// 	console.log("it is not empty");
				// } else {
				// 	setListItemError(false);
				// }
				if (!item.itemName) itemNameError = "itemName Error";
				if (!item.itemPrice) itemPriceError = "itemPrice Error";
				if (!item.itemQuantity) itemQuantityError = "itemQuantity Error";
			});
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
			// setListItemError(true);
			// setSubmitDraft(false);
			setIsError(true);
			// return false;
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

		if (props.listItems.length < 1) {
			setSubmitPending(false);
			setListError(true);
			console.log("it is empty");
			return false;
		} else {
			setListError(false);

			if (itemNameError || itemQuantityError || itemPriceError) {
				setSubmitPending(false);
				setIsError(true);
				console.log("list item error");
				return false;
			}
		}

		// if (itemNameError || itemPriceError || itemQuantityError) {
		// 	setSubmitPending(false);
		// 	setIsError(true);
		// 	// return false;
		// } else {
		// 	setIsError(false);
		// }

		setIsError(false);

		return true;
	};

	// const y =

	useEffect(() => {
		let date = new Date(props.date).toISOString().split("T")[0];
		let paymentTerms = props.paymentTerms;
		let listItems = props.listItems;

		formData.date = date;
		formData.paymentTerms = paymentTerms;
		formData.listOfItems = listItems;

		// console.log(formData);
		// dispatch(submitPending(formData));
		// console.log(submitBtn);
		if (submitPending) {
			let isValid = validateForm();
			if (isValid) {
				console.log(formData);

				setSubmitPending(false);
			}
		}
		// console.log(formData);
	}, [submitPending]);

	useEffect(() => {
		let date = new Date(props.date).toISOString().split("T")[0];
		let paymentTerms = props.paymentTerms;
		let listItems = props.listItems;

		formData.date = date;
		formData.paymentTerms = paymentTerms;
		formData.listOfItems = listItems;

		// console.log(formData);
		// dispatch(submitPending(formData));
		console.log(submitDraft);
		if (submitDraft) {
			console.log(formData);

			setSubmitDraft(false);
		}
		// console.log(formData);
	}, [submitDraft]);

	const onSubmitForm = (e) => {
		e.preventDefault();

		// let isValid = validateForm();
		// setFormData({
		// 	...formData,
		// 	date: props.date,
		// 	paymentTerms: props.paymentTerms,
		// });

		// let date = props.date;
		// let paymentTerms = props.paymentTerms;
		// let listItems = props.listItems;

		// console.log(x);
		// console.log(y);

		// formData.date = date;
		// formData.paymentTerms = paymentTerms;
		// formData.listOfItems = listItems;

		// if (isValid) {
		// 	console.log(formData);
		// }
	};

	const onSendPending = (e) => {
		// setFormData({ ...formData, status: "Pending" });
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
	// console.log(formData.status);

	// console.log(formData.status);

	useMemo(() => {
		console.log(errors);
		console.log(isError);
		console.log(listError);
	}, [errors]);

	// console.log(errors);
	// console.log(isError);

	let calendarClass;

	!showCalendar
		? (calendarClass = "invoice-date__items")
		: (calendarClass = "invoice-date__items invoice-date__items--active");

	const displayCalendar = () => {
		showCalendar ? setShowCalendar(false) : setShowCalendar(true);
	};

	const getDateData = () => {
		setShowDate(true);
		// setSelectedDate(data);
	};

	// useEffect(() => {
	// 	getDateData();
	// }, []);

	// const onDeleteList = (e, i) => {
	// 	let newArray = [...itemList];

	// 	newArray.slice(i, 1);

	// 	setItemList(newArray);
	// };

	// const onListItemChange = (evt) => {
	// 	const { name, value } = evt.target;

	// 	// const list = [...listItems];

	// 	// list[i][name] = value;

	// 	// setListItems(list);
	// 	console.log(name);
	// 	setListItems({ ...listItems, [name]: value });

	// 	setListData([...listData, listItems]);
	// };

	const addItemToList = (e) => {
		// e.preventDefault();
		// let items =
		// <div class="list">
		// 	<div className="form-elements__group" id='item-name'>
		// 		<input
		// 			type='text'
		// 			value=''
		// 			name='itemName'
		// 			onChange=""
		// 			class="added-item"
		// 		/>
		// 	</div>
		// 	<div className="form-elements__group" id='item-qty'>
		// 		<input
		// 			type='number'
		// 			value=''
		// 			name='itemQuantity'
		// 			onChange=""
		// 			class="added-item"
		// 		/>
		// 	</div>
		// 	<div className="form-elements__group" id='item-price'>
		// 		<input
		// 			type='number'
		// 			value=''
		// 			name='itemPrice'
		// 			onChange=""
		// 			class="added-item"
		// 		/>
		// 	</div>
		// 	<p class="total-price"></p>
		// 	<img src={Delete} alt="Delete Item" class="delete-icon"/>
		// </div>;
		// setItemList([
		// 	...itemList,
		// 	<ListItems
		// 		onListItemChange={onListItemChange}
		// 		listItems={listItems}
		// 		listData={listData}
		// 		itemList={itemList}
		// 	/>,
		// ]);
		// console.log(itemList);
		// setListItems(...listItems, {
		// 	itemName: "",
		// 	itemQuantity: "",
		// 	itemPrice: "",
		// 	total: "",
		// });
	};

	// console.log(listItems);

	// useEffect(() => {
	// 	if (itemList.length !== 0) {
	// 		// let deleteBtn = document.querySelectorAll(".list");

	// 		let deleteBtn = document.querySelectorAll(".delete-icon");
	// 		// let deleteBtn = document.querySelector(
	// 		// 	".form-elements__group--items-form"
	// 		// );
	// 		// let itemList = document.querySelectorAll(".added-item");
	// 		// let itemName = document.getElementById("item-name");
	// 		// let itemPrice = document.getElementById("item-price");
	// 		// let itemQty = document.getElementById("item-qty");
	// 		// let priceTotal = document.querySelector(".total-price");
	// 		// deleteBtn.addEventListener("click", (e) => {
	// 		// 	const x = e.target.parentElement;
	// 		// 	// console.log("clicked!");
	// 		// 	console.log(x);
	// 		// });
	// 		// deleteBtn.forEach((btn, i) => {
	// 		// 	btn.addEventListener("click", (e) => {
	// 		// 		const x = e.target.parentElement.parentElement;
	// 		// 		console.log(x);
	// 		// 		// x.removeChild(x.childNodes[i]);
	// 		// 	});
	// 		// });
	// 		// console.log(deleteBtn);

	// 		deleteBtn.forEach((btn, i) => {
	// 			btn.addEventListener("click", (e) => {
	// 				// if (e.target.classList.contains("delete-icon")) {
	// 				// e.target.parentElement.remove();

	// 				let newArray = [...itemList];
	// 				newArray.splice(i, 1);
	// 				setItemList(newArray);
	// 				// }
	// 			});
	// 		});
	// 	}
	// }, [itemList]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};

	return (
		<section className="form">
			{!props.editForm ? (
				<h2 className="form-heading">new invoice</h2>
			) : (
				<h2 className="form-heading">
					Edit <span>#</span>
					<span>{formDetails.id}</span>
				</h2>
			)}
			{/* <h2 className="form-heading">new invoice</h2> */}

			<InputField
				onSendPending={onSendPending}
				onSaveDraft={onSaveDraft}
				handleInputChange={handleInputChange}
				formData={formData}
				validateForm={validateForm}
				errors={errors}
				isError={isError}
				listError={listError}
				calendarClass={calendarClass}
				getDateData={getDateData}
				displayCalendar={displayCalendar}
				showDate={showDate}
				formDetails={formDetails}
			/>

			{/* <form className="form-elements" onSubmit={onSendPending || onSaveDraft}>
				<div className="form-elements__group--main">
					<Input
						group="Bill From"
						id="Address"
						name="senderStreet"
						label="Street Address"
						type="text"
						defaultValue={formData.senderStreet}
						onChange={handleInputChange}
						className={
							errors.streetError === ""
								? "form-elements__group--input"
								: "form-elements__group--input inputError"
						}
						error={errors.streetError}
					/>
					<p className="form-elements__group--main-error">
						{errors.streetError}
					</p>
				</div>
				<div className="form-elements__group--sub">
					<div className="form-elements__group--main">
						<Input
							label="City"
							id="city"
							type="text"
							name="senderCity"
							defaultValue={formData.senderCity}
							onChange={handleInputChange}
							className={
								errors.cityError === ""
									? "form-elements__group--subInput"
									: "form-elements__group--subInput inputError"
							}
							error={errors.cityError}
						/>
						<p className="form-elements__group--main-error">
							{errors.cityError}
						</p>
					</div>

					<div className="form-elements__group--main">
						<Input
							label="Post Code"
							id="postCode"
							name="senderPostCode"
							type="text"
							defaultValue={formData.senderPostCode}
							onChange={handleInputChange}
							className={
								errors.postCodeError === ""
									? "form-elements__group--subInput"
									: "form-elements__group--subInput inputError"
							}
							error={errors.postCodeError}
						/>
						<p className="form-elements__group--main-error">
							{errors.postCodeError}
						</p>
					</div>

					<div className="form-elements__group--main">
						<Input
							label="Country"
							id="country"
							name="senderCountry"
							type="text"
							defaultValue={formData.senderCountry}
							onChange={handleInputChange}
							className={
								errors.countryError === ""
									? "form-elements__group--subInput"
									: "form-elements__group--subInput inputError"
							}
							error={errors.countryError}
						/>
						<p className="form-elements__group--main-error">
							{errors.countryError}
						</p>
					</div>
				</div>

				<div className="form-elements__group--main">
					<Input
						group="Bill To"
						id="client-name"
						name="clientName"
						label="Client's Name"
						type="text"
						defaultValue={formData.clientName}
						onChange={handleInputChange}
						className={
							errors.clientNameError === ""
								? "form-elements__group--input"
								: "form-elements__group--input inputError"
						}
						error={errors.clientNameError}
					/>
					<p className="form-elements__group--main-error">
						{errors.clientNameError}
					</p>
				</div>

				<div className="form-elements__group--main">
					<Input
						id="client-email"
						label="Client's Email"
						name="clientEmail"
						defaultValue={formData.clientEmail}
						onChange={handleInputChange}
						type="email"
						placeholder="e.g. email@example.com"
						className={
							errors.emailError === ""
								? "form-elements__group--input"
								: "form-elements__group--input inputError"
						}
						error={errors.emailError}
					/>
					<p className="form-elements__group--main-error">
						{errors.emailError}
					</p>
				</div>

				<div className="form-elements__group--main">
					<Input
						id="client-address"
						label="Street Address"
						name="clientStreet"
						type="text"
						defaultValue={formData.clientStreet}
						onChange={handleInputChange}
						className={
							errors.clientStreetError === ""
								? "form-elements__group--input"
								: "form-elements__group--input inputError"
						}
						error={errors.clientStreetError}
					/>
					<p className="form-elements__group--main-error">
						{errors.clientStreetError}
					</p>
				</div>

				<div className="form-elements__group--sub">
					<div className="form-elements__group--main">
						<Input
							label="City"
							id="city"
							type="text"
							name="clientCity"
							defaultValue={formData.clientCity}
							onChange={handleInputChange}
							className={
								errors.clientCityError === ""
									? "form-elements__group--subInput"
									: "form-elements__group--subInput inputError"
							}
							error={errors.clientCityError}
						/>
						<p className="form-elements__group--main-error">
							{errors.clientCityError}
						</p>
					</div>

					<div className="form-elements__group--main">
						<Input
							label="Post Code"
							id="postCode"
							type="text"
							name="clientPostCode"
							defaultValue={formData.clientPostCode}
							onChange={handleInputChange}
							className={
								errors.clientPostCodeError === ""
									? "form-elements__group--subInput"
									: "form-elements__group--subInput inputError"
							}
							error={errors.clientPostCodeError}
						/>
						<p className="form-elements__group--main-error">
							{errors.clientPostCodeError}
						</p>
					</div>

					<div className="form-elements__group--main">
						<Input
							label="Country"
							id="country"
							type="text"
							name="clientCountry"
							defaultValue={formData.clientCountry}
							onChange={handleInputChange}
							className={
								errors.clientCountryError === ""
									? "form-elements__group--subInput"
									: "form-elements__group--subInput inputError"
							}
							error={errors.clientCountryError}
						/>
						<p className="form-elements__group--main-error">
							{errors.clientCountryError}
						</p>
					</div>
				</div>

				<div className="form-elements__group--period">
					
					<div className="invoice-date">
						<label>Issue Date</label>
						<div className={calendarClass} onClick={displayCalendar}>
							<p>
								
								{!showDate ? (
									<span>
										{currentDate()} {month()} {year()}
									</span>
								) : (
									<span>{visibleDate}</span>
								)}
								
								<span>
									<img src={CalendarImage} alt="A Calendar" />
								</span>
							</p>
						</div>
						{showCalendar ? (
							<Calendar
								selectedDate={getDateData}
								displayCalendar={displayCalendar}
							/>
						) : (
							""
						)}
					</div>

					<PaymentTerms />
				</div>

				<div className="form-elements__group--main">
					<Input
						id="projectDescription"
						label="Project Description"
						name="description"
						type="text"
						defaultValue={formData.description}
						onChange={handleInputChange}
						placeholder="e.g. Graphic Design Service"
						className={
							errors.projectDescriptionError === ""
								? "form-elements__group--input"
								: "form-elements__group--input inputError"
						}
						error={errors.projectDescriptionError}
					/>
					<p className="form-elements__group--main-error">
						{errors.projectDescriptionError}
					</p>
				</div>

				
				<ListItems
					validateForm={validateForm}
					listItemError={listItemError}
					itemNameError={errors.itemNameError}
					itemPriceError={errors.itemPriceError}
					itemQuantityError={errors.itemQuantityError}
				/>

				
				<div className="form-error">
					{isError && (
						<p className="form-error__text form-error__all">
							&ndash; All fields must be added.
						</p>
					)}
					{listError && (
						<p className="form-error__text form-error__items">
							&ndash; An item must be added.
						</p>
					)}
				</div>

				{!props.editForm ? (
					<div className="form-elements__group--items-btns">
						<Button type="3" text="Discard" />
						<Button type="4" text="Save as Draft" onClick={onSaveDraft} />
						<Button type="2" text="Save &amp; Send" onClick={onSendPending} />
					</div>
				) : (
					<div className="form-elements__group--items-btns form-elements__group--items-editBtns">
						<Button type="6" text="Cancel" />
						<Button type="2" text="Save Changes" />
					</div>
				)}
			</form> */}
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
	};
};

export default connect(mapStateToProps, null)(Form);
