// Handle video clicks
document.addEventListener('DOMContentLoaded', function () {
    var videoItems = document.getElementsByClassName('video-item');
    Array.prototype.forEach.call(videoItems, function (item) {
        item.addEventListener('click', function () {
            var videoId = this.getAttribute('data-video-id');
            window.location.href = '/stream/' + videoId;
        });
    });
});

// Search functionality
function searchVideos() {
    var query = document.getElementById('searchInput').value;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var results = JSON.parse(xhr.responseText);
            displayResults(results);
        }
    };

    xhr.open('GET', '/api/search?q=' + encodeURIComponent(query), true);
    xhr.send();
}

function displayResults(videos) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    videos.forEach(function (video) {
        var videoDiv = document.createElement('div');
        videoDiv.className = 'video-item';
        videoDiv.setAttribute('data-video-id', video.id);

        videoDiv.innerHTML =
            '<img src="' + video.thumbnail + '" alt="' + video.title + '">' +
            '<h3>' + video.title + '</h3>' +
            '<p>' + video.channel + ' - ' + video.duration + '</p>';

        resultsDiv.appendChild(videoDiv);

        videoDiv.addEventListener('click', function () {
            window.location.href = '/stream/' + video.id;
        });
    });
}
