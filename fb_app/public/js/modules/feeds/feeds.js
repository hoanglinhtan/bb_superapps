var FeedsModule = {
    show: function (container) {
        container.innerHTML =
            '<div class="feeds-container">' +
            '    <h2>News Feed</h2>' +
            '    <div class="feed-list">' +
            '        <div class="feed-item">' +
            '            <div class="post-header">' +
            '                <img src="images/avatars/user1.png" class="avatar" alt="John">' +
            '                <span class="username">John Doe</span>' +
            '            </div>' +
            '            <div class="post-time">2 hours ago</div>' +
            '            <div class="post-content">' +
            '                Just got my new BlackBerry Bold 9900! Best keyboard ever! 📱' +
            '                <img src="images/posts/bb-bold.jpg" class="post-image" alt="BlackBerry Bold">' +
            '            </div>' +
            '            <div class="post-actions">' +
            '                <span class="like-btn">👍 Like</span>' +
            '                <span class="comment-btn">💬 Comment</span>' +
            '            </div>' +
            '        </div>' +
            '        <div class="feed-item">' +
            '            <div class="post-header">' +
            '                <img src="images/avatars/user2.png" class="avatar" alt="BlackBerry">' +
            '                <span class="username">BlackBerry Official</span>' +
            '            </div>' +
            '            <div class="post-time">3 hours ago</div>' +
            '            <div class="post-content">' +
            '                Introducing the all-new BlackBerry Messenger 7.0! Now with voice calls!' +
            '                <img src="images/posts/bbm-update.jpg" class="post-image" alt="BBM Update">' +
            '                <div class="post-link">' +
            '                    Download now from BlackBerry World' +
            '                </div>' +
            '            </div>' +
            '            <div class="post-stats">👍 1.2K likes • 💬 324 comments</div>' +
            '        </div>' +
            '        <div class="feed-item">' +
            '            <div class="post-header">' +
            '                <img src="images/avatars/user3.png" class="avatar" alt="Jane">' +
            '                <span class="username">Jane Smith</span>' +
            '            </div>' +
            '            <div class="post-time">4 hours ago</div>' +
            '            <div class="post-content">' +
            '                BBM group created for BB enthusiasts! Pin: 2A6B4C8D' +
            '                <div class="bbm-group-preview">' +
            '                    <img src="images/posts/bbm-group.png" class="group-icon" alt="BBM Group">' +
            '                    <span>BB Lovers Group</span>' +
            '                </div>' +
            '            </div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
    }
};
