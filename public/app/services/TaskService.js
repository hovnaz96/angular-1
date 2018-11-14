angular.module('app')
    .factory('TaskService', ['$resource', function($resource) {
        return $resource('/api/tasks/:id', {id: '@id'}, {
            get         : {method : 'GET'},
            update      : {method : 'PUT'},
            store       : {method : 'POST'},
            show        : {method : 'GET'},
            delete      : {method : 'DELETE'},
            sendComment : {method : 'POST', url : '/api/tasks/comment'},
            getComments : {method : 'GET', url : '/api/tasks-comments'},
        });
    }]);