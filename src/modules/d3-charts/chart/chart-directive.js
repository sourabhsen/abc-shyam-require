'use strict';
(function(window, angular, undefined){
  /**
   * @ngdoc   directive
   * @name    d3Chart
   * @description
   * The chart directive is a wrapper for creating composable, reusable charts
   * The markup should look something like following the pattern where the
   * "d3-chart" directive wraps chart components (in this case bar and axis)
   * <d3-chart data="some.value" config="some.value">
   *   <d3-bars></d3-bars>
   *   <d3-axis></d3-axis>
   *   <d3-axis></d3-axis>
   * </d3-chart>
   * It should do the following things
   * - Determine containing DOM width
   * - Determine chart width and height
   * - Append the chart SVG to the DOM
   * - Listen for changes in data or DOM size changes and redraw chart when required
   * - Should proxy customizations from view controller
   * Required Arguments
   * @param {Object} data   Statistical data to be visualized
   * @param {Object} config Configuration Object, width and height are required
   * @param {Object} id     unique id DOM attribute
   *
   * ChartController will handle custom chart functionality
   */
  function chart(d3, $timeout, $compile, resize){
    return {
      replace          : true,
      controller       : 'ChartController',
      controllerAs     : 'ctrl',
      bindToController : true,
      scope: {
        config : '=',
        id     : '@'
      },
      link  : function(scope, elem, attr, ctrl){
        elem.addClass('ch-directive');

        if(ctrl.config.wait){
          $timeout(function(){
            go();
          });
        } else {
          go();
        }

        function go(){
          ctrl.config.id = ctrl.id;
          ctrl.init(ctrl.config);
          if(!ctrl.config.manualDimensions) {
            ctrl.calculateDimensions(ctrl.config);
          }
          elem.find(ctrl.config.hanger).css({
            width: ctrl.config.width + ctrl.config.margin.left + ctrl.config.margin.right,
            height: ctrl.config.height + ctrl.config.margin.top + ctrl.config.margin.bottom,
            display: 'block'
          });
          // append graph
          if(ctrl.config.graph) {
            ctrl.config.svg = d3
              .select('#'+ ctrl.config.id + ' > ' + ctrl.config.hanger )
            .append('svg')
              .attr('width', ctrl.config.width + ctrl.config.margin.left + ctrl.config.margin.right)
              .attr('height', ctrl.config.height + ctrl.config.margin.top + ctrl.config.margin.bottom);
          }
          // initialize chart render
          ctrl.notify( 'inits', ctrl.notify);
          // send notification across child chart directives when data changes
          scope.$watch('ctrl.config.data', function(newval, oldval){
            if(newval && newval !== undefined) {
              // data is an array with length
              if(newval.length && newval.length > 0){
                elem.find('svg').show();
                elem.find('.d3-chart-message').remove();
                // send update
                ctrl.notify('updates', ctrl.config);
              } else {
                // attach error message
                var message = $compile('<d3-chart-message config="ctrl.config"></d3-chart-message>')(scope);
                /*
                 * Fixes adding of multiple error message on charts
                 * @TODO find better way to remove/delete custom directives
                 */
                elem.find('.d3-chart-message').remove(); //Fixes multiple adding of error message on charts
                elem.find(ctrl.config.hanger).append(message);
                elem.find('svg').hide();
              }
            }
          });
        }

      }
    };
  }

  chart.$inject = ['d3', '$timeout', '$compile', 'resize'];

  angular.module('d3Charts')
  .directive('d3Chart', chart);

})(window, window.angular);
