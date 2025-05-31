# Files Explorer App

A simple Node.js application that allows you to browse and explore all files and folders within the uploads directory.

## Installation

1. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```
2. The server will start on port 3000 by default (change with PORT environment variable)

3. Access the file explorer:

   - http://localhost:3000/files (returns a user-friendly HTML page showing folders and files)

4. Other pages:

   - http://localhost:3000/periodic-text (displays text that updates every 5 seconds)

5. Navigation:

   - Click on folders to navigate into subdirectories
   - Click on "Parent Directory" to navigate up one level
   - Use the breadcrumb navigation at the top to jump to specific directory levels

6. Files in the uploads directory are directly accessible:
   - http://localhost:3000/uploads/filename.ext
   - http://localhost:3000/uploads/subfolder/filename.ext

## Features

- Browse through multiple levels of directories
- Clear visual distinction between files and folders
- Breadcrumb navigation for easy directory traversal
- No JavaScript required - works on all devices
- BlackBerry JAD/COD support - properly serves BlackBerry application files

## BlackBerry Applications

For BlackBerry JAD/COD files:

1. Make sure both the JAD and COD files are in the same directory
2. If experiencing "907 invalid cod" errors, check the server logs for details
3. The server will automatically set the correct MIME types for JAD and COD files

## File Management Scripts

The application includes utility scripts to help manage files:

### Moving Files from Subfolders

To move all files from subfolders to their parent directory:
