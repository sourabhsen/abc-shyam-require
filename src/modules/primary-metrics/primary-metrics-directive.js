'use strict';
(function(window, angular, undefined){
	function metric($timeout, $rootScope, ChartDateService){
		return{
			require : '^d3Chart',
			templateUrl:'app/modules/primary-metrics/primary-metrics-template.html',
			link  : function(scope, elem, attr, ctrl){
        //An alias to isNumber method to be used in directive template
        scope.isNumber = angular.isNumber;

        function update(config){
         scope.metrics = config.data;
       }

        ctrl.addUpdateListener(update.bind(this));

        $timeout(function(){
          $rootScope.$on('global-date', function($event, msg){
            let range = ChartDateService[msg]();
            ctrl.config.dates.range = ChartDateService.selectDateRange(range[0], range[1], scope.config);
            ctrl.config.update(ctrl.config);
          });
        });
      }
    };
  }

  metric.$inject = ['$timeout', '$rootScope','ChartDateService'];

  angular.module('d3Charts')
  .directive('primaryMetric', metric);

})(window, window.angular);
