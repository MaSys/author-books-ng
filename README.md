# authorBooks
Simple AngularJS app connected to Ruby On Rails RESTful API.

To start with angular, make sure yo have installed Yeoman and Angular first from [here](https://github.com/yeoman/generator-angular).

then, you have to create a folder:

```
$ mkdir authorBooks && cd authorBooks
```
then run this line to create a new Angular app, the argument [name] is the name of the app and it's optional, you can leave it blank:
```
$ yo angular [name]
```

you will see some questions about some models to include in the app, choose to use `grunt`.

## API URL:
Now that you have created the app, you have to set the API URL.
you can use [grunt proxy](https://github.com/drewzboto/grunt-connect-proxy), but I will assign it with a constant of angular.

the final code will be:
```javascript
// app/scripts/app.js

angular
  .module('authorBooksApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .constant('apiUrl', 'htt://localhost:3000/api');
```

## Author Factory
before you start to work with the API, you have to prepar your models.
let's start with the Author model:

```javascript
// app/scripts/services/author.js

angular.module('maSysPayApp')
  .factory('Author', ['$resource', 'apiUrl', function($resource, apiUrl){
    var author = $resource(apiUrl + '/authors/:id', { id: '@id' }, { update: method: 'PUT' });
    return author
  }]);
```
we have passed the apiUrl constant, to set the resource url, and then we have to set the update method.

## Book Factory
```javascript
// app/scripts/book.js

angular.module('maSysPayApp')
  .factory('Book', ['$resource', 'apiUrl', function($resource, apiUrl){
    var book = $resource(apiUrl + '/authors/:author_id/books/:id', {
      id: '@id',
      author_id: '@author_id'
    }, {
      update: method: 'PUT'
    });
    return author
  }]);
```

## Author Controller

Now that we have created the models, let's create the controllers.
before we start, as we have many actions in the API, the final code of the Authors controller will be too big, so I have separated the controller into actions, each action will be in a separated file.

```javascript
// app/controllers/authors.index.js

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
```

```javascript
// app/controllers/authors.new.js

angular
  .module('maSysPayApp')
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
          alert(JSON.stringify(res));
        }
      }
    }
  ]);
```

```javascript
// app/controllers/authors.edit.js

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
```

```javascript
// app/controllers/authors.show.js

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
```
