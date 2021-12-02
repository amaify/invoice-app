import React from "react";

function SkeletonDetails() {
	return (
		<section className="skeleton-details">
			<div className="skeleton-details__content skeleton-details__tiles">
				<p className="skeleton-details__tiles--status loading"></p>
				<p className="skeleton-details__tiles--buttons loading"></p>
			</div>

			<div className="skeleton-details__content skeleton-details__body">
				<p className="skeleton-details__body--address loading"></p>
				<p className="skeleton-details__body--details loading"></p>
				<p className="skeleton-details__body--items loading"></p>
			</div>
		</section>
	);
}

export default SkeletonDetails;
