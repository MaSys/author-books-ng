angular
  .module('maSysPayApp')
  .controller('AuthorsEditCtrl', [
    '$scope',
    'Author',
    '$location',
    '$routeParams',
    function($scope, Author, $location, $routeParams){
      $scope.author = Author.get({ id: $routeParams.id });

      $scope.update = function(author){
        Author.update(author, function(){
          $location.path('/authors');
        }, function(res){
          alert 'Error!';
          console.log res
        });
      }
    }
  ]);
