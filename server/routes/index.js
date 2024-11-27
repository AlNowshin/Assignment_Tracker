var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
//const Assignment = require('../model/tracker'); // Import the Assignment model

/* GET index page. */
router.get('/', async function(req, res, next) {
  try {
    const assignments = await Assignment.find(); // Fetch assignments from the database
    console.log(assignments);
    res.render('assignments/tracker_list', { 
      title: 'Home', 
      assignments: assignments // Pass assignments to the view
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load assignments',
      error: err // Log the error object
    });
  }
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET tracker page (list all assignments). */
/*router.get('/track', async function(req, res, next) {
  try {
    const assignments = await Assignment.find(); // Get all assignments from the database
    res.render('assignments/tracker_list', {
      title: 'Assignments Tracker',
      assignments
    });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load assignments',
      error: err // Log the error object
    });
  }
});*/

/* GET Add Assignment page. */
/*router.get('/track/add', function(req, res, next) {
  res.render('assignments/add', { title: 'Add Assignment' });
});
*/
/* POST Add Assignment. */
/*router.post('/track/add', async function(req, res, next) {
  const { name, subject, dueDate, priority } = req.body;
  
  try {
    const newAssignment = new Assignment({ name, subject, dueDate, priority });
    await newAssignment.save(); // Save to DB
    res.redirect('/track'); // Redirect to the tracker list
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to add assignment',
      error: err // Log the error object
    });
  }
});*/

/* GET Edit Assignment page. */
/*router.get('/track/edit/:id', async function(req, res, next) {
  try {
    const assignment = await Assignment.findById(req.params.id); // Find assignment by ID
    if (!assignment) {
      return res.status(404).render('error', { 
        title: 'Error', 
        message: 'Assignment not found' 
      });
    }
    res.render('assignments/edit', { title: 'Edit Assignment', assignment });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load assignment',
      error: err // Log the error object
    });
  }
});*/

/* POST Update Assignment. */
/*router.post('/track/edit/:id', async function(req, res, next) {
  const { name, subject, dueDate, priority } = req.body;
  
  try {
    await Assignment.findByIdAndUpdate(req.params.id, { name, subject, dueDate, priority });
    res.redirect('/track'); // Redirect to the tracker list
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to update assignment',
      error: err // Log the error object
    });
  }
});
*/
/* GET Delete Assignment page. */
/*router.get('/track/delete/:id', async function(req, res, next) {
  try {
    const assignment = await Assignment.findById(req.params.id); // Find assignment by ID
    if (!assignment) {
      return res.status(404).render('error', { 
        title: 'Error', 
        message: 'Assignment not found' 
      });
    }
    res.render('assignments/delete', { title: 'Delete Assignment', assignment });
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to load assignment',
      error: err // Log the error object
    });
  }
});*/

/* POST Delete Assignment. */
/*router.post('/track/delete/:id', async function(req, res, next) {
  try {
    await Assignment.findByIdAndDelete(req.params.id); // Delete assignment by ID
    res.redirect('/track'); // Redirect to the tracker list
  } catch (err) {
    console.error(err);
    res.status(500).render('error', {
      title: 'Error',
      message: 'Failed to delete assignment',
      error: err // Log the error object
    });
  }
});
*/
module.exports = router;
