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

function InputField(props) {
	const {
		onSendPending,
		onSaveDraft,
		handleInputChange,
		formData,
		validateForm,
		listItemError,

		errors,
		isError,
		listError,
		editForm,
		formDetails,
		// calendarClass,
		// displayCalendar,
		// getDateData,
		// showCalendar,
		// showDate,
	} = props;

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

	return (
		<form className="form-elements" onSubmit={onSendPending || onSaveDraft}>
			<div className="form-elements__group--main">
				<Input
					group="Bill From"
					id="Address"
					name="senderStreet"
					label="Street Address"
					type="text"
					defaultValue={formData.senderStreet}
					value={editForm ? formDetails.senderAddress.street : ""}
					onChange={handleInputChange}
					// className="form-elements__group--input"
					className={
						errors.streetError === ""
							? "form-elements__group--input"
							: "form-elements__group--input inputError"
					}
					error={errors.streetError}
				/>
				<p className="form-elements__group--main-error">{errors.streetError}</p>
			</div>
			<div className="form-elements__group--sub">
				<div className="form-elements__group--main">
					<Input
						label="City"
						id="city"
						type="text"
						name="senderCity"
						defaultValue={formData.senderCity}
						value={editForm ? formDetails.senderAddress.city : ""}
						onChange={handleInputChange}
						// className="form-elements__group--subInput"
						className={
							errors.cityError === ""
								? "form-elements__group--subInput"
								: "form-elements__group--subInput inputError"
						}
						error={errors.cityError}
					/>
					<p className="form-elements__group--main-error">{errors.cityError}</p>
				</div>

				<div className="form-elements__group--main">
					<Input
						label="Post Code"
						id="postCode"
						name="senderPostCode"
						type="text"
						defaultValue={formData.senderPostCode}
						value={editForm ? formDetails.senderAddress.postCode : ""}
						onChange={handleInputChange}
						// className="form-elements__group--subInput"
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
						value={editForm ? formDetails.senderAddress.country : ""}
						onChange={handleInputChange}
						// className="form-elements__group--subInput"
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
					value={editForm ? formDetails.clientName : ""}
					onChange={handleInputChange}
					// className="form-elements__group--input"
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
					value={editForm ? formDetails.clientEmail : ""}
					onChange={handleInputChange}
					type="email"
					placeholder="e.g. email@example.com"
					// className="form-elements__group--input"
					className={
						errors.emailError === ""
							? "form-elements__group--input"
							: "form-elements__group--input inputError"
					}
					error={errors.emailError}
				/>
				<p className="form-elements__group--main-error">{errors.emailError}</p>
			</div>

			<div className="form-elements__group--main">
				<Input
					id="client-address"
					label="Street Address"
					name="clientStreet"
					type="text"
					defaultValue={formData.clientStreet}
					value={editForm ? formDetails.clientAddress.street : ""}
					onChange={handleInputChange}
					// className="form-elements__group--input"
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
						value={editForm ? formDetails.clientAddress.city : ""}
						onChange={handleInputChange}
						// className="form-elements__group--subInput"
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
						value={editForm ? formDetails.clientAddress.postCode : ""}
						onChange={handleInputChange}
						// className="form-elements__group--subInput"
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
						value={editForm ? formDetails.clientAddress.country : ""}
						onChange={handleInputChange}
						// className="form-elements__group--subInput"
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
					id="projectDescription"
					label="Project Description"
					name="description"
					type="text"
					defaultValue={formData.description}
					value={editForm ? formDetails.description : ""}
					onChange={handleInputChange}
					placeholder="e.g. Graphic Design Service"
					// className="form-elements__group--input"
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
				listItemError={listItemError}
				itemNameError={errors.itemNameError}
				itemPriceError={errors.itemPriceError}
				itemQuantityError={errors.itemQuantityError}
				editFormListItems={editForm ? formDetails.items : ""}
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
	};
};

export default connect(mapStateToProps, null)(InputField);
