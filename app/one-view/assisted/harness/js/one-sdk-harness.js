(function () {
	'use strict';

	var module = angular.module('CrmService', ['OneSdkBridge']);

	module.factory('crmInitializer', function ($q, $log, $http, utils) {

		return function (settingsUrl) {

			var deferred = $q.defer();

			// make harness.json relative so default path works anywhere
			settingsUrl = settingsUrl || '../harness/harness.json';

			var panelSettings = {};
			var sdkSettings = {};

			// load customer identifiers for harness, using ck as the preferred identifier
			var customerKey = utils.getUrlParameter('ck') || utils.getParentUrlParameter('ck');
			var tid = (!customerKey) ? utils.getUrlParameter('tid') || utils.getParentUrlParameter('tid') : '';

			if (!customerKey && !tid) {
				$log.error('Neither \'ck\' or \'tid\' param found in the iframe or harness URL!');
			}

			var service = {

				getSettings: function () {
					return sdkSettings;
				},

				getCustomerKey: function () {
					return customerKey;
				},

				getCustomerInitObj: function () {
					if (!customerKey && !tid) {
						return null;
					}
					return {
						customerKey: customerKey,
						tid: tid
					};
				},

				getPanelSetting: function (name) {
					return panelSettings[name];
				}
			};

			// load settings from a simple json file
			$http.get(settingsUrl).success(function (data) {

				panelSettings = data[utils.getUrlParameter('panel-def') + 'PanelDef'];

				sdkSettings = data.sdkSettings;
				sdkSettings.host = utils.cleanupHost(sdkSettings.host);
				sdkSettings.closeUrl = utils.getOrigin() + sdkSettings.closeUrl;

				deferred.resolve(service);
			}).error(function (data, status, headers, config) {
				var msg = status + ' - Unable to load settings from ' + config.url;
				$log.error(msg);
				deferred.reject(msg, data);
			});

			return deferred.promise;

		};

	});

}());
