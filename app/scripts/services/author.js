angular.module('authorBooksApp')
  .factory('Author', ['$resource', 'apiUrl', function($resource, apiUrl){
    var author = $resource(apiUrl + '/authors/:id', { id: '@id' }, { update: { method: 'PUT' } });
    return author
  }]);
