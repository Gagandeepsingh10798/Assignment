angular.module('myApp').service('ApplicationService', ['$http', 'API_CONSTANTS', function($http, API_CONSTANTS) {
    this.create = function(applicationFormData) {
        var create = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_ALL_APPLICATIONS;
        var token = localStorage.getItem('token');
        var config = {
            headers: {
                'Authorization': token,
                'Content-Type': undefined
            }
        };
        return $http.post(create, applicationFormData, config);
    };
    this.update = function(applicationFormData) {
        var update = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_ALL_APPLICATIONS + `/${applicationFormData.get('_id')}`;
        var token = localStorage.getItem('token');
        var config = {
            headers: {
                'Authorization': token,
                'Content-Type': undefined
            }
        };
        return $http.put(update, applicationFormData, config);
    };
    this.delete = function(id) {
        var Delete = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_ALL_APPLICATIONS + `/` + id;
        var token = localStorage.getItem('token');
        var config = {
            headers: {
                'Authorization': token,
                'Content-Type': undefined
            }
        };
        return $http.delete(Delete, config);
    };
    this.getAll = function() {
        var getAll = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_ALL_APPLICATIONS;
        var token = localStorage.getItem('token');
        var config = {
            headers: {
                'Authorization': token
            }
        };
        return $http.get(getAll, config);
    };
    this.getById = function(id) {
        var getAll = API_CONSTANTS.BASE_URL + API_CONSTANTS.GET_ALL_APPLICATIONS + '/' + id ;
        var token = localStorage.getItem('token');
        var config = {
            headers: {
                'Authorization': token
            }
        };
        return $http.get(getAll, config);
    };
}]);
