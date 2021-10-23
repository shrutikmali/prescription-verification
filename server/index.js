const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes/routes.js');

const app = express();

app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));
app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 5000;
const MONGODB_CONNECTION = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.8f6af.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server listening on port ${PORT}`));
