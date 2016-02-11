'use strict';

requirejs.config({
    baseUrl: '/',
    urlArgs: 'bust=' + new Date().getTime(),
    paths: {
        'angular': '../bower_components/angular/angular',
        'angular-animate': '../bower_components/angular-animate/angular-animate.min',
        'angular-cookies': '../bower_components/angular-cookies/angular-cookies.min',
		'q': '../bower_components/q/q',
        'ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',
        'ui-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap.min',
        'ui-bootstrap-tpl': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',
        'lodash': '../bower_components/ng-lodash/build/ng-lodash.min'
	    
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular'],
            exports: 'angular-animate'
        },
        'angular-cookies': {
            deps: ['angular'],
            exports: 'angular-cookies'
        },
		'q': {
            exports: 'q'
        },
        'ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        'ui-bootstrap': {
            deps: ['angular'],
            exports: 'ui-bootstrap'
        },
        'ui-bootstrap-tpl':{
            deps: ['angular'],
            exports: 'ui-bootstrap-tpl'
        },
        'lodash': {
            deps: ['angular'],
            exports: 'lodash'
        }
    },
    deps: []
});
