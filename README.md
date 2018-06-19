# Ngx Starter

Ngx starter is my personal, super-opinionated, bootstrap project for simple Angular applications. The goal is to provide a superset of the original base project provided by the Angular CLI, with an already existing SCSS foundation and common folders for shared, core and platform domains.

Please note: this project is not intended for public use. It's just a blueprint for quick projects scaffolding with SASS utility functions.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Features

* Super-opinionated linting ruleset
* Shared domain for common-use pipes and directives
* Core domain to allocate global providers within a single unique injector available from root
* Platform domain for provider abstraction and generic type model definition
* Global SCSS library, exposing common SASS mixins, functions and libraries that can be imported within component stylesheets

### Additional utility modules

For the project convenience, some commonly used modules have been added to the bundle. These moduels will be eventually turned inot external Angular libraries by means of the Angular Elements bundler:

* WebSockets client.
* Google Tag Manager wrapper.
* Browser `Window` object wrapper.
* Custom directives: Enter viewport directive, scroll detection directive, back to top directive.
* Custom pipes: Slugify strings pipe.
* SASS utilities: Assorted functions, mixins, environment variables, responsive helpers, etc.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
