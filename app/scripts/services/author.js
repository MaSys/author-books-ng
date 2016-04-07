angular.module('maSysPayApp')
  .factory('Account', ['$resource', 'apiUrl', function($resource, apiUrl){
    var author = $resource(apiUrl + '/authors/:id', { id: '@id' },
      { update: method: 'PUT' });
    return author
  }]);
