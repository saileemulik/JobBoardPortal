const {Schema , model, Mongoose} = require("mongoose");
const resumeSchema = new Schema({
    name:{type: String, required: true},
    pdf:{type: String, required: true},
    
});
const Resumes = new model("Resume",resumeSchema);
module.exports = Resumes;