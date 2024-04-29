const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

const port = process.env.PORT;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  sslValidate: true,
  sslCA: [fs.readFileSync(path.resolve(__dirname, './certs/ca-certificate.crt'))]
};
mongoose
  .connect(process.env.DB, options)
  .then(() => {
    console.log('DB Connection Successful');
  });

app.listen(3010, () => {
  console.log('Server Created Successfully');
})
