class Utils extends (Object) {
	static Time(eternity) {
		const unix = new Date(eternity),
			months = ['01','02','03','04','05','06','07','08','09','10','11','12'],
			month = months[unix.getMonth()],
			year = unix.getFullYear();
		let date, day, hour, min, sec;

		unix.getDate() <= 9 ?
		day = '0' + unix.getDate() :
		day = unix.getDate();

		unix.getHours() <= 9 ?
		hour = '0' + unix.getHours() :
		hour = unix.getHours();

		unix.getMinutes() <= 9 ?
		min = '0' + unix.getMinutes() :
		min = unix.getMinutes();

		unix.getSeconds() <= 9 ?
		sec = '0' + unix.getSeconds() :
		sec = unix.getSeconds();

		unix === null ?
		date = 'Загрузка…' :
		date = hour + ':' + min + ':' + sec + ', ' + day + '.' + month + '.' + year;

		return date;
	};
};

export default Utils;
