const Listing = require('../models/listing-model');
const User = require("../models/user-model");
const BASE_URL=process.env.BASE_URL;
const home = async (req, res) => {
    try {
        res.status(200).send('Welcome using router');
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const signup = async (req, res, next) => {
    try {
        const { username, email, password, userType } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: 'E-mail already exists' });
        }
        const userCreated = await User.create({ username, email, password, userType });

        res.status(200).json({
            success: true,
            message: 'User registered successfully',
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log('Received login request for email:', email);

        const userExist = await User.findOne({ email });

        if (!userExist) {
            console.log('User not found for email:', email);
            return res.status(401).json({message: 'Invalid Credentials' });
        }

        console.log('User found for email:', userExist.email);
        const user = await userExist.comparePassword(password);

       if(user){
        res.status(200).json({
            msg:"Login Successful",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
        });
       }
       else{
        res.status(401).json({message:"Invalid email or password"});
       }
    }
    catch(error){
        res.status(500).json("internal error");
    }
        
};


const user = async(req, res)=>{
     try {
        const userData = req.user;
        console.log(userData);
      return   res.status(200).json({userData});
     } catch (error) {
        console.log(`Error from user ${error}`);
     }
};

const contact = async (req, res, next) => {
    try {
        const { email, username} = req.body;

        console.log('Received login request for email:', email);

        const userExist = await User.findOne({ email });

        if (!userExist) {
            console.log('User not found for email:', email);
            return res.status(401).json({message: 'Invalid Credentials' });
        }

        console.log('User found for email:', userExist.email);

      const message = await contact.message
       if(message){
        res.status(200).json({
            message:"Message sent Successfully",
            token: await userExist.generateToken(),
            userId: userExist._id.toString(),
        });
       }
       else{
        res.status(401).json({message:"Message not delivered"});
       }
    }
    catch(error){
        res.status(500).json("internal error");
    }    
};
const listing = async (req, res, next) => {
    try {
        const { company, title, description, requirements, posted_at, deadline } = req.body;
        const collection = db.collection('listings'); 
        const listingExist = await collection.findOne({ company: { $regex: new RegExp('^' + company + '$', 'i') } });
        if (listingExist) {
          return res.status(400).json({ success: false, message: 'Listing already exists' });
        }
        const result = await collection.insertOne({ company, title, description, requirements, posted_at, deadline });
        
        res.status(200).json({
          success: true,
          message: 'Posted successfully',
          listingId: result.insertedId.toString(),
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };
  
  const files = async (req, res, next) => {
    try {
        const { name, pdf } = req.body;
        const collection = db.collection('resumes'); 
        const resumeExist = await collection.findOne({name});
        if (resumeExist) {
          return res.status(400).json({ success: false, message: 'Resume already exists' });
        }
        const result = await collection.insertOne({ name, pdf });
        
        res.status(200).json({
          success: true,
          message: 'Uploaded successfully',
          resumeId: result.insertedId.toString(),
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  };

module.exports = { home, signup, login, user, contact,listing, files};
