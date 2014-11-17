"use strict";

//CONTROLLERS
function MSController($scope, $filter, msServices) {
<<<<<<< HEAD
<<<<<<< HEAD
	$scope.display = msServices.display; // show/hide state object
	$scope.searchText = msServices.searchText; // searchText object
	$scope.messages = msServices.messages // messages singleton object
	$scope.submitted = msServices.submitted; // submitted singleton object
	$scope.history = msServices.history; // history singleton object
	$scope.tableData = []; // Array used for storing filtered data
  var moviePromise = msServices.getMSData(); //use msServices to get csv data
  moviePromise.then(function (data) {
      $scope.movieData = data; // movieData
  });
  var moviePromise = msServices.getRssData(); //use msServices to get csv data
  moviePromise.then(function (data) {
		$scope.rssData = data; // movieData
		console.log($scope.rssData)
	});


	$scope.postTum = function () {
		var moviePromise = msServices.postTumblr(); //use msServices to get csv data
		moviePromise.then(function (data) {
			console.log(data)
				$scope.tum = data; // movieData
		});
	}
=======
=======
>>>>>>> origin/master
    $scope.display = msServices.display; // show/hide state object
    $scope.searchText = msServices.searchText; // searchText object
    $scope.messages = msServices.messages // messages singleton object
    $scope.submitted = msServices.submitted; // submitted singleton object
    $scope.history = msServices.history; // history singleton object
    $scope.tableData = []; // Array used for storing filtered data
    var moviePromise = msServices.getMSData(); //use msServices to get csv data
    moviePromise.then(function (data) {
        $scope.movieData = data; // movieData
      });
      var moviePromise = msServices.getRssData(); //use msServices to get csv data
      moviePromise.then(function (data) {
          $scope.rssData = data; // movieData
	  console.log($scope.rssData)
       });
<<<<<<< HEAD
>>>>>>> origin/master
=======
>>>>>>> origin/master

	$scope.validateForm = function(searchtext, form, hist) {
		// function used for validating/posting "searchtext"
		$scope.history.lastSearched = searchtext;
		if ($.inArray(searchtext, $scope.history.lastSearchedArray) === -1 ){
			$scope.history.lastSearchedArray.push(searchtext) // search history cache
		}

		if ( hist ) {
			$scope.postPromise(searchtext)
		}

		if ( !form.$valid && hist !== "hist") { // validate form
			$scope.submitted.state = false;
			form.$error.maxlength = true;
		}
		else {
			// $scope.postPromise(searchtext) // serverside post (we'll stick to
																				//angular filtering for this small data set)
		}
	}

	$scope.postPromise = function (searchtext) {
		// post searchtext to server
		var postPromise = msServices.postMs(searchtext) // post searchtext
		postPromise.then(function(data) {
			$scope.tableData = data.response_data
			if ($scope.tableData.length === 0) { // post returned 0 results
				$scope.submitted.state = true;
			}
		})

	}

	$scope.advancedFiltering = function (state, text) {
		// advanced filtering fucntion used for filtering movieData Array
		$scope.showNone = false;
		$scope.submitted.state = true;
		if (state === "$") {
			$scope.tableData = $scope.movieData
		}
		else if (state === "Serial Number Pattern") {
				$scope.submitted.state = false;
		}
		else {
			$scope.tableData = $filter('filter')($scope.movieData, text)
		}
	}
}
