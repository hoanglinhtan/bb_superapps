var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3001;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic route for the home page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, function () {
    console.log('Server is running on http://localhost:' + PORT);
});
