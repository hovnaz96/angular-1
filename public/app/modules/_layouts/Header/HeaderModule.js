angular.module('app').controller('HeaderController', function (AuthService, $scope, authManager,$state) {
    $scope.logout = function () {
        let token = localStorage.getItem('access_token');

        $.ajax({
            url : '/api/auth/logout',
            method : 'POST',
            headers : {
                Authorization : 'Bearer ' + token
            }
        });

        localStorage.removeItem('userInfo');
        localStorage.removeItem('access_token');
        authManager.unauthenticate();
        $state.go('login');
    }
});