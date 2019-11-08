import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan';
import 'dotenv/config';
import routes from './routes';


const app = express();
const prefix = '/api/v1';
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

routes(prefix, app);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT} `));
