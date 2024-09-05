# JobLeads Upfront

Recruitment task for JobLeads

## Instalation

### Build and run docker containers

```cli
host-machine$ docker compose build --no-cache --pull
```

where:

`--no-cache` (default:false) Do not use cache when building the image

`--pull` (default:false) Always attempt to pull a newer version of the image.

Then

```cli
host-machine$ docker-compose up -d
```

### *hosts* file

On host machine where Docker engine is running, add to `/etc/hosts` file:
( On Windows it is `C:\Windows\System32\drivers\etc\hosts` )

```
127.0.0.1       app_jobleads_upfront.local
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

http://app_jobleads_upfront.local/ [ admin % admin ]

## Xdebug

This project has PHP Xdebug extension installed, configured for [Step Debugging](https://xdebug.org/docs/step_debug).
Knowledge of Xdebug is required to use it.

