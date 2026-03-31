const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.post('/', async (req, res) => {
  try {
    const studentData = req.body;
    
    const newStudent = new Student(studentData);
    await newStudent.save();
    
    res.status(201).json({
      success: true,
      message: '✅ Student created successfully!',
      data: newStudent
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '❌ Failed to create student',
      error: error.message
    });
  }
});

router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ enrollmentDate: -1 });
    
    res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Failed to fetch students',
      error: error.message
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: '❌ Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: student
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Failed to fetch student',
      error: error.message
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: '❌ Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '✅ Student updated successfully!',
      data: updatedStudent
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: '❌ Failed to update student',
      error: error.message
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: '❌ Student not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: '✅ Student deleted successfully!',
      data: deletedStudent
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '❌ Failed to delete student',
      error: error.message
    });
  }
});

module.exports = router;

