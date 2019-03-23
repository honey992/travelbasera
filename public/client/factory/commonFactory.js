"use strict";

app.factory('commonFactory', function(){
  return{

    showFormErrors: function(formName){
      alert(formName)
      // angular.forEach(eval(formName).$error, function(error){
      //                  angular.forEach(error, function(control){
      //                      control.$setTouched();
      //                  })
                       
      //              });
    }


  }
})