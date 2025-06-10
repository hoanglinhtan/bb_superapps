var App = {
    contentEl: null,
    modules: {},

    init: function () {
        this.contentEl = document.getElementById('content');
        this.modules = {
            feeds: FeedsModule,
            messengers: MessengersModule,
            notifications: NotificationsModule
        };
        this.showFeeds();
    },

    showFeeds: function () {
        this.modules.feeds.show(this.contentEl);
    },

    showMessengers: function () {
        this.modules.messengers.show(this.contentEl);
    },

    showNotifications: function () {
        this.modules.notifications.show(this.contentEl);
    }
};

window.onload = function () {
    App.init();
};
