angular.module('app')
    .factory('AuthService', ['$resource', function($resource) {
        return $resource('/api/auth/:id', {id: '@id'}, {
            register : {
                url : '/api/auth/register',
                method : 'POST'
            },
            verifyEmail : {
                url : '/api/auth/email-verify',
                method : 'GET'
            },
            forgot : {
                url : '/api/auth/forgot-password',
                method : 'GET'
            },
            login : {
                url : '/api/auth/login',
                method : 'POST'
            },
            reset : {
                url : '/api/auth/reset',
                method : 'POST'
            },
            me : {
                url: '/api/auth/me',
                method : 'POST'
            },
            refresh : {
                url : '/api/auth/refresh',
                method : 'POST'
            }
        });
    }]);