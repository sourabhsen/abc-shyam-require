'use strict';

define([
  'angular',
  'angular-animate',
  'angular-cookies',
 
  'ui-router',
  'ui-bootstrap',  
  'ui-bootstrap-tpl',

   'src/core/apiProxies',
   'src/core/services',
   'src/core/routes',
   'src/core/constants',
   'src/core/providers',
   'src/core/commons',
   /*'src/core/filters',*/
   'src/core/utilities'
],
  function (angular) {

      return angular.module('mc.core.module', [
              
               'ngCookies',
               'ui.bootstrap',

               'mc.core.commons',
                'mc.core.routes', 
              /* 'mc.core.filters',*/
               'mc.core.constants',
               'mc.core.providers',
               'mc.core.apiProxies',
               'mc.core.services',
               'mc.core.utilities'
      ])
  });