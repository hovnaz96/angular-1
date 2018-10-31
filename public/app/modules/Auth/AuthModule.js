angular.module('app').controller('LoginController', function ($scope, AuthService, authManager, $state) {
    $scope.user = {
        email : '',
        password : ''
    }

    $scope.login = function () {
        AuthService.login($scope.user, (res) => {
            localStorage.setItem('access_token', res.access_token);
            $state.go('/');
            authManager.authenticate();
        })
    }
});

angular.module('app').controller('VerifyController', function ($stateParams, AuthService, $state, toastr) {
    AuthService.verifyEmail({token : $stateParams.token}, function (res) {
        toastr.success('Successfully verified.');
        $state.go('login');
    })
});

angular.module('app').controller('RegisterController', function ($scope, AuthService, toastr) {
    $scope.user = {
        name : '',
        email : '',
        password : ''
    };

    $scope.register = () => {
        AuthService.register($scope.user, (res) => {
            toastr.success('Successfully Registered.');
        }, (err) => {

        })
    }
});