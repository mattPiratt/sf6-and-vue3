## Symfony ApiPlatform + Vue 3 App Demo

This demo showcases a demo application that is composed as 2 docker containers:

- backend: Symfony 6.4 with ApiPlatform
- frontend: Vue 3 application with various features:

### Vue App Features:

- Components with Options API
- Interpolation in the templates
- Composable function for form validation (components/formValidation.js)
- Teleportation component (used in BaseDialog.vue)
- Transition component for smooth UX animation (used in BaseDialog.vue)
- Binding all props ( `v-bind="showAddEditUserData"` in UserManagement.vue)
- Components communication through props & emits
- Asynchronous component loading (e.g., /components/ui/BaseDialog.vue loaded in main.js)
- Vuex Store organization with modules, featuring actions, getters, and mutations
- Implementation of custom spinner loader
- Implementation of custom validation mechanism in the form
- SCSS styling
- dbConnector service to fetch data from the backend
- localStorage service to store data in the browser

### Backend app features:

- it uses Symfony 6.4 with ApiPlatform
- it has a User entity with a few fields
- it uses MySQL DB and a fixture to populate the DB with 100 example users

## Installation

### Build and run docker containers

```cli
host-machine$ docker compose build
```

Then start everything up

```cli
host-machine$ docker-compose up
```

...and wait few minutes for the containers to start. In the terminal window, you should see the output from the containers with information about the URLs to access the frontend and backend.

## Running in browser

This project can be run in the browser

Backend API: http://localhost:8000/api/
Frontend: http://localhost:8080/

## Xdebug

This project has PHP Xdebug extension installed, configured for [Step Debugging](https://xdebug.org/docs/step_debug).
Knowledge of Xdebug is required to use it.

