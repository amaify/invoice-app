import React from "react";

import { parseDate } from "../../../util/utility";

function DetailsBody(props) {
	const { data } = props;

	return (
		<div className="details-body">
			<div className="details-body__heading">
				<p className="details-body__heading--title">
					<span className="details-body__heading--title-id">
						<span>#</span>
						{data.id}
					</span>
					<span className="details-body__heading--title-text">
						{data.description}
					</span>
				</p>
				<p className="details-body__heading--address">
					<span>{data.senderAddress.street}</span>
					<span>{data.senderAddress.city}</span>
					<span>{data.senderAddress.postCode}</span>
					<span>{data.senderAddress.country}</span>
				</p>
			</div>

			<div className="details-body__billing">
				<div className="details-body__billing--date">
					<div className="details-body__billing--date-1">
						<p className="details-body__billing--title">invoice date</p>
						<p>{parseDate(data.createdAt)}</p>
					</div>
					<div className="details-body__billing--date-2">
						<p className="details-body__billing--title">payment due</p>
						<p>{parseDate(data.paymentDue)}</p>
					</div>
				</div>
				<div className="details-body__billing--address">
					<p className="details-body__billing--title">bill to</p>
					<p className="details-body__billing--address-name">
						{data.clientName}
					</p>
					<p className="details-body__billing--address-address">
						<span>{data.clientAddress.street}</span>
						<span>{data.clientAddress.city}</span>
						<span>{data.clientAddress.postCode}</span>
						<span>{data.clientAddress.country}</span>
					</p>
				</div>
				<div className="details-body__billing--email">
					<p className="details-body__billing--title">sent to</p>
					<p className="details-body__billing--email-email">
						{data.clientEmail}
					</p>
				</div>
			</div>
		</div>
	);
}

export default DetailsBody;
