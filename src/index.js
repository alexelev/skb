import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import hsl from 'hsl-to-hex';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

function isRGB (data) {
	return /^rgb\((\d{1,3},){2}\d{1,3}\)$/.test(data);
}
function isHSL (data) {
	return /^hsl\((\d{1,3},){2}\d{1,3}\)$/.test(decodeURIComponent(data.replace(/\%(?=,|\))/g, '')).replace(/\s/g, '')) &&
		/\%(?=,|\))/g.test(data) && data.match(/\%(?=,|\))/g).length == 2;
}

function convertRGBtoHEX (color) {
	const digitsPart = color.slice(color.indexOf('(') + 1, color.indexOf(')')),
		  parts = digitsPart.split(',').map((digit => +digit));
	return parts.map(part => {
		if (part >=0 && part <= 255) {
			const colorPart = part.toString(16);
			return colorPart.length == 1 ? `0${colorPart}` : colorPart;
		}
		return null;
	}).reduce((a,b) => a + b);
}

function convertHSLtoHEX (str) {
	const color = decodeURIComponent(str.replace(/\%(?=,|\))/g, '')),
		  digitsPart = color.slice(color.indexOf('(') + 1, color.indexOf(')')).replace(/\%/g, ''),
		  parts = digitsPart.split(',').map((digit => +digit));
	if (parts[0] >= 0 && parts[0] <= 360 &&
		parts[1] >= 0 && parts[1] <= 100 &&
		parts[2] >= 0 && parts[2] <= 100 ) {
		return hsl(parts[0], parts[1], parts[2]);
	}
	return null;
}

function createColor(str) {
	let data = str.toLowerCase().replace(/\s/g, '');
	console.log(1);
	console.log(data);
	if (isRGB(data)){
		data = convertRGBtoHEX(data);
	} else if (isHSL(data)) {
		console.log(2);
		data = convertHSLtoHEX(data);
		console.log(data);
	} else {
		data = data.indexOf('%') == 0 ? decodeURIComponent(data) : data;
	}
	data = data !== null && data.indexOf('#') == 0 ? data.slice(1) : data;		
	// const colorPattern = new RegExp('[0-9a-f]{3,6}', 'i');
	// const antiColorPattern = new RegExp('[^0-9a-f]', 'i');
	

	const isValid = !/[^0-9a-f]/i.test(data);
	/*if (!/^(rg(b|ba)|hs(l|la))\(/.test(data) && data.length > 6) {
		return 'Invalid color';
	} else */

	if (isValid && data.length == 3) {
		return `#${data.charAt(0)}${data.charAt(0)}${data.charAt(1)}${data.charAt(1)}${data.charAt(2)}${data.charAt(2)}`;
	} else if (isValid && data.length == 6) {
		return `#${data}`;
	} else {
		return 'Invalid color';
	}
}

app.get('/test2d*', (req, res) => {
	if (req.query.color) {
		res.send(createColor(req.query.color));
	} else {
		res.send('Invalid color');
	}
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000! To exit press Ctrl+C');
});
