angular.module('app').controller('HeaderController', function (AuthService, $scope, authManager ) {
    $scope.logout = function () {
        AuthService.logout({}, function () {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('access_token');
            authManager.unauthenticate();
        });
    }
});