import React from "react";

function SelectCalendarDays(props) {
	let blanks = [];
	for (let i = 0; i < props.firstDayOfMonth(); i++) {
		blanks.push(
			<td className="calendar-empty" key={i * 3}>
				{""}
			</td>
		);
	}

	let monthDays = [];
	for (let d = 1; d <= props.daysInMonth(); d++) {
		let classname =
			d === props.currentDate()
				? "calendar-monthdays active"
				: "calendar-monthdays";
		monthDays.push(
			<td
				key={d * 3.5}
				className={classname}
				onClick={() => props.onDateChange(d)}
			>
				<span>{d}</span>
			</td>
		);
	}

	let totalSlots = [...blanks, ...monthDays];
	let rows = [];
	let cells = [];

	totalSlots.forEach((row, i) => {
		if (i % 7 !== 0) {
			cells.push(row);
		} else {
			let insertRow = cells.slice();
			rows.push(insertRow);
			cells = [];
			cells.push(row);
		}

		if (i === totalSlots.length - 1) {
			let insertRow = cells.slice();
			rows.push(insertRow);
		}
	});

	let trElements = rows.map((d, i) => {
		return <tr key={i * 100}>{d}</tr>;
	});
	return trElements;
}

export default SelectCalendarDays;
