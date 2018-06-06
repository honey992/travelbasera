"use strict";

app.controller('contactController', function($scope, $http,configuration,$location,$routeParams){
		$scope.successPop = false;
		var url = $location.url();
		$scope.viewData = true; 


		$scope.addContactDetails = function(){
			if($scope.addContactusForm.$valid){
				$http.post(configuration.CONTACT_US_URL, $scope.contactD).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.contactD = {};
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
			}else{ 
				angular.forEach($scope.addContactusForm.$error, function(error){
	               angular.forEach(error, function(control){
	                   control.$setTouched();
	               })
	               
	           });
			}
		}
 
	$scope.getContacts= function(){ 
	      	$http.get(configuration.CONTACT_US_URL).then(function success(res){
               $scope.contactusData = res.data.data;
               $scope.contactD = $scope.contactusData
               $scope.editContactBtn = false;
               for(var k in $scope.contactusData){
               	if(k == 'contactno') $scope.editContactBtn = true;
               }
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
	$scope.getContacts();
 
	 
	$scope.updateContactDetails = function(obj){
		if($scope.addContactusForm.$valid){
			$http.put(configuration.CONTACT_US_URL, obj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getContacts();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}else{
			angular.forEach($scope.addContactusForm.$error, function(error){
	               angular.forEach(error, function(control){
	                   control.$setTouched();
	               })
	               
	           });

		}
		
	}; 

	$scope.editContact = function(){
			$scope.viewData = false;
	}
});

app.filter('splitName', function(){
	return function(str){
		return str.split('-')[1];
	}
})
