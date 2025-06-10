var App = {
    contentEl: null,
    modules: {},

    init: function () {
        this.contentEl = document.getElementById('content');
        this.modules = {
            global: GlobalNewsModule,
            vietnam: VietnamNewsModule
        };
        this.showGlobalNews();
    },

    showGlobalNews: function () {
        this.modules.global.show(this.contentEl);
    },

    showVietnamNews: function () {
        this.modules.vietnam.show(this.contentEl);
    }
};

window.onload = function () {
    App.init();
};
