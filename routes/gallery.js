const express = require('express');
// const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const mv = require('mv');
const router = express.Router();
const Photo = require('../models/Photo');
const auth = require('../middleware/auth');

// Route to add photos to the Photo.
router.post('/add-photo', auth, (req, res) => {
    // C:/Users/Daniel/Downloads/Vids/Programming Tutorials/photo.jpg
    const { url } = req.body;
    const image = new Photo({url});
    // console.log(url);
    const source = path.resolve(__dirname, `../client/public/images/temp/${url}`);
    const dest = path.resolve(__dirname, `../client/public/images/gallery/${url}`);
    mv(source, dest, err => {
        if(err){
            // console.log(err)
            res.json({
                success: false,
                message: process.env.MOVING_TEMP_TO_GALLERY_ERROR,
                data: err
            })
        }else{
            image.save()
            .then(photo => {
                res.json({
                    success: true,
                    data: photo
                })
            })
            .catch(err => {
                res.json({
                    success: false,
                    message: process.env.PHOTO_UPLOAD_ERROR,
                    // data: err
                })
            })
        }
    })

})

// Route to add photos to the temp folder of the gallery so that the admin can see the image he/she selected.
router.post('/add-photo-to-temp', auth, (req, res) => {
    const tempFolder = path.resolve(__dirname, path.join('../client', 'public', 'images', 'temp'));
    // console.log(tempFolder);
    if(req.files !== null){
        const file = req.files.file;
        const file_new_name = `${Math.floor( Math.random() * 10000000000)}_${Math.floor( Math.random() * 10000000000)}_${file.name}`;
        // console.log();
        if(file.mimetype.split('/')[0] === 'image'){
            // Code to empty folder    
            fs.readdir(tempFolder, (err, files) => {
                if (err) {
                    res.json({
                        success: false,
                        message: process.env.ERROR_EMPTYING_TEMP,
                        data: err
                    })
                    return;
                }else{
                    files = files.filter(file => file !== 'default.png');
                    if(files.length > 0){
                        let errInd = 0;
                        for (const file of files) {
                            fs.unlink(path.join(tempFolder, file), err => {
                                if (err) errInd = 1;
                            });
                        }
                        (errInd === 1) && res.json({
                            success: false,
                            message: process.env.ERROR_EMPTYING_TEMP
                        });
                    }
                    const dest = path.join(tempFolder, file_new_name); 
                    file.mv(dest, err => {
                        if(err) {        
                            res.json({
                                success: false,
                                message: process.env.ERROR_MOVING_FILE,
                                data: err
                            })
                            return;
                        }else{
                            res.json({
                                success: true,
                                data: {
                                    fileName: file_new_name,
                                    dest: dest
                                }
                            })
                            return;
                        }
                    })
                } 
            });
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
