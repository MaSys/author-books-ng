angular
  .module('maSysPayApp')
  .controller('AuthorsShowCtrl', [
    '$scope',
    'Author',
    '$location',
    '$routeParams',
    function($scope, Author, $location, $routeParams){
      $scope.author = Author.get({ id: $routeParams.id });
    }
  ]);
