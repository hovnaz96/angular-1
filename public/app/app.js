const app = angular.module('app', ['ui.router', 'angular-jwt', 'ngResource', 'ngAnimate', 'toastr']);


app.config(function Config($httpProvider, jwtOptionsProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
        tokenGetter: [function() {
            return localStorage.getItem('access_token');
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
});