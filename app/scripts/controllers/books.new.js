'use strict'

angular
  .module('authorBooksApp')
  .controller('BooksNewCtrl', [
    '$scope',
    'Author',
    'Book',
    '$routeParams',
    '$location',
    function($scope, Author, Book, $routeParams, $location){
      $scope.author = Author.get({ id: $routeParams.author_id });
      $scope.book = new Book({ author_id: $routeParams.author_id });

      $scope.create = function(book){
        book.$save(function(res){
          $location.path('/authors/'+book.author_id);
        }, function(res){
          alert('Error!');
          console.log(res);
        });
      }
    }
  ]);
