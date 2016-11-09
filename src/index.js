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

	let data = req.query.fullname,
		tmp = data.split(' '),
		qualWords = tmp.length;

	switch(qualWords){
		case 1:
			res.send(`${tmp[0]}`);
			break;
		case 2:
			res.send(`${tmp[1]} ${tmp[0].charAt(0)}.`);
			break;
		case 3:
			res.send(`${tmp[2]} ${tmp[0].charAt(0)}. ${tmp[1].charAt(0)}.`);
			break;
		default:
			res.send('Invalid fullname');
	}
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
