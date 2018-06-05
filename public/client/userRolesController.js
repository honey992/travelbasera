"use strict";

app.controller('userRolesController', function($scope, $http,configuration,$location){

		$scope.viewData = true;
		 $scope.addNewRole = function(){
			if($scope.addNewRoles.$valid){
				var reqObj = {r_name:$scope.role.name, is_active:$scope.role.status};
		      $http.post(configuration.ADD_ROLES_URL, reqObj).then(function success(res){
	                    $scope.successPop = true;
		               $scope.errorPop = false;
		               $scope.successMsg = res.data.message;
		            }, function errorCallback(err){
		                $scope.errorPop = true;
		                $scope.successPop = false;
		                $scope.errorMsg = err.data.message;

	                });
		 }else{
			angular.forEach($scope.addNewRoles.$error, function(error){
				               angular.forEach(error, function(control){
				                   control.$setTouched();
				               })
				               
				           });
		}
		}

		 $scope.fetchRoles = function(role){ 
		      $http.get(configuration.FETCH_ROLES_URL).then(function success(res){
	                   $scope.data = res.data.data;
	                }, function errorCallback(err){
	                    $scope.invoiceError = true;
	                    $scope.invoiceErrorMsg = err.data.message; 

	                });
		 
		}
		$scope.fetchRoles();
	$scope.openEditPopup = function(x){
		x.metadata.is_active = x.metadata.is_active.toString();
		$scope.eData = x;
	}
	$scope.updateRole = function(obj){
		if($scope.updateRoleForm.$valid){
			$http.put(configuration.ADD_ROLES_URL, obj).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.fetchRoles();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}else{
			angular.forEach($scope.updateRoleForm.$error, function(error){
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
	$scope.deleteRole = function(){
		var obj = {id:$scope.deleteId};
		$http.delete(configuration.ADD_ROLES_URL+"/"+$scope.deleteId).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.deleteConfirmationModal = false;
               $scope.fetchRoles();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
	}
	

});