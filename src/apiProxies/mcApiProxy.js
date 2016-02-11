'use strict';

define(['angular'],
    function (angular) {
        var mcApiProxy = function (baseApiProxy, environmentUtil, serviceConstants) {

            this.get = function (restUrl) {
                var httpConfig = {
                    method: serviceConstants.httpVerb.GET,
                    url: environmentUtil.getMCAppUrl() + restUrl
                };
                return baseApiProxy.getApiResponse(httpConfig);
            };
        };

        mcApiProxy.$inject = ['mc.apiProxies.baseApiProxy', 'environmentUtil', 'mc.constants.serviceConstants'];

        return mcApiProxy;
    });