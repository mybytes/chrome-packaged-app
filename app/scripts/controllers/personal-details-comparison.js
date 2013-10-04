'use strict';

angular.module('myBytesApp')
  .controller('PersonalDetailsComparisonCtrl', function ($scope, SparqlService) {

			$scope.rows = SparqlService.getPersonalDetails(function (results) {
				/* convert the results into the format:
				
					$scope.rows = [ { header: "fullName",  rowClass: "danger", values: ["Marty Bytes", "Marty Bytes", ...] },
													{ header: "firstName", rowClass: "",       values: ["Marty", "Marty", ...] },  
													...
												]
				*/
				$scope.rows = _.map(results["head"]["vars"], function(head) { 
					var values = _.map(results["results"]["bindings"], function(item) {
						return _.has(item, head) ? item[head].value : "";
					});
					return { 
						header: head, 
						rowClass: _.unique(values).length > 1 ? "danger": "",
						values: values
						}; 
				});
			});

  });
