'use strict';

require(['config'], function (config) {
    require(['_module'], function (app) {
        app.bootstrap(app);
    });
    console.log('application initialized successfully..');
});
