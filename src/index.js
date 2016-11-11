import express from 'express';
import cors from 'cors';

import canonize from './../lib/canonize';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/test2c', (req, res) => {

	res.send(canonize(req.query.username));

	// const digits = "0123456789",
	// 	  symbols = '!@#$%^&*()_+<>?/\=-';

	// let data = (req.query.username).toLowerCase().replace(/\s{2,}/g, ' '),
	// 	tmp = [],
	// 	inputDataError = false,
	// 	username = '@';


	// if (data.indexOf('/') == -1 && data.indexOf('?') == -1) {
	// 	username += data[0] === '@' ? data.slice(1) : data;
	// } else {
	// 	data = data.indexOf('?') != -1 ? data : data.split('?')[0];
	// 	username += data.slice(data.lastIndexOf('/') + 1);
	// }


	// const qualWords = tmp.length;

	// for (let i = 0, l = data.length; i < l; i++){
	// 	if (digits.indexOf(data[i]) !== -1 || symbols.indexOf(data[i]) !== -1) {
	// 		inputDataError = true;
	// 		break;
	// 	}
	// }



	// if (data === '' || data === ' ' || inputDataError) {
	// 	res.send('Invalid username');		
	// } else {
	// 	switch(qualWords){
	// 		case 1:
	// 			res.send(`${tmp[0].charAt(0).toUpperCase()}${tmp[0].slice(1)}`);
	// 			break;
	// 		case 2:
	// 			res.send(`${tmp[1].charAt(0).toUpperCase()}${tmp[1].slice(1)} ${tmp[0].charAt(0).toUpperCase()}.`);
	// 			break;
	// 		case 3:
	// 			res.send(`${tmp[2].charAt(0).toUpperCase()}${tmp[2].slice(1)} ${tmp[0].charAt(0).toUpperCase()}. ${tmp[1].charAt(0).toUpperCase()}.`);
	// 			break;
	// 		default:
	// 			res.send('Invalid username');		
	// }


	// }
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000! To exit press Ctrl+C');
  	[
		"https://vk.com/skillbranch",
		"//vk.com/skillbranch",
		"skillbranch",
		"https://vk.com/skillbranch?w=wall-117903599_1076",
		"https://github.com/kriasoft/react-starter-kit",
		"vk.com/durov",
		"vk.com/pavel.durov",
		"https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750"
	].forEach((testCase) => {
		console.log(canonize(testCase));
	})
});
