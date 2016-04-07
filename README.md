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

angular.module('authorBooksApp')
  .factory('Author', ['$resource', 'apiUrl', function($resource, apiUrl){
    var author = $resource(apiUrl + '/authors/:id', { id: '@id' }, { update: { method: 'PUT' } });
    return author
  }]);
```
we have passed the apiUrl constant, to set the resource url, and then we have to set the update method.

## Book Factory
```javascript
// app/scripts/book.js

angular.module('authorBooksApp')
  .factory('Book', ['$resource', 'apiUrl', function($resource, apiUrl){
    var book = $resource(apiUrl + '/authors/:author_id/books/:id', {
      id: '@id',
      author_id: '@author_id'
    }, {
      update: { method: 'PUT' }
    });
    return author
  }]);
```

## Author Controller

Now that we have created the models, let's create the controllers.
before we start, as we have many actions in the API, the final code of the Authors controller will be too big, so I have separated the controller into actions, each action will be in a separated file.

```javascript
// app/controllers/authors.index.js

'use strict';
angular
  .module('authorBooksApp')
  .controller('AuthorsIndexCtrl', [
    '$scope',
    'Author',
    function($scope, Author){
      $scope.authors = Author.query();

      $scope.delete = function(author){
        if(confirm('Are you sure?')){
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
          alert(JSON.stringify(res));
        }
      }
    }
  ]);
```

```javascript
// app/controllers/authors.edit.js

'use strict';
angular
  .module('authorBooksApp')
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
          alert('Error!');
          console.log(res);
        });
      }
    }
  ]);
```

```javascript
// app/controllers/authors.show.js

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
```

now that we have created the author controllers, we have to create templates and routes.

modify your $routeProvider in app.js file to look like this:

```javascript
// app/scripts/app.js

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/authors', {
        templateUrl: 'views/authors/index.html',
        controller: 'AuthorsIndexCtrl',
        controllerAs: 'authorsIndex'
      })
      .when('/authors/new', {
        templateUrl: 'views/authors/new.html',
        controller: 'AuthorsNewCtrl',
        controllerAs: 'authorsNew'
      })
      .when('/authors/:id/edit', {
        templateUrl: 'views/authors/edit.html',
        controller: 'AuthorsEditCtrl',
        controllerAs: 'authorsEdit'
      })
      .when('/authors/:id', {
        templateUrl: 'views/authors/show.html',
        controller: 'AuthorsShowCtrl',
        controllerAs: 'authorsShow'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
```

now we have all the routes for authors.
you can add the templates with the design you want:

```html
<!-- app/views/authors/index.html -->

<h1 class="">Authors</h1>
<div class="row">
  <div class="col-md-8"></div>
  <div class="col-md-4">
    <a href="#/authors/new" class="btn btn-primary">New</a>
  </div>
</div>
<table class="table">
  <thead>
    <tr>
      <th>
        Name
      </th>
      <th width="120"></th>
    </tr>
  </thead>
  <tbody>
    <tr ng-repeat="author in authors">
      <td>
        <a ng-href="#/authors/{{ author.id }}">
          {{ author.title }}
        </a>
      </td>
      <td>
        <a class="btn btn-default" ng-href="#/authors/{{ author.id }}/edit">Edit</a>
        <a class="btn btn-danger" ng-click="delete(author)">Delete</a>
      </td>
    </tr>
  </tbody>
</table>
```

```html
<!-- app/views/authors/new.html -->

<form class="">
  <div ng-include="'views/authors/_form.html'"></div>
  <br>
  <button class="btn btn-primary" type="submit">Create</button>
  <a ng-href="#/authors" class="btn btn-default"> Cancel </a>
</form>
```

```html
<!-- app/views/authors/edit.html -->

<form class="">
  <div ng-include="'views/authors/_form.html'"></div>
  <br>
  <button type="submit" class="btn btn-primary" ng-click="update(author)"> Update </button>
  <a ng-href="#/authors" class="btn btn-default"> Cancel </a>
</form>
```

```html
<!-- app/views/authors/_form.html -->

<div class="field">
  <label for="author-title">Title</label>
  <input ng-model="author.title" type="text" id="author-title" class="form-control" />
</div>
```

```html
<!-- app/views/authors/show.html -->

<div class="row">
  <div class="col-md-8">
    <h1 class="">{{ author.title }}</h1>
  </div>
  <div class="col-md-4">
    <a ng-href="#/authors" class="btn btn-default"> Back </a>
    <a ng-href="#/authors/{{ author.id }}/edit" class="btn btn-primary"> Edit </a>
    <a ng-click="delete(author)" class="btn btn-danger"> Delete </a>
  </div>
</div>
```

Now let's test and run the app to see everything working.

first, we have to run this command to install all dependencies:
```bash
$ npm install && bower install
```
