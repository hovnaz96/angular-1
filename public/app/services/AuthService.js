angular.module('app')
    .factory('AuthService', ['$resource', function($resource) {
        return $resource('/api/auth/:id', {id: '@id'}, {
            register : {
                url : '/api/auth/register',
                method : 'POST'
            }
        });
    }]);