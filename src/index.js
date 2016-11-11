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

})

app.listen(3000, () => {
  console.log('Your app listening on port 3000! To exit press Ctrl+C');
});
