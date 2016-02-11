'use strict';
(function(window, angular, undefined){
  function d3Bar() {
    return {
      require : '^d3Chart',
      link    : function(scope, elem, attr, ctrl){
        var chart;
        elem.addClass('d3-bar');

        function init(){
          chart = ctrl.config.svg.chart('Bar', ctrl.config);
        }

        function update(config){
          chart.draw(config.data);
        }

        ctrl.addInitListener(init.bind(this));

        ctrl.addUpdateListener(update.bind(this));
      }
    };
  }

  d3Bar.$inject = [];

  angular.module('d3Charts')
  .directive('d3Bar', d3Bar);
})(window, window.angular);
