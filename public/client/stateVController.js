"use strict";

app.controller('stateVController', function($scope, $http,configuration,$location,$routeParams){
		$scope.successPop = false;
		var url = $location.url();
		$scope.viewData = true; 

	$scope.getAllCountry= function(){ 
	      	$http.get(configuration.GET_ALL_COUNTRY_URL).then(function success(res){
               $scope.countryList = res.data.country;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
	$scope.getAllCountry();

	$scope.addNewState = function(file){
		if($scope.addStateForm.$valid){
			var reqObj = $scope.state;
			$http.post(configuration.STATE_URL, reqObj).then(function success(res){
				$scope.resetAll();
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}else{
			angular.forEach($scope.addStateForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
			
		}
		
	};
	$scope.getStates= function(){ 
	      	$http.get(configuration.STATE_URL).then(function success(res){
               $scope.stateList = res.data.states;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getStates(); 
	$scope.openEditPopup = function(x){
		x.metadata.is_active = x.metadata.is_active.toString();
		$scope.eData = angular.copy(x);
	}
	$scope.updateState = function(obj){
		if($scope.updateStateForm.$valid){
			$http.put(configuration.STATE_URL, obj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getStates();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}else{
			angular.forEach($scope.updateStateForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });

		}
		
	};
	$scope.deleteConfirmation = function(id){
		$scope.deleteId = id;
		$scope.deleteConfirmationModal = true;
	}
	$scope.deleteState = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.STATE_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.getStates();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	}

	$scope.resetAll = function(){
		$scope.state = {};
		$scope.updateStateForm.$setPristine();
		$scope.updateStateForm.$setUntouched();
	}
});

app.filter('splitName', function(){
	return function(str){
		return str.split('-')[1];
	}
})
