"use strict";

app.constant("configuration", (function() {
    return {


         //BASE_URL: window.location.protocol + '//' + window.location.hostname + ':3000/',       //This is base url for HTTP POST, GET, PUT, DELETE Methods
        BASE_URL: window.location.protocol + '//' + window.location.hostname + '/',       //This is base url for HTTP POST, GET, PUT, DELETE Methods
         //SECOND_URL: window.location.protocol + '//' + window.location.hostname + ':3000/' ,      //This is second url for HTTP POST, GET, PUT, DELETE Methods

        SECOND_URL: window.location.protocol + '//' + window.location.hostname + '/' ,      //This is second url for HTTP POST, GET, PUT, DELETE Methods

        
        SIGN_UP_URL: "api/signup",
        LOGIN_URL : "api/login",
        ADD_ROLES_URL : "api/addRoles",
        FETCH_ROLES_URL : "api/getRoles",

    }
})());