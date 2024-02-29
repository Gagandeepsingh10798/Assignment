angular.module('myApp').service('AuthenticationService', ['$http', 'API_CONSTANTS', function($http, API_CONSTANTS) {
    this.login = function(user) {
        var loginUrl = API_CONSTANTS.BASE_URL + API_CONSTANTS.LOGIN_ENDPOINT;
        return $http.post(loginUrl, user);
    };
}]);
