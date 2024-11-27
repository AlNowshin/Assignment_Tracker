const mongoose = require('mongoose');

// Define schema for tracking assignments
const assignmentSchema = mongoose.Schema({
    name: { type: String, required: true },       
    subject: { type: String, required: true },    
    dueDate: { type: Date, required: true },       
    priority: { type: String, required: true },  
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true } 
  }, {
    collection: "assignments"                       // Collection name in MongoDB
  });
  
  const Assignment = mongoose.model('Assignment', assignmentSchema);
  
  module.exports = Assignment;