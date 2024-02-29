angular.module('myApp').controller('ApplicationListingController', ['$scope', '$location', 'ApplicationService', function ($scope, $location, ApplicationService) {
    if (!localStorage.getItem('token') || !localStorage.getItem('refreshToken')) {
        $location.path('/login');
    }

    $scope.applications = [];
    $scope.selectedApplication = {};


    $scope.goToAddApplication = function () {
        $location.path('/applicationadd');
    };

    ApplicationService.getAll().then(function (response) {
        $scope.applications = response.data.result;
    }).catch(function (error) {
        console.error('Error fetching applications:', error);
    });

    $scope.openUserDetailsModal = function (user) {
        $scope.selectedApplication = user;
        var userDetailsModal = new bootstrap.Modal(document.getElementById('userDetailsModal'), {
            keyboard: false
        });
        userDetailsModal.show();
    };

    $scope.edit = function (id) {
        $location.path(`/applicationedit/${id}`);
    }

    $scope.delete = function (id) {
        ApplicationService.delete(id).then(function (response) {
            refreshApplications();
        }).catch(function (error) {
            console.error('Error deleting application:', error);
        });
    }

    $scope.logout = function () {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        $location.path('/login');
    }

    function refreshApplications() {
        ApplicationService.getAll().then(function (response) {
            $scope.applications = response.data.result;
        }).catch(function (error) {
            console.error('Error fetching applications:', error);
        });
    }

    $scope.tooltipContent = function (address) {
        let content = '';
        if (address) {
            content += address.address ? address.address + ', ' : '';
            content += address.city ? address.city + ', ' : '';
            content += address.district ? address.district + ', ' : '';
            content += address.state ? address.state + ', ' : '';
            content += address.country ? address.country + ', ' : '';
            content += address.zip ? 'Zip: ' + address.zip : '';
        }
        return content;
    };

    $scope.formatDob = function (dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        return formattedDate
    }

}]);
