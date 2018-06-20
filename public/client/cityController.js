"use strict";


app.controller('cityController', function($scope, $http,configuration,$location,$routeParams,Upload){
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

	$scope.getStates= function(){ 
	      	$http.get(configuration.STATE_URL).then(function success(res){
               $scope.allStateList = res.data.states;
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

		$scope.addNewCity = function(file){
			/*if($scope.addCityForm.$valid){
			var reqObj = $scope.city;
			$http.post(configuration.CITY_URL, reqObj).then(function success(res){
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
			angular.forEach($scope.addCityForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
			
					}*/

			if($scope.addCityForm.$valid){ 
	           Upload.upload({
			      url:configuration.CITY_URL, 
			      data: {data:$scope.city,file: file} 
			    }).then(function (resp) {
			       $scope.resetAll();
		           $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.successMsg = resp.data.message;
		        }, function (resp) {
		             $scope.successPop = false;
		               $scope.errorPop = true;
		               $scope.successMsg = resp.data.message;
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        }); 
          }
          else{
          	angular.forEach($scope.addCityForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
          }
		}
		$scope.resetAll = function(){
			$scope.city = {};
			$scope.updateCityForm.$setPristine();
			$scope.updateCityForm.$setUntouched();
		}

		$scope.getCities= function(){ 
	      	$http.get(configuration.CITY_URL).then(function success(res){
               $scope.cityList = res.data.cities;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getCities(); 
	$scope.openEditPopup = function(x){
		x.metadata.is_active = x.metadata.is_active.toString();
		$scope.getStateData(x.c_id);
		$scope.eData = angular.copy(x);
	}
		
	$scope.updateCity = function(file){
		/*if($scope.updateCityForm.$valid){
			$http.put(configuration.CITY_URL, obj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getCities();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}else{
			angular.forEach($scope.updateCityForm.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });

		}*/
		if($scope.updateCityForm.$valid){  
	           Upload.upload({
			      url:configuration.CITY_URL, 
			      method : 'PUT',
			      data: {data:$scope.eData,file: file} 
			    }).then(function (resp) {
			        $scope.getCities();
		           $scope.successPop = true;
	               $scope.errorPop = false;
	               $scope.successMsg = resp.data.message;
		        }, function (resp) {
		             $scope.successPop = false;
		               $scope.errorPop = true;
		               $scope.successMsg = resp.data.message;
		        }, function (evt) {
		            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
		            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		        }); 
          }
          else{
          	angular.forEach($scope.updateCityForm.$error, function(error){
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
	$scope.deleteCity = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.CITY_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.getCities();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	}


});

app.filter('splitName', function(){
	return function(str){
		return str.split('-')[1];
	}
})
