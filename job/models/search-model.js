const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  title: String,
  company: String,
  location: String,
  description: String,
  reuirements:Array,
  posted_at: Date,
  deadline: Date,
});
jobSchema.index({ title: 'text' });
const Job = model('Job', jobSchema);

module.exports = Job; 