angular.module('app').controller('LoginController', function () {

})

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