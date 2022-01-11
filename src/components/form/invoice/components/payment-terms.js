import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";

import ArrowDown from "../../../../assets/images/icon-arrow-down.svg";
import {
	paymentTerms,
	setEditPaymentTerms,
} from "../../../../store/actions/formAction";

function PaymentTerms(props) {
	const dispatch = useDispatch();
	const { editFormPaymentTerms, editForm } = props;

	let terms = [
		{ id: 1, text: `Net 1 Day`, value: 1 },
		{ id: 2, text: "Net 7 Days", value: 7 },
		{ id: 3, text: "Net 14 Days", value: 14 },
		{ id: 4, text: "Net 30 Days", value: 30 },
	];

	let [visible, setVisible] = useState(false);
	let [paymentTermsText, setPaymentTerms] = useState("");
	let [paymentTermsValue, setPaymentTermsValue] = useState(30);

	let paymentTermClass;

	!visible
		? (paymentTermClass = "payment-terms__items")
		: (paymentTermClass = "payment-terms__items payment-terms__items--active");

	const toggleList = () => {
		visible ? setVisible(false) : setVisible(true);
	};

	let imgClass;
	visible ? (imgClass = "rotate") : (imgClass = "default");

	const onSetPayment = (e) => {
		if (!editForm) {
			setPaymentTerms(e.target.textContent);
			setPaymentTermsValue(e.target.value);
			dispatch(paymentTerms(e.target.value));
		} else {
			dispatch(setEditPaymentTerms(e.target.value));
		}
	};

	return (
		<div className="payment-terms" onClick={toggleList}>
			<label>Payment Terms</label>
			<div className={paymentTermClass}>
				<p>
					<span>
						{!editForm
							? paymentTermsText === ""
								? "Net 30 Days"
								: paymentTermsText
							: paymentTermsText === ""
							? `Net ${editFormPaymentTerms} Days`
							: paymentTermsText}
					</span>
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
							onClick={(e) => onSetPayment(e)}
						>
							{term.text}
						</li>
					))}
				</ul>
			) : null}
			<input
				type="hidden"
				name="paymentTerms"
				value={paymentTermsValue}
				placeholder="Hello"
				id="hiddenPaymentTerms"
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		editForm: state.form.editForm,
	};
};

export default connect(mapStateToProps, null)(PaymentTerms);
