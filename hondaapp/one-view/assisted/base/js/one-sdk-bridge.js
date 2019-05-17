(function () {
	'use strict';

	var module = angular.module('OneSdkBridge', ['angularMoment', 'ngSanitize']);

	/**
	 * Utility filter to trust the HTML fragments coming back from ONE, so they are not sanitize and styles etc removed.
	 */
	module.filter('trustedHtml', ['$sce', function ($sce) {
		return function (text) {
			return $sce.trustAsHtml(text);
		};
	}]);

	module.directive('notificationShade', function () {
		return {
			restrict: 'E',
			// HTML is inlined here as these panels run inside another origin, and therefore the
			// relative path to the template html cannot be determined.
			// TODO: use grunt tools to automatically merge template html to be inlined during build-time
			template: '<div>' +
				'	<div ng-class="notification.severity === \'error\' ? \'alert-danger\' : \'alert-info\'" class="alert" role="alert" ng-show="notification && notification.severity != \'in-progress\'">' +
				'		<strong>{{notification.summary}}</strong>' +
				'		<br>' +
				'		{{notification.detail}}' +
				'	</div>' +
				'	<div ng-show="notification.severity == \'in-progress\'">' +
				'		<svg class="center-block" xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" class="uil-default">' +
				'			<rect x="0" y="0" width="100" height="100" fill="none" class="bk"/>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(0 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(30 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.08333333333333333s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(60 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.16666666666666666s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(90 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.25s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(120 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.3333333333333333s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(150 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.4166666666666667s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(180 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(210 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.5833333333333334s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(240 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.6666666666666666s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(270 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.75s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(300 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.8333333333333334s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'			<rect x="46.5" y="40" width="7" height="20" rx="5" ry="5" fill="#00b2ff" transform="rotate(330 50 50) translate(0 -30)">' +
				'				<animate attributeName="opacity" from="1" to="0" dur="1s" begin="0.9166666666666666s" repeatCount="indefinite"/>' +
				'			</rect>' +
				'		</svg>' +
				'	</div>' +
				'</div>'

		};
	});

	module.factory('utils', function () {

		return {

			getUrlParameter: function (paramName) {
				return this.getUrlParameterFromString(window.location.search.substring(1), paramName);
			},

			getParentUrlParameter: function (paramName) {
				return this.getUrlParameterFromString(parent.location.search.substring(1), paramName);
			},

			getUrlParameterFromString: function (searchString, paramName) {
				var urlVariables = searchString.split('&');

				for (var i = 0; i < urlVariables.length; i++) {
					var parameterName = urlVariables[i].split('=');
					if (parameterName[0] === paramName) {
						return decodeURIComponent(parameterName[1]);
					}
				}
				return '';
			},

			getOrigin: function () {
				// ie compatible way to get origin
				return window.location.origin || (window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : ''));
			},

			cleanupHost: function (host) {
				host = host || '';

				// Clean up the host setting if it was badly entered
				host = (host.indexOf('.') === -1) ? host + '.thunderhead.com' : host;
				host = (host.indexOf('://') === -1) ? 'https://' + host : host;

				return host;
			}

		};

	});

	module.factory('sdk', ['$q', function ($q) {

		return function (crmService) {

			var settings = crmService.getSettings();

			settings.promiseConverter =  function (sdkPromise) {
				// Third party promises can be wrapped with $q.when(thirdPartyPromise) to be converted into
				// $q promises. When the thirdPartyPromise resolves, the $q promise resolves accordingly and
				// $scope.$apply() is called.
				return $q.when(sdkPromise);
			};

			return ONE(settings);
		};
	}]);
}());
