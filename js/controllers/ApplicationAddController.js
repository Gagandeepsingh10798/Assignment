angular.module('myApp').controller('ApplicationAddController', ['$scope', '$location', 'ApplicationService', '$timeout', '$interval', function($scope, $location, ApplicationService, $timeout, $interval) {
    if (!localStorage.getItem('token') || !localStorage.getItem('refreshToken')) {
        $location.path('/login');
    }
    
    $scope.cancel = function() {
        $location.path('/applications');
    };

    $scope.application = {};

    $scope.setFile = function(element) {
        $scope.$apply(function($scope) {
            $scope.application.resume = element.files[0];
        });
    };

    $scope.setFiles = function(element) {
        $scope.$apply(function($scope) {
            $scope.application.extra = element.files;
        });
    };

    // Function to show toaster
    $scope.showToast = function(message, type) {
        // Your existing code for showing toaster
        // Example implementation
        // This implementation assumes you have an HTML element with id "globalToast"
        var toastElement = angular.element(document.getElementById('globalToast'));
        var toastBody = angular.element(document.getElementById('globalToast').querySelector('.toast-body'));
        var progressBar = angular.element(document.getElementById('globalToast').querySelector('.toast-progress'));

        toastBody.text(message);

        toastElement.removeClass('toast-success toast-error');
        var headerClass = '';

        if (type === 'success') {
            headerClass = 'toast-success';
        } else if (type === 'error') {
            headerClass = 'toast-error';
        }

        toastElement.addClass(headerClass);
        progressBar.css('width', '0%');

        toastElement.addClass('show');

        var timeLeft = 3000;
        var intervalTime = 30;
        var progress = 0;

        var interval = $interval(function() {
            progress += intervalTime;
            var widthPercentage = (progress / timeLeft) * 100;
            progressBar.css('width', widthPercentage + '%');

            if (progress >= timeLeft) {
                $interval.cancel(interval);
                toastElement.removeClass('show');
            }
        }, intervalTime);
    };

    // Function to submit application
    $scope.submitApplication = function() {
        var formData = new FormData();

        if ($scope.application.dob) {
            var dob = $scope.application.dob;
            var formattedDob = ('0' + dob.getDate()).slice(-2) + '/' + ('0' + (dob.getMonth() + 1)).slice(-2) + '/' + dob.getFullYear();
            formData.append('dob', formattedDob);
        }

        if ($scope.application.extra) {
            for (var i = 0; i < $scope.application.extra.length; i++) {
                formData.append('docs', $scope.application.extra[i]);
            }
        }

        Object.keys($scope.application).forEach(function(key) {
            if (key !== 'extra' && key !== 'dob' && key !== 'address') {
                formData.append(key, $scope.application[key]);
            }
        });

        // Structure address field
        Object.keys($scope.application.address).forEach(function(key) {
            formData.append(`address[${key}]`, $scope.application.address[key]);
        });

        ApplicationService.create(formData).then(function(response) {
            // Show success toaster
            $scope.showToast('Application submitted successfully', 'success');
            console.log('Application submitted successfully', response);
            $location.path('/applications');
        }, function(error) {
            // Show error toaster
            $scope.showToast('Error submitting application', 'error');
            console.error('Error submitting application', error);
        });
    };
}]);
