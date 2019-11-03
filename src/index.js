import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import logger from 'morgan'
import 'dotenv/config';



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT} `),
);