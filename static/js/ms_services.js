'use strict';

//MODULE
// Setting up our angular module.
// This is where we would depndency inject other modules.
var msApp = angular.module('mSearch', ['angulike']);
msApp.run([
      '$rootScope', function ($rootScope) {
          $rootScope.facebookAppId = ''; // set your facebook app id here
      }
  ]);
//SERVICES
// facotry service used for passing our singletons,
// along with get and post objects to the controller
msApp.factory('msServices', function ($http) {
	return {
		searchText: {},
		display:{
			"movies": true,
			"rss": false,
		},
		submitted: { //obj used for ng-submit
				"state" : false
			},
		messages: {
			noneFound: "No Movie Matched",
			showHelp: false
		},
		history: {
			lastSearched: "",
			lastSearchedArray: [],
		},
		postTumblr: function() {
			return $http.post('/post_tumblr', {data: ""}, {

			})
					.then(function (result) {
							//resolve the promise as the result
							return result.data;

					});
		},
		getMSData: function () {
			//return the promise directly.
			   return $http.get('/get', {
				   params: { format: "json" }
			   })
				.then(function (results) {
					return results.data;
				});
		},
		getRssData: function() {
		//return the promise directly.
			return $http.get('/rss', {
				params: { format: "json" }
			})
			.then(function (results) {
				return results.data;
			});
		},
		postMs: function (data) {
            		return $http.post('/post', {data: data}, {

				})
                .then(function (result) {
                    //resolve the promise as the result
                    return result.data;

                });
		}
	}
})

//DIRECTIVES

//used for loading spinning gif...
//gets and posts aren't heavy at all so leaving
//this out of out controller and template for now
//just wanted to stick this in hear to demonstrate a Directive.
msApp.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (load) {

                if (load) {
                    elm.show();
                    var counter = 0;
                    setInterval(function () {
                        var frames = 12;
                        var frameWidth = 15;
                        var offset = counter * -frameWidth;
                        counter++;
                        if (counter >= frames) counter = 0;
                    }, 100);


                } else {
                    elm.hide(700);
                }
            });
        }
    };

}]);

angular.module('mSearch')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

msApp.filter('partition', function() {
  var part = function(arr, size) {
    if ( 0 === arr.length ) return [];
    return [ arr.slice( 0, size ) ].concat( part( arr.slice( size ), size) );
  };
  return part;
});
