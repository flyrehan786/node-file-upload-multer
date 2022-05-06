const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const multer = require('multer');
fs = require('fs-extra')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname  + '.apk')
  }
})

var upload = multer({ storage: storage })
app.listen(3000, () => {
  console.log('listening on 3000')
})

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');

});

// upload single file

app.post('/uploadfile', upload.single('paigam'), (req, res, next) => {
  const file = req.file
  if (!file) res.json({ status: 400, message: 'Uploading Failed'})
  res.json({ status: 200, message: 'Uploaded'})
});


app.get('/files', (req, res) => {
  let files = [];
  console.log('ok');
  //requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'uploads');
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        files.push(file); 
    });

    console.log(files[0]);
    res.json('http://localhost:3000/' + files[0]);
});
})

app.get("/:fileName", async function (req, res) {
  const file = `${__dirname}/uploads/` + req.params.fileName;
  res.download(file);
});

