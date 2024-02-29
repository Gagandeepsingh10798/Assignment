angular.module('myApp', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'LoginController'
    })
    .when('/applications', {
        templateUrl: 'partials/applications.html',
        controller: 'ApplicationListingController'
    })
    .when('/applicationadd', {
        templateUrl: 'partials/applicationAddModal.html',
        controller: 'ApplicationAddController'
    })
    .when('/applicationedit/:id', {
        templateUrl: 'partials/applicationEditModal.html',
        controller: 'ApplicationEditController'
    })
    .otherwise({
        redirectTo: '/login'
    });
}]);


angular.module('myApp').filter('capitalize', function() {
    return function(input) {
        if (input != null) {
            return input.charAt(0).toUpperCase() + input.slice(1);
        }
        return '';
    };
});

angular.module('myApp').directive('bsTooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            element.tooltip({
                title: attrs.bsTooltip, // Use the attribute value as the tooltip title
                placement: 'top', // Default placement. You can make this dynamic via attributes if needed.
                trigger: 'hover', // Default trigger
                container: 'body' // Appends the tooltip to the body to avoid layout issues
            });
            
            // Clean up the tooltip when the element is destroyed to avoid memory leaks
            scope.$on('$destroy', function() {
                element.tooltip('dispose');
            });
        }
    };
});
