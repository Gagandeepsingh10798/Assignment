angular.module('myApp').controller('ApplicationEditController', ['$scope', '$location', 'ApplicationService', '$timeout', '$interval', '$routeParams', function($scope, $location, ApplicationService, $timeout, $interval, $routeParams) {
    if (!localStorage.getItem('token') || !localStorage.getItem('refreshToken')) {
        $location.path('/login');
    }
    $scope.cancel = function() {
        $location.path('/applications');
    };

    $scope.application = {};

    $scope.setNewResume = function(element) {
        $scope.$apply(function($scope) {
            $scope.application.resume = element.files[0];
        });
    };

    $scope.setNewDocs = function(element) {
        $scope.$apply(function($scope) {
            $scope.application.docs = element.files;
        });
    };

    $scope.removeResume = function() {
        delete $scope.application.resume;
    };

    $scope.removeDoc = function(doc) {
        var index = $scope.application.existingDocs.indexOf(doc);
        if (index !== -1) {
            $scope.application.existingDocs.splice(index, 1);
        }
    };

    ApplicationService.getById($routeParams.id).then(function(response) {
        response.data.result.dob = new Date(response.data.result.dob)
        $scope.application = response.data.result;
        $scope.application.existingDocs = $scope.application.docs
        delete  $scope.application.docs
    }).catch(function(error) {
        console.error('Error fetching applications:', error);
    });


    $scope.submitApplication = function() {
        var formData = new FormData();

        if ($scope.application.dob) {
            var dob = $scope.application.dob;
            var formattedDob = ('0' + dob.getDate()).slice(-2) + '/' + ('0' + (dob.getMonth() + 1)).slice(-2) + '/' + dob.getFullYear();
            formData.append('dob', formattedDob);
        }

        if ($scope.application.docs) {
            for (var i = 0; i < $scope.application.docs.length; i++) {
                formData.append('docs', $scope.application.docs[i]);
            }
        }

        Object.keys($scope.application).forEach(function(key) {
            if (key !== 'extra' && key !== 'dob' && key !== 'address' && key!== 'existingDocs' && key !== 'resume') {
                formData.append(key, $scope.application[key]);
            }
        });

        Object.keys($scope.application.address).forEach(function(key) {
            formData.append(`address[${key}]`, $scope.application.address[key]);
        });

        $scope.application.existingDocs.map(doc => {
            formData.append('existingDocs', doc._id)
        });

        if($scope.application.resume){
        formData.append(`resume`, ($scope.application.resume._id ? $scope.application.resume._id : $scope.application.resume));
        }

        ApplicationService.update(formData).then(function(response) {
            console.log('Application submitted successfully', response);
            $location.path('/applications');
        }, function(error) {
            console.error('Error submitting application', error);
        });
    };

}]);
