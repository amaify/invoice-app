import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import Input from "../../input/input";
import Button from "../../../buttons/buttons";
import Delete from "../../../../assets/images/icon-delete.svg";
import { dispatchListItems } from "../../../../store/util/formUtility";
import { getListItems } from "../../../../store/actions/formAction";

function ListItems(props) {
	const dispatch = useDispatch();
	const [listItems, setListItems] = useState([]);

	const onItemChange = (e, index) => {
		const { name, value } = e.target;

		let newArray = [...listItems];
		newArray[index][name] = value;

		setListItems(newArray);
	};

	useEffect(() => {
		dispatch(getListItems(listItems));
	}, [listItems]);

	const addItemToList = (e) => {
		e.preventDefault();

		setListItems([
			...listItems,
			{ itemName: "", itemPrice: "", itemQuantity: "", total: "" },
		]);
	};

	const deleteList = (index) => {
		const newArray = [...listItems];
		newArray.splice(index, 1);
		setListItems(newArray);
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
				{listItems.length > 0 &&
					listItems.map((item, i) => {
						return (
							<div className="list" key={i * 1.9}>
								<div className="form-elements__group" id="item-name">
									<input
										type="text"
										defaultValue={item.itemName}
										name="itemName"
										onChange={(e) => onItemChange(e, i)}
										className={
											props.itemNameError === ""
												? "added-item"
												: "added-item list-error"
										}
									/>
								</div>

								<div className="form-elements__group" id="item-qty">
									<input
										type="number"
										defaultValue={item.itemQuantity}
										name="itemQuantity"
										onChange={(e) => onItemChange(e, i)}
										className={
											props.itemQuantityError === ""
												? "added-item"
												: "added-item list-error"
										}
									/>
								</div>

								<div className="form-elements__group" id="item-price">
									<input
										type="number"
										defaultValue={item.itemPrice}
										name="itemPrice"
										onChange={(e) => onItemChange(e, i)}
										className={
											props.itemPriceError === ""
												? "added-item"
												: "added-item list-error"
										}
									/>
								</div>
								<p className="total-price">
									{listItems.length > 0
										? (listItems[i].total = (
												listItems[i].itemQuantity * listItems[i].itemPrice
										  ).toFixed(2))
										: ""}
								</p>
								<img
									src={Delete}
									alt="Delete Item"
									className="delete-icon"
									onClick={() => deleteList(i)}
								/>
							</div>
						);
					})}
			</div>

			<Button text="+ Add New Item" type="6" onClick={addItemToList} />
			{/* <div>{JSON.stringify(listItems)}</div> */}
		</div>
	);
}

export default ListItems;
