const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

// Ograničenje: propušta samo fajlove sa .mp3 ekstenzijom ili audio/mpeg MIME tipom
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'audio/mpeg' || path.extname(file.originalname).toLowerCase() === '.mp3') {
        cb(null, true);
    } else {
        cb(new Error('Dozvoljen je samo upload MP3 fajlova!'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter
});

app.use('/fajlovi', express.static(uploadDir));

app.post('/upload', upload.single('mp3'), (req, res) => {
    res.send(`Uspešno otpremljen fajl: /fajlovi/${req.file.filename}`);
});

// Obrada greške ukoliko se pošalje pogrešan format
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Cloud-Server-M3 radi na portu ${PORT}`));