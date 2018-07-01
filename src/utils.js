import * as Language from './lang.json';

class Utils extends (Object) {
	static Time(eternity, lang) {
		const unix = new Date(eternity),
			months = Language[lang].months,
			month = months[unix.getMonth()],
			year = unix.getFullYear();
		let date, day, hour, min;

		day = unix.getDate();

		unix.getHours() <= 9 ?
			hour = `0${unix.getHours()}` :
			hour = unix.getHours();

		unix.getMinutes() <= 9 ?
			min = `0${unix.getMinutes()}` :
			min = unix.getMinutes();

		unix === null ?
			date = Language[lang].loading :
			date = Language[lang].date_format
				.replace('day', day)
				.replace('hour', hour)
				.replace('min', min)
				.replace('month', month)
				.replace('year', year)

		return date;
	};
};

export default Utils;
