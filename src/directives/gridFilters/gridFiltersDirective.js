'use strict';

define(['angular'],
    function (angular) {
        var gridFilters = function () {
            return {
                restrict: 'AE',
                scope:{
                    selectedFilters: '='
                },
                templateUrl: 'angular/build/src/directives/gridFilters/gridFilters.html',
                controller: 'gridFiltersController',
                link: function (scope, elem, attrs, ctrl, ngModel) {                    
                    if (scope.$parent.selectedFilters) {
                        angular.extend(scope.selectedFilters, scope.$parent.selectedFilters);
                    }
                }
            };
        };

        return gridFilters;
    });