import dayjs from "dayjs";
import "dayjs/locale/es";
import React, { useState } from "react";
import { useEffect } from "react";

dayjs.locale("es");

export const InboxHeader = () => {
	const [todaysDate, setTodaysDate] = useState(dayjs().format("ddd DD MMMM YYYY"));

	function onFocus() {
		setTodaysDate(dayjs().format("ddd DD MMMM YYYY"));
		if (parseInt(dayjs().format("HH")) < 23) {
			return;
		}
		setTimeout(() => {
			setTodaysDate(dayjs().format("ddd DD MMMM YYYY"));
		}, (3601 - parseInt(dayjs().format("mm")) * 60) * 1000);
	}

	function onBlur() {}

	useEffect(() => {
		window.addEventListener("focus", onFocus);
		window.addEventListener("blur", onBlur);
		onFocus();
		return () => {
			window.removeEventListener("focus", onFocus);
			window.removeEventListener("blur", onBlur);
		};
	}, []);

	return (
		<>
			<div className="inbox-date">{todaysDate}</div>
		</>
	);
};
