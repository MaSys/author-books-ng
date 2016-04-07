'use strict';
angular
  .module('authorBooksApp')
  .controller('AuthorsShowCtrl', [
    '$scope',
    'Author',
    'Book',
    '$location',
    '$routeParams',
    function($scope, Author, Book, $location, $routeParams){
      $scope.author = Author.get({ id: $routeParams.id });
      $scope.books = Book.query({ author_id: $routeParams.id });

      $scope.delete = function(author){
        if(confirm('Are you sure?')){
          var author = new Author(author);
          author.$delete(function(){
            $location.path('/authors');
          });
        }
      }

      $scope.deleteBook = function(book){
        if(confirm('Are you sure?')){
          var book = new Book(book);
          book.$delete(function(){
            $scope.books.forEach(function(b, index){
              if(book.id == b.id){
                $scope.books.splice(index, 1);
                return false;
              }
            });
          });
        }
      }
    }
  ]);
