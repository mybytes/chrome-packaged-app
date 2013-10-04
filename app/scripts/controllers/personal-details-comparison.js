'use strict';

angular.module('myBytesApp')
  .controller('PersonalDetailsComparisonCtrl', function ($scope, SparqlService) {
	  	var extractColumnDefs = function(results) {
				return _.map(results["head"]["vars"], function(column) { 
					return { field: column, displayName: column }; 
				});
			}

			var extractResultValues = function(results) {
				return _.map(results["results"]["bindings"], function(result) { 
					var values = {};
					_.each(_.keys(result), function(property) {
						values[property] = result[property]["value"];
					});
					return values;
				});
			}
			
	  	$scope.gridData = SparqlService.getPersonalDetails(function (results) {
	  		$scope.columnDefs = extractColumnDefs(results);
	  		$scope.gridData = extractResultValues(results);
	  	});

			$scope.gridOptions = { 
				data: 'gridData',
				columnDefs: 'columnDefs'
			};

  });
