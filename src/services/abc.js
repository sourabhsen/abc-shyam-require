'use strict';
(function(window, angular, undefined){
  function Abc($http, $q, _){
    let model = {};
      model.eta = function(params){
        return $http.get('app/services/analytics/mocks/eta.mock.json');
      };

      model.metrics = function(params){
        return $http.get('app/services/analytics/mocks/metrics.mock.json');
      };

      model.totalCash = function(params){
        return $http.get('app/services/analytics/mocks/total-cash.mock.json');
      };

      model.totalSales = function(params){
        return $http.get('app/services/analytics/mocks/total-sales.mock.json');
      };

     return model;
  }

  Abc.$inject = ['$http', '$q', 'lodash'];

  angular.module('analytics')
  .factory('Abc', Abc);
})(window, window.angular);
