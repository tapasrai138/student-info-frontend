

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  
  rollNumber: {
    type: String,           
    required: true,            
    unique: true,              
    trim: true                 
  },

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,              
    lowercase: true,           
    trim: true
  },


  course: {
    type: String,
    required: true,
    trim: true
  },


  year: {
    type: Number,
    required: true,
    min: 1,                    
    max: 4                     
  },

  phone: {
    type: String,
    required: true,
    trim: true
  },


  address: {
    type: String,
    required: false,           
    trim: true
  },

  
  dateOfBirth: {
    type: Date,
    required: false
  },

  
  enrollmentDate: {
    type: Date,
    default: Date.now          
  }

}, {
  timestamps: true             
});


const Student = mongoose.model('Student', studentSchema);


module.exports = Student;
