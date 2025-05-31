document.addEventListener('DOMContentLoaded', function () {
    // Get DOM elements
    const fileListElement = document.getElementById('file-list');
    const fileCountElement = document.getElementById('file-count');
    const refreshButton = document.getElementById('refresh-btn');

    // Function to load files from API
    function loadFiles() {
        // Show loading state
        fileListElement.innerHTML = '<p><span class="loading">⟳</span> Loading files...</p>';
        fileCountElement.textContent = 'Loading...';

        // Fetch files from API
        fetch('/api/files')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Update file count
                fileCountElement.textContent = `Total files: ${data.total}`;

                // Render file list
                if (data.files.length === 0) {
                    fileListElement.innerHTML = '<p class="no-files">No files found in the uploads directory.</p>';
                } else {
                    const ul = document.createElement('ul');

                    data.files.forEach(file => {
                        const li = document.createElement('li');
                        const link = document.createElement('a');

                        link.href = `/uploads/${file}`;
                        link.textContent = file;
                        link.target = '_blank';

                        li.appendChild(link);
                        ul.appendChild(li);
                    });

                    fileListElement.innerHTML = '';
                    fileListElement.appendChild(ul);
                }
            })
            .catch(error => {
                console.error('Error fetching files:', error);
                fileListElement.innerHTML = '<p>Error loading files. Please try again.</p>';
                fileCountElement.textContent = 'Error loading file count';
            });
    }

    // Load files when page loads
    loadFiles();

    // Refresh button event listener
    refreshButton.addEventListener('click', loadFiles);

    // Automatically refresh the file list every 30 seconds
    setInterval(loadFiles, 30000);
});
