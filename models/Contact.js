const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name cannot exceed 50 characters'],
   },
   number: {
      type: Number,
      required: [true, 'Please add a number'],
      trim: true,
      unique: true,
      maxlength: [10, 'Name cannot exceed 10 characters'],
   },
   type: {
      type: String,
      enum: ['Work', 'Home', 'Main', 'Other', 'Mobile'],
      default: 'Mobile',
   },
});

module.exports = mongoose.model('Contact', ContactSchema);
