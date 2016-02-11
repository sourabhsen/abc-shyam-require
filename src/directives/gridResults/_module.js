'use strict';

define(['angular',
    '../gridResults/gridResultsDirective',
    '../gridResults/gridResultsController',
],
    function (angular, gridResultsDirective, gridResultsController) {
        return angular.module('mc.widgets.gridResults', [])
                    .controller('gridResultsController', gridResultsController)
                    .directive('gridResults', gridResultsDirective);
    });