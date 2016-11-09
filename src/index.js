import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/test2b', (req, res) => {

	const digits = "0123456789",
		  symbols = '!@#$%^&*()_+<>?/\=-';

	let data = (req.query.fullname).toLowerCase(),
		tmp = data.split(' '),
		inputDataError = false;

	for (let i = tmp.length - 1; i >= 0; i--) {
		if (tmp[i] === '') {
			tmp.splice(i,1);
		}
	}
		
	const qualWords = tmp.length;

	for (let i = 0, l = data.length; i < l; i++){
		if (digits.indexOf(data[i]) !== -1 || symbols.indexOf(data[i]) !== -1) {
			inputDataError = true;
			break;
		}
	}



	if (data === '' || data === ' ' || inputDataError) {
		res.send('Invalid fullname');		
	} else {
		switch(qualWords){
			case 1:
				res.send(`${tmp[0].charAt(0).toUpperCase()}${tmp[0].slice(1)}`);
				break;
			case 2:
				res.send(`${tmp[1].charAt(0).toUpperCase()}${tmp[1].slice(1)} ${tmp[0].charAt(0).toUpperCase()}.`);
				break;
			case 3:
				res.send(`${tmp[2].charAt(0).toUpperCase()}${tmp[2].slice(1)} ${tmp[0].charAt(0).toUpperCase()}. ${tmp[1].charAt(0).toUpperCase()}.`);
				break;
			default:
				res.send('Invalid fullname');		
	}


	}
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
