'use strict';
angular
  .module('authorBooksApp')
  .controller('BooksEditCtrl', [
    '$scope',
    'Author',
    'Book',
    '$location',
    '$routeParams',
    function($scope, Author, Book, $location, $routeParams){
      $scope.author = Author.get({ id: $routeParams.author_id });
      $scope.book = Book.get({
        id: $routeParams.id,
        author_id: $routeParams.author_id
      });

      $scope.update = function(book){
        Book.update(book, function(){
          $location.path('/authors/'+book.author_id);
        }, function(res){
          alert('Error!');
          console.log(res);
        });
      }
    }
  ]);
