angular.module('app').controller('UserSettingsController', function ($scope, $rootScope, Upload, AuthService, UserService, toastr) {
    $scope.file = {};
    $scope.user = {};

    $scope.fetchUser = function() {
        AuthService.me({}, function (res) {
            $scope.user = res;
            $scope.file = res.avatar;
        })
    };

    $scope.fetchUser();


    $scope.updateInfo = function() {
        UserService.update($scope.user, (res) => {
            let userInfo = localStorage.getItem('userInfo');

            let decodedUserInfo = JSON.parse(userInfo);
            decodedUserInfo.name = $scope.user.name;
            decodedUserInfo.email = $scope.user.email;
            localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));
            toastr.success('Successfully updated you info.');
            $scope.user.password = null;
            $scope.user.old_password = null;
            $scope.user.password_confirmation = null;
        })
    };

    $scope.upload = function (file) {
        Upload.upload({
            url: '/api/user/avatar',
            data: {file: file}
        }).then(function (resp) {
            let userInfo = localStorage.getItem('userInfo');

            let decodedUserInfo = JSON.parse(userInfo);
            decodedUserInfo.avatar += '?v=' + Math.random(0, 30000);
            localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));
        });
    }
});