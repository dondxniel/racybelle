git ignore will make sure the .env file and node_module folder will not be uploaded to github. So if you 
are cloning the project from github, make sure you re create the .env file with values for 

MONGO_URI, ACCESS_TOKEN_SECRET, SAVE_ERROR, FETCH_ERROR, FETCH_DATES_ERROR, FILE_FETCH_ERROR, NO_FILE_UPLOADED, ERROR_MOVING_FILE, ERROR_EMPTYING_TEMP, MOVING_TEMP_TO_GALLERY_ERROR and PHOTO_UPLOAD_ERROR.

...for the backend and 

REACT_APP_BACKEND_HOST

...for the frontend