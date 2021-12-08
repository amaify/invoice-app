import React from "react";

function DetailMobileItems(props) {
	const { data } = props;

	return (
		<div className="details-items details-items__mobile">
			{/* <div className="details-items__heading">
				<p className="details-items__heading--title details-items__heading--title-1">
					item name
				</p>
				<p className="details-items__heading--title details-items__heading--title-2">
					QTY.
				</p>
				<p className="details-items__heading--title details-items__heading--title-3">
					price
				</p>
				<p className="details-items__heading--title details-items__heading--title-4">
					total
				</p>
			</div> */}

			<div className="details-items__list">
				{data.items.length !== 0 ? (
					data.items.map((item) => {
						return (
							<div
								className="details-items__list--items details-items__list--items-mobile"
								key={`${item.name}-mobile`}
							>
								<div className="details-items__list--items-details">
									<p className="details-items__list--items-item details-items__list--items-item-1">
										{item.name}
									</p>
									<div className="details-items__list--items-details-quantity">
										{/* <p className="details-items__list--items-item details-items__list--items-item-2">
												{item.quantity} &times; &#163; {item.price}
											</p> */}
										<p className="details-items__list--items-item details-items__list--items-item-3">
											{item.quantity} &times; &#163; {item.price}
										</p>
									</div>
								</div>

								<div className="details-items__list--items-total">
									<p className="details-items__list--items-item details-items__list--items-item-4">
										&#163; {item.total.toFixed(2)}
									</p>
								</div>
							</div>
						);
					})
				) : (
					<p className="no-items">No Items</p>
				)}
			</div>

			<div className="details-items__amount">
				<p className="details-items__amount--text details-items__amount--text-mobile">
					grand total
				</p>

				<p className="details-items__amount--figure">
					&#163; {!data.total ? "0" : data.total.toFixed(2)}
				</p>
			</div>
		</div>
	);
}

export default DetailMobileItems;
