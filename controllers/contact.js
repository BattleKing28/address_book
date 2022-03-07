const ErrorResponse = require('../utils/errorResponse');
const Contact = require('../models/Contact');
const asyncHandler = require('../middleware/async');

//@description GET all contacts
//@route GET /api/contacts
//@access public
exports.getContacts = asyncHandler(async (req, res, next) => {
   //copying req query
   const reqQuery = { ...req.query };

   //fields to exclude
   const removeFields = ['page', 'limit'];

   removeFields.forEach((param) => delete reqQuery[param]);

   let queryStr = JSON.stringify(req.query);

   let query = Contact.find(JSON.parse(queryStr));

   //pagination
   const page = parseInt(req.query.page, 10) || 1;
   const limit = parseInt(req.query.limit, 10) || 3;
   const startIndex = (page - 1) * limit;
   const endIndex = page * limit;
   const total = await Contact.countDocuments();

   query = query.skip(startIndex).limit(limit);

   //pagination object
   const pagination = {};

   if (endIndex < total) {
      pagination.next = {
         page: page + 1,
         limit,
      };
   }

   if (startIndex > 0) {
      pagination.previous = {
         page: page - 1,
         limit,
      };
   }

   const contacts = await query;
   res.status(200).json({
      success: true,
      count: contacts.length,
      pagination,
      data: contacts,
   });
});

//@description GET single contact
//@route GET /api/contacts/:id
//@access public
exports.getContact = asyncHandler(async (req, res, next) => {
   const contact = await Contact.findById(req.params.id);

   if (!contact) {
      return next(
         new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
      );
   }

   res.status(200).json({
      success: true,
      data: contact,
   });
});

//@description create a contact
//@route POST /api/contacts
//@access private
exports.createContact = asyncHandler(async (req, res, next) => {
   const contact = await Contact.create(req.body);

   res.status(201).json({
      success: true,
      data: contact,
   });
});

//@description update a contact
//@route PUT /api/contacts/:id
//@access private
exports.updateContact = asyncHandler(async (req, res, next) => {
   const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!contact) {
      return next(
         new ErrorResponse(`Contact not found with id of ${req.params.id}`, 404)
      );
   }
   res.status(200).json({ success: true, data: contact });
});

//@description delete a contact
//@route DELETE /api/contacts/:id
//@access private
exports.deleteContact = asyncHandler(async (req, res, next) => {
   const contact = await Contact.findByIdAndDelete(req.params.id);

   if (!contact) {
      return next(
         new ErrorResponse(`Contact not found with the id of ${req.params.id}`)
      );
   }
   res.status(200).json({ success: true, data: {} });
});
