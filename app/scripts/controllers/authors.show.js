'use strict';
angular
  .module('authorBooksApp')
  .controller('AuthorsShowCtrl', [
    '$scope',
    'Author',
    '$location',
    '$routeParams',
    function($scope, Author, $location, $routeParams){
      $scope.author = Author.get({ id: $routeParams.id });
    }
  ]);
