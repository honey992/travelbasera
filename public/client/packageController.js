"use strict";

app.controller('packageController', function($scope, $http,configuration,$location,Upload,$sce){

		$scope.viewData = true;
		$scope.showHighlightError = false;
		$scope.itenaryError = false;
		$scope.packageTypes = [{name:'National', code:'1'},{name:'International', code:'2'}];
		$scope.packageCategogy = [{name:'National', code:'1'},{name:'International', code:'2'}];
		$scope.pack = {highlights:[], inclusions:[],itenary:[], inclusionList :[], exclusionList:[]};

 		$scope.addmorehighlights = function(){
			if($scope.pack.highlights.length <= 4 && $scope.pack.highlightsTitle){
				$scope.showHighlightError = false;
				$scope.pack.highlights.push({title:$scope.pack.highlightsTitle});
				$scope.pack.highlightsTitle = '';
			}else{
				$scope.showHighlightError = true;
				$scope.showHighlightErrorMsg = 'Please fill the field.';
			}
			
		}; 
		$scope.getInclusions= function(){ 
	      	$http.get(configuration.INCLUSION_URL).then(function success(res){
               $scope.incList = res.data.inclusions;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		 
		};
		$scope.getInclusions();

		$scope.sourceCity = [{code:"1", name:"Delhi"},{code:"2", name:"Mumbai"}];

		$scope.pack.selectedInclusion = [];
		$scope.selectInclusion = function(obj){
			$scope.pack.selectedInclusion.push({'i_name':obj.i_name, 'i_code':obj.i_code});
			$scope.incList = $scope.incList.filter(function(_p){
				return _p.i_code !== obj.i_code
			});
			$scope._inclusionList = false; 
		};
		 $scope.removeHighlights = function(highLgts){ 
		 	  $scope.pack.highlights = $scope.pack.highlights.filter(function(o){ 
		 		return o.title != highLgts.title;
		 	});
		 	 

		 }
		$scope.removeInclusion = function(x){
			$scope.incList.push(x);
			$scope.pack.selectedInclusion = $scope.pack.selectedInclusion.filter(function(c){
				return c.i_code !== x.i_code;
			})
		};

		$scope.pack.itenary = [{title:'', description:''}];
		$scope.addItenary = function(){
			var lastItenary = $scope.pack.itenary[$scope.pack.itenary.length-1];
			var lastEmpty = false;
			for(var k in lastItenary){
				if(!lastItenary[k]) lastEmpty = true; 
			}
			if(!lastEmpty) $scope.pack.itenary.push({title:'', description:''});
			else{
				$scope.itenaryError = true;  
			} 
		}
		$scope.removeItenary = function(index){
			$scope.pack.itenary.splice(index,1);
		}

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

		$scope.getStateList = function(c_code){
			$http.get(configuration.STATE_URL+"/"+c_code).then(function success(res){
               $scope.stateList = res.data.states;
            }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			});
		}

		$scope.cityList = [{city_name:'Shimla', city_code:'1'},{city_name:'Kanpur', city_code:'2'},{city_name:'Lucknow', city_code:'3'}]
		 
		 $scope.addmoreInclusions = function(){
			if($scope.inclusionTxt){
				$scope.pack.inclusionList.push({title:$scope.inclusionTxt});
				$scope.inclusionTxt = '';
			}
			
		};

		$scope.removeInclusionList = function(o){
			$scope.pack.inclusionList = $scope.pack.inclusionList.filter(function(f){
				return f.title !== o.title;
			});
		}
		 $scope.addmoreExclusion = function(){
			if($scope.excluionTxt){
				$scope.pack.exclusionList.push({title:$scope.excluionTxt});
				$scope.excluionTxt = '';
			}
			
		};
		$scope.removeExclusionList = function(o){
			$scope.pack.exclusionList = $scope.pack.exclusionList.filter(function(f){
				return f.title !== o.title;
			});
		};
      	$scope.fetchCategories = function(){
      	$http.get(configuration.CATEGORY_URL).then(function success(res){
      		$scope.catData = res.data.data;
      	},function errorCallback(err){
      		      $scope.errorPop = true;
	                $scope.successPop = false;
	               $scope.errorMsg = 'Unable to Get Category.'
      	})
      }

       $scope.fetchCategories();



		$scope.saveNewPackage = function(files){
			if($scope.addNewPackageForm.$valid ){ 
			Upload.upload({
			      url:configuration.PACKAGE_URL, 
			      arrayKey: '',
			      data: {data:$scope.pack,file: files} 
			    }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
			 //    $http.post(configuration.PACKAGE_URL, $scope.pack).then(function success(res){  
			 //       if(res.data.status)
			 //       	$scope.uploadImages(file, res.data.data.packageId);
			 //       }, function errorCallback(err){
    //             $scope.errorPop = true;
    //             $scope.successPop = false;
    //             $scope.errorMsg = err.data.message;
 			// }); 
				}else{
					$scope.showHighlightError = true;
					$scope.itenaryError = true;
					$scope.showHighlightErrorMsg = 'Atleast 3 Highlights are required';
					angular.forEach($scope.addNewPackageForm.$error, function(error){
		               angular.forEach(error, function(control){
		                   control.$setTouched();
		               })      
			        });
					
				}
		}
	
	$scope.uploadImages = function(files, packId){  
		if($scope.addNewPackageForm.$valid){   
			  Upload.upload({
			      url:configuration.PACKAGE_IMAGES_URL, 
			      arrayKey: '',
			      data: {data:packId,file: files} 
			    }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
		 

		}else{
				angular.forEach($scope.addNewPackageForm.$error, function(error){
               angular.forEach(error, function(control){
                   control.$setTouched();
               })
               
           });
		
	}
	}

	$scope.fetchAllPackages = function(){
			    $http.get(configuration.PACKAGE_URL).then(function success(res){  
			       	$scope.packData =  res.data.data || [];
			       }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			}); 
				 
					
		}
		$scope.fetchAllPackages();
 
	 var url = $location.path();
	 if(url == '/package-details'){
	 	var packId =  ($location.search() || {}).packageId;
	 	$http.get(configuration.PACKAGE_URL+'?packageId='+packId).then(function success(res){  
			       	$scope.packageDetails =  res.data.data[0] || {};
			       $scope.packageDetails.description =	$sce.trustAsHtml($scope.packageDetails.description);
			       }, function errorCallback(err){
                $scope.errorPop = true;
                $scope.successPop = false;
                $scope.errorMsg = err.data.message;
 			}); 
	 }
	 

});