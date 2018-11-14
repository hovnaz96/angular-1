angular.module('app').controller('TaskIndexController', function ($scope, $rootScope, TaskService) {
    $scope.tasks = [];

    $scope.getTasks = () => {

        TaskService.get({}, (res) => {
            $scope.tasks = res.tasks.data;
        }, (err) => {

        })
    };


    $scope.getTasks();
});

angular.module('app').controller('TaskShowController', function ($scope, $rootScope, TaskService, $stateParams) {
    $scope.task = [];
    $scope.comment = '';
    $scope.comments = {};

    $scope.getTask = () => {
        TaskService.show({id : $stateParams.id}, (res) => {
            $scope.task = res.task;
        })
    };

    $scope.sendComment = () => {
        $scope.comments.unshift({
            content :  $scope.comment,
            user_id :  $rootScope.$auth('id'),
            task_id :  $stateParams.id
        });

        TaskService.sendComment({comment  : $scope.comment, task_id : $stateParams.id}, (res) => {
            $scope.comment = '';
        })
    }

    $scope.getAllComments = () => {
        TaskService.getComments({task_id : $stateParams.id}, (res) => {
            $scope.comments = res.comments;
        })
    }

    $scope.getTask();
    $scope.getAllComments();
});

angular.module('app').controller('TaskDeleteController', function ($scope, $rootScope, TaskService, $stateParams, toastr, $state) {
    $scope.yes = () => {
        TaskService.delete({id : $stateParams.id}, (res) => {
            toastr.success('Successfully deleted.');
            $state.go('tasks');
        })
    }


});


angular.module('app').controller('TaskEditController', function ($scope, $rootScope, TaskService, $stateParams, toastr, $state, UserService) {
    $scope.isEdit = +$stateParams.id;
    $scope.name = !+$stateParams.id ? 'Create' : 'Edit';
    $scope.users = [];

    $scope.task = {
        description : ''
    };

    // Editor options.
    $scope.options = {
        language: 'en',
        allowedContent: true,
        entities: false
    };


    $scope.fetchUsers = () => {
        UserService.get({}, (res) => {
            $scope.users = res.users;
        })
    }

    $scope.fetchUsers();

    if(+$stateParams.id) {
        TaskService.show({id : $stateParams.id}, (res) => {
            $scope.task = res.task;
        });
    }



    $scope.saveTask = () => {
        if(!+$stateParams.id) {
            TaskService.store($scope.task, (res) => {
                toastr.success('Successfully created');
                $state.go('tasks');
            }, (err) => {
                let errorsArr = [];
                if(err.status === 422) {
                    Object.keys(err.data.errors).map((item) => {
                        errorsArr.push(err.data.errors[item].join('\n'));
                    })
                }

                toastr.error(errorsArr.join('\n'));
            })
        } else {
            TaskService.update({id : $stateParams.id}, $scope.task, (res) => {
                toastr.success('Successfully updated');
                $state.go('tasks');
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
    }
});