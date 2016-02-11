'use strict';

define(['angular',
    '../gridFilters/gridFiltersDirective',
    '../gridFilters/gridFiltersController',
],
    function (angular, gridFiltersDirective, gridFiltersController) {
        return angular.module('mc.widgets.gridFilters', [])
                    .controller('gridFiltersController',gridFiltersController)
                    .directive('gridFilters', gridFiltersDirective);
    });