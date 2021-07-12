const express = require('express');
// const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const mv = require('mv');
const router = express.Router();
const Photo = require('../models/Photo');
const auth = require('../middleware/auth');
const { google } = require('googleapis');
const stream = require("stream")

// Route to add photos to the Photo.
router.post('/add-photo', auth, async (req, res) => {
    if(req.files !== null){
        const file = req.files.file;
        const file_new_name = `${Math.floor( Math.random() * 10000000000)}_${Math.floor( Math.random() * 10000000000)}_${file.name}`;
        // console.log();
        if(file.mimetype.split('/')[0] === 'image'){
            const oauth2Client = new google.auth.OAuth2(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                process.env.REDIRECT_URI,
            )
        
            oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
        
            const drive = google.drive({
                version: 'v3',
                auth: oauth2Client
            })

            // create stream
            const fileStream = new stream.PassThrough();
            fileStream.end(new Buffer.from(file.data));
        
            try{ 
                const response = await drive.files.create({
                    requestBody: {
                        name: file_new_name,
                        mimeType: file.mimetype,
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fileStream
                    }
                })
                res.json({
                    success: true
                })
            }catch(e){
                res.json({
                    success: false,
                    message: 'Error uploading file.',
                    data: e
                })
            }
        }else{
            res.json({
                success: false,
                message: process.env.UNSUPPORTED_FILE_TYPE,
            })
        }
    }else{
        res.json({
            success: false,
            message: process.env.NO_FILE_UPLOADED,
        })
    }
})

// Route to add photos to the temp folder of the gallery so that the admin can see the image he/she selected.
router.post('/add-photo-to-temp', auth, async (req, res) => {
    // console.log(tempFolder);
    if(req.files !== null){
        const file = req.files.file;
        const file_new_name = `${Math.floor( Math.random() * 10000000000)}_${Math.floor( Math.random() * 10000000000)}_${file.name}`;
        // console.log();
        if(file.mimetype.split('/')[0] === 'image'){
            const oauth2Client = new google.auth.OAuth2(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
                process.env.REDIRECT_URI,
            )
        
            oauth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
        
            const drive = google.drive({
                version: 'v3',
                auth: oauth2Client
            })

            // create stream
            const fileStream = new stream.PassThrough();
            fileStream.end(new Buffer.alloc(file.data));
        
            try{ 
                const response = await drive.files.create({
                    requestBody: {
                        name: file_new_name,
                        mimeType: file.mimetype,
                    },
                    media: {
                        mimeType: file.mimetype,
                        body: fileStream
                    }
                })
                console.log(response.data);
            }catch(e){
                console.log(`Error: ${e}`)
            }
        }else{
            res.json({
                success: false,
                message: process.env.UNSUPPORTED_FILE_TYPE,
            })
        }
    }else{
        res.json({
            success: false,
            message: process.env.NO_FILE_UPLOADED,
        })
    }
})

// Route to fetch all photos.
router.get('/fetch-photos/:page/:amountToFetch', (req, res) => {
    let { page, amountToFetch } = req.params;
    page = parseInt(page);
    amountToFetch = parseInt(amountToFetch);
    const skip= amountToFetch * page; // The page uses an indexing system where page 1 returns 0.
    const limit = amountToFetch;

    Photo.find({})
    .sort({date: -1})
    .skip(skip)
    .limit(limit)
    .then(aps => {
        res.json({
            success: true,
            data: aps
        })
    })
    .catch(err => {
        res.json({
            success: false,
            message: process.env.FETCH_ERROR,
            data: err
        })
    })
})

router.delete('/delete-photo/:id', auth, (req, res) => {
    const { id } = req.params;

    const tempFolder = path.resolve(__dirname, '../client/public/images/gallery');


    Photo.findByIdAndRemove(id)        
    .then((photo) => {
        // console.log(photo)
        // console.log(tempFolder)
        fs.unlink(path.resolve(tempFolder, photo.url), err => {
            if (err) {
                // console.log(err)
                res.json({
                    success: false,
                    message: "Failed to delete from storage.",
                    data: err
                })
            }else{ 
                res.json({
                    success: true,
                    message: "Successfully deleted photo.",
                    data: photo
                })
            }
        });
    })
    .catch(err => {
        res.json({
            success: false,
            message: "Failed to delete.",
            data: err
        })
    })
})
module.exports = router;
