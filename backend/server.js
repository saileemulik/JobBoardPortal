require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();
const authRouter = require('./router/auth-router');
const contactRouter = require('./router/contact-router');
const listingRouter = require('./router/listing-router');
const searchRouter = require('./router/search-router');
const resumeRouter = require('./router/resume-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');
const Search = require('./controllers/search-controller');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() 
    cb(null, uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin:'*',
  methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/form', contactRouter);
app.use('/api/data', listingRouter);
app.use('/api/search', searchRouter);
app.use('/api/files', resumeRouter);
app.use('/files',express.static("files"));
connectDb();
app.post('/api/data/listing', async (req, res) => {
  try {
    const { company, location, title, description, requirements, posted_at, deadline } = req.body;
    const newListing = new Listing({
      company,
      location,
      title,
      description,
      requirements,
      posted_at,
      deadline,
    });
    await newListing.save();
    res.status(201).json({ message: 'Job listing created successfully' });
  } catch (error) {
    console.error('Error creating job listing:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


const resumeSchema = require('./models/resume-model');;
app.post("/api/files",upload.single("file"), async(req, res)=>{
   console.log(req.file);
   const name = req.body.name;
   const fileName = req.file.filename;
   try {
    await resumeSchema.create({name: name , pdf: fileName});
    res.send({status: "ok"});
   } catch (error) {
    res.json({status:error});
   }
});

app.get("/api/get-files", async(req, res)=>{
  try {
    resumeSchema.find({}).then(data=>{
      res.send({status:"ok", data:data});
    })
  } catch (error) {
    
  }
})

app.get('/api/search', async (req, res) => {
  try {
      const userInput = req.query.q || 'searchTerm'; 
      const searchResults = await Search(userInput);
      console.log('Search results:', searchResults);
      res.json(searchResults);
  } catch (error) {
      console.error('Error during search:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.use(errorMiddleware);

app.use((req, res, next) => {
  console.log(`Received ${req.method} request at ${req.url}`);
  next();
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
