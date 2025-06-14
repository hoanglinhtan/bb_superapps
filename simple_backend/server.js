const express = require('express');
const fs = require('fs');
const path = require('path');
const net = require('net');
const bodyParser = require('body-parser');
const axios = require('axios'); // Add axios for making HTTP requests

const app = express();
const PORT = process.env.PORT || 3000;

// Define uploads directory path
const uploadsDir = path.join(__dirname, 'uploads');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
}

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define MIME types for BlackBerry specific files
app.use((req, res, next) => {
    const ext = path.extname(req.path).toLowerCase();

    // Set appropriate content types for BlackBerry files
    if (ext === '.jad') {
        res.setHeader('Content-Type', 'text/vnd.sun.j2me.app-descriptor');
    } else if (ext === '.cod') {
        res.setHeader('Content-Type', 'application/vnd.rim.cod');
    }

    next();
});

// Add a detailed logger for debugging BlackBerry file requests
app.use((req, res, next) => {
    const isBlackberryFile = /\.(jad|cod)$/i.test(req.path);
    if (isBlackberryFile) {
        console.log(`BlackBerry file request: ${req.method} ${req.path}`);
        console.log(`User-Agent: ${req.get('User-Agent')}`);

        // Log the actual file path being accessed
        const filePath = path.join(__dirname, req.path);
        const fileExists = fs.existsSync(filePath);
        console.log(`Looking for file at: ${filePath}`);
        console.log(`File exists: ${fileExists}`);
    }
    next();
});

// Route to list files and directories as HTML
app.get('/files', (req, res) => {
    // Get the requested subdirectory path from query parameters
    const requestedPath = req.query.path || '';

    // Create the full path by joining the uploads dir with the requested path
    const fullPath = path.join(uploadsDir, requestedPath);

    // Security check: Make sure the path is within uploads directory
    if (!fullPath.startsWith(uploadsDir)) {
        return res.status(403).send('<h1>Error 403: Access Denied</h1>');
    }

    // Check if the path exists
    if (!fs.existsSync(fullPath)) {
        return res.status(404).send('<h1>Error 404: Directory not found</h1>');
    }

    try {
        fs.readdir(fullPath, (err, items) => {
            if (err) {
                console.error('Error reading directory:', err);
                return res.status(500).send('<h1>Error 500: Failed to read directory</h1>');
            }

            // Get stats for each item to determine if it's a file or directory
            const itemsWithStats = items.map(item => {
                const itemPath = path.join(fullPath, item);
                const stats = fs.statSync(itemPath);
                return {
                    name: item,
                    isDirectory: stats.isDirectory(),
                    size: stats.size,
                    mtime: stats.mtime
                };
            });

            // Sort items: directories first, then files, both alphabetically
            itemsWithStats.sort((a, b) => {
                if (a.isDirectory === b.isDirectory) {
                    return a.name.localeCompare(b.name);
                }
                return a.isDirectory ? -1 : 1;
            });

            // Generate the breadcrumb navigation
            const pathParts = requestedPath.split('/').filter(Boolean);
            let breadcrumbs = '<div class="breadcrumbs">';
            breadcrumbs += '<a href="/files">Home</a>';

            let currentPath = '';
            for (let i = 0; i < pathParts.length; i++) {
                currentPath += '/' + pathParts[i];
                breadcrumbs += ` &gt; <a href="/files?path=${encodeURIComponent(currentPath.substring(1))}">${pathParts[i]}</a>`;
            }
            breadcrumbs += '</div>';

            // Generate HTML response
            let html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Files Explorer</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    h1 { color: #333; }
                    .breadcrumbs { margin-bottom: 20px; padding: 10px; background-color: #f0f0f0; border-radius: 5px; }
                    .breadcrumbs a { color: #0066cc; text-decoration: none; }
                    .breadcrumbs a:hover { text-decoration: underline; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin: 10px 0; padding: 10px; background-color: #f5f5f5; border-radius: 5px; }
                    .directory { background-color: #e6f7ff; border-left: 5px solid #33adff; }
                    .file { background-color: #f5f5f5; border-left: 5px solid #cccccc; }
                    a { color: #0066cc; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    .folder-icon::before { content: "📁 "; }
                    .file-icon::before { content: "📄 "; }
                    .back-icon::before { content: "⬆️ "; }
                    .empty-dir { color: #888; font-style: italic; }
                    .item-count { margin-bottom: 20px; color: #666; }
                    .refresh-link { display: inline-block; padding: 5px 10px; margin-top: 20px; 
                                   background-color: #f0f0f0; border-radius: 3px; }
                </style>
            </head>
            <body>
                <h1>Files Explorer</h1>
                ${breadcrumbs}
                <div class="item-count">Total items: ${itemsWithStats.length}</div>
            `;

            // Add parent directory link if we're in a subdirectory
            if (requestedPath) {
                const parentPath = pathParts.slice(0, -1).join('/');
                html += `<ul><li class="directory"><a href="/files${parentPath ? '?path=' + encodeURIComponent(parentPath) : ''}"><span class="back-icon"></span>Parent Directory</a></li></ul>`;
            }

            if (itemsWithStats.length === 0) {
                html += '<p class="empty-dir">This directory is empty.</p>';
            } else {
                html += '<ul>';
                itemsWithStats.forEach(item => {
                    if (item.isDirectory) {
                        // Create the path for the subdirectory
                        const subDirPath = requestedPath ? `${requestedPath}/${item.name}` : item.name;
                        html += `<li class="directory"><a href="/files?path=${encodeURIComponent(subDirPath)}"><span class="folder-icon"></span>${item.name}</a></li>`;
                    } else {
                        // Create the path for the file
                        const filePath = requestedPath ? `${requestedPath}/${item.name}` : item.name;
                        html += `<li class="file"><a href="/uploads/${encodeURIComponent(filePath)}" target="_blank"><span class="file-icon"></span>${item.name}</a></li>`;
                    }
                });
                html += '</ul>';
            }

            // Add refresh link
            const refreshPath = requestedPath ? `?path=${encodeURIComponent(requestedPath)}` : '';
            html += `
                <a href="/files${refreshPath}" class="refresh-link">Refresh</a>
            </body>
            </html>
            `;

            res.setHeader('Content-Type', 'text/html');
            res.send(html);
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).send('<h1>Error 500: Internal server error</h1>');
    }
});

// Direct access to JAD files with proper MIME type
app.get('/*.jad', (req, res, next) => {
    const jadPath = path.join(__dirname, req.path);
    if (fs.existsSync(jadPath)) {
        res.setHeader('Content-Type', 'text/vnd.sun.j2me.app-descriptor');

        // Read the JAD file to log its contents for debugging
        try {
            const jadContent = fs.readFileSync(jadPath, 'utf8');
            console.log(`JAD file content for ${req.path}:`);
            console.log(jadContent);

            // Send the file
            res.sendFile(jadPath);
        } catch (err) {
            console.error(`Error reading JAD file: ${err.message}`);
            next(err);
        }
    } else {
        console.log(`JAD file not found: ${jadPath}`);
        next();
    }
});

// Serve the uploads directory statically with custom options for BlackBerry files
app.use('/uploads', express.static(uploadsDir, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.jad')) {
            res.setHeader('Content-Type', 'text/vnd.sun.j2me.app-descriptor');
        } else if (filePath.endsWith('.cod')) {
            res.setHeader('Content-Type', 'application/vnd.rim.cod');
        }
    }
}));

// Handle 404 errors for COD files specifically
app.use((req, res, next) => {
    if (req.path.endsWith('.cod') && res.statusCode === 404) {
        console.log(`COD file not found: ${req.path}`);

        // Check if there might be an alternate location for the COD file
        const fileName = path.basename(req.path);
        const possibleLocations = [];

        // Search for the COD file in the entire uploads directory
        function findFile(dir, fileName) {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stats = fs.statSync(filePath);

                if (stats.isDirectory()) {
                    findFile(filePath, fileName);
                } else if (file === fileName) {
                    possibleLocations.push(filePath);
                }
            }
        }

        try {
            findFile(uploadsDir, fileName);

            if (possibleLocations.length > 0) {
                console.log(`Found alternate locations for COD file: ${possibleLocations.join(', ')}`);
                return res.sendFile(possibleLocations[0]);
            }
        } catch (err) {
            console.error(`Error searching for COD file: ${err.message}`);
        }

        res.status(404).send('Error 404: The requested COD file was not found.');
    } else {
        next();
    }
});

// Add a new route for periodic text updates page
app.get('/periodic-text', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Periodic Text Updates</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            #output-container { 
                border: 1px solid #ccc; 
                padding: 10px; 
                min-height: 200px;
                margin-top: 20px;
                background-color: #f9f9f9;
            }
            .text-entry {
                margin: 5px 0;
                padding: 5px;
                background-color: #fff;
                border-left: 3px solid #0066cc;
            }
        </style>
    </head>
    <body>
        <h1>Periodic Text Updates</h1>
        <p>This page demonstrates text being printed every 5 seconds.</p>
        <div id="output-container"></div>

        <script>
            // Get the output container element
            const outputContainer = document.getElementById('output-container');
            
            // Counter for message numbering
            let counter = 1;
            
            // Function to add text to the container
            function addText() {
                const now = new Date();
                const timeString = now.toLocaleTimeString();
                
                // Create a new paragraph element
                const textEntry = document.createElement('div');
                textEntry.className = 'text-entry';
                textEntry.textContent = 'Message #' + counter + ' - Added at ' + timeString;
                
                // Add the new element to the container
                outputContainer.appendChild(textEntry);
                
                // Increment the counter
                counter++;
                
                // Scroll to the bottom to show the newest message
                outputContainer.scrollTop = outputContainer.scrollHeight;
            }
            
            // Add initial text
            addText();
            
            // Set up interval to add text every 5 seconds
            setInterval(addText, 5000);
        </script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});

// Add a new API endpoint /testcallapi
app.get('/testcallapi', (req, res) => {
    console.log('API /testcallapi called at ' + new Date().toLocaleTimeString());
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello from /testcallapi at ' + new Date().toLocaleTimeString());
});

// Add a new API endpoint /ask to handle ChatGPT requests
app.post('/ask', async (req, res) => {
    const userQuestion = req.body.question;

    if (!userQuestion) {
        return res.status(400).json({ error: 'Question is required' });
    }

    console.log(`Received question: ${userQuestion}`);

    try {
        // Replace with actual ChatGPT API call
        const chatGPTResponse = await axios.post('https://api.openai.com/v1/chat/completions', {
            prompt: userQuestion,
            max_tokens: 100,
            model: 'gpt-4.1'
        }, {
            headers: {
                'Authorization': `Bearer APIKEY`, // Replace YOUR_API_KEY with your OpenAI API key
                'Content-Type': 'application/json'
            }
        });

        const answer = chatGPTResponse.data.choices[0].text.trim();
        res.json({ answer });
    } catch (error) {
        console.error('Error calling ChatGPT API:', error.message);
        res.status(500).json({ error: 'Failed to get response from ChatGPT' });
    }
});

// Modify the /test endpoint to include a simple chat UI compatible with ES5
app.get('/test', (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>ChatGPT Web UI</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            #chat-container { border: 1px solid #ccc; padding: 10px; min-height: 300px; margin-top: 20px; background-color: #f9f9f9; }
            .message { margin: 5px 0; padding: 5px; }
            .user-message { background-color: #e6f7ff; border-left: 3px solid #33adff; }
            .bot-message { background-color: #f5f5f5; border-left: 3px solid #cccccc; }
            #question-input { width: calc(100% - 110px); padding: 10px; margin-top: 10px; }
            #send-button { padding: 10px; background-color: #0066cc; color: white; border: none; border-radius: 5px; cursor: pointer; }
            #send-button:hover { background-color: #004c99; }
        </style>
    </head>
    <body>
        <h1>ChatGPT Web UI</h1>
        <div id="chat-container"></div>
        <div>
            <input type="text" id="question-input" placeholder="Type your question here..." />
            <button id="send-button">Send</button>
        </div>

        <script>
            var chatContainer = document.getElementById('chat-container');
            var questionInput = document.getElementById('question-input');
            var sendButton = document.getElementById('send-button');

            // Function to add a message to the chat container
            function addMessage(text, isUser) {
                var messageDiv = document.createElement('div');
                messageDiv.className = 'message ' + (isUser ? 'user-message' : 'bot-message');
                messageDiv.textContent = text;
                chatContainer.appendChild(messageDiv);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }

            // Function to send a question to the backend
            function sendQuestion() {
                var question = questionInput.value.trim();
                if (!question) return;

                // Add user message to chat
                addMessage(question, true);

                // Clear input field
                questionInput.value = '';

                // Send question to backend
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/ask', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            var response = JSON.parse(xhr.responseText);
                            if (response.answer) {
                                addMessage(response.answer, false);
                            } else {
                                addMessage('Error: Failed to get response from ChatGPT', false);
                            }
                        } else {
                            addMessage('Error: Failed to send request', false);
                        }
                    }
                };
                xhr.send(JSON.stringify({ question: question }));
            }

            // Add event listener to send button
            sendButton.addEventListener('click', sendQuestion);

            // Add event listener for Enter key
            questionInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    sendQuestion();
                }
            });
        </script>
    </body>
    </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});

// Start the HTTP server directly
app.listen(PORT, () => {
    console.log(`HTTP server running on http://localhost:${PORT}`);
});
