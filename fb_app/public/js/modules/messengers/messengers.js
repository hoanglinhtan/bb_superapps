var MessengersModule = {
    show: function (container) {
        container.innerHTML =
            '<div class="messengers-container">' +
            '    <h2>BBM Chats</h2>' +
            '    <div class="message-list">' +
            '        <div class="message-item">' +
            '            <div class="chat-name">John Doe</div>' +
            '            <div class="chat-preview">Hey, how\'s your new BB?</div>' +
            '            <div class="chat-time">5m</div>' +
            '        </div>' +
            '        <div class="message-item">' +
            '            <div class="chat-name">Jane Smith</div>' +
            '            <div class="chat-preview">Let\'s connect on BBM!</div>' +
            '            <div class="chat-time">15m</div>' +
            '        </div>' +
            '    </div>' +
            '</div>';
    }
};
