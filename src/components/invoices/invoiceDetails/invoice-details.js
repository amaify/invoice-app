import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

import DetailsTiles from "./details-component/detail-tiles";
import DetailsBody from "./details-component/detail-body";
import DetailItems from "./details-component/detail-items";
import SkeletonDetails from "../../skeleton/skeleton-details";
import Modal from "../../modal/modal";

function InvoiceDetails(props) {
	const location = useLocation();
	const data = location.state.invoiceItem;
	const { showModal, loading, error } = props;
	return (
		<section className="details">
			{!loading ? (
				<>
					{!error ? (
						<>
							<DetailsTiles data={data} />
							<div className="details-body__wrapper">
								<DetailsBody data={data} />
								<DetailItems data={data} />
							</div>
						</>
					) : (
						showModal && <Modal data={data} />
					)}
					{/* <DetailsTiles data={data} />
					<div className="details-body__wrapper">
						<DetailsBody data={data} />
						<DetailItems data={data} />
					</div> */}
					{showModal && <Modal data={data} />}
				</>
			) : (
				<SkeletonDetails />
			)}
			{/* <DetailsTiles data={data} />
			<div className="details-body__wrapper">
				<DetailsBody data={data} />
				<DetailItems data={data} />
			</div>
			{showModal && <Modal data={data} />}
			<SkeletonDetails /> */}
		</section>
	);
}

const mapStateToProps = (state) => {
	return {
		showModal: state.invoiceReducer.showModal,
		loading: state.invoiceReducer.loading,
		error: state.invoiceReducer.error,
	};
};

export default connect(mapStateToProps, null)(InvoiceDetails);
