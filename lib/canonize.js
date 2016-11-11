export default function (url) {
	
	const symbols = '!@#$%^&*()_+<>?=-'.split('');

	let data = url.toLowerCase().replace(/\s{2,}/g, ' '),
		username = '';



	if (data.indexOf('/') == -1 && data.indexOf('?') == -1) {
		username = `${data}`;
	} else {
		data = data.indexOf('?') != -1 ? data.split('?')[0] : data;	
		// console.log(`data: ${data}`);
		// data = data.split('')[3];
		// username += data.slice(data.lastIndexOf('/') + 1);
		const tmp = data.split('/');
		username = tmp[1] === '' ? tmp[3] : tmp[1];
	}

	// console.log('------------------------------------------------------');
	// console.log(`username: ${username}`);
	// console.log('------------------------------------------------------');

	if (username.length == 0 || username.slice(1).match(/(?=\W)[^\.]/g) !== null) {
		username = 'Invalid username';
	} else {
		username = username[0] === '@' ? username : `@${username}`;
	}


	return username;
}