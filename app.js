const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const errorHandler = require('./controllers/errorController');
const courseRoute = require('./routes/courseRoute');
const categoryRouter = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const reviewRoute = require('./routes/reviewRoute');

const app = express();

app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'too many requests from this IP, try again in an hour',
});
app.use('/api', limiter);

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use(express.json());

app.use('/api/v1/user', userRoute);
app.use('/api/v1/course', courseRoute);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/reviews', reviewRoute)
app.all('*', (req, res, next) => {
  const err = new Error(`can't find URL : ${req.originalUrl} on the server.`);
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
});
app.use(errorHandler);

module.exports = app;