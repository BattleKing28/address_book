const express = require('express');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

const {
   getContacts,
   getContact,
   createContact,
   updateContact,
   deleteContact,
} = require('../controllers/contact');

router.route('/').get(getContacts).post(protect, createContact);

router
   .route('/:id')
   .get(getContact)
   .put(protect, updateContact)
   .delete(protect, authorize('admin'), deleteContact);

module.exports = router;
