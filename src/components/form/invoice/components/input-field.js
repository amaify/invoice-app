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
		listItemError,

		errors,
		isError,
		listError,
		editForm,
		formDetails,
		onEditFormSave,
		editHandleInputChange,
		onHandleBlur,
		onDiscardFormInputs,
		pendingLoading,
		draftLoading,
		// calendarClass,
		// displayCalendar,
		// getDateData,
		// showCalendar,
		// showDate,
	} = props;

	const dispatch = useDispatch();

	let [showCalendar, setShowCalendar] = useState(false);
	let [showDate, setShowDate] = useState(false);

	let [dateContext, setDateContext] = useState(moment());
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
			// onSubmit={onSendPending || onSaveDraft || onEditFormSave}
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
					// defaultValue="3 Enfield Street"
					// value={editForm ? formDetails.senderAddress.street : ""}
					// value={editForm ? "3 Enfield Street" : ""}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					// className="form-elements__group--input"
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
						// defaultValue="Middlesbrough"
						// value={editForm ? formDetails.senderAddress.city : ""}
						// value={editForm ? "Middlesbrough" : ""}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						// className="form-elements__group--subInput"
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
						// defaultValue="TS1 4EH"
						// value={editForm ? formDetails.senderAddress.postCode : ""}
						// value={editForm ? "TS1 4EH" : ""}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						// className="form-elements__group--subInput"
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
						// value={editForm ? formDetails.senderAddress.country : ""}
						// defaultValue="England"
						// value={editForm ? "England" : ""}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						// className="form-elements__group--subInput"
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
					// value={editForm ? formDetails.clientName : ""}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					// className="form-elements__group--input"
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
					// value={editForm ? formDetails.clientEmail : ""}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					type="email"
					placeholder="e.g. email@example.com"
					// className="form-elements__group--input"
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
					// id="client-address"
					label="Street Address"
					name="clientStreet"
					type="text"
					defaultValue={
						!editForm ? formData.clientStreet : formDetails.clientStreet
					}
					// value={editForm ? formDetails.clientAddress.street : ""}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					// className="form-elements__group--input"
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
						// value={editForm ? formDetails.clientAddress.city : ""}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						onBlur={onHandleBlur}
						// className="form-elements__group--subInput"
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
						// value={editForm ? formDetails.clientAddress.postCode : ""}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						onBlur={onHandleBlur}
						// className="form-elements__group--subInput"
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
						// value={editForm ? formDetails.clientAddress.country : ""}
						onChange={!editForm ? handleInputChange : editHandleInputChange}
						onBlur={onHandleBlur}
						// className="form-elements__group--subInput"
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
				{/* <Input
            label="Invoice Date"
            id="date"
            name="invoiceDate"
            type="date"
            value=""
            className="form-elements__group--subInput"
        /> */}
				<div className="invoice-date">
					<label>Issue Date</label>
					<div className={calendarClass} onClick={displayCalendar}>
						<p>
							{/* <span>10 Sept 2021</span> */}
							{/* <span>{selectedDate}</span> */}
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
								// <span>{}</span>
							)}
							{/* //{" "}
                    <span>
                        // {currentDate()} {month()} {year()}
                        //{" "}
                    </span> */}
							<span>
								<img src={CalendarImage} alt="A Calendar" />
							</span>
						</p>
					</div>
					{/* {showCalendar ? (
						<Calendar
							selectedDate={getDateData}
							displayCalendar={displayCalendar}
						/>
					) : (
						""
					)} */}
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
					// id="projectDescription"
					label="Project Description"
					name="description"
					type="text"
					defaultValue={
						!editForm ? formData.description : formDetails.description
					}
					// value={editForm ? formDetails.description : ""}
					onChange={!editForm ? handleInputChange : editHandleInputChange}
					onBlur={onHandleBlur}
					placeholder="e.g. Graphic Design Service"
					// className="form-elements__group--input"
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

			{/* <div className="form-elements__group--items">
        <h3>item list</h3>

        <div className="form-elements__group--items-label">
            <p className="form-elements__group--items-label-1">Item Name</p>
            <p className="form-elements__group--items-label-2">Qty.</p>
            <p className="form-elements__group--items-label-3">Price</p>
            <p className="form-elements__group--items-label-4">Total</p>
        </div>

        <div
            dangerouslySetInnerHTML={{ __html: listItems.join(" ") }}
            className="form-elements__group--items-form"
        ></div>
        <div className="form-elements__group--items-form">{itemList}</div>
        {listItems.map((list) => list.props.children)}
        <Button text="+ Add New Item" type="6" onClick={addItemToList} />
    </div> */}
			<ListItems
				validateForm={validateForm}
				onHandleBlur={onHandleBlur}
				listItemError={listItemError}
				itemNameError={errors.itemNameError}
				itemPriceError={errors.itemPriceError}
				itemQuantityError={errors.itemQuantityError}
				editFormListItems={editForm ? formDetails.items : ""}
				errors={errors}
				validateForm={validateForm}
			/>

			{/* <div className="form-elements__group--items-btns">
        <Button type="3" text="Discard" />
        <Button type="4" text="Save as Draft" />
        <Button type="2" text="Save &amp; Send" />
    </div> */}
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
