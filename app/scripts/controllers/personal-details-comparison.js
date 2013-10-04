'use strict';

angular.module('chromePackagedAppApp')
  .controller('PersonalDetailsComparisonCtrl', function ($scope) {

  	var results = {
		  "head": {
		    "vars": [ "resource" , "type" , "fullName" , "familyName" , "givenName" , "email" , "address" , "homeLocality" , "homeCountryName" ]
		  } ,
		  "results": {
		    "bindings": [
		      {
		        "resource": { "type": "uri" , "value": "https://twitter.com/MartyBytes" } ,
		        "type": { "type": "uri" , "value": "http://www.w3.org/2006/vcard/ns#VCard" } ,
		        "fullName": { "type": "literal" , "value": "Marty Bytes" } ,
		        "address": { "type": "bnode" , "value": "b0" } ,
		        "homeLocality": { "type": "literal" , "value": "London" }
		      } ,
		      {
		        "resource": { "type": "uri" , "value": "https://plus.google.com/110781414661317480490" } ,
		        "type": { "type": "uri" , "value": "http://www.w3.org/2006/vcard/ns#VCard" } ,
		        "fullName": { "type": "literal" , "value": "Marty Bytes" } ,
		        "email": { "type": "literal" , "value": "marty@mybytes.io" } ,
		        "address": { "type": "bnode" , "value": "b1" } ,
		        "homeCountryName": { "type": "literal" , "value": "California" }
		      } ,
		      {
		        "resource": { "type": "uri" , "value": "http://www.facebook.com/marty.bytes" } ,
		        "type": { "type": "uri" , "value": "http://www.w3.org/2006/vcard/ns#VCard" } ,
		        "fullName": { "type": "literal" , "value": "Marty Bytes" } ,
		        "email": { "type": "literal" , "value": "marty@mybytes.io" } ,
		        "address": { "type": "bnode" , "value": "b2" } ,
		        "homeLocality": { "type": "literal" , "value": "London" } ,
		        "homeCountryName": { "type": "literal" , "value": "United Kingdom" }
		      }
		    ]
		  }
		};

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

    $scope.resultValues = extractResultValues(results);
    $scope.gridOptions = { 
    	data: 'resultValues',
    	columnDefs: extractColumnDefs(results)
    };
  });
