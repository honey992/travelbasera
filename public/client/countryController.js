"use strict";

app.controller('countryController', function($scope, $http,configuration,$location,$routeParams){
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
		if(url == '/country' ){ 
			$scope.getAllCountry();
		}

		$scope.addNewCountry = function(){ 
		if($scope.newCountryFrom.$valid){
		     $http.post(configuration.ADD_COUNTRY_URL, $scope.coun).then(function success(res){
               $scope.resetAll();
               $scope.getAllCountry();
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message; 

                });
			}else{
				// commonFactory.showFormErrors('$scope.newCountryFrom');
				angular.forEach($scope.newCountryFrom.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
			}
		};
		

		$scope.editCountry = function(editableData){ 
			$scope.eData = editableData
		};

		$scope.updateCountry = function(upData){
		if($scope.updateCountryForm.$valid){
				$http.put(configuration.EDIT_COUNTRY_URL, upData).then(function success(res){
	               $scope.successMsg = res.data.message;
	               $scope.successPop = true;
	               $scope.errorPop = false;
				   $scope.getAllCountry();
	               
	            }, function errorCallback(err){
	                $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = err.data.message;

	            });
	           }else{
				// commonFactory.showFormErrors('$scope.newCountryFrom');
				angular.forEach($scope.updateCountryForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
			}
		}

		$scope.deleteConfirmation = function(id){
			$scope.deleteId = id;
			$scope.deleteConfirmationModal = true;
		};

		$scope.deleteCountry = function(){ 
			$scope.id = $scope.deleteId ;
			$http.delete(configuration.DELETE_COUNTRY_URL+"/"+$scope.id).then(function success(res){
			   $scope.successMsg = res.data.message;
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.deleteConfirmationModal = false;
               $scope.getAllCountry();
			}, function errorCallback(err){
               $scope.errorPop = true;
               $scope.successPop = false;
               $scope.errorMsg = err.data.message;
			});
		};

		$scope.resetAll = function(){
		$scope.coun = {};
		$scope.newCountryFrom.$setPristine();
		$scope.newCountryFrom.$setUntouched();
	}
	

});
