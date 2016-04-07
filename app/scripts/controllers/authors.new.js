'use strict';
angular
  .module('authorBooksApp')
  .controller('AuthorsNewCtrl', [
    '$scope',
    'Author',
    '$location',
    function($scope, Author, $location){
      $scope.author = new Author();

      $scope.create = function(author){
        author.$save(function(res){
          $location.path('/authors');
        }, function(res){
          alert('Error!');
          console.log(res);
        });
      }
    }
  ]);
