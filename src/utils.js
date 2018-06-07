class Utils extends (Object) {
	static Time(eternity) {
		const unix = new Date(eternity),
			months = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
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
			date = 'Загрузка…' :
			date = `${day} ${month} ${year}, ${hour}:${min}`;

		return date;
	};
};

export default Utils;
