/**
 * Loads HTML Maskup settings from 'window.sap.byd.ui.mashup.context.inport'.
 */
(function () {
	'use strict';

	var module = angular.module('CrmService', ['OneSdkBridge']);

	module.factory('crmInitializer', function ($q, $log, $window) {

		return function () {

			var deferred = $q.defer();

			function reject(deferred, msg) {
				$log.error(msg);
				deferred.reject({
					statusMessage: msg
				});
				return deferred.promise;
			}

			// SAP C4C uses inports & outports, it is not a mis-spelling :)
			var mashupVars = ((((($window.sap || {}).byd || {}).ui || {}).mashup || {}).context || {}).inport;

			if (!mashupVars) {
				return reject(deferred, 'Unable to load settings from SAP C4C.  HTML Mashup context not available "sap.byd.ui.mashup.context.inport"');
			}

			var panelSettings = {
				interaction: mashupVars.InteractionPath,
				structure: mashupVars.StructureApiName,
				format: mashupVars.StructureFormat
			};

			var sdkSettings = {
				version: '2.0',
				host: mashupVars.Server,
				touchpoint: mashupVars.DefaultTouchPoint,
				sk: mashupVars.SiteKey,
				oauth1: {
					apiKey: mashupVars.APIKey,
					sharedSecret: mashupVars.SecretKey,
					loginId: mashupVars.UserName
				}
			};

			var customerKey = mashupVars.CustomerKey;

			var service = {
				getSettings: function () {
					return sdkSettings;
				},

				getCustomerKey: function () {
					return customerKey;
				},

				getCustomerInitObj: function () {
					return {
						customerKey: customerKey
					};
				},

				getPanelSetting: function (name) {
					return panelSettings[name];
				}
			};

			deferred.resolve(service);

			return deferred.promise;

		};
	});

}());
