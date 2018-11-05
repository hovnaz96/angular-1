const app = angular.module('app', ['ui.router', 'angular-jwt', 'ngResource', 'ngAnimate', 'toastr', 'ngFileUpload']);


app.run(function (authManager, $transitions, $rootScope) {
    authManager.checkAuthOnRefresh();

    $transitions.onStart({}, function(transition) {
        if(authManager.isAuthenticated()) {
            console.log('sss');
        }
    });


    $rootScope.$auth = function (param) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if(userInfo[param]) {
            return userInfo[param];
        }

        return '';
    }
});

app.config(function Config($httpProvider, jwtOptionsProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
        tokenGetter: [function() {
            return localStorage.getItem('access_token');
        }],
        unauthenticatedRedirectPath: '/login'
    });

    $httpProvider.interceptors.push('jwtInterceptor');
});