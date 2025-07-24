const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  title: String,
  bio: String,
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = Teacher;
