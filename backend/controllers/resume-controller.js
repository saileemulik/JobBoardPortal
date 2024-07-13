const Resume = require("../models/resume-model");
const resume = async (req, res) =>{
    const name = req.body.name;
    const fileName = req.file.filename;
    try {
     await Resume.create({name: name , pdf: fileName});
     res.send({status: "ok"});
    } catch (error) {
     res.json({status:error});
    }
};
module.exports = resume;