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
        FETCH_USERS_URL : "api/getAllUsers",
        CHANGE_PASSWORD_URL : "api/changePassword",
        FETCH_SINGLE_USER : "api/fetchSingleUser",
        DELETE_USER_URL : "api/deleteUser",
        UPDATE_USER_URL : "api/editUser",
        UPLOAD_BANNER_URL : "api/uploadBanners",
        FETCH_BANNERS_URL : "api/getBanners",
        TESTIMONIAL_URL : "api/user-reviews", 
        GET_ALL_COUNTRY_URL:"api/getAllCountry",
        ADD_COUNTRY_URL:"api/addCountry",
        EDIT_COUNTRY_URL:"api/editCountry",
        DELETE_COUNTRY_URL:"api/deleteCountry",
        FETCH_SINGLE_COUNTRY:"api/fetchSingleCountry"
    }
})());