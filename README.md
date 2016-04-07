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
  .factory('Account', ['$resource', 'apiUrl', function($resource, apiUrl){
    var author = $resource(apiUrl + '/authors/:id', { id: '@id' }, { update: method: 'PUT' });
    return author
  }]);
```
we have passed the apiUrl constant, to set the resource url, and then we have to set the update method.
