'use strict';

define(['angular'
], function (angular) {
    return angular.module('mc.core.routes', ['ui.router'])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider,$urlRouterProvider, $locationProvider) {

            // For any unmatched url, redirect to /overview
			  $urlRouterProvider.otherwise('/overview');

			  $stateProvider
				.state('overview', {
				  url   : '/overview',
				  views : {
					'main' : {
					  templateUrl  : 'src/modules/overview/overview.html',
					}
				  },

				})

        // use the HTML5 History API
        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: true
        }); */
    }]);
});