import React from "react";
import { connect, useDispatch } from "react-redux";
import { hideForm } from "../../store/actions/formAction";

import Navigation from "../navigation/navigation";
import Controls from "../controls/control";
import Invoices from "../invoices/invoice";
import Form from "../form/invoice/form";
import Backdrop from "../backdrop/backdrop";

const Layout = (props) => {
	const dispatch = useDispatch();

	const closeForm = () => {
		dispatch(hideForm());
	};
	return (
		<section className="layout">
			<div className="layout-nav">
				<Navigation />
			</div>

			{props.displayForm && <Form />}
			<div className="layout-main">
				{props.showBackdrop && <Backdrop onClick={closeForm} />}
				<Controls />
				<Invoices />
			</div>
		</section>
	);
};

const mapStateToProps = (state) => {
	return {
		displayForm: state.form.showForm,
		showBackdrop: state.form.backdrop,
	};
};

export default connect(mapStateToProps, null)(Layout);
