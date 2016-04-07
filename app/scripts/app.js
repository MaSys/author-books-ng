'use strict';

/**
 * @ngdoc overview
 * @name authorBooksApp
 * @description
 * # authorBooksApp
 *
 * Main module of the application.
 */
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
  .constant('apiUrl', 'http://localhost:3000/api')
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
  });
