"use strict";

app.controller('userController', function($scope, $http,configuration, $location){


	$scope.userLogin = function(){ 
	 httpd.post(configuration.EDIT_ITEMS, $scope.newInvoice).then(function success(res){
                    $scope.SuccessMsg = res.data.message;  
                }, function errorCallback(err){
                    $scope.invoiceError = true;
                    $scope.invoiceErrorMsg = err.data.message; 

                });
	}

});