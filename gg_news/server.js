var express = require('express');
var path = require('path');
var axios = require('axios');
var app = express();
var PORT = process.env.PORT || 3002;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for global news
app.get('/api/news/global', async function (req, res) {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                language: 'en',
                pageSize: 10
            },
            headers: {
                'X-Api-Key': 'f9b4fc93bcfa4e3288a0b8814a0c2aaf'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// API endpoint for Vietnam news
app.get('/api/news/vietnam', async function (req, res) {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'vn',
                pageSize: 10
            },
            headers: {
                'X-Api-Key': 'f9b4fc93bcfa4e3288a0b8814a0c2aaf'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

// Add image proxy endpoint
app.get('/api/image-proxy', async function (req, res) {
    const imageUrl = req.query.url;
    if (!imageUrl) {
        return res.status(400).send('Image URL is required');
    }

    try {
        const response = await axios({
            url: imageUrl,
            method: 'GET',
            responseType: 'stream'
        });
        // Forward content-type header
        res.set('Content-Type', response.headers['content-type']);
        // Pipe the image data to response
        response.data.pipe(res);
    } catch (error) {
        console.error('Image proxy error:', error.message);
        res.redirect('/images/no-image.png');
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, function () {
    console.log('News Server is running on http://localhost:' + PORT);
});
