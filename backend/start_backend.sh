#!/bin/bash

cd /app/upfront_backend || exit

chmod +x bin/*
chmod +x *.sh
composer install

# Wait for the database to be ready
sleep 15

./bin/console doctrine:database:drop --force --no-interaction
./bin/console doctrine:database:create
./bin/console doctrine:migration:migrate --no-interaction
./bin/console doctrine:fixtures:load --no-interaction

/root/.symfony5/bin/symfony server:start --no-tls
