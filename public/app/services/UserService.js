angular.module('app')
    .factory('UserService', ['$resource', function($resource) {
        return $resource('/api/auth/:id', {id: '@id'}, {
            update : {
                url : '/api/user/update',
                method : 'POST'
            }
        });
    }]);