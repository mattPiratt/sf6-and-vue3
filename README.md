# JobLeads Upfront

Recruitment task for JobLeads

## Installation

### Build and run docker containers

```cli
host-machine$ docker compose build
```

Then

```cli
host-machine$ docker-compose up -d
```

### Running individual projects

In the previous step, docker built images for projects started container instances in which it is running.

Additionally, for each project run:

```cli
host-machine$ docker-compose exec app_jobleads_upfront_backend bash

docker-container$ git pull 
docker-container$ chmod +x bin/*
docker-container$ chmod +x *.sh
docker-container$ composer install
docker-container$ ./bin/console doctrine:database:create
docker-container$ ./bin/console doctrine:schema:update --force
docker-container$ ./bin/console doctrine:fixtures:load
```

**Note**: During `composer install`, you may be asked for a Github token. You should then generate a new token on the
Github page and remember it. It will be needed later.

## Testing

```
host-machine$ docker-compose exec app_jobleads_upfront bash

docker-container$ ./bin/phpunit
```

## Running in browser

This project can be run in the browser

Backend API: http://127.0.0.1:8000/api/
Frontend: http://localhost:8080/

## Xdebug

This project has PHP Xdebug extension installed, configured for [Step Debugging](https://xdebug.org/docs/step_debug).
Knowledge of Xdebug is required to use it.

