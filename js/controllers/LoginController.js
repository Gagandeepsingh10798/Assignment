angular.module('myApp').controller('LoginController', ['$scope', '$timeout', '$interval', 'AuthenticationService', '$location',
function($scope, $timeout, $interval, AuthenticationService, $location) {

    if(localStorage.getItem('token') && localStorage.getItem('refreshToken')) {
        $location.path('/applications');
    }

    $scope.user = {};
    $scope.inputType = 'password';

    $scope.toggleVisibility = function() {
        $scope.inputType = $scope.inputType === 'password' ? 'text' : 'password';
    };

    $scope.login = function() {
        if ($scope.loginForm.$valid) {
            AuthenticationService.login($scope.user).then(function(response) {
                $scope.showToast('Login successful', 'success');
                localStorage.setItem('token', response.data.result.auth.token);
                localStorage.setItem('refreshToken', response.data.result.auth.refreshToken);
                $location.path('/applications');
            }, function(error) {
                $scope.showToast('Login failed: Wrong credentials', 'error');
            });
        }
    };

    $scope.showToast = function(message, type) {
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
}]);
