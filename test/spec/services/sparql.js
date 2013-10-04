'use strict';

describe('Service: sparqlService', function () {

  // load the service's module
  beforeEach(module('myBytesServices'));

  // instantiate service
  var sparql;
  beforeEach(inject(function (_sparql_) {
    sparql = _sparql_;
  }));

  it('should do something', function () {
    expect(!!sparql).toBe(true);
  });

});
