const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//loading env variables
dotenv.config({ path: './configs/config.env' });

//loading models
const Contact = require('./models/Contact');

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
});

//read json files
const contacts = JSON.parse(
   fs.readFileSync(`${__dirname}/_data/contacts.json`, 'utf-8')
);

//import all contacts to DB
async function importData() {
   try {
      await Contact.create(contacts);
      console.log('data imported...');
      process.exit();
   } catch (err) {
      console.log(err);
   }
}

//delete all contacts from DB
async function deleteData() {
   try {
      await Contact.deleteMany();
      console.log('data deleted...');
      process.exit();
   } catch (err) {
      console.log(err);
   }
}

//checking from console if user wants to import or delete the data from DB
if (process.argv[2] === '-i') {
   importData();
} else if (process.argv[2] === '-d') {
   deleteData();
}
