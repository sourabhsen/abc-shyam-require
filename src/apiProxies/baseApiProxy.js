'use strict';

define(['angular'],
    function (angular) {
        var baseApiProxy = function ($http, $q, environmentUtil) {
            var self = this, deferred;

            self.getApiResponse = function (apiConfig) {
                deferred = $q.defer();

                $http(apiConfig).success(function (data) {
                    deferred.resolve(data);
                }).error(function (error) {
                    deferred.resolve(error);
                });

                return deferred.promise;
            };

            self.postApiRequest = function (method, restUrl, params) {
                deferred = $q.defer();

                // internal variables
                var dataType = 'json',
                    headers = 'application/x-www-form-urlencoded; charset=UTF-8';                

                var data = {
                    method: method,
                    url: environmentUtil.getAPIUrl() + restUrl,
                    doEmpAuth: true,
                    contenttype: 'application/json; charset=UTF-8',
                    params: params
                };

               var apiConfig = {
                    url: environmentUtil.getMCUrl(),
                    dataType: dataType,
                    method: 'POST',
                    params: data,
                    headers: {
                        'Content-Type': headers
                    }
                };

                $http(apiConfig)
                    .success(function (data) {
                        deferred.resolve(data);
                    }).error(function (error) {
                        deferred.resolve(error);
                    });

                return deferred.promise;
            };
        };

        baseApiProxy.$inject = ['$http', '$q', 'environmentUtil'];
       
        return baseApiProxy;
    });