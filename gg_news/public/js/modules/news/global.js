var GlobalNewsModule = {
    getImageUrl: function (originalUrl) {
        return originalUrl ?
            '/api/image-proxy?url=' + encodeURIComponent(originalUrl) :
            'images/no-image.png';
    },

    show: function (container) {
        container.innerHTML = '<div class="loading">Loading global news...</div>';

        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/news/global', true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    var html = '<div class="news-container">' +
                        '<h2>Global News</h2>' +
                        '<div class="news-list">';

                    response.articles.forEach(function (article) {
                        html += '<div class="news-item">' +
                            '    <img class="news-image" src="' + this.getImageUrl(article.urlToImage) +
                            '" alt="News Image" onerror="this.src=\'images/no-image.png\'">' +
                            '    <div class="news-content">' +
                            '        <h3>' + article.title + '</h3>' +
                            '        <p>' + article.description + '</p>' +
                            '        <div class="news-meta">' +
                            '            <span class="source">' + article.source.name + '</span>' +
                            '            <span class="time">' + new Date(article.publishedAt).toLocaleDateString() + '</span>' +
                            '        </div>' +
                            '        <a href="' + article.url + '" target="_blank" class="read-more">Read More</a>' +
                            '    </div>' +
                            '</div>';
                    }.bind(this));

                    html += '</div></div>';
                    container.innerHTML = html;
                } else {
                    container.innerHTML = '<div class="error">Failed to load news</div>';
                }
            }
        };
        xhr.send();
    }
};
