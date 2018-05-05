"use strict";

app.controller('packageController', function($scope, $http,configuration,$location){

		$scope.viewData = true;
		$scope.pack = {highlights:[], inclusions:[]};


		$scope.addmorehighlights = function(){
			if($scope.pack.highlights.length <= 4 && $scope.pack.highlightsTitle){
				$scope.pack.highlights.push({title:$scope.pack.highlightsTitle});
				$scope.pack.highlightsTitle = '';
			}
			
		};
		$scope.dd = [{title:'Taxi', id:'1'},{title:'Camera', id:'2'},{title:'Visa', id:'3'}]
		$scope.pack.selectedInclusion = [];
		$scope.selectInclusion = function(obj){
			$scope.pack.selectedInclusion.push({'title':obj.title, 'id':obj.id});
			$scope.dd = $scope.dd.filter(function(_p){
				return _p.id !== obj.id
			});
			$scope._inclusionList = false; 
		};
		 
		$scope.removeInclusion = function(x){
			$scope.dd.push(x);
			$scope.pack.selectedInclusion = $scope.pack.selectedInclusion.filter(function(c){
				return c.id !== x.id;
			})
		}
		 
	

});