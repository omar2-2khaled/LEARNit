const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT;
mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log('DB Connection Successful');
  });

app.listen(3010, () => {
  console.log('Server Created Successfully');
})
