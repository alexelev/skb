import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});


app.get('/test3a/volumes', (req, res) => {
	const hdd = pc['hdd'];
	console.log(hdd);
	let response = {};
	for (let i = 0, l = hdd.length; i < l; i++) {
		let keys = Object.keys(response),
			h = hdd[i];
		if (keys.includes(h.volume)){
			response[h.volume] += +h.size;
		} else {
			response[h.volume] = +h.size;
		}		
	}
	for (let vol in response){
		response[vol] += "B";
	}
	res.json(response);
})

app.get('/test3a/*', (req, res) => {

	let response = pc;
	const charts = req.path.split('/').filter(item => {return item !== ''}).slice(1);

	// charts.forEach(chart => { response = response[chart] });

	for (let i = 0, l = charts.length; i < l; i++) {
		const keys = Object.keys(response);
		if (keys.indexOf(charts[i]) != -1) {
			response = response[charts[i]];
		} else {
			res.sendStatus(404).send("Not Found");
		}
	}

	res.json(response);

})

app.listen(3000, () => {
  console.log('Your app listening on port 3000! To exit press Ctrl+C');
});
