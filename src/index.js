import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/test', (req, res) => {
	let a = +req.query.a || 0,
		b = +req.query.b || 0;

	res.send(`${a + b}`);
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
