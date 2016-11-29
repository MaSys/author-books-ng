```
  __  __       ____               ____
 |  \/  | __ _/ ___| _   _ ___   / ___|___
 | |\/| |/ _` \___ \| | | / __| | |   / _ \
 | |  | | (_| |___) | |_| \__ \ | |__| (_) |
 |_|  |_|\__,_|____/ \__, |___/  \____\___(_)
                     |___/
```

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

the final code will be [here line:22](https://github.com/MaSys/authorBooks/blob/master/app/scripts/app.js#L22)

## Author Factory
before you start to work with the API, you have to prepar your models.
let's start with the Author model: [here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/services/author.js)

we have passed the apiUrl constant, to set the resource url, and then we have to set the update method.

## Book Factory
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/services/book.js)

## Author Controller

Before we start, as we have many actions in the API, the final code of the Authors controller will be too big, so I have separated the controller into actions, each action will be in a separated file.

#### Index Controller
List all authors.
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/authors.index.js)
#### New Controller
To create a new author.
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/authors.new.js)
#### Edit Controller
To edit an exist author
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/authors.edit.js)
#### Show Controller
View details of an author.
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/authors.show.js)

now we have to create templates and routes.

modify your $routeProvider in app.js file to look like this: [here line:23](https://github.com/MaSys/authorBooks/blob/master/app/scripts/app.js#L23)

now we have all the routes for authors.
you can add the templates with the design you want:
[here](https://github.com/MaSys/authorBooks/tree/master/app/views/authors)

after this, include your controllers and factories in the index.html:
[here](https://github.com/MaSys/authorBooks/blob/master/app/index.html#L89)

To test your app, run this command before:
```bash
$ npm install && bower install
```
and then:
```bash
$ grunt serve
```

## Books Controllers
Now that we have the Author CRUD, let's start with Books.
let's create the books controllers:

#### Index Controller
We will list the author's books in authors.show.js
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/authors.show.js)
#### New Controller
to create new book for the author.
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/books.new.js)
#### Edit Controller
to edit the book.
[here](https://github.com/MaSys/authorBooks/blob/master/app/scripts/controllers/books.edit.js)

