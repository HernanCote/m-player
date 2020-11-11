const getTime = time => time ? `${Math.floor(time / 60)}:${('0' + Math.floor(time % 60)).slice(-2)}` : '0:00';

export {
	getTime,
};