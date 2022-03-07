const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./configs/db');
const errorHandler = require('./middleware/error');

//importing routes
const contacts = require('./routes/contact');
const auth = require('./routes/auth');

//Loading env file
dotenv.config({ path: './configs/config.env' });

//Connecting to DB
connectDB();

const app = express();

// body parser
app.use(express.json());

//cookie parser
app.use(cookieParser());

const PORT = process.env.PORT;

//mount routers
app.use('/api/contacts', contacts);
app.use('/api/auth', auth);

app.use(errorHandler);

const server = app.listen(PORT, () => {
   console.log(`server started on port ${PORT}`);
});

//handle promise rejection during db connection
process.on('unhandledRejection', (err, promise) => {
   console.log(`Error: Couldn't connect to db`);
   //close server and exit process
   server.close(() => process.exit(1));
});
