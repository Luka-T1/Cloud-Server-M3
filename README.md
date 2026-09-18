# Cloud-Server-M3

A simple Node.js server designed for receiving, filtering, and storing MP3 files.

## Features
- **Strict format validation:** Accepts exclusively `.mp3` extensions or `audio/mpeg` MIME type, while automatically rejecting all other formats with a 400 status code.
- **Automatic renaming:** Generates unique file names by prepending the current timestamp to the original name to prevent overwriting.
- **Automatic folder creation:** Upon startup, it checks for and automatically creates the `uploads/` folder if it doesn't exist.
- **Static serving:** Allows direct listening or downloading of files via a public URL.


