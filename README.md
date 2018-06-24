# Wefox Map

[![Build Status](https://travis-ci.org/deeleman/wefoxmap.svg?branch=master)](https://travis-ci.org/deeleman/wefoxmap)

This repository hosts the a POC project to showcase the capabilities of Angular for rapidly bootstrapping advanced web projects. It depicts a fictional geo loclization application enlisting Wefox offices visually on a map.

A **live demo** is available at https://wefox-map.herokuapp.com.

This project was generated automatically from an instance of [NGX-Starter Project](https://github.com/deeleman/ngx-starter), built on top of [Angular CLI](https://github.com/angular/angular-cli).

## General implementation notes
The following is a nont-detailed list of frontend architectural features for this project:

- Implements the REDUX design pattern on top of the [@NGRX](https://github.com/ngrx/platform) library
- Implements a full blown up Side-Effects integration, base on [@ngrx/effects](https://github.com/ngrx/platform)
- All the visual layer is custom-made on top of SASS following the SCSS syntax
- TypeScript implementation is configured to leverage `@wefox` namespaced paths.
- No config values are hardcoded anywhere, centralizing all the project settings within the `@wefox/settings` namespace.
- The same principle applies to the CSS implementation, with a full CSS split into generators and actual CSS implementation. Components' stylesheets can also consume the available SASS mixins, variables and functions out of the box by importing a custom SASS partial.
- The application embraces state management observing immutability at all times.
- Angular providers implementation take advantage of the advanced Angular dependency injection system and the [Liskov principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) to prevent circular references and easy provider mocking, stubbing and replacement.
- The overall filesystem has been envision to allow easy and quickly scaling, including a `SharedModule` to easy integrate common use pipes, directives and components in the future.
- Regardless component domains (AKA `src/app/posts`, for instance), application entities are available from the `@wefox/platform` domain. Additional testing tools can be fetched from `@wefox/platform/testing`.

Please refer to the repository maintainers for questions regarding architectural approach or implementation nuances.

## Running the application in dev mode

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Generating new Angular artifacts

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Building the application for production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/wefox` directory. Use the `--prod` flag for a production build.

## Running the unit tests

The project features a shallow TDD layering, with the purpose of showcasing how easy is to implement advanced unit testing in Angular. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).