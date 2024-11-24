const Assignment = require('../models/tracker'); // Import the Assignment model

// Display all assignments
exports.listAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find(); // Fetch all assignments
        res.render('assignment_tracker/tracker_list', {
            title: 'Assignment Tracker',
            assignments,
        });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { title: 'Error', message: 'Failed to load assignments' });
    }
};

// Render the Add Assignment form
exports.addAssignmentForm = (req, res) => {
    res.render('assignment_tracker/add', { title: 'Add Assignment' });
};

// Handle adding a new assignment
exports.addAssignment = async (req, res) => {
    try {
        const { name, subject, dueDate, priority } = req.body;
        const newAssignment = new Assignment({ name, subject, dueDate, priority });
        await newAssignment.save(); // Save to the database
        res.redirect('/track'); // Redirect to the tracker list
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { title: 'Error', message: 'Failed to add assignment' });
    }
};

// Render the Edit Assignment form
exports.editAssignmentForm = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id); // Find assignment by ID
        if (!assignment) {
            return res.status(404).render('error', { title: 'Error', message: 'Assignment not found' });
        }
        res.render('assignment_tracker/edit', { title: 'Edit Assignment', assignment });
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { title: 'Error', message: 'Failed to load assignment' });
    }
};

// Handle updating an assignment
exports.updateAssignment = async (req, res) => {
    try {
        const { name, subject, dueDate, priority } = req.body;
        await Assignment.findByIdAndUpdate(req.params.id, { name, subject, dueDate, priority });
        res.redirect('/track'); // Redirect to the tracker list
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { title: 'Error', message: 'Failed to update assignment' });
    }
};

// Handle deleting an assignment
exports.deleteAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndDelete(req.params.id); // Delete assignment by ID
        res.redirect('/track'); // Redirect to the tracker list
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { title: 'Error', message: 'Failed to delete assignment' });
    }
};
