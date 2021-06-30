require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const appointmentsRoutes = require('./routes/appointments');
const galleryRoutes = require('./routes/gallery');

// database connection 
mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    }
)
.then(() => console.log('Database connected successfully...'))
.catch(err => console.log(`Database connection error. Reason: ${err}`))

// app variable declaration
const app = express();

// express in-built middleware
app.use(express.urlencoded());
app.use(express.json());

// other usefull middleware
app.use(cors());
app.use(fileUpload());

// routes reffrence
app.use('/auth', authRoutes);
app.use('/api', appointmentsRoutes);
app.use('/api', galleryRoutes);


// point to the build folder for the static files
if(process.env.NODE_ENV === "production"){
    // set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


// port declaration
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})