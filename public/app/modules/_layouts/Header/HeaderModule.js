angular.module('app').controller('HeaderController', function (AuthService, $scope, authManager ) {
    $scope.logout = function () {
        AuthService.logout({}, function () {
            authManager.unauthenticate();
        });
    }
});