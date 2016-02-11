'use strict';
/* global moment */
(function(window, angular, undefined){
  /**
   * @ngdoc service
   * @name  ChartMenuService
   * @description
   * Provide functionality for the ChartDateController and d3ChartDate directive
   */
  function ChartDateService($rootScope, $log, $http, _){
    var model;

    model = this;
    /**
     * Sets date range value on config object
     * Requires the config to pass in a dates.defaultRange
     * array specifying the amount to subtract from today's date
     * followed by the unit for example [1, 'Y']
     * substract 1 Year from today
     * @param  {object} config chart config
     * @return {object }       date object
     */
    model.initializeDate = function(config){
      let startOfMonth = moment().startOf('month');
      let range        = config.range ? config.range : 1;
      let interval     = config.interval ? config.interval : 'M';
      let date = {
        from: {
          date   : moment(startOfMonth).subtract(range, interval).format('MM/DD/YY'),
          picker : moment(startOfMonth).subtract(range, interval).format('MM/DD/YYYY'),
          isOpen : false
        },
        to: {
          date   : moment(startOfMonth).subtract(range, interval).endOf('month').format('MM/DD/YY'),
          picker : moment(startOfMonth).subtract(range, interval).endOf('month').format('MM/DD/YYYY'),
          isOpen : false
        }
      };
      return date;
    };

    // TODO: add functionality to update date range changes
    model.selectDateRange = function(from, to, config){
      var date;
      if(!from || !to) {
        // TODO: send error back to form control for display
        $log.warn('Did not pick two valid dates!');
      } else {
         $rootScope.$broadcast('ns:popover:hide');
          date = {
            from: {
              date   : moment(new Date(from)).format('MM/DD/YY'),
              picker : moment(new Date(from)).format('MM/DD/YYYY'),
              isOpen : false
            },
            to: {
              date   : moment(new Date(to)).format('MM/DD/YY'),
              picker : moment(new Date(to)).format('MM/DD/YYYY'),
              isOpen : false
            }
          };
      }
      return date;
    };

    model.minDate = function(){
      return moment(new Date('2013'))._d;
    };

    model.maxDate = function() {
      return moment(new Date())._d; //set maxdate to present day
    };

    model.lastWeek = function(){
      let to    = moment().startOf('week').add(1,'d').format('MM/DD/YYYY');
      let from  = moment(new Date(to)).subtract(1,'w').format('MM/DD/YYYY');
      let range = [from, to];

      return range;
    };

    model.lastMonth = function(){
      let to    = moment().startOf('month').format('MM/DD/YYYY');
      let from  = moment(new Date(to)).subtract(1,'M').format('MM/DD/YYYY');
      let range = [from, to];

      return range;
    };

    model.today = function(){
      let to    = moment().startOf('day').format('MM/DD/YYYY');
      let from  = moment(new Date(to)).subtract(1,'d').format('MM/DD/YYYY');
      let range = [from, to];

      return range;
    };

  }


  ChartDateService.$inject = ['$rootScope', '$log', '$http', 'lodash'];

  angular.module('d3Charts')
  .service('ChartDateService', ChartDateService);

})(window, window.angular);
