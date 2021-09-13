import React, { useState } from "react";

import ArrowDown from "../../../../assets/images/icon-arrow-down.svg";

function PaymentTerms() {
	let terms = [
		{ id: 1, text: "Net 1 Day", value: 1 },
		{ id: 2, text: "Net 7 Days", value: 7 },
		{ id: 3, text: "Net 14 Days", value: 14 },
		{ id: 4, text: "Net 30 Days", value: 30 },
	];

	let [visible, setVisible] = useState(false);

	const toggleList = () => {
		visible ? setVisible(false) : setVisible(true);
	};

	let imgClass;
	visible ? (imgClass = "rotate") : (imgClass = "default");

	return (
		<div className="payment-terms" onClick={toggleList}>
			<label>Payment Terms</label>
			<div>
				<p>
					<span>Net 30 Days</span>
					<span>
						<img src={ArrowDown} alt="Directional Arrow" className={imgClass} />
					</span>
				</p>
			</div>
			{visible ? (
				<ul className={`payment-terms__list ${visible ? "slide-down" : ""}`}>
					{terms.map((term) => (
						<li
							key={term.id}
							className="payment-terms__list--item"
							value={term.value}
						>
							{term.text}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

export default PaymentTerms;
