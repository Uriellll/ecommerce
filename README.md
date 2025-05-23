# Ecommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.
It has a backend and frontend so They runs in differents ports, Front end in  http://localhost:4200/ and backend in http://localhost:4242
Note: To runs the backend with node js, You must create an account in stripe and get the private keys (Publishable key and Secret key) to replace them in files server.js and checkout.js.
Also you need to create the environments in frontend with ng g environment and create the const `stripeApiKey` with the value of Publishable key that you got in your stripe account and const `serverUrl` with the value http://localhost:4242
With this instructions, yo won´t have any trouble to run the project
Find more information about the server in node js in the official doc of stripe https://docs.stripe.com/checkout/embedded/quickstart
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
Also, we are using node js to create the server and use stripe, son don´t forget to install node.js 20 and run the server project with  `npm start`. It runs in http://localhost:4242

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
