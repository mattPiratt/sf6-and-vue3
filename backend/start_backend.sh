#!/bin/bash

cd /app/upfront_backend || exit

chmod +x bin/*
chmod +x *.sh
composer install

if ./bin/console doctrine:database:create --if-not-exists 2>&1 | grep -q "already exists"; then
    echo "Database already exists."
else
    echo "Database does not exist. Creating the database..."
    ./bin/console doctrine:schema:update --force
    ./bin/console doctrine:fixtures:load --no-interaction
fi

/root/.symfony5/bin/symfony server:start --no-tls
