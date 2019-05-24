(function () {
	'use strict';

	var module = angular.module('CrmService', ['OneSdkBridge']);

	module.factory('crmInitializer', function ($q, $log, $http, utils) {

		return function () {

			// The name of the solution entity to get our settings from
			var solutionEntity = 'th_servicelayersettings';
			// A comma separated list of fields to retrieve from the solution entity
			var selectionList = 'th_server,th_sitekey,th_touchpoint,th_ssourl,th_apikey,th_secretkey,th_username';

			function cleanupTouchpoint(touchpoint) {
				touchpoint = touchpoint || '';

				// Clean up the touchpoint setting to provide the default schema if missing
				touchpoint = (touchpoint.indexOf('://') === -1) ? 'oehdyn://' + touchpoint : touchpoint;

				return touchpoint;
			}

			var settings = {};

			var service = {

				getSettings: function () {
					return settings;
				},

				getCustomerKey: function () {
					// safety check to avoid someone using case or other id's as customer-keys by mistake
					var typename = utils.getUrlParameter('typename');
					if (typename !== 'contact') {
						$log.warn('You cannot embed the sample ONE panels in "' + typename + '" screens, they must be customized first!');
						return;
					}

					// Dynamics ID's often come wrapped in braces, so strip them off
					return utils.getUrlParameter('id').replace('{', '').replace('}', '');
				},

				getCustomerInitObj: function () {
					var customerKey = this.getCustomerKey();
					return {
						customerKey: customerKey
					};
				},

				getPanelSetting: function (name) {
					return utils.getUrlParameterFromString(utils.getUrlParameter('data'), name);
				}
			};

			var deferred = $q.defer();

			$.ajax({
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				datatype: 'json',
				url: parent.Xrm.Page.context.getClientUrl() + '/XRMServices/2011/OrganizationData.svc/' + solutionEntity + 'Set?$select=' + selectionList,
				beforeSend: function (XMLHttpRequest) {
					XMLHttpRequest.setRequestHeader('Accept', 'application/json');
				},
				async: true,
				success: function (data) {
					var results = data.d.results;

					settings = {
						// GF: We can't control the quality of identifiers coming from dynamics so jscs needs to be
						//     temporarily turned off.
						// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
						version: '2.0',
						host: utils.cleanupHost(results[0].th_server),
						touchpoint: cleanupTouchpoint(results[0].th_touchpoint),
						sk: results[0].th_sitekey,
						oauth1: {
							apiKey: results[0].th_apikey,
							sharedSecret: results[0].th_secretkey,
							loginId: results[0].th_username
						}
					};

					deferred.resolve(service);

				},
				error: function (xhr, textStatus, errorThrown) {
					$log.error('Failed to retrieve values from the Dynamics TH Adapter: ');
					$log.error('-- status: ' + textStatus);
					$log.error('-- error: ' + errorThrown);

					deferred.reject(errorThrown);
				}
			});

			return deferred.promise;
		};
	});
}());
