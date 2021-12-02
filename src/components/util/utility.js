export const parseDate = (data) => {
	let day = new Date(data).getDate();
	let month = new Date(data).getUTCMonth();
	let year = new Date(data).getUTCFullYear();
	let hour = new Date(data).getUTCHours();
	let minute = new Date(data).getUTCMinutes();
	let second = new Date(data).getUTCSeconds();
	var options = {
		year: "numeric",
		month: "short",
		day: "2-digit",
	};
	// const y = new Date(data.createdAt).toString();
	// const z = Date.parse(y);
	const parsedDate = new Date(Date.UTC(year, month, day, hour, minute, second));

	const displayDate = parsedDate.toLocaleDateString("en-GB", options);

	return displayDate;
};
