angular
  .module('maSysPayApp')
  .controller('AccountsIndexCtrl', [
    '$scope',
    'Author',
    fanction($scope, Author){
      $scope.authors = Author.query();

      $scope.delete = function(author){
        if(confirm 'Are you sure?'){
          var author = new Author(author);
          author.$delete(function(){
            $scope.authors.forEach(function(a, index){
              if(author.id == a.id){
                $scope.authors.splice(index, 1);
                return false;
              }
            });
          });
        }
      }
    }
  ]);
