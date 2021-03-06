angular.module('authorBooksApp')
  .factory('Book', ['$resource', 'apiUrl', function($resource, apiUrl){
    var book = $resource(apiUrl + '/authors/:author_id/books/:id', {
      id: '@id',
      author_id: '@author_id'
    }, {
      update: { method: 'PUT' }
    });
    return book
  }]);
