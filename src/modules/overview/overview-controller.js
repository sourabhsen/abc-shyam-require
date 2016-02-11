(function(window, angular, undefined){
  'use strict';


  function OverviewController(Abc){
    window.scrollTo(0,0);
    let model = this;

    model.name = 'John Peter';
    model.lastRunDate = new Date().toDateString();

    // PRIMARY METRICS
    model.metrics = {
      title  : 'Delivery Status',
      width: 960,
      height: 220,
      hanger: 'primary-metric',
      menu: true,
      filters : {
      },
      params : {
        flatOutput: true
      },
      showGrpButton : true,
      viewall : false,
      wait: true,
      update : function(config){
          model.metricLoader = Abc.metrics(config.params).then(function(response){
            model.metrics.data = response.data;
          });
      }
     };

    //volume
    model.eta = {
      title: 'ETA vs Actual ETA',
      width  : 831,
      height : 270,
      hanger   : 'd3-area',
      menu: true,
      graph: {
        xKey: 'date',
        yKey: 'eta',
        y1Key: 'actual',
        classname: 'resumes'
      },
      params  : { //query parameters
        dateAggregationLevel : 'day',
        pageNumber: 0
      },
      ticks: {
        y: '5'
      },
      update : function(config){
        model.etaPromise = Abc.eta(config.params).then(function(response){
            model.eta.data = response.data;
          });
      }
    };


    //JOB APPLICATIONS BY TITLE TOP 20
    model.totalCash = {
      title: 'Total Cash Collected By location',
      width: 1,
      height: 1.5,
      hanger: 'd3-horizontal-bar',
      menu: true,
      offsetLeft : 50,
      graph: {
        xKey: 'location',
        yKey: 'count',
        classname: 'goals',
      },
      params: {
        pageNumber: 0,
        pageSize: 20
      },
      update :  function(config){
       model.totalCashPromise = Abc.totalCash(config.params).then(function(response){
          model.totalCash.data = response.data;
        });
      }
    };

    //JOB APPLICATIONS BY TITLE TOP 20
    model.totalCashBoy = {
      title: 'Total Cash Collected By Delivery Boy',
      width: 1,
      height: 1.5,
      hanger: 'd3-horizontal-bar',
      menu: true,
      offsetLeft : 50,
      graph: {
        xKey: 'delBoy',
        yKey: 'count',
        classname: 'job-app',
      },
      params: {
        pageNumber: 0,
        pageSize: 20
      },
      update :  function(config){
       model.totalCashBoyPromise = Abc.totalCash(config.params).then(function(response){
          model.totalCashBoy.data = response.data;
        });
      }
    };

    //JOB APPLICATIONS BY TITLE TOP 20
    model.totalCashTime = {
      title: 'Total Cash Collected By Time',
      width: 1,
      height: 1.5,
      hanger: 'd3-horizontal-bar',
      menu: true,
      offsetLeft : 50,
      graph: {
        xKey: 'time',
        yKey: 'count',
        classname: 'goals',
      },
      params: {
        pageNumber: 0,
        pageSize: 20
      },
      update :  function(config){
       model.totalCashTimePromise = Abc.totalCash(config.params).then(function(response){
          model.totalCashTime.data = response.data;
        });
      }
    };

    model.totalSales = {
      title: 'Total Sales Across the Country',
      width  : 831,
      height : 270,
      hanger   : 'd3-bar',
      menu: true,
      graph: {
        xKey: 'city',
        yKey: 'count',
        classname: 'job-app',
      },
      params  : { //query parameters
        dateAggregationLevel : 'day',
        pageNumber: 0
      },
      ticks: {
        y: '5'
      },
      update :  function(config){
       model.totalSalesPromise = Abc.totalSales(config.params).then(function(response){
          model.totalSales.data = response.data;
        });
      }
    };

  }

  OverviewController.$inject = ['Abc'];

  angular.module('login',[])
  .controller('OverviewController', OverviewController);

})(window, window.angular);
