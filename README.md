# Wefox Map

[![Build Status](https://travis-ci.org/deeleman/wefoxmap.svg?branch=master)](https://travis-ci.org/deeleman/wefoxmap)

This repository hosts the a POC project to showcase the capabilities of Angular for rapidly bootstrapping advanced web projects. It depicts a fictional geo localization application enlisting Wefox offices visually on a map.

This project was generated automatically from an instance of [NGX-Starter Project](https://github.com/deeleman/ngx-starter), built on top of [Angular CLI](https://github.com/angular/angular-cli).

## Live demo

A **live demo** is available at https://wefox-map.herokuapp.com.
## General implementation notes
The following is a nont-detailed list of frontend architectural features for this project:

- Implements the REDUX design pattern on top of the [@NGRX](https://github.com/ngrx/platform) library
- Implements a full blown up Side-Effects integration, base on [@ngrx/effects](https://github.com/ngrx/platform)
- All the visual layer is custom-made on top of SASS following the SCSS syntax
- TypeScript implementation is configured to leverage `@wefox` namespaced paths.
- No config values are hardcoded anywhere, centralizing all the project settings within the `@wefox/settings` namespace.
- The same principle applies to the CSS implementation, with a full CSS split into generators and actual CSS implementation. Components' stylesheets can also consume the available SASS mixins, variables and functions out of the box by appending `@import "wfx-toolkit";` in the component stylesheet. The Angular Schematics scheme has been modified to generate SCSS files by default.
- The application embraces state management observing immutability at all times.
- Angular providers implementation take advantage of the advanced Angular dependency injection system and the [Liskov principle](https://en.wikipedia.org/wiki/Liskov_substitution_principle) to prevent circular references and easy provider mocking, stubbing and replacement.
- The overall filesystem has been envision to allow easy and quickly scaling, including a `SharedModule` to easy integrate common use pipes, directives and components in the future.
- Regardless component domains (AKA `src/app/posts`, for instance), application entities are available from the `@wefox/platform` domain. Additional testing tools can be fetched from `@wefox/platform/testing`.
- Although not fully responsive, the application plays nicely with tablet devices and can even be added as a shortcut app on IPads and Android devices.

Please refer to the repository maintainers for questions regarding architectural approach or implementation nuances.

## Running the application in dev mode

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Building the application for production

Run `ng build` to build the project. The build artifacts will be stored in the `dist/wefox` directory. Use the following commands for generating a production-ready build:
- `$ ng build --prod` for a regular build.
- `$ ng build --aot --prod` for a more lean and optimized build with [advanced-of-time compilation](https://angular.io/guide/aot-compiler) (recommended).

## Running the unit tests and linting your code

The project features a shallow TDD layering, with the purpose of showcasing how easy is to implement advanced unit testing in Angular. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

The application also provides suport for automated linting. Please run `ng lint` to ensure your code conforms with the linting rules in place.

Both testing and linting functionalities are automatically driven by the CI on each and every build. You can [check the build results here](https://travis-ci.org/deeleman/wefoxmap).
