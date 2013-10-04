'use strict';

angular.module('myBytesServices', ['ngResource'])
	.config(function($httpProvider){
			//See http://stackoverflow.com/questions/16661032/http-get-is-not-allowed-by-access-control-allow-origin-but-ajax-is
	    delete $httpProvider.defaults.headers.common['X-Requested-With'];
	})
  .factory('SparqlService', function Sparql($resource) {
  	
  	var getPersonalDetailsQuery = 
			  "PREFIX vcard:   <http://www.w3.org/2006/vcard/ns#> \n"
			+ "PREFIX rdf:     <http://www.w3.org/1999/02/22-rdf-syntax-ns#> \n"      
			+ "SELECT ?resource ?type ?fullName ?familyName ?givenName ?email ?homeLocality ?homeCountryName\n"
			+ "WHERE {  \n"
			+ "  ?resource a vcard:VCard . \n"
			+ "  ?resource rdf:type ?type . \n"
			+ "  OPTIONAL { ?resource vcard:fn ?fullName . } \n"
			+ "  OPTIONAL { ?resource vcard:family ?familyName . } \n"
			+ "  OPTIONAL { ?resource vcard:given ?givenName . } \n"
			+ "  OPTIONAL { ?resource vcard:email ?email . } \n"
			+ "  { SELECT ?address ?homeLocality ?homeCountryName \n"
			+ "    WHERE {  \n"
			+ "        ?address rdf:type vcard:Address . \n"
			+ "        ?address rdf:type vcard:Home . \n"
			+ "        OPTIONAL { ?address vcard:locality ?homeLocality . } \n"
			+ "        OPTIONAL { ?address vcard:country-name ?homeCountryName . } \n"
			+ "    } \n"
			+ "  } \n"
			+ "  ?resource vcard:adr ?address . \n"
			+ "}";

  	return $resource("http://personal-data-api.de.a9sapp.eu/ds/query",
							  { output: 'json' },
							  { getPersonalDetails: { method: 'GET', params: { query: getPersonalDetailsQuery } } }
						);
  });
