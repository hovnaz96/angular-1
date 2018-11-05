angular.module('app').controller('LoginController', function ($scope, AuthService, authManager, $state, toastr) {
    $scope.user = {
        email : '',
        password : ''
    }

    $scope.login = function () {
        AuthService.login($scope.user, (res) => {
            localStorage.setItem('access_token', res.access_token);
            AuthService.me({}, (res) => {
                localStorage.setItem('userInfo', JSON.stringify(res));
                authManager.authenticate();
                $state.go('/');
            });
        }, (err) => {
            if(err.status === 422) {
                toastr.error(err.data.errors.email);
            }
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
            let errorsArr = [];
            if(err.status === 422) {
                Object.keys(err.data.errors).map((item) => {
                    errorsArr.push(err.data.errors[item].join('\n'));
                })
            }

            toastr.error(errorsArr.join('\n'));
        })
    }
});


angular.module('app').controller('ForgotController', function (AuthService, $state, toastr, $scope) {
    $scope.email = '';

    $scope.forgot = () => {
        AuthService.forgot({email : $scope.email}, (res) => {
            toastr.success('Please Check you email.')
        }, (err) => {
            let errorsArr = [];
            if(err.status === 422) {
                Object.keys(err.data.errors).map((item) => {
                    errorsArr.push(err.data.errors[item].join('\n'));
                })
            }

            toastr.error(errorsArr.join('\n'));
        })
    }
});


angular.module('app').controller('ResetController', function ($stateParams, AuthService, $state, toastr, $scope) {
    $scope.password = '';

    $scope.reset = () => {
        AuthService.reset({password : $scope.password, token : $stateParams.token}, (res) => {
            $state.go('login');
        }, (err) => {
            let errorsArr = [];
            if(err.status === 422) {
                Object.keys(err.data.errors).map((item) => {
                    errorsArr.push(err.data.errors[item].join('\n'));
                })
            }

            toastr.error(errorsArr.join('\n'));
        })
    }
});
