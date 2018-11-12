const app = angular.module('app', ['ui.router', 'angular-jwt', 'ngResource', 'ngAnimate', 'toastr', 'ngFileUpload', 'ckeditor']);


app.run(function (authManager, $transitions, $rootScope, AuthService, $q) {
    authManager.checkAuthOnRefresh();

    $transitions.onStart({}, function(transition) {
        if(authManager.isAuthenticated()) {
            let deferredPromise = $q.defer();

            AuthService.refresh({}, (res) => {
                localStorage.setItem('access_token', res.access_token);
                deferredPromise.resolve();
            }, (err) => {
                localStorage.removeItem('access_token');
                authManager.unauthenticate();
                deferredPromise.reject();
            });

            return deferredPromise.promise;
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