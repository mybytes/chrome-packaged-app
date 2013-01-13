'use strict';

function createDataGrid($scope, $http, dataUrl) {

    $scope.filterOptions = {
        filterText:"",
        useExternalFilter:true
    };

    $scope.pagingOptions = {
        pageSizes:[10, 25, 100],
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
                    $http.get(dataUrl)
                        .success(

                        function (servicesJson) {
                            data = servicesJson.filter(function (item) {
                                return JSON.stringify(
                                    item)
                                    .toLowerCase()
                                    .indexOf(
                                    ft) != -1;
                            });
                            $scope.setPagingData(
                                data,
                                page,
                                pageSize);
                        });
                } else {
                    $http.get(dataUrl).success(

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
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
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

    $scope.gridOptions = {
        canSelectRows:true,
        multiSelect:false,
        jqueryUITheme:true,
        displaySelectionCheckbox:false,
        data:'servicesData',
        selectedItems:$scope.mySelections,
        enablePaging:true,
        pagingOptions:$scope.pagingOptions,
        filterOptions:$scope.filterOptions
    };

}

myApp.controller('HomeCtrl', ['$scope', function ($scope) {
}]);

myApp.controller('AboutCtrl', ['$scope', function ($scope) {
}]);

myApp.controller('ContactCtrl', ['$scope', function ($scope) {
}]);

myApp.controller('ConfigureCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    console.log("configure!");
    $scope.serviceName = $routeParams.serviceName;
    console.log($scope.serviceName);

    $scope.master = {};

    $scope.update = function (user) {
        $scope.master = angular.copy(user);
    };

    $scope.reset = function () {
        $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

}]);
var playground = myApp.controller('PlaygroundCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    // add service name to the scope...
    $scope.widgetName = $routeParams.widgetName;
    $scope.widgetUrl = "partials/playground/" + $routeParams.widgetName + ".html"

    console.log("Playground controller::widgetName::" + $scope.widgetName);
    console.log("Playground controller::widgetUrl::" + $scope.widgetUrl);


    // tree support
    $scope.deleteNode = function (data) {
        data.nodes = [];
    };
    $scope.addNode = function (data) {
        var post = data.nodes.length + 1;
        var newName = data.name + '-' + post;
        data.nodes.push({name:newName, nodes:[]});
    };
    $scope.tree = [
        {name:"Node", nodes:[]}
    ];


    // data grid
    createDataGrid($scope, $http, 'data/generic-list.json');

    //tabs
    $scope.panes = [
        { title:"Dynamic Title 1", content:"Dynamic content 1" },
        { title:"Dynamic Title 2", content:"Dynamic content 2" }
    ];

    // pagination
    $scope.noOfPages = 100;
    $scope.currentPage = 2;


    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    // modal
    $scope.open = function () {
        $scope.shouldBeOpen = true;
    };

    $scope.close = function () {
        $scope.closeMsg = 'I was closed at: ' + new Date();
        $scope.shouldBeOpen = false;
    };

    // date
    $scope.date = null;

    // calendar

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.events = [
        {title:'All Day Event', start:new Date(y, m, 1)},
        {title:'Long Event', start:new Date(y, m, d - 5), end:new Date(y, m, d - 2)},
        {id:999, title:'Repeating Event', start:new Date(y, m, d - 3, 16, 0), allDay:false},
        {id:999, title:'Repeating Event', start:new Date(y, m, d + 4, 16, 0), allDay:false},
        {title:'Birthday Party', start:new Date(y, m, d + 1, 19, 0), end:new Date(y, m, d + 1, 22, 30), allDay:false},
        {title:'Click for Google', start:new Date(y, m, 28), end:new Date(y, m, 29), url:'http://google.com/'}
    ]

    $scope.addChild = function () {
        $scope.events.push({
            title:'Open Sesame',
            start:new Date(y, m, 28),
            end:new Date(y, m, 29)
        });
    }

    $scope.remove = function (index) {
        $scope.events.splice(index, 1);
    }


    // carousel
    $scope.slides = [
        {image:'http://placekitten.com/325/200', text:'Kitten.'},
        {image:'http://placekitten.com/275/200', text:'Kitty!'},
        {image:'http://placekitten.com/375/200', text:'Cat.'},
        {image:'http://placekitten.com/250/200', text:'Feline!'}
    ];
    $scope.selectSlide = function (i) {
        $scope.selected = i;
    };

}]);