import React from "react";

import moment from "moment";

function SelectYearList(props) {
	let months = [];

	let nextTen = moment().set("year", props).add(12, "year").format("Y");

	function getDates(startDate, endDate) {
		let dateArray = [];
		let currentDate = moment(startDate);
		let stopDate = moment(endDate);

		while (currentDate <= stopDate) {
			dateArray.push(moment(currentDate).format("YYYY"));
			currentDate = moment(currentDate).add(1, "year");
		}

		return dateArray;
	}

	let twelveYears = getDates(props, nextTen);

	twelveYears.map((data) => {
		return months.push(
			<td
				key={data}
				className="calendar-month"
				onClick={(e) => {
					props.setNewYear(data);
				}}
			>
				<span>{data}</span>
			</td>
		);
	});

	let cells = [];
	let rows = [];

	months.forEach((row, i) => {
		if (i % 3 !== 0 || i === 0) {
			cells.push(row);
		} else {
			rows.push(cells);
			cells = [];
			cells.push(row);
		}
	});

	rows.push(cells);

	let yearList = rows.map((d, i) => {
		return <tr key={i * 1.13}>{d}</tr>;
	});

	return yearList;
}

export default SelectYearList;
