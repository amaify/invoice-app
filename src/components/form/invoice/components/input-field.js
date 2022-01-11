import React, { useState } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import moment from "moment";

import ListItems from "./list-items";
import PaymentTerms from "./payment-terms";
import Input from "../../input/input";
import Button from "../../../buttons/buttons";
import Calendar from "../../../calendar/calendar";
import { parseDate } from "../../../util/utility";

import CalendarImage from "../../../../assets/images/icon-calendar.svg";
import { hideForm } from "../../../../store/actions/formAction";

function InputField(props) {
	const {
		onSendPending,
		onSaveDraft,
		handleInputChange,
		formData,
		senderDetails,
		validateForm,

		errors,
		isError,
		listError,
		listItemError,
		editForm,
		formDetails,
		onEditFormSave,
		editHandleInputChange,
		onHandleBlur,
		onDiscardFormInputs,
		pendingLoading,
		draftLoading,
	} = props;

	const dispatch = useDispatch();

	let [showCalendar, setShowCalendar] = useState(false);
	let [showDate, setShowDate] = useState(false);

	let [dateContext] = useState(moment());
	let visibleDate = useSelector((state) => state.form.date);

	const year = () => dateContext.format("Y");
	const month = () => dateContext.format("MMM");
	const currentDate = () => dateContext.get("date");

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

	const onCancelEditForm = () => {
		return dispatch(hideForm());
	};

	return (
		<form
			className="form-elements"
			onSubmit={
				!editForm
					? onSendPending || onSaveDraft || onDiscardFormInputs
					: onEditFormSave
			}
			data-testid="invoice-form"
		>
			<div className="form-elements__group--main">
				<Input
					group="Bill From"
					id="Address"
					name="senderStreet"
					label="Street Address"
					type="text"
					defaultValue={senderDetails.senderStreet}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					className={
						errors.streetError === ""
							? "form-elements__group--input form-elements__group--sender"
							: "form-elements__group--input inputError"
					}
					error={errors.streetError}
				/>
				<p className="form-elements__group--main-error">{errors.streetError}</p>
			</div>
			<div className="form-elements__group--sub">
				<div className="form-elements__group--main form-elements__group--main-mobile1">
					<Input
						label="City"
						id="city"
						type="text"
						name="senderCity"
						defaultValue={senderDetails.senderCity}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						className={
							errors.cityError === ""
								? "form-elements__group--subInput form-elements__group--sender"
								: "form-elements__group--subInput inputError"
						}
						error={errors.cityError}
					/>
					<p className="form-elements__group--main-error">{errors.cityError}</p>
				</div>

				<div className="form-elements__group--main form-elements__group--main-mobile2">
					<Input
						label="Post Code"
						id="postCode"
						name="senderPostCode"
						type="text"
						defaultValue={senderDetails.senderPostCode}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						className={
							errors.postCodeError === ""
								? "form-elements__group--subInput form-elements__group--sender"
								: "form-elements__group--subInput inputError"
						}
						error={errors.postCodeError}
					/>
					<p className="form-elements__group--main-error">
						{errors.postCodeError}
					</p>
				</div>

				<div className="form-elements__group--main form-elements__group--main-mobile3">
					<Input
						label="Country"
						id="country"
						name="senderCountry"
						type="text"
						defaultValue={senderDetails.senderCountry}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						className={
							errors.countryError === ""
								? "form-elements__group--subInput form-elements__group--sender"
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
					itemId="clientNameID"
					id="clientName"
					ariaLabelledby="clientNameID clientName"
					name="clientName"
					label="Client's Name"
					type="text"
					defaultValue={
						!editForm ? formData.clientName : formDetails.clientName
					}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					className={
						errors.clientNameError === ""
							? "form-elements__group--input form-elements__group--client"
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
					itemId="clientEmailID"
					id="clientEmail"
					ariaLabelledby="clientEmailID clientEmail"
					label="Client's Email"
					name="clientEmail"
					defaultValue={
						!editForm ? formData.clientEmail : formDetails.clientEmail
					}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					type="email"
					placeholder="e.g. email@example.com"
					className={
						errors.emailError === ""
							? "form-elements__group--input form-elements__group--client"
							: "form-elements__group--input inputError"
					}
					error={errors.emailError}
				/>
				<p className="form-elements__group--main-error">{errors.emailError}</p>
			</div>

			<div className="form-elements__group--main">
				<Input
					dataTestid="clientStreet"
					itemId="clientStreetID"
					id="clientStreet"
					ariaLabelledby="clientStreetID clientStreet"
					label="Street Address"
					name="clientStreet"
					type="text"
					defaultValue={
						!editForm ? formData.clientStreet : formDetails.clientStreet
					}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					className={
						errors.clientStreetError === ""
							? "form-elements__group--input form-elements__group--client"
							: "form-elements__group--input inputError"
					}
					error={errors.clientStreetError}
				/>
				<p className="form-elements__group--main-error">
					{errors.clientStreetError}
				</p>
			</div>

			<div className="form-elements__group--sub">
				<div className="form-elements__group--main form-elements__group--main-mobile1">
					<Input
						dataTestid="clientCity"
						label="City"
						id="city"
						type="text"
						name="clientCity"
						defaultValue={
							!editForm ? formData.clientCity : formDetails.clientCity
						}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						onBlur={onHandleBlur}
						className={
							errors.clientCityError === ""
								? "form-elements__group--subInput form-elements__group--client"
								: "form-elements__group--subInput inputError"
						}
						error={errors.clientCityError}
					/>
					<p className="form-elements__group--main-error">
						{errors.clientCityError}
					</p>
				</div>

				<div className="form-elements__group--main form-elements__group--main-mobile2">
					<Input
						dataTestid="clientPostCode"
						label="Post Code"
						id="postCode"
						type="text"
						name="clientPostCode"
						defaultValue={
							!editForm ? formData.clientPostCode : formDetails.clientPostCode
						}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						onBlur={onHandleBlur}
						className={
							errors.clientPostCodeError === ""
								? "form-elements__group--subInput form-elements__group--client"
								: "form-elements__group--subInput inputError"
						}
						error={errors.clientPostCodeError}
					/>
					<p className="form-elements__group--main-error">
						{errors.clientPostCodeError}
					</p>
				</div>

				<div className="form-elements__group--main form-elements__group--main-mobile3">
					<Input
						dataTestid="clientCountry"
						label="Country"
						id="country"
						type="text"
						name="clientCountry"
						defaultValue={
							!editForm ? formData.clientCountry : formDetails.clientCountry
						}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						onBlur={onHandleBlur}
						className={
							errors.clientCountryError === ""
								? "form-elements__group--subInput form-elements__group--client"
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
									{!editForm
										? `${currentDate()} ${month()} ${year()}`
										: parseDate(formDetails.createdAt)}
								</span>
							) : (
								<span>
									{!editForm ? visibleDate : parseDate(formDetails.createdAt)}
								</span>
							)}

							<span>
								<img src={CalendarImage} alt="A Calendar" />
							</span>
						</p>
					</div>

					<Calendar
						selectedDate={getDateData}
						displayCalendar={displayCalendar}
						showCalendar={showCalendar}
					/>
				</div>

				<PaymentTerms
					editFormPaymentTerms={editForm ? formDetails.paymentTerms : ""}
				/>
			</div>

			<div className="form-elements__group--main">
				<Input
					itemId="projectDescriptionID"
					id="projectDescription"
					ariaLabelledby="projectDescriptionID projectDescription"
					label="Project Description"
					name="description"
					type="text"
					defaultValue={
						!editForm ? formData.description : formDetails.description
					}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					placeholder="e.g. Graphic Design Service"
					className={
						errors.projectDescriptionError === ""
							? "form-elements__group--input form-elements__group--client"
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
				onHandleBlur={onHandleBlur}
				listItemError={listItemError}
				itemNameError={errors.itemNameError}
				itemPriceError={errors.itemPriceError}
				itemQuantityError={errors.itemQuantityError}
				editFormListItems={editForm ? formDetails.items : ""}
				errors={errors}

				// validateForm={validateForm}
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

			{!editForm ? (
				<div className="form-elements__group--items-btns">
					<Button type="3" text="Discard" onClick={onDiscardFormInputs} />
					<Button
						type="4"
						text={!draftLoading ? "Save as Draft" : "Saving...."}
						onClick={onSaveDraft}
					/>
					<Button
						type="2"
						text={!pendingLoading ? "Save & Send" : "Sending...."}
						onClick={onSendPending}
					/>
				</div>
			) : (
				<div className="form-elements__group--items-btns form-elements__group--items-editBtns">
					<Button type="6" text="Cancel" onClick={onCancelEditForm} />
					<Button
						type="2"
						text={!pendingLoading ? "Save Changes" : "Saving...."}
						onClick={onEditFormSave}
					/>
				</div>
			)}
		</form>
	);
}

const mapStateToProps = (state) => {
	return {
		editForm: state.form.editForm,
		date: state.form.date,
		paymentTerms: state.form.paymentTerms,
		showForm: state.form.showForm,
		listItems: state.form.listItems,
		pendingLoading: state.invoiceReducer.pendingLoading,
		draftLoading: state.invoiceReducer.draftLoading,
	};
};

export default connect(mapStateToProps, null)(InputField);
