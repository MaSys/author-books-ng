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

      $scope.delete = function(author){
        if(confirm('Are you sure?')){
          var author = new Author(author);
          author.$delete(function(){
            $location.path('/authors');
          });
        }
      }
    }
  ]);
