'use strict';
(function(window, angular, undefined){
  function query($rootScope){
    return {
      require     : '^d3Chart',
      replace     : true,
      transclude  : true,
      scope       : true,
      templateUrl : 'app/modules/d3-charts/query/query-template.html',
      link        : function(scope, elem, attr, ctrl){
        scope.showGrpButton = ctrl.config.showGrpButton;

        scope.triggerEvent = function(eventname, msg){
          $rootScope.$emit(eventname, msg);
        };
      }
    };
  }
  query.$inject = ['$rootScope'];

  angular.module('d3Charts')
  .directive('d3ChartQuery', query);

})(window, window.angular);
