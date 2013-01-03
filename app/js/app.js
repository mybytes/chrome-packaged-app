'use strict';

// declare top-level module which depends on filters,and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives', 'ngGrid']);

// bootstrap (pre instance)
myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // use html5 *no hash) where possible
    // $locationProvider.html5Mode(true);

    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'AboutCtrl'});
    $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'ContactCtrl'});
    $routeProvider.when('/employees', {templateUrl: 'partials/employees.html', controller: 'EmployeesCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});

}]);

// once app is instantiated
myApp.run(function($rootScope, $http) {
    //$rootScope.foo = "[[root scope]]";
    // TODO putting on root scope for now because cannot get scope from within controller... this is just a workaround
    createServiceGrid($rootScope, $http);
});

// TODO why am I unable to obtain scope within the partial?
// TODO push down
function createServiceGrid($scope, $http) {

        $scope.filterOptions = {
            filterText:"",
            useExternalFilter:true
        };

        $scope.pagingOptions = {
            pageSizes:[ 10, 25, 100 ],
            pageSize:10,
            totalServerItems:15,
            currentPage:1
        };

        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            setTimeout(
                function () {
                    var data;
                    if (searchText) {
                        var ft = searchText.toLowerCase();
                        $http
                            .get('data/employees-list.json')
                            .success(
                            function (servicesJson) {
                                data = servicesJson
                                    .filter(function (item) {
                                        return JSON
                                            .stringify(
                                            item)
                                            .toLowerCase()
                                            .indexOf(
                                            ft) != -1;
                                    });
                                $scope
                                    .setPagingData(
                                    data,
                                    page,
                                    pageSize);
                            });
                    } else {
                        $http.get('data/employees-list.json').success(
                            function (servicesJson) {
                                // window.alert(servicesJson);
                                $scope.setPagingData(
                                    servicesJson, page,
                                    pageSize);
                            });
                    }
                }, 100);
        };

        $scope.setPagingData = function (data, page, pageSize) {
            var pagedData = data.slice((page - 1) * pageSize, page
                * pageSize);
            $scope.servicesData = pagedData;
            $scope.pagingOptions.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
            $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function () {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage,
                $scope.filterOptions.filterText);
        }, true);
        $scope.$watch('filterOptions', function () {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize,
                $scope.pagingOptions.currentPage,
                $scope.filterOptions.filterText);
        }, true);

        $scope.mySelections = [];

        $scope.serviceName = "";
        $scope.url = "";


        // $scope.gridOptions = { data: [] }

        $scope.gridOptions = {
            canSelectRows:true,
            multiSelect:false,
            jqueryUITheme:true,
            displaySelectionCheckbox:false,
            data:'servicesData',
            selectedItems:$scope.mySelections,
            afterSelectionChange:function (rowItem, event) {
                $scope.serviceName = $scope.mySelections[0].name;
                $scope.url = "/" + $scope.serviceName;
            },
            enablePaging:true,
            pagingOptions:$scope.pagingOptions,
            filterOptions:$scope.filterOptions

        };

}