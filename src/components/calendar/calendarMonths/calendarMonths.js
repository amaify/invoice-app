import React from "react";

function SelectMonthList(props) {
	let selectMonths = [];
	props.data.map((data) => {
		return selectMonths.push(
			<td key={data} onClick={(e) => props.selectMonthData(e, data)}>
				<span>{data}</span>
			</td>
		);
	});

	let rows = [];
	let cells = [];

	selectMonths.forEach((row, i) => {
		if (i % 4 !== 0 || i === 0) {
			cells.push(row);
		} else {
			rows.push(cells);
			cells = [];
			cells.push(row);
		}
	});
	rows.push(cells);

	let monthList = rows.map((d, i) => {
		return (
			<tr key={i * 1.3} className="calendar-month__data">
				{d}
			</tr>
		);
	});

	return monthList;
}

export default SelectMonthList;
