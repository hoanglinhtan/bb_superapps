var NotificationsModule = {
    show: function (container) {
        container.innerHTML =
            '<div class="notifications-container">' +
            '    <h2>BB Notifications</h2>' +
            '    <div class="notification-list">' +
            '        <div class="notification-item">' +
            '            <div class="notif-icon">👤</div>' +
            '            <div class="notif-content">John Doe wants to connect with you on BBM</div>' +
            '            <div class="notif-time">Just now</div>' +
            '        </div>' +
            '        <div class="notification-item">' +
            '            <div class="notif-icon">💬</div>' +
            '            <div class="notif-content">New BBM group invitation received</div>' +
            '            <div class="notif-time">5m ago</div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
    }
};
