"use strict";

app.controller('cityController', function($scope, $http,configuration,$location,$routeParams){
		$scope.successPop = false;
		var url = $location.url();
		$scope.viewData = false;

		$scope.getAllCountry= function(){ 
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
               console.log($scope.countryList);
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
	$scope.getAllCountry();
	$scope.getStates= function(){ 
	      	$http.get(configuration.STATE_URL).then(function success(res){
               $scope.allStateList = res.data.states;
               console.log($scope.allStateList);
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getStates(); 


		$scope.getStateData =  function(countryId){
				$scope.stateList = $scope.allStateList.filter(function(state){
						return state.c_id.toLowerCase() == countryId.toLowerCase();
				});
		}

		$scope.addNewCity = function(){
			if($scope.addCityForm.$valid){
			var reqObj = $scope.state;
			$http.post(configuration.STATE_URL, reqObj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}else{
			angular.forEach($scope.addCityForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
			
		}
		}


});

app.filter('splitName', function(){
	return function(str){
		return str.split('-')[1];
	}
})
