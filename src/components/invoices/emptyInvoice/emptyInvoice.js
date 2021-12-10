import React from "react";

import EmptyImage from "../../../assets/images/illustration-empty.svg";

const EmptyInvoice = () => {
	return (
		<div className="invoice-empty" data-testid="empty-invoice">
			<picture className="invoice-empty__image">
				<img src={EmptyImage} alt="No Invoice Description" />
			</picture>

			<div className="invoice-empty__heading">
				<h2>There is nothing here</h2>
				<p>
					<span>Create an invoice by clicking the</span>
					<span>
						<b>New Invoice</b> button and get started
					</span>
				</p>
			</div>
		</div>
	);
};

export default EmptyInvoice;
