import React, { useState, useEffect } from "react";

import Input from "../input/input";
import Delete from "../../../assets/images/icon-delete.svg";
import Button from "../../buttons/buttons";
import PaymentTerms from "./components/payment-terms";

import ArrowDown from "../../../assets/images/icon-arrow-down.svg";
import Calendar from "../../../assets/images/icon-calendar.svg";
import { connect } from "react-redux";

function Form(props) {
	let [listItems, setListItems] = useState([]);

	const addItemToList = (e) => {
		e.preventDefault();

		let items = `
		<div class="list">
			<div className="form-elements__group" id='item-name'>
				<input
					type='text'
					value=''
					name='itemName'
					onChange=''
				/>
			</div>
		
		
			<div className="form-elements__group" id='item-qty'>
				<input
					type='number'
					value=''
					name='itemQuantity'
					onChange=''
				/>
			</div>

			<div className="form-elements__group" id='item-price'>
				<input
					type='number'
					value=''
					name='itemPrice'
					onChange=''
				/>
			</div>
			<p>156.00</p>
			<img src=${Delete} alt="Delete Item" class="delete-icon"/>
		</div>`;

		setListItems([...listItems, items]);
	};

	console.log(listItems.length);
	// if (listItems.length !== 0) {
	// 	let deleteBtn = document.querySelector(".delete-icon");

	// 	// console.log(listItems.length);

	// 	// deleteBtn.addEventListener("click", () => {
	// 	// 	console.log("clicked");
	// 	// });
	// 	console.log(deleteBtn);
	// }

	useEffect(() => {
		if (listItems.length !== 0) {
			let deleteBtn = document.querySelectorAll(".list");

			// deleteBtn.addEventListener("click", (e) => {
			// 	const x = e.target.parentElement;
			// 	// console.log("clicked!");
			// 	console.log(x);
			// });
			// deleteBtn.forEach((btn, i) => {
			// 	btn.addEventListener("click", (e) => {
			// 		const x = e.target.parentElement.parentElement;
			// 		console.log(x);
			// 		// x.removeChild(x.childNodes[i]);
			// 	});
			// });
			// console.log(deleteBtn);
			deleteBtn.forEach((btn, i) => {
				btn.addEventListener("click", (e) => {
					if (e.target.classList.contains("delete-icon")) {
						e.target.parentElement.remove();
						// console.log(i);
						// console.log(listItems);
						let newArray = [...listItems];
						newArray.splice(i, 1);

						console.log(newArray);
						setListItems(newArray);
					}
				});
			});
		}
	}, [listItems]);

	return (
		<section className="form">
			{!props.editForm ? (
				<h2 className="form-heading">new invoice</h2>
			) : (
				<h2 className="form-heading">
					Edit <span>#</span>
					<span>xm9141</span>
				</h2>
			)}
			{/* <h2 className="form-heading">new invoice</h2> */}

			<form className="form-elements">
				<Input
					group="Bill From"
					id="Address"
					name="address"
					label="Street Address"
					type="text"
					className="form-elements__group--input"
				/>
				<div className="form-elements__group--sub">
					<Input
						label="City"
						id="city"
						type="text"
						name="city"
						value=""
						className="form-elements__group--subInput"
					/>
					<Input
						label="Post Code"
						id="postCode"
						name="postCode"
						type="text"
						value=""
						className="form-elements__group--subInput"
					/>
					<Input
						label="Country"
						id="country"
						name="country"
						type="text"
						value=""
						className="form-elements__group--subInput"
					/>
				</div>

				<Input
					group="Bill To"
					id="client-name"
					name="clientName"
					label="Client's Name"
					type="text"
					className="form-elements__group--input"
				/>

				<Input
					id="client-email"
					label="Client's Email"
					name="clientEmail"
					type="email"
					className="form-elements__group--input"
				/>

				<Input
					id="client-address"
					label="Street Address"
					name="clientAddress"
					type="email"
					placeholder="e.g. email@example.com"
					className="form-elements__group--input"
				/>

				<div className="form-elements__group--sub">
					<Input
						label="City"
						id="city"
						type="text"
						name="clientCity"
						value=""
						className="form-elements__group--subInput"
					/>
					<Input
						label="Post Code"
						id="postCode"
						type="text"
						name="clientPostCode"
						value=""
						className="form-elements__group--subInput"
					/>
					<Input
						label="Country"
						id="country"
						type="text"
						name="clientCountry"
						value=""
						className="form-elements__group--subInput"
					/>
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
						<div>
							<p>
								<span>10 Sept 2021</span>
								<span>
									<img src={Calendar} alt="Directional Arrow" />
								</span>
							</p>
						</div>
					</div>

					<PaymentTerms />
				</div>

				<Input
					id="projectDescription"
					label="Project Description"
					name="projectDescription"
					type="text"
					placeholder="e.g. Graphic Design Service"
					className="form-elements__group--input"
				/>

				<div className="form-elements__group--items">
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
					>
						{/* <Input type="text" name="itemName" itemId="item-name" />
						<Input type="Number" name="itemQuantity" itemId="item-qty" />
						<Input type="Number" name="itemPrice" itemId="item-price" />
						<p>156.00</p>
						<img src={Delete} alt="Delete Item" /> */}
					</div>
					{/* {listItems.map((list) => list.props.children)} */}
					<Button text="+ Add New Item" type="6" onClick={addItemToList} />
				</div>

				{/* <div className="form-elements__group--items-btns">
					<Button type="3" text="Discard" />
					<Button type="4" text="Save as Draft" />
					<Button type="2" text="Save &amp; Send" />
				</div> */}

				{!props.editForm ? (
					<div className="form-elements__group--items-btns">
						<Button type="3" text="Discard" />
						<Button type="4" text="Save as Draft" />
						<Button type="2" text="Save &amp; Send" />
					</div>
				) : (
					<div className="form-elements__group--items-btns form-elements__group--items-editBtns">
						<Button type="6" text="Cancel" />
						<Button type="2" text="Save Changes" />
					</div>
				)}
			</form>
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		editForm: state.form.editForm,
	};
};

export default connect(mapStateToProps, null)(Form);
