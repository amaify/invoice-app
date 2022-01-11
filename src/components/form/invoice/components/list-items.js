import React, { useState } from "react";
import { useDispatch, connect } from "react-redux";

import Button from "../../../buttons/buttons";

import {
	addNewItemToList,
	deleteListItems,
	editListAddItems,
	editlistDelete,
	editOnChange,
	listOnChange,
} from "../../../../store/actions/formAction";

function ListItems(props) {
	const dispatch = useDispatch();
	const [, setListItems] = useState([]);
	const [, setEditListItems] = useState([]);

	const { editForm, editFormListItems, formDetails, listItems, onHandleBlur } =
		props;

	const onItemChange = (e, index) => {
		const { name, value } = e.target;

		let newArray = [...listItems];
		newArray[index][name] = value;

		setListItems(newArray);
		dispatch(listOnChange(newArray));
	};

	const onEditItemChange = (e, index) => {
		const { name, value } = e.target;

		let editListArray = [...formDetails.items];
		editListArray[index][name] = value;

		setEditListItems(editListArray);
		dispatch(editOnChange(editListArray));
	};

	const addItemToList = (e) => {
		e.preventDefault();

		if (!editForm) {
			return dispatch(addNewItemToList());
		} else {
			return dispatch(editListAddItems());
		}
	};

	const deleteList = (index) => {
		return dispatch(deleteListItems(index));
	};

	const onDeleteEditList = (index) => {
		return dispatch(editlistDelete(index));
	};

	return (
		<div className="form-elements__group--items">
			<h3>item list</h3>

			<div className="form-elements__group--items-label">
				<p className="form-elements__group--items-label-1">Item Name</p>
				<p className="form-elements__group--items-label-2">Qty.</p>
				<p className="form-elements__group--items-label-3">Price</p>
				<p className="form-elements__group--items-label-4">Total</p>
			</div>
			<div className="form-elements__group--items-form">
				{editForm
					? editFormListItems.map((item, i) => {
							return (
								<div className="list" key={i * 1.9}>
									<div className="form-elements__group" id="item-name">
										<label>Item Name</label>
										<input
											type="text"
											value={item.name}
											name="name"
											onChange={(e) => onEditItemChange(e, i)}
											onBlur={onHandleBlur}
											className={
												props.itemNameError === ""
													? "added-item"
													: "added-item list-error"
											}
										/>
									</div>

									<div className="form-elements__group" id="item-qty">
										<label>Qty.</label>
										<input
											type="number"
											value={item.quantity}
											name="quantity"
											onChange={(e) => onEditItemChange(e, i)}
											onBlur={onHandleBlur}
											className={
												props.itemQuantityError === ""
													? "added-item"
													: "added-item list-error"
											}
										/>
									</div>

									<div className="form-elements__group" id="item-price">
										<label>Price</label>
										<input
											type="number"
											value={item.price}
											name="price"
											onChange={(e) => onEditItemChange(e, i)}
											onBlur={onHandleBlur}
											className={
												props.itemPriceError === ""
													? "added-item"
													: "added-item list-error"
											}
										/>
									</div>
									<p className="total-price" data-testid="totalPrice">
										<label>Total</label>

										{(item.total = (item.quantity * item.price).toFixed(2))}
									</p>

									<svg
										width="13"
										height="16"
										xmlns="http://www.w3.org/2000/svg"
										className="delete-icon"
										onClick={() => onDeleteEditList(i)}
									>
										<path
											d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
											fillRule="nonzero"
										/>
									</svg>
								</div>
							);
					  })
					: listItems.length > 0 &&
					  listItems.map((item, i) => {
							return (
								<div className="list" key={i * 2.3}>
									<div className="form-elements__group" id="item-name">
										<label>Item Name</label>
										<input
											type="text"
											value={item.name}
											name="name"
											onChange={(e) => onItemChange(e, i)}
											onBlur={onHandleBlur}
											className={
												props.itemNameError === ""
													? "added-item"
													: "added-item list-error"
											}
											data-testid="itemName"
										/>
									</div>

									<div className="form-elements__group" id="item-qty">
										<label>Qty.</label>
										<input
											type="number"
											value={item.quantity}
											name="quantity"
											onChange={(e) => onItemChange(e, i)}
											onBlur={onHandleBlur}
											className={
												props.itemQuantityError === ""
													? "added-item"
													: "added-item list-error"
											}
											data-testid="itemQuantity"
										/>
									</div>

									<div className="form-elements__group" id="item-price">
										<label>Price</label>
										<input
											type="number"
											value={item.price}
											name="price"
											onChange={(e) => onItemChange(e, i)}
											onBlur={onHandleBlur}
											className={
												props.itemPriceError === ""
													? "added-item"
													: "added-item list-error"
											}
											data-testid="itemPrice"
										/>
									</div>
									<p className="total-price" data-testid="totalPrice">
										<label>Total</label>

										{(item.total = (item.price * item.quantity).toFixed(2))}
									</p>

									<svg
										width="13"
										height="16"
										xmlns="http://www.w3.org/2000/svg"
										className="delete-icon"
										onClick={() => deleteList(i)}
									>
										<path
											d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
											fillRule="nonzero"
										/>
									</svg>
								</div>
							);
					  })}
			</div>

			<Button
				text="+ Add New Item"
				type="6"
				onClick={addItemToList}
				dataTestid="addItemsButton"
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		editForm: state.form.editForm,
		formDetails: state.form.formDetails,
		listItems: state.form.listItems,
	};
};

export default connect(mapStateToProps, null)(ListItems);
