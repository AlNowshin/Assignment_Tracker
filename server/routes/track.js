const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Assignment = require('../model/tracker'); // Adjusted to the Assignment model

// Get all assignments
router.get('/', async(req, res, next) => {
  try {
    const assignmentList = await Assignment.find(); // Fetch assignments from the DB
    res.render('assignments/tracker_list', {
      title: 'Assignments Tracker',
      assignmentList:assignmentList
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error on the server', error: err });
  }
});

// Route for adding a new assignment
router.get('/add', (req, res) => {
  res.render('assignments/add', { title: 'Create Assignment' });
});

// Handle POST request for adding assignment 
router.post('/add', async (req, res, next) => {
  try {
    const { name, subject, dueDate, priority } = req.body;
    await Assignment.create({ name, subject, dueDate, priority }); // Create new assignment
    res.redirect('/track'); // Redirect to the assignment tracker page
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error creating assignment', error: err });
  }
});

// Route for displaying the Edit Page
router.get('/edit/:id', async (req, res, next) => {
  try {
    const assignmentToEdit = await Assignment.findById(req.params.id); // Find assignment by ID
    if (!assignmentToEdit) {
      return res.status(404).render('error', { message: 'Assignment not found' });
    }
    res.render('assignments/edit', {
      title: 'Edit Assignment',
      assignment: assignmentToEdit
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error on the server', error: err });
  }
});

// Handle POST request for updating assignment 
router.post('/edit/:id', async (req, res, next) => {
  const { name, subject, dueDate, priority } = req.body;
  try {
    await Assignment.findByIdAndUpdate(req.params.id, { name, subject, dueDate, priority }); // Update assignment
    res.redirect('/track'); // Redirect to the assignment tracker page
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error updating assignment', error: err });
  }
});

// Route to delete an assignment 
router.get('/delete/:id', async (req, res, next) => {
  try {
    const assignmentToDelete = await Assignment.findByIdAndDelete(req.params.id); // Delete assignment
    if (!assignmentToDelete) {
      return res.status(404).render('error', { message: 'Assignment not found' });
    }
    res.redirect('/track'); // Redirect to the assignment tracker page
  } catch (err) {
    console.error(err);
    res.status(500).render('error', { message: 'Error deleting assignment', error: err });
  }
});

// Log request details
router.use((req, res, next) => {
  console.log(`Received request for ${req.method} ${req.originalUrl}`);
  next();
});

module.exports = router;
