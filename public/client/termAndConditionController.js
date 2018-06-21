"use strict";

app.controller('termAndConditionController', function($scope, $http,configuration,$location,fileUpload,$sce){

		$scope.viewData = true; 
	$scope.toggelView = function(){
		$scope.viewData = !$scope.viewData;
	}
$scope.tnC = {};

		 $scope.addTnC = function(){
		 	$scope.requiredDesc = false;
		 	if($scope.tnC.description){
		 		$http.post(configuration.TERM_CONDITION_URL, $scope.tnC).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getTnC();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
		 	}
		 	 
		 };

		 $scope.getTnC= function(){ 
	      	$http.get(configuration.TERM_CONDITION_URL).then(function success(res){
            console.log(res.data)
               $scope.tncData = res.data.data;
               $scope.tncCb = $sce.trustAsHtml($scope.tncData.description);
               $scope.editTnC = false;
               for(var k in $scope.tncData){
               	if( k == 'description' && $scope.tncData[k]){
               		$scope.editTnC = true;
               		$scope.tnC = $scope.tncData;
               	} 
               }
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getTnC();

		 $scope.updateTnC = function(){

		 	$scope.requiredDesc = false;
		 	if($scope.tnC.description){
		 		$http.put(configuration.TERM_CONDITION_URL, $scope.tnC).then(function success(res){
               $scope.successPop = true;
               $scope.errorPop = false;
               $scope.successMsg = res.data.message;
               $scope.getTnC();
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 	}else{
		 		$scope.requiredDesc = true;
		 	}
		 	 
		 }; 

     $scope.resetAll = function(){
      $scope.tnC = {};
      $scope.termAndConditionForm.$setPristine();
      $scope.termAndConditionForm.$setUntouched();
     }

});